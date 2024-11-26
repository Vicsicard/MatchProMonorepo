import { sleep } from './common';

interface RequestOptions extends RequestInit {
  retryCount?: number;
  maxRetries?: number;
  baseDelay?: number;
}

/**
 * Makes an API request with rate limit handling and exponential backoff
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
    ...fetchOptions
  } = options;

  try {
    const response = await fetch(url, fetchOptions);

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

/**
 * Creates a rate-limited API client with configurable options
 * @param baseUrl Base URL for API requests
 * @param defaultOptions Default options for all requests
 * @returns Object with rate-limited request methods
 */
export function createRateLimitedClient(
  baseUrl: string,
  defaultOptions: RequestOptions = {}
) {
  return {
    async get<T>(path: string, options: RequestOptions = {}) {
      return makeRequestWithRateLimit<T>(`${baseUrl}${path}`, {
        ...defaultOptions,
        ...options,
        method: 'GET',
      });
    },

    async post<T>(path: string, data: any, options: RequestOptions = {}) {
      return makeRequestWithRateLimit<T>(`${baseUrl}${path}`, {
        ...defaultOptions,
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...defaultOptions.headers,
          ...options.headers,
        },
      });
    },

    // Add other methods (PUT, DELETE, etc.) as needed
  };
}
