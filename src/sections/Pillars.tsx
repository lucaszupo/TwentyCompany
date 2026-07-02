import { useScrollReveal } from '@/hooks/useScrollReveal';

const PILLARS = [
  {
    num: '01',
    title: 'Qualidade',
    desc: 'Tecidos selecionados com atenção ao toque, ao peso e a durabilidade. Algodão organico de 200gsm, costuras reforcadas e acabamento impecavel. Nada superfluo.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Peças atemporais que escapam das tendências passageiras. Classico com identidade própria. Siluetas oversized que valorizam sem esconder.',
  },
  {
    num: '03',
    title: 'Propósito',
    desc: 'Produção sob demanda, edições limitadas e materiais sustentaveis. Preferimos fazer menos e fazer bem feito. Zero desperdício, zero estoque parado.',
  },
];

export default function Pillars() {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: '.pillar-card', stagger: 0.15 });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-[#333333]/50">
      {PILLARS.map(p => (
        <div
          key={p.num}
          className="pillar-card p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#333333]/50 last:border-0 hover:bg-white/[0.02] transition-colors duration-400"
        >
          <span className="font-cinzel text-5xl text-white/[0.06] block mb-6">{p.num}</span>
          <h3 className="font-cinzel text-xl tracking-wider mb-4">{p.title}</h3>
          <p className="text-sm text-white/45 leading-relaxed font-dmsans">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
