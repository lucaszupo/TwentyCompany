import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function About() {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="about" className="section-padding">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
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
            Menos barulho.<br />Mais presenca.
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed font-dmsans text-sm md:text-base">
            <p>
              A 20company nasceu de uma amizade e de uma crenca simples: roupas boas não precisam de excesso. 
              Cada peça e pensada para durar — no guarda-roupa e no tempo.
            </p>
            <p>
              Somos dois fundadores com olhar apurado para o que realmente importa: caimento, 
              qualidade e uma identidade que dispensa explicações. Não seguimos tendências. 
              Criamos peças que você vai querer usar por anos.
            </p>
            <p>
              Todo o processo, do design a entrega, e feito no Brasil com materiais selecionados 
              e produção sob demanda. Fazemos menos e fazemos bem feito.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
