import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Sparkles, Shirt, MapPin, Palette } from 'lucide-react';

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-16">
          {/* Number */}
          <div className="font-cinzel text-[120px] md:text-[200px] leading-none text-transparent select-none"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.12)' }}
          >
            20
          </div>

          {/* Content */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-6 font-dmsans">
              NOSSA HISTÓRIA
            </p>
            <h2 className="font-oldstandard text-heading-md mb-6">
              Menos barulho.<br />Mais presença.
            </h2>
            <div className="space-y-4 text-white/55 leading-relaxed font-dmsans text-sm md:text-base">
              <p>
                A 20company nasceu de uma amizade e de uma crença simples: roupas boas não precisam de excesso. 
                Cada peça é pensada para durar — no guarda-roupa e no tempo.
              </p>
              <p>
                Somos dois fundadores com olhar apurado para o que realmente importa: caimento, 
                qualidade e uma identidade que dispensa explicações. Não seguimos tendências. 
                Criamos peças que você vai querer usar por anos.
              </p>
              <p>
                <span className="text-white font-medium">Mas o que realmente nos diferencia:</span> aqui você não compra uma peça pronta. 
                Você escolhe a camiseta, o moletom, o boné ou a meia — e decide onde o logo fica. 
                Cada peça é única, feita sob demanda do seu jeito.
              </p>
              <p>
                Todo o processo é feito no Brasil com materiais selecionados. 
                Fazemos menos e fazemos bem feito.
              </p>
            </div>
          </div>
        </div>

        {/* Differentiator Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Sparkles, 
              title: 'Personalização Única',
              desc: 'Você escolhe a peça, a cor, o logo e onde ele fica. Cada item é feito sob demanda.'
            },
            { 
              icon: Shirt, 
              title: '4 Tipos de Peça',
              desc: 'Camiseta oversized, moletom heavyweight, boné estruturado e meia premium.'
            },
            { 
              icon: MapPin, 
              title: 'Posição do Logo',
              desc: 'O diferencial 20CO: decida se o logo vai no peito, costas, centro ou lateral.'
            },
            { 
              icon: Palette, 
              title: 'Cores & Estilos',
              desc: '5 cores por peça e 16 variações de logo — do discreto ao statement.'
            },
          ].map((feature) => (
            <div key={feature.title} className="p-6 border border-[#333333] bg-white/[0.02] hover:border-white/20 transition-colors group">
              <feature.icon size={20} className="text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
              <h3 className="font-dmsans text-sm font-medium text-white mb-2">{feature.title}</h3>
              <p className="font-dmsans text-xs text-white/40 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
