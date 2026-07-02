import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const ITEMS = [
  'DESIGN MINIMALISTA', '20COMPANY', 'FEITO NO BRASIL', 'ALGODÃO ORGANICO',
  'EDIÇÕES LIMITADAS', '20COMPANY', 'ROUPAS COM PROPÓSITO', 'SS 2025',
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const width = track.scrollWidth / 2;
    gsap.to(track, {
      x: -width,
      duration: 30,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full py-4 border-y border-[#333333] overflow-hidden">
      <div ref={trackRef} className="flex gap-8 whitespace-nowrap will-change-transform">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-dmsans text-xs tracking-[0.3em] uppercase text-white/30">
              {item}
            </span>
            <span className="text-white/20">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
