export interface FeatureFlags {
  resumeBuilder: boolean;
  jobMatching: boolean;
  resumeTailoring: boolean;
  interviewCoach: boolean;
}

export const featureFlags: FeatureFlags = {
  resumeBuilder: true,
  jobMatching: true,
  resumeTailoring: true,
  interviewCoach: false, // Initially unavailable
};
