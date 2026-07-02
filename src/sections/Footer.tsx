import { Instagram, Youtube } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Shop', href: '#catalog' },
  { label: 'Sobre', href: '#about' },
  { label: 'Personalizar', href: '#customizer' },
  { label: 'FAQ', href: '#faq' },
];

const SERVICE_LINKS = [
  'Envio e Entrega',
  'Tabela de Medidas',
  'Trocas e Devoluções',
  'Politica de Privacidade',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-black border-t border-[#333333]/50 overflow-hidden">
      {/* Monogram pattern background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="grid grid-cols-4 md:grid-cols-6 gap-8 p-8">
          {[...Array(24)].map((_, i) => (
            <span key={i} className="font-cinzel text-6xl md:text-8xl">20</span>
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <span className="font-cinzel text-4xl tracking-[0.05em] block mb-6">20</span>
            <p className="text-sm text-white/40 font-dmsans leading-relaxed max-w-xs mb-6">
              Roupas que falam sem gritar. Design minimalista, qualidade premium, feito no Brasil.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="TikTok">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Navigation */}
          <div className="relative">
            <h4 className="font-dmsans text-sm font-medium mb-6 tracking-wider">NAVEGACAO</h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-white/40 hover:text-white transition-colors font-dmsans text-left"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            {/* Monogram stamp */}
            <span className="absolute bottom-0 right-0 font-cinzel text-7xl text-white/[0.04] pointer-events-none hidden md:block">
              20
            </span>
          </div>

          {/* Column 3 - Service */}
          <div className="relative">
            <h4 className="font-dmsans text-sm font-medium mb-6 tracking-wider">ATENDIMENTO</h4>
            <div className="flex flex-col gap-3">
              {SERVICE_LINKS.map(link => (
                <span key={link} className="text-sm text-white/40 font-dmsans cursor-default">
                  {link}
                </span>
              ))}
            </div>
            <span className="absolute bottom-0 right-0 font-cinzel text-7xl text-white/[0.04] pointer-events-none hidden md:block">
              20
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#333333]/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30 font-dmsans">
            © 2025 20COMPANY. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/20 font-dmsans">
            Feito com propósito no Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
