import { useState, useMemo } from 'react';
import { useCart } from '@/context/CartContext';
import Toast from '@/components/Toast';
import {
  GARMENT_LIST, GARMENTS, COLORS,
  type GarmentId, type LogoPosition,
} from '@/lib/garments';
import {
  BIG_LOGOS, PATCH_LOGOS, LOGO_BY_ID, ANCHOR_SMALL, ANCHOR_BIG,
} from '@/lib/logos';

const SIZES_BY_GARMENT: Record<GarmentId, string[]> = {
  tshirt: ['P', 'M', 'G', 'GG', 'XGG'],
  hoodie: ['P', 'M', 'G', 'GG', 'XGG'],
  cap: ['Único'],
  sock: ['35-38', '39-42', '43-46'],
};

// Monta o SVG completo de uma peça com o logo aplicado na posição escolhida.
export function buildGarmentSVG(
  garmentId: GarmentId,
  color: string,
  logoId: string,
  positionId: string,
): string {
  const garment = GARMENTS[garmentId];
  const colorCfg = COLORS[color] ?? COLORS['#f5f4f0'];
  const logo = LOGO_BY_ID[logoId];
  const position = garment.positions.find((p) => p.id === positionId) ?? garment.positions[0];

  const isBig = position.big;
  const anchor = isBig ? ANCHOR_BIG : ANCHOR_SMALL;
  const logoSvg = logo ? (isBig ? logo.big(colorCfg.logo) : logo.small(colorCfg.logo)) : '';
  const logoGroup = `<g transform="${anchor}"><g transform="${position.transform}">${logoSvg}</g></g>`;

  return `<svg viewBox="0 0 440 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="garmentShadow" x="-25%" y="-15%" width="150%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#000000" flood-opacity="0.22"/>
      </filter>
    </defs>
    ${garment.svg(color, colorCfg.light)}
    ${logoGroup}
  </svg>`;
}

export default function Customizer() {
  const { addItem } = useCart();
  const [garmentId, setGarmentId] = useState<GarmentId>('tshirt');
  const [color, setColor] = useState('#f5f4f0');
  const [styleTab, setStyleTab] = useState<'big' | 'patch'>('big');
  const [logoId, setLogoId] = useState(BIG_LOGOS[0].id);
  const [positionId, setPositionId] = useState('chest-left');
  const [size, setSize] = useState('G');
  const [toast, setToast] = useState({ visible: false, message: '' });

  const garment = GARMENTS[garmentId];
  const colorCfg = COLORS[color];
  const logos = styleTab === 'big' ? BIG_LOGOS : PATCH_LOGOS;
  const sizes = SIZES_BY_GARMENT[garmentId];

  const previewSVG = useMemo(
    () => buildGarmentSVG(garmentId, color, logoId, positionId),
    [garmentId, color, logoId, positionId],
  );

  const handleGarment = (id: GarmentId) => {
    setGarmentId(id);
    const g = GARMENTS[id];
    if (!g.positions.some((p) => p.id === positionId)) setPositionId(g.positions[0].id);
    const newSizes = SIZES_BY_GARMENT[id];
    if (!newSizes.includes(size)) setSize(newSizes[Math.min(2, newSizes.length - 1)]);
  };

  const handleStyleTab = (tab: 'big' | 'patch') => {
    setStyleTab(tab);
    setLogoId((tab === 'big' ? BIG_LOGOS : PATCH_LOGOS)[0].id);
  };

  const handleAdd = () => {
    const logo = LOGO_BY_ID[logoId];
    const posLabel = garment.positions.find((p) => p.id === positionId)?.label ?? '';
    addItem({
      name: `${garment.name} 20CO Personalizada`,
      color,
      colorName: colorCfg.name,
      logo: logoId,
      logoName: `${logo?.name ?? 'Logo'} · ${posLabel}`,
      size,
      price: garment.price,
      image: `data:image/svg+xml;utf8,${encodeURIComponent(previewSVG)}`,
    });
    setToast({ visible: true, message: `${garment.name} adicionada ao carrinho!` });
  };

  const tabBtn = (active: boolean) =>
    `flex-1 py-3 text-xs tracking-wider uppercase border transition-all ${
      active ? 'border-white text-white bg-white/5' : 'border-[#333333] text-white/40 hover:border-white/30'
    }`;
  const chip = (active: boolean) =>
    `px-4 py-2 text-xs tracking-wider uppercase border transition-all ${
      active ? 'border-white text-white bg-white/5' : 'border-[#333333] text-white/40 hover:border-white/30'
    }`;

  return (
    <section id="customizer" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
          <h2 className="font-oldstandard text-heading-md">Monte<br />a sua.</h2>
          <p className="text-sm text-white/40 font-dmsans max-w-xs md:text-right leading-relaxed">
            Escolha a peça, a cor, o logo e onde ele fica.
            Cada peça é única — feita do jeito que você quer.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* PREVIEW */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative w-full max-w-[440px] mx-auto aspect-[440/500]"
              dangerouslySetInnerHTML={{ __html: previewSVG }}
            />
            <p className="text-center text-[11px] tracking-[0.2em] uppercase text-white/30 mt-4 font-dmsans">
              {garment.name} · {colorCfg.name} · {garment.positions.find((p) => p.id === positionId)?.label}
            </p>
          </div>

          {/* CONTROLS */}
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4 font-dmsans">1 · Escolha a peça</p>
            <div className="grid grid-cols-4 gap-2 mb-8">
              {GARMENT_LIST.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleGarment(g.id)}
                  className={`flex flex-col items-center gap-1 py-3 border transition-all ${
                    garmentId === g.id ? 'border-white bg-white/5' : 'border-[#333333] hover:border-white/30'
                  }`}
                >
                  <span
                    className="w-9 h-9 opacity-80"
                    dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 440 500" width="36" height="36">${g.svg('#f5f4f0', true)}</svg>` }}
                  />
                  <span className={`text-[10px] tracking-wider ${garmentId === g.id ? 'text-white' : 'text-white/40'}`}>{g.name}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4 font-dmsans">2 · Escolha o logo</p>
            <div className="flex gap-2 mb-4">
              <button onClick={() => handleStyleTab('big')} className={tabBtn(styleTab === 'big')}>Logo Grande</button>
              <button onClick={() => handleStyleTab('patch')} className={tabBtn(styleTab === 'patch')}>Patch Discreto</button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {logos.map((def, i) => (
                <button
                  key={def.id}
                  onClick={() => setLogoId(def.id)}
                  className={`relative bg-[#111] border p-3 flex items-center justify-center aspect-[2/1] transition-all ${
                    logoId === def.id ? 'border-white bg-[#161616]' : 'border-[#333333]/50 hover:border-[#333333]'
                  }`}
                >
                  <span className="absolute top-2 left-2.5 text-[10px] tracking-wider text-white/20">
                    {styleTab === 'big' ? String(i + 1).padStart(2, '0') : `P${i + 1}`}
                  </span>
                  <svg viewBox="-60 -22 120 44" className="w-full max-h-12" preserveAspectRatio="xMidYMid meet">
                    <g dangerouslySetInnerHTML={{ __html: def.small('#f5f4f0') }} />
                  </svg>
                </button>
              ))}
            </div>

            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4 font-dmsans">3 · Onde fica o logo</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {garment.positions.map((p: LogoPosition) => (
                <button key={p.id} onClick={() => setPositionId(p.id)} className={chip(positionId === p.id)}>{p.label}</button>
              ))}
            </div>

            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4 font-dmsans">4 · Cor da peça</p>
            <div className="flex gap-4 mb-8">
              {Object.entries(COLORS).map(([hex, cfg]) => (
                <button key={hex} onClick={() => setColor(hex)} className="flex flex-col items-center gap-1.5 group">
                  <div
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      color === hex ? 'border-white scale-110' : 'border-transparent group-hover:scale-105'
                    }`}
                    style={{ backgroundColor: hex, boxShadow: cfg.light ? 'inset 0 0 0 1px rgba(0,0,0,0.1)' : 'none' }}
                  />
                  <span className="text-[10px] text-white/35 tracking-wider">{cfg.name}</span>
                </button>
              ))}
            </div>

            <p className="text-[11px] tracking-[0.35em] uppercase text-white/50 mb-4 font-dmsans">5 · Tamanho</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-11 h-11 px-3 border text-sm font-dmsans transition-all ${
                    size === s ? 'border-white text-white bg-white/5' : 'border-[#333333] text-white/40 hover:border-white/30'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span className="font-cinzel text-4xl tracking-wider">R$ {garment.price}</span>
                <span className="text-xs text-white/40 tracking-wider">frete grátis</span>
              </div>
              <button onClick={handleAdd} className="w-full bg-white text-black py-4 font-dmsans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors">
                ADICIONAR AO CARRINHO
              </button>
              <p className="text-[11px] text-white/30 tracking-wider text-center">Edição limitada · Produção sob demanda</p>
            </div>
          </div>
        </div>
      </div>

      <Toast message={toast.message} visible={toast.visible} onHide={() => setToast((prev) => ({ ...prev, visible: false }))} />
    </section>
  );
}
