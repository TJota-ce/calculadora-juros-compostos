import React from 'react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { SimulationResult } from '../types';
import { formatCurrency } from '../utils/formatters';
import { TrendingUp, Coins, PiggyBank } from 'lucide-react';

interface ResultsProps {
  result: SimulationResult;
}

export const Results: React.FC<ResultsProps> = ({ result }) => {
  // Filter data for chart to avoid overcrowding if too many months
  const chartData = result.monthlyData.filter((_, index, arr) => {
    if (arr.length <= 24) return true;
    if (arr.length <= 60) return index % 3 === 0; // Every 3 months
    if (arr.length <= 120) return index % 6 === 0; // Every 6 months
    return index % 12 === 0; // Every year
  });

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Final */}
        <div className="bg-cyan-900 text-white p-6 rounded-xl shadow-lg transform transition-transform hover:scale-105">
          <div className="flex items-center gap-2 mb-2 opacity-90">
            <TrendingUp className="w-5 h-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Valor Total Final</h3>
          </div>
          <p className="text-3xl font-bold">{formatCurrency(result.finalValue)}</p>
        </div>

        {/* Invested */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <PiggyBank className="w-5 h-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Valor Total Investido</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800">{formatCurrency(result.totalInvested)}</p>
        </div>

        {/* Interest */}
        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-gray-500">
            <Coins className="w-5 h-5" />
            <h3 className="text-sm font-semibold uppercase tracking-wider">Total em Juros</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{formatCurrency(result.totalInterest)}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <h3 className="text-xl font-bold text-cyan-900">
            Gráfico:
          </h3>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0891b2" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis 
                dataKey="formattedLabel" 
                tick={{ fontSize: 12, fill: '#6b7280' }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tickFormatter={(value) => 
                  new Intl.NumberFormat('pt-BR', { notation: "compact", compactDisplay: "short" }).format(value)
                }
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelStyle={{ color: '#111827', fontWeight: 'bold' }}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area 
                type="monotone" 
                dataKey="totalAccumulated" 
                name="Total Acumulado (Juros + Investido)" 
                stroke="#155e75" 
                fillOpacity={1} 
                fill="url(#colorTotal)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="totalInvested" 
                name="Valor Investido" 
                stroke="#1f2937" 
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="mb-4 text-center">
           <h3 className="text-xl font-bold text-cyan-900">
            Tabela:
          </h3>
        </div>
        
        <div className="overflow-x-auto custom-scrollbar max-h-[500px] border border-gray-100 rounded-lg">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200 sticky top-0">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold">Mês</th>
                <th scope="col" className="px-6 py-4 font-bold">Juros</th>
                <th scope="col" className="px-6 py-4 font-bold">Total Investido</th>
                <th scope="col" className="px-6 py-4 font-bold">Total Juros</th>
                <th scope="col" className="px-6 py-4 font-bold">Total Acumulado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {result.monthlyData.map((data, index) => (
                <tr key={index} className="bg-white hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 text-center">
                    {data.month}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatCurrency(data.monthlyInterest)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatCurrency(data.totalInvested)}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {formatCurrency(data.totalInterest)}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">
                    {formatCurrency(data.totalAccumulated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};