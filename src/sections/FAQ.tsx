import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const FAQS = [
  {
    question: 'Como funciona a produção sob demanda?',
    answer: 'Cada peça é produzida após o pedido, garantindo exclusividade e reduzindo desperdício. O prazo de confecção é de até 5 dias úteis. Esse modelo nos permite oferecer edições limitadas e personalizações sem manter estoque parado.',
  },
  {
    question: 'Qual o prazo de entrega?',
    answer: 'Após a confecção (até 5 dias úteis), o prazo de entrega varia de 3 a 12 dias úteis dependendo da sua região. São Paulo e Rio de Janeiro geralmente recebem em 3-5 dias. Você recebe o código de rastreamento por email assim que o pedido é despachado.',
  },
  {
    question: 'Como funciona a troca?',
    answer: 'Você tem 7 dias após o recebimento para solicitar troca ou devolução. A primeira troca é gratuita — enviamos o novo item sem custo adicional. Para devoluções, o reembolso é processado em até 5 dias úteis após recebermos o produto.',
  },
  {
    question: 'Os produtos tem garantia?',
    answer: 'Sim, garantimos a qualidade de todas as nossas peças. Se houver qualquer defeito de fabricação, fazemos a substituição imediata sem custo. Nosso algodão organico passa por rigoroso controle de qualidade antes de chegar até você.',
  },
  {
    question: 'Posso personalizar a cor do logo?',
    answer: 'Atualmente oferecemos o logo na cor que melhor contrasta com cada cor de camiseta selecionada automaticamente. Estamos trabalhando para oferecer mais opções de customização em breve, incluindo cores de logo personalizadas.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} id="faq" className="section-padding border-t border-[#333333]/50">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-cinzel text-4xl md:text-5xl">20</span>
          <span className="text-xs text-white/40 font-dmsans">(04)</span>
        </div>
        <h2 className="font-oldstandard text-heading-md mb-10">Perguntas Frequentes</h2>

        <div className="flex flex-col">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border-b border-[#333333]/50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group"
                >
                  <span className="font-dmsans text-base md:text-lg font-medium pr-4 group-hover:text-white/80 transition-colors">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-8 h-8 border border-[#333333] flex items-center justify-center group-hover:border-white/40 transition-colors">
                    {isOpen ? <X size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-60 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-white/50 leading-relaxed pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
