import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const ref = useScrollReveal<HTMLElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setName('');
      }, 3000);
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-white text-black py-20 md:py-32 px-5 md:px-10 relative overflow-hidden">
      {/* Decorative monogram */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[400px] md:text-[600px] text-black/[0.03] pointer-events-none select-none">
        20
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left */}
          <div>
            <h2 className="font-oldstandard text-heading-md text-black mb-6 leading-tight">
              Seja o primeiro<br />a saber.
            </h2>
            <p className="text-sm text-black/50 font-dmsans leading-relaxed max-w-sm">
              Cadastre seu email e garanta acesso antecipado aos lançamentos, edições limitadas
              e promoções exclusivas da 20company.
            </p>
          </div>

          {/* Right - Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Seu nome"
              className="bg-transparent border-b border-black/25 py-3 text-sm text-black placeholder:text-black/30 outline-none focus:border-black transition-colors font-dmsans"
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="bg-transparent border-b border-black/25 py-3 text-sm text-black placeholder:text-black/30 outline-none focus:border-black transition-colors font-dmsans"
            />
            <button
              type="submit"
              className="mt-4 self-start flex items-center gap-3 text-black font-dmsans text-sm font-medium tracking-wider group hover:gap-4 transition-all"
              disabled={submitted}
            >
              {submitted ? (
                <>
                  <Check size={16} />
                  CADASTRADO
                </>
              ) : (
                <>
                  ENTRAR NA LISTA
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
