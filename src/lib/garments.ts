// ============================================================================
// PEÇAS DE ROUPA + POSIÇÕES DE LOGO
// O diferencial da 20COMPANY: o cliente escolhe A PEÇA, a COR, o LOGO e ONDE
// o logo fica. Cada peça tem um SVG realista (viewBox 440x500) e um conjunto
// de posições válidas onde o logo pode ser aplicado (com transform próprio).
// ============================================================================

export type GarmentId = 'tshirt' | 'hoodie' | 'cap' | 'sock';

export interface LogoPosition {
  id: string;
  label: string;
  // transform aplicado ao grupo do logo (posiciona + escala) sobre a peça
  transform: string;
  // se true, é uma estampa grande (costas / frente ampla); se false, é pequena (peito/lateral)
  big: boolean;
}

export interface Garment {
  id: GarmentId;
  name: string;
  price: number;
  // gera o SVG da peça na cor escolhida. collarStroke = cor de detalhe (gola etc.)
  svg: (fill: string, isLight: boolean) => string;
  positions: LogoPosition[];
}

// Detalhe (gola, costuras) — claro sobre peça escura, escuro sobre peça clara
const detail = (isLight: boolean) =>
  isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)';
// const shade = 'rgba(0,0,0,0.06)';

// ---------------------------------------------------------------------------
// CAMISETA
// ---------------------------------------------------------------------------
const tshirt: Garment = {
  id: 'tshirt',
  name: 'Camiseta',
  price: 149,
  svg: (fill, isLight) => `
    <g filter="url(#garmentShadow)">
      <path d="M170 64 C178 92 198 104 220 104 C242 104 262 92 270 64 C288 66 306 71 322 80 C344 92 362 110 376 132 C385 147 392 163 397 180 C399 187 396 194 390 197 L354 216 C348 219 341 217 338 211 L328 192 C327 240 327 310 328 372 C328 402 329 428 330 444 C331 453 324 460 315 460 L125 460 C116 460 109 453 110 444 C111 428 112 402 112 372 C113 310 113 240 112 192 L102 211 C99 217 92 219 86 216 L50 197 C44 194 41 187 43 180 C48 163 55 147 64 132 C78 110 96 92 118 80 C134 71 152 66 170 64 Z" fill="${fill}"/>
      <path d="M118 80 C130 96 138 118 140 152 C140 170 139 188 137 202" fill="none" stroke="#000" stroke-opacity="0.05" stroke-width="3"/>
      <path d="M322 80 C310 96 302 118 300 152 C300 170 301 188 303 202" fill="none" stroke="#000" stroke-opacity="0.05" stroke-width="3"/>
      <path d="M170 64 C179 94 200 106 220 106 C240 106 261 94 270 64" fill="none" stroke="${detail(isLight)}" stroke-width="5" stroke-linecap="round"/>
    </g>`,
  positions: [
    { id: 'chest-left', label: 'Peito esquerdo', transform: 'translate(0,0)', big: false },
    { id: 'chest-center', label: 'Centro do peito', transform: 'translate(45,20) scale(1.1)', big: false },
    { id: 'back', label: 'Costas', transform: 'translate(0,0)', big: true },
  ],
};

// ---------------------------------------------------------------------------
// MOLETOM (hoodie)
// ---------------------------------------------------------------------------
const hoodie: Garment = {
  id: 'hoodie',
  name: 'Moletom',
  price: 289,
  svg: (fill, isLight) => `
    <g filter="url(#garmentShadow)">
      <path d="M150 90 C150 120 180 138 220 138 C260 138 290 120 290 90 C310 92 330 98 348 110 C372 126 392 150 406 180 C414 197 420 214 424 232 C426 240 422 248 414 250 L378 264 C372 266 366 263 364 257 L352 232 C351 290 351 380 352 420 C352 445 353 460 354 470 C355 480 347 488 337 488 L103 488 C93 488 85 480 86 470 C87 460 88 445 88 420 C89 380 89 290 88 232 L76 257 C74 263 68 266 62 264 L26 250 C18 248 14 240 16 232 C20 214 26 197 34 180 C48 150 68 126 92 110 C110 98 130 92 150 90 Z" fill="${fill}"/>
      <path d="M150 90 C165 70 190 60 220 60 C250 60 275 70 290 90 C280 108 252 120 220 120 C188 120 160 108 150 90 Z" fill="#000" fill-opacity="0.22"/>
      <path d="M175 96 Q220 128 265 96" fill="none" stroke="${detail(isLight)}" stroke-width="2"/>
      <path d="M170 320 L270 320 Q280 320 280 332 L280 388 Q280 400 268 400 L172 400 Q160 400 160 388 L160 332 Q160 320 170 320 Z" fill="#000" fill-opacity="0.10"/>
      <line x1="206" y1="118" x2="206" y2="150" stroke="${detail(isLight)}" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="234" y1="118" x2="234" y2="150" stroke="${detail(isLight)}" stroke-width="2.5" stroke-linecap="round"/>
    </g>`,
  positions: [
    { id: 'chest-left', label: 'Peito esquerdo', transform: 'translate(0,28)', big: false },
    { id: 'chest-center', label: 'Centro do peito', transform: 'translate(45,42) scale(1.05)', big: false },
    { id: 'back', label: 'Costas', transform: 'translate(0,20)', big: true },
  ],
};

// ---------------------------------------------------------------------------
// BONÉ (cap)
// ---------------------------------------------------------------------------
const cap: Garment = {
  id: 'cap',
  name: 'Boné',
  price: 129,
  svg: (fill, isLight) => `
    <g filter="url(#garmentShadow)">
      <path d="M90 250 C90 160 140 110 220 110 C300 110 350 160 350 250 C350 258 344 264 336 264 L104 264 C96 264 90 258 90 250 Z" fill="${fill}"/>
      <path d="M336 264 C400 262 430 285 438 315 C440 322 435 328 428 328 L340 328 C332 328 328 322 328 315 L330 268 Z" fill="${fill}"/>
      <path d="M336 264 C400 262 430 285 438 315 C440 322 435 328 428 328 L340 328 C332 328 328 322 328 315 L330 268 Z" fill="#000" fill-opacity="0.18"/>
      <path d="M220 110 L219 264" stroke="${detail(isLight)}" stroke-width="1.5" fill="none"/>
      <path d="M158 128 C152 180 152 230 160 264 M282 128 C288 180 288 230 280 264" stroke="${detail(isLight)}" stroke-width="1.3" fill="none"/>
      <circle cx="220" cy="120" r="6" fill="${detail(isLight)}"/>
    </g>`,
  positions: [
    { id: 'front', label: 'Frente', transform: 'translate(55,-8) scale(0.85)', big: false },
  ],
};

// ---------------------------------------------------------------------------
// MEIA (sock)
// ---------------------------------------------------------------------------
const sock: Garment = {
  id: 'sock',
  name: 'Meia',
  price: 59,
  svg: (fill, isLight) => `
    <g filter="url(#garmentShadow)">
      <path d="M185 90 L255 90 Q262 90 262 98 L262 300 Q262 320 275 335 L320 385 Q335 400 335 420 L335 445 Q335 458 322 458 L245 458 Q232 458 230 445 L225 400 Q222 375 208 360 L182 335 Q170 322 170 302 L170 98 Q170 90 185 90 Z" fill="${fill}"/>
      <rect x="170" y="90" width="92" height="16" fill="${detail(isLight)}" opacity="0.6"/>
      <line x1="170" y1="100" x2="262" y2="100" stroke="${detail(isLight)}" stroke-width="1.5"/>
      <path d="M182 335 Q200 350 225 358" stroke="#000" stroke-opacity="0.12" stroke-width="2" fill="none"/>
    </g>`,
  positions: [
    { id: 'side', label: 'Lateral', transform: 'translate(51,10) scale(0.7)', big: false },
  ],
};

export const GARMENTS: Record<GarmentId, Garment> = { tshirt, hoodie, cap, sock };
export const GARMENT_LIST: Garment[] = [tshirt, hoodie, cap, sock];

// Cores disponíveis (compartilhadas por todas as peças)
export const COLORS: Record<string, { logo: string; name: string; light: boolean }> = {
  '#f5f4f0': { logo: '#0a0a0a', name: 'Creme', light: true },
  '#0a0a0a': { logo: '#f5f4f0', name: 'Preto', light: false },
  '#2b2b2b': { logo: '#f5f4f0', name: 'Grafite', light: false },
  '#c8b89a': { logo: '#0a0a0a', name: 'Areia', light: true },
  '#6b7c73': { logo: '#f5f4f0', name: 'Musgo', light: false },
};
