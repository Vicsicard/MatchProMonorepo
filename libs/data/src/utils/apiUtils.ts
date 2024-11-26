import Bottleneck from 'bottleneck';
import { sleep } from './common';

// Define custom RequestOptions that doesn't extend RequestInit
export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  retryCount?: number;
  maxRetries?: number;
  baseDelay?: number;
  priority?: number;
  signal?: AbortSignal;
  cache?: RequestCache;
  credentials?: RequestCredentials;
  integrity?: string;
  keepalive?: boolean;
  mode?: RequestMode;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
}

// Global rate limiter instance
const limiter = new Bottleneck({
  minTime: 200, // Minimum time between requests (ms)
  maxConcurrent: 5, // Maximum concurrent requests
  reservoir: 100, // Number of jobs that can be run in reservoir period
  reservoirRefreshAmount: 100, // Jobs to add to reservoir when refreshed
  reservoirRefreshInterval: 60 * 1000, // Reservoir refresh interval (1 minute)
  highWater: 1000, // Max queue length
  strategy: Bottleneck.strategy.BLOCK, // Block new requests when queue is full
});

// Add events for monitoring and debugging
limiter.on('error', (error: Error) => {
  console.error('Rate limiter error:', error);
});

/**
 * Makes an API request with enhanced rate limiting using Bottleneck and exponential backoff
 * @param url The URL to make the request to
 * @param options Request options including retry configuration
 * @returns The response data
 */
export async function makeRequestWithRateLimit<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    retryCount = 0,
    maxRetries = 3,
    baseDelay = 1000,
    priority = 5,
    ...fetchOptions
  } = options;

  // Wrap the request in a Bottleneck-controlled function
  return limiter.schedule(
    { priority },
    async () => {
      try {
        const response = await fetch(url, fetchOptions as RequestInit);

        // Handle rate limiting
        if (response.status === 429) {
          // Get retry delay from header or use exponential backoff
          const retryAfter = parseInt(response.headers.get("Retry-After") || "0", 10);
          const delay = retryAfter * 1000 || Math.min(Math.pow(2, retryCount) * baseDelay, 60000);

          if (retryCount >= maxRetries) {
            throw new Error(`Rate limit exceeded after ${maxRetries} retries`);
          }

          console.log(`Rate limit exceeded. Retrying after ${delay / 1000} seconds.`);
          await sleep(delay);

          // Retry the request with incremented retry count
          return makeRequestWithRateLimit(url, {
            ...options,
            retryCount: retryCount + 1,
          });
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      } catch (error) {
        if (error instanceof Error) {
          console.error("API Request Error:", error.message);
        }
        throw error;
      }
    }
  );
}

export interface RateLimitedClient {
  get: <T>(path: string, options?: RequestOptions) => Promise<T>;
  post: <T>(path: string, body: any, options?: RequestOptions) => Promise<T>;
}

/**
 * Creates a rate-limited API client with configurable options
 * @param baseUrl Base URL for API requests
 * @param defaultOptions Default options for all requests
 * @returns Object with rate-limited request methods
 */
export function createRateLimitedClient(
  baseUrl: string,
  defaultOptions: RequestOptions = {}
): RateLimitedClient {
  // Create a client-specific limiter with custom settings
  const clientLimiter = new Bottleneck({
    minTime: 500, // More conservative rate limit for specific clients
    maxConcurrent: 3,
    reservoir: 50,
    reservoirRefreshAmount: 50,
    reservoirRefreshInterval: 60 * 1000,
  });

  return {
    get: async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
      const url = `${baseUrl}${path}`;
      return clientLimiter.schedule(() =>
        makeRequestWithRateLimit<T>(url, {
          ...defaultOptions,
          ...options,
          method: 'GET',
        })
      );
    },
    post: async <T>(path: string, body: any, options: RequestOptions = {}): Promise<T> => {
      const url = `${baseUrl}${path}`;
      return clientLimiter.schedule(() =>
        makeRequestWithRateLimit<T>(url, {
          ...defaultOptions,
          ...options,
          method: 'POST',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            ...defaultOptions.headers,
            ...options.headers,
          },
        })
      );
    },
  };
}
