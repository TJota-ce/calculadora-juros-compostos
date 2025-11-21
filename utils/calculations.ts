import { CalculatorInput, SimulationResult, MonthlyData } from '../types';

export const calculateCompoundInterest = (input: CalculatorInput): SimulationResult => {
  const { initialValue, monthlyValue, interestRate, rateType, period, periodType } = input;

  // Normalize time to months
  const totalMonths = periodType === 'years' ? period * 12 : period;

  // Normalize rate to monthly decimal
  // If annual, we use the geometric conversion: (1 + r_annual)^(1/12) - 1
  // If monthly, simply rate / 100
  let monthlyRateDecimal = 0;
  if (rateType === 'annual') {
    monthlyRateDecimal = Math.pow(1 + interestRate / 100, 1 / 12) - 1;
  } else {
    monthlyRateDecimal = interestRate / 100;
  }

  let currentBalance = initialValue;
  let totalInvested = initialValue;
  let totalInterest = 0;
  const monthlyData: MonthlyData[] = [];

  // Initial state (Month 0)
  monthlyData.push({
    month: 0,
    monthlyInterest: 0,
    totalInvested: initialValue,
    totalInterest: 0,
    totalAccumulated: initialValue,
    formattedLabel: 'Início',
  });

  for (let i = 1; i <= totalMonths; i++) {
    // 1. Calculate interest on the current balance (before new deposit)
    
    const interestEarned = currentBalance * monthlyRateDecimal;
    currentBalance += interestEarned;
    currentBalance += monthlyValue;
    
    totalInvested += monthlyValue;
    totalInterest += interestEarned;

    monthlyData.push({
      month: i,
      monthlyInterest: Number(interestEarned.toFixed(2)),
      totalInvested: Number(totalInvested.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalAccumulated: Number(currentBalance.toFixed(2)),
      formattedLabel: periodType === 'years' && i % 12 === 0 ? `${i / 12} ano(s)` : `${i} mês`,
    });
  }

  return {
    finalValue: currentBalance,
    totalInvested: totalInvested,
    totalInterest: totalInterest,
    monthlyData,
  };
};