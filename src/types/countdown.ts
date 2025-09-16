export interface CountdownScheme {
  id: string;
  name: string;
  icon: string;
  primaryColor: string;
  secondaryColor: string;
  gradient: string;
}

export interface CountdownData {
  id: string;
  name: string;
  targetDate: Date;
  scheme: CountdownScheme;
  customBackground?: string;
  customColor?: string;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isFinished: boolean;
}