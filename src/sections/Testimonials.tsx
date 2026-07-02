import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Lucas M.',
    location: 'São Paulo, SP',
    quote: 'A qualidade do algodão é impressionante. Ja lavei mais de 10 vezes e a camiseta continua perfeita, sem deformar.',
    image: '/images/testi-1.jpg',
  },
  {
    id: 2,
    name: 'Marina R.',
    location: 'Rio de Janeiro, RJ',
    quote: 'Finalmente uma marca brasileira que entende minimalismo de verdade. Cada peça é versatil e combina com tudo.',
    image: '/images/testi-2.jpg',
  },
  {
    id: 3,
    name: 'Pedro H.',
    location: 'Belo Horizonte, MG',
    quote: 'O customizador é genial. Minha camiseta com o patch oval é única. Todo mundo pergunta onde comprei.',
    image: '/images/testi-3.jpg',
  },
  {
    id: 4,
    name: 'Julia S.',
    location: 'Curitiba, PR',
    quote: 'Entrega rápida e embalagem impecavel. Senti que comprei uma experiência, não so uma roupa. Ja quero mais.',
    image: '/images/testi-4.jpg',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useScrollReveal<HTMLElement>();

  const scroll = (dir: number) => {
    const newIndex = active + dir;
    if (newIndex >= 0 && newIndex < TESTIMONIALS.length) {
      setActive(newIndex);
      if (scrollRef.current) {
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 300;
        scrollRef.current.scrollTo({ left: newIndex * (cardWidth + 24), behavior: 'smooth' });
      }
    }
  };

  return (
    <section ref={sectionRef} id="depoimentos" className="section-padding border-t border-[#333333]/50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="font-cinzel text-5xl md:text-6xl">20</span>
              <span className="text-xs text-white/40 font-dmsans">(02)</span>
            </div>
            <h2 className="font-oldstandard text-heading-md mb-2">O que dizem</h2>
            <p className="text-sm text-white/40 font-dmsans">Depoimentos</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:border-white/40 transition-colors disabled:opacity-30"
              disabled={active === 0}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll(1)}
              className="w-10 h-10 border border-[#333333] flex items-center justify-center hover:border-white/40 transition-colors disabled:opacity-30"
              disabled={active === TESTIMONIALS.length - 1}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none' }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex-shrink-0 w-[300px] md:w-[350px] snap-start border border-[#333333]/50 p-6 md:p-8 hover:border-[#333333] transition-colors"
            >
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-14 h-14 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-dmsans text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-white/40">{t.location}</p>
                </div>
              </div>
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-white text-white" />
                ))}
              </div>
              <p className="font-oldstandard text-base md:text-lg italic leading-relaxed text-white/80">
                "{t.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
