import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NAV_LINKS = [
  { label: 'Shop', href: '#catalog' },
  { label: 'Sobre', href: '#about' },
  { label: 'Personalizar', href: '#customizer' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contact' },
];

export default function Header() {
  const { totalItems, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 ${
          scrolled
            ? 'bg-black/80 backdrop-blur-xl border-b border-[#333333]'
            : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between h-16 md:h-20 px-5 md:px-10">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-cinzel text-2xl md:text-4xl tracking-[0.05em] text-white hover:opacity-80 transition-opacity"
          >
            20
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-dmsans text-base text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={openCart}
              className="relative text-white hover:opacity-70 transition-opacity"
              aria-label="Carrinho"
            >
              <ShoppingBag size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[1001] bg-black transition-transform duration-500 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center h-16 px-5">
          <span className="font-cinzel text-2xl tracking-[0.05em]">20</span>
          <button onClick={() => setMenuOpen(false)} aria-label="Fechar menu">
            <X size={24} />
          </button>
        </div>
        <nav className="flex flex-col items-start px-8 pt-12 gap-8">
          {NAV_LINKS.map(link => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="font-oldstandard text-4xl text-white/80 hover:text-white transition-colors"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
