import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-tag', { opacity: 0, y: 30, duration: 1, delay: 0.3, ease: 'power2.out' });
      gsap.from('.hero-title-line', { opacity: 0, y: 50, duration: 1, stagger: 0.15, delay: 0.5, ease: 'power2.out' });
      gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 1, delay: 0.9, ease: 'power2.out' });
      gsap.from('.hero-cta-btn', { opacity: 0, y: 20, duration: 0.8, delay: 1.1, ease: 'power2.out' });
      gsap.from('.hero-secondary-btn', { opacity: 0, y: 20, duration: 0.8, delay: 1.3, ease: 'power2.out' });
      gsap.from(imgRef.current, { opacity: 0, scale: 1.1, duration: 1.5, delay: 0.5, ease: 'power2.out' });
    }, sectionRef);

    // Parallax on scroll
    const onScroll = () => {
      const scrollY = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `scale(1.1) translateY(${scrollY * 0.15}px)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${-scrollY * 0.1}px)`;
        textRef.current.style.opacity = `${1 - scrollY / 700}`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const scrollToCatalog = () => {
    document.querySelector('#catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCustomizer = () => {
    document.querySelector('#customizer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100dvh] overflow-hidden flex items-end">
      {/* Background Image */}
      <img
        ref={imgRef}
        src="/images/hero-bg.jpg"
        alt="20COMPANY"
        className="absolute inset-0 w-full h-full object-cover scale-110 will-change-transform"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-black/30" />

      {/* Decorative monogram */}
      <div className="absolute bottom-8 right-8 font-cinzel text-[180px] md:text-[280px] leading-none text-white/[0.04] pointer-events-none select-none">
        20
      </div>

      {/* Content */}
      <div ref={textRef} className="relative z-10 w-full px-5 md:px-10 pb-12 md:pb-20">
        <div className="max-w-[640px]">
          <p className="hero-tag text-xs tracking-[0.3em] uppercase text-white/60 mb-4 font-dmsans">
            20COMPANY — SS 2025
          </p>
          <h1 className="font-oldstandard text-heading-lg mb-6">
            <span className="hero-title-line block">Roupas que</span>
            <span className="hero-title-line block italic">falam</span>
            <span className="hero-title-line block">sem gritar.</span>
          </h1>
          <p className="hero-desc text-base md:text-lg text-white/60 leading-relaxed max-w-lg mb-6 font-dmsans">
            Basics de algodão orgânico e peças premium, feitas no Brasil. 
            Nosso diferencial: <span className="text-white font-medium">você escolhe a peça e onde o logo fica</span>.
          </p>
          
          {/* USP Badge */}
          <div className="hero-desc inline-flex items-center gap-2 px-4 py-2 border border-white/20 bg-white/5 mb-8">
            <Sparkles size={14} className="text-white/60" />
            <span className="text-xs tracking-wider text-white/70 font-dmsans">
              CAMISETA · MOLETOM · BONÉ · MEIA — VOCÊ ESCOLHE, VOCÊ PERSONALIZA
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToCatalog}
              className="hero-cta-btn group flex items-center gap-3 font-dmsans text-sm tracking-wider hover:gap-4 transition-all duration-300"
            >
              EXPLORE A COLEÇÃO
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToCustomizer}
              className="hero-secondary-btn group flex items-center gap-3 font-dmsans text-sm tracking-wider border border-white/30 px-6 py-3 hover:bg-white/5 transition-all duration-300"
            >
              <Sparkles size={16} />
              MONTE SUA PEÇA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
