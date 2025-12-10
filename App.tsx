import React, { useState } from 'react';
import { CalculatorInput, SimulationResult } from './types';
import { calculateCompoundInterest } from './utils/calculations';
import { formatNumber } from './utils/formatters';
import { Results } from './components/Results';
import { InfoSection } from './components/InfoSection';
import { Calculator, Percent, RefreshCw, BarChart2, CalendarDays, Wallet } from 'lucide-react';

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

  // SVG Pattern for background
  const geometricPattern = `data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231d4ed8' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E`;

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Header */}
      <header 
        className="bg-white border-b border-gray-200 mb-10 sticky top-0 z-50 shadow-sm"
        style={{ backgroundImage: `url("${geometricPattern}")` }}
      >
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-700 p-2.5 rounded shadow-sm">
              <Calculator className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gray-900 tracking-tight leading-none">IJota</span>
              <span className="text-[10px] text-blue-700 font-bold uppercase tracking-widest leading-none mt-1">Simulador Financeiro</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 space-y-10">
        
        <div className="text-center md:text-left border-l-4 border-blue-600 pl-6 py-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Simulador de Juros Compostos
          </h1>
          <p className="text-gray-500 text-lg font-light">
            Planejamento estratégico para sua independência financeira.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Calculator Card */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-md shadow-sm border border-gray-300 p-6 md:p-8 relative overflow-hidden">
               {/* Decorative top bar */}
               <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                
                {/* Initial Value */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Valor inicial</label>
                  <div className="relative rounded-sm shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Wallet className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(input.initialValue)}
                      onChange={(e) => handleCurrencyChange('initialValue', e.target.value)}
                      className="block w-full rounded-sm border-0 py-3.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 bg-gray-50 focus:bg-white transition-all font-mono tracking-tight"
                      placeholder="0,00"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm font-medium">BRL</span>
                    </div>
                  </div>
                </div>

                {/* Monthly Value */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Valor mensal</label>
                  <div className="relative rounded-sm shadow-sm">
                     <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <Wallet className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={formatNumber(input.monthlyValue)}
                      onChange={(e) => handleCurrencyChange('monthlyValue', e.target.value)}
                      className="block w-full rounded-sm border-0 py-3.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-lg sm:leading-6 bg-gray-50 focus:bg-white transition-all font-mono tracking-tight"
                      placeholder="0,00"
                    />
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm font-medium">BRL</span>
                    </div>
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Taxa de juros</label>
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 bg-gray-50">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Percent className="h-4 w-4 text-gray-400" aria-hidden="true" strokeWidth={1.5} />
                      </div>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={input.interestRate || ''}
                        onChange={(e) => handleNumberChange('interestRate', e.target.value)}
                        className="block w-full rounded-none rounded-l-sm border-0 py-3.5 pl-10 pr-3 text-gray-900 focus:ring-0 sm:text-lg sm:leading-6 bg-transparent font-mono"
                        placeholder="0.00"
                      />
                    </div>
                    <div className="relative flex">
                      <select
                        value={input.rateType}
                        onChange={(e) => setInput({ ...input, rateType: e.target.value as any })}
                        className="relative w-28 cursor-pointer rounded-none rounded-r-sm border-0 bg-transparent py-3 pl-3 pr-9 text-gray-600 font-medium focus:ring-0 sm:text-sm sm:leading-6 border-l border-gray-200 hover:bg-gray-100 transition-colors uppercase tracking-wide"
                      >
                        <option value="annual">Anual</option>
                        <option value="monthly">Mensal</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Period */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">Período</label>
                  <div className="flex rounded-sm shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 bg-gray-50">
                    <div className="relative flex flex-grow items-stretch focus-within:z-10">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <CalendarDays className="h-4 w-4 text-gray-400" aria-hidden="true" strokeWidth={1.5} />
                      </div>
                      <input
                        type="number"
                        min="1"
                        value={input.period || ''}
                        onChange={(e) => handleNumberChange('period', e.target.value)}
                        className="block w-full rounded-none rounded-l-sm border-0 py-3.5 pl-10 pr-3 text-gray-900 focus:ring-0 sm:text-lg sm:leading-6 bg-transparent font-mono"
                        placeholder="1"
                      />
                    </div>
                    <div className="relative flex">
                      <select
                        value={input.periodType}
                        onChange={(e) => setInput({ ...input, periodType: e.target.value as any })}
                        className="relative w-28 cursor-pointer rounded-none rounded-r-sm border-0 bg-transparent py-3 pl-3 pr-9 text-gray-600 font-medium focus:ring-0 sm:text-sm sm:leading-6 border-l border-gray-200 hover:bg-gray-100 transition-colors uppercase tracking-wide"
                      >
                        <option value="years">Anos</option>
                        <option value="months">Meses</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
                <button
                  onClick={handleCalculate}
                  className="w-full sm:w-auto px-10 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold tracking-wide rounded-sm shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 uppercase text-sm"
                >
                  <Calculator className="w-5 h-5" strokeWidth={2} />
                  Calcular Resultado
                </button>
                
                <div className="flex items-center gap-4 w-full sm:w-auto justify-center">
                    <button 
                        onClick={handleClear}
                        className="text-gray-400 hover:text-red-500 font-medium text-xs uppercase tracking-widest flex items-center gap-2 transition-colors border border-gray-200 px-4 py-2 rounded-sm hover:border-red-200"
                    >
                        <RefreshCw className="w-3 h-3" />
                        Limpar Dados
                    </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-12">
            {result ? (
               <div id="results-section">
                   <h2 className="text-2xl font-bold text-gray-800 mb-6 tracking-tight flex items-center gap-3">
                       <span className="w-1.5 h-8 bg-blue-600 block rounded-sm"></span>
                       Análise de Resultados
                   </h2>
                   <Results result={result} />
               </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 bg-slate-50 rounded-md border-2 border-dashed border-gray-300 text-gray-400">
                    <BarChart2 className="w-12 h-12 mb-3 text-gray-300" strokeWidth={1} />
                    <p className="text-sm font-medium uppercase tracking-widest">Preencha os campos para iniciar</p>
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
      <footer className="bg-white border-t border-gray-200 mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
             <div className="flex items-center gap-2 mb-4 opacity-50">
                <div className="bg-gray-800 p-1 rounded-sm">
                  <Calculator className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-800 tracking-tight">IJota</span>
             </div>
             <p className="text-xs text-gray-500 uppercase tracking-wider">© {new Date().getFullYear()} IJota Financeira. Tecnologia e Precisão.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;