export type PeriodType = 'years' | 'months';
export type RateType = 'annual' | 'monthly';

export interface CalculatorInput {
  initialValue: number;
  monthlyValue: number;
  interestRate: number;
  rateType: RateType;
  period: number;
  periodType: PeriodType;
}

export interface MonthlyData {
  month: number;
  monthlyInterest: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
  formattedLabel?: string;
}

export interface SimulationResult {
  finalValue: number;
  totalInvested: number;
  totalInterest: number;
  monthlyData: MonthlyData[];
}