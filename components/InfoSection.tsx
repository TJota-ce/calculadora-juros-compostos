import React from 'react';
import { BookOpen } from 'lucide-react';

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
    <div className="bg-white rounded-md shadow-sm border border-gray-300 p-6 md:p-8 mb-8">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
        <div className="p-2 bg-blue-50 rounded-md">
           <BookOpen className="w-5 h-5 text-blue-700" strokeWidth={1.5} />
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
          Como usar o Simulador IJota
        </h2>
      </div>

      <p className="text-gray-600 mb-8 leading-relaxed max-w-3xl">
        Nosso simulador de juros compostos é uma ferramenta de engenharia financeira gratuita para planejar seu futuro.
        Entenda o poder do tempo e dos aportes constantes com nosso passo a passo:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col gap-3 p-5 rounded-sm bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-white transition-all duration-300 group">
            <div className="flex items-center gap-3 text-blue-800 font-semibold">
              <span className="flex items-center justify-center w-8 h-8 rounded-sm bg-blue-100 text-sm border border-blue-200 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {index + 1}
              </span>
              <h3 className="tracking-tight">{step.title}</h3>
            </div>
            <p className="text-sm text-gray-600 pl-11 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};