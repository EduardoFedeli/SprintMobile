export type RiskProfile = 'conservador' | 'moderado' | 'agressivo';

export interface UserProfile {
  name: string;
  email: string;
  riskProfile: RiskProfile;
}
