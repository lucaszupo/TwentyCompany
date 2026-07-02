import { Truck, RefreshCw, Clock, Ruler } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const INFO_CARDS = [
  {
    icon: Truck,
    title: 'Frete',
    desc: 'Frete grátis para todo o Brasil em compras acima de R$ 250. Para compras menores, o frete é calculado no checkout com o melhor valor.',
  },
  {
    icon: RefreshCw,
    title: 'Trocas e Devoluções',
    desc: 'Você tem até 7 dias após o recebimento para solicitar troca ou devolução. A primeira troca é sempre gratuita.',
  },
  {
    icon: Clock,
    title: 'Prazo de Entrega',
    desc: 'Produção sob demanda: até 5 dias úteis para confecção. Entrega: 3 a 12 dias úteis dependendo da região.',
  },
  {
    icon: Ruler,
    title: 'Tabela de Medidas',
    desc: 'Modelagem oversized. Consulte nossa tabela detalhada para encontrar o tamanho ideal. P ao XGG disponíveis.',
  },
];

export default function InfoCompra() {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: '.info-card', stagger: 0.1 });

  return (
    <div ref={ref} id="infocompra" className="section-padding border-t border-[#333333]/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-cinzel text-4xl md:text-5xl">20</span>
          <span className="text-xs text-white/40 font-dmsans">(03)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0">
          {INFO_CARDS.map((card) => (
            <div
              key={card.title}
              className="info-card p-6 md:p-8 border-b sm:border-b-0 sm:border-r border-[#333333]/50 last:border-0 hover:bg-white/[0.01] transition-colors"
            >
              <card.icon size={32} className="mb-5 text-white/70" strokeWidth={1} />
              <h3 className="font-dmsans text-base font-medium mb-3">{card.title}</h3>
              <p className="text-sm text-white/45 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
