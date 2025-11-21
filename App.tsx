import React, { useState } from 'react';
import { CalculatorInput, SimulationResult } from './types';
import { calculateCompoundInterest } from './utils/calculations';
import { formatNumber } from './utils/formatters';
import { Results } from './components/Results';
import { InfoSection } from './components/InfoSection';
import { Calculator, DollarSign, Calendar, Percent, RefreshCw, BarChart2 } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState<CalculatorInput>({
    initialValue: 0,
    monthlyValue: 0,
    interestRate: 8,
    rateType: 'annual',
    period: 1,
    periodType: 'years',
  });

  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleCalculate = () => {
    const res = calculateCompoundInterest(input);
    setResult(res);
  };

  const handleClear = () => {
    setInput({
      initialValue: 0,
      monthlyValue: 0,
      interestRate: 8,
      rateType: 'annual',
      period: 1,
      periodType: 'years',
    });
    setResult(null);
  };

  // Helper to safely handle numeric input changes for Rate and Period
  const handleNumberChange = (field: keyof CalculatorInput, value: string) => {
    const num = parseFloat(value);
    setInput(prev => ({
      ...prev,
      [field]: isNaN(num) ? 0 : num
    }));
  };

  // Helper to handle currency input changes (ATM style)
  const handleCurrencyChange = (field: keyof CalculatorInput, value: string) => {
    // Remove everything that is not a digit
    const onlyDigits = value.replace(/\D/g, "");
    // Convert to number (cents)
    const numberValue = Number(onlyDigits) / 100;
    
    setInput(prev => ({
      ...prev,
      [field]: numberValue
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 mb-8 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-cyan-900 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 tracking-tight">IJota</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 space-y-8">
        
        <div className="text-center md:text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            Simulador de Juros Compostos
          </h1>
          <p className="text-gray-500 text-lg">
            Planeje sua independência financeira com precisão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Calculator Card */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                
                {/* Initial Value */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Valor inicial</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(input.initialValue)}
                      onChange={(e) => handleCurrencyChange('initialValue', e.target.value)}
                      className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 focus:bg-white transition-all"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {/* Monthly Value */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Valor mensal</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="text-gray-500 sm:text-sm">R$</span>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(input.monthlyValue)}
                      onChange={(e) => handleCurrencyChange('monthlyValue', e.target.value)}
                      className="block w-full rounded-md border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6 bg-gray-50 focus:bg-white transition-all"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Taxa de juros</label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 bg-gray-50">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Percent className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.interestRate || ''}
                        onChange={(e) => handleNumberChange('interestRate', e.target.value)}
                        className="block w-full rounded-none rounded-l-md border-0 py-3 pl-10 pr-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="relative flex">
                      <select
                        value={input.rateType}
                        onChange={(e) => setInput({ ...input, rateType: e.target.value as any })}
                        className="relative w-full cursor-pointer rounded-none rounded-r-md border-0 bg-transparent py-3 pl-3 pr-9 text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 border-l border-gray-200"
                      >
                        <option value="annual">Anual</option>
                        <option value="monthly">Mensal</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Period */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Período</label>
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-cyan-600 bg-gray-50">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Calendar className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={input.period || ''}
                        onChange={(e) => handleNumberChange('period', e.target.value)}
                        className="block w-full rounded-none rounded-l-md border-0 py-3 pl-10 pr-3 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent"
                        placeholder="1"
                      />
                    </div>
                    <div className="relative flex">
                      <select
                        value={input.periodType}
                        onChange={(e) => setInput({ ...input, periodType: e.target.value as any })}
                        className="relative w-full cursor-pointer rounded-none rounded-r-md border-0 bg-transparent py-3 pl-3 pr-9 text-gray-500 focus:ring-0 sm:text-sm sm:leading-6 border-l border-gray-200"
                      >
                        <option value="years">Anos</option>
                        <option value="months">Meses</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
                <button
                  onClick={handleCalculate}
                  className="w-full sm:w-auto px-8 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calcular
                </button>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
                    <button 
                        onClick={handleClear}
                        className="text-gray-500 hover:text-gray-700 font-medium text-sm flex items-center gap-1 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Limpar
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-12">
            {result ? (
               <div id="results-section">
                   <h2 className="text-2xl font-bold text-cyan-900 mb-6">Resultado</h2>
                   <Results result={result} />
               </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-white rounded-2xl border border-dashed border-gray-300 text-gray-400">
                    <BarChart2 className="w-12 h-12 mb-2 opacity-20" />
                    <p>Preencha os campos acima e clique em Calcular</p>
                </div>
            )}
          </div>

          {/* Educational Content */}
          <div className="lg:col-span-12">
            <InfoSection />
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} IJota Financeira. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;