import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: "Passo 1: Valor Inicial",
    description: "Preencha o campo com a quantia que você já possui ou que irá investir para começar."
  },
  {
    title: "Passo 2: Valor Mensal",
    description: "Defina quanto você consegue aportar todo mês para aumentar seu patrimônio."
  },
  {
    title: "Passo 3: Taxa de Juros",
    description: "Informe a rentabilidade esperada. Lembre-se de selecionar se a taxa é mensal ou anual."
  },
  {
    title: "Passo 4: Período",
    description: "Determine por quanto tempo o dinheiro ficará rendendo. O tempo é o melhor amigo dos juros compostos!"
  },
  {
    title: "Passo 5: Calcular",
    description: "Clique no botão para gerar os gráficos e a tabela detalhada de evolução."
  }
];

export const InfoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="w-6 h-6 text-cyan-700" />
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Como usar o Simulador IJota
        </h2>
      </div>

      <p className="text-gray-600 mb-8 leading-relaxed">
        Nosso simulador de juros compostos é uma ferramenta poderosa e gratuita para planejar seu futuro financeiro.
        Entenda o poder do tempo e dos aportes constantes com nosso passo a passo:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col gap-2 p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-cyan-200 transition-colors">
            <div className="flex items-center gap-2 text-cyan-800 font-semibold">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 text-sm">
                {index + 1}
              </span>
              <h3>{step.title}</h3>
            </div>
            <p className="text-sm text-gray-600 pl-8">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};