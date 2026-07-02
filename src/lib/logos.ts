// ============================================================================
// LOGOS — desenhados na ORIGEM (0,0), sem posição fixa.
// Cada logo tem uma versão `small` (peito/lateral/frente-boné) e `big`
// (costas / centro amplo). A POSIÇÃO na peça vem do LogoPosition.transform,
// definido em garments.ts. Assim o mesmo logo pode ir em qualquer lugar.
// ============================================================================

export interface LogoDef {
  id: string;
  name: string;
  style: 'big' | 'patch';
  small: (lc: string) => string; // desenho pequeno, centrado na origem
  big: (lc: string) => string;   // desenho grande, centrado na origem
}

// Âncoras de posição na peça (origem dos grupos de logo)
// small → peito esquerdo por padrão (x≈165,y≈195); big → costas (x≈210,y≈230)
export const ANCHOR_SMALL = 'translate(165,195)';
export const ANCHOR_BIG = 'translate(210,230)';

export const LOGOS: LogoDef[] = [
  {
    id: 'script', name: 'Twenty Company', style: 'big',
    small: (lc) => `<text x="0" y="0" font-family="'Sacramento',cursive" font-size="22" fill="${lc}" text-anchor="middle" textLength="76" lengthAdjust="spacingAndGlyphs">twenty company</text>`,
    big: (lc) => `<ellipse cx="0" cy="0" rx="118" ry="40" stroke="${lc}" stroke-width="1.6" fill="none"/><text x="0" y="9" font-family="'Sacramento',cursive" font-size="50" fill="${lc}" text-anchor="middle" textLength="200" lengthAdjust="spacingAndGlyphs">twenty company</text>`,
  },
  {
    id: 'twenty-serif', name: 'Twenty / Company', style: 'big',
    small: (lc) => `<text x="0" y="-2" font-family="'DM Sans',sans-serif" font-weight="500" font-size="20" fill="${lc}" text-anchor="middle">twenty</text><text x="0" y="9" font-family="'DM Sans',sans-serif" font-size="6" fill="${lc}" text-anchor="middle" letter-spacing="4">COMPANY</text>`,
    big: (lc) => `<text x="0" y="-5" font-family="'DM Sans',sans-serif" font-weight="500" font-size="62" fill="${lc}" text-anchor="middle" letter-spacing="-1">twenty</text><text x="0" y="21" font-family="'DM Sans',sans-serif" font-size="14" fill="${lc}" text-anchor="middle" letter-spacing="11">COMPANY</text>`,
  },
  {
    id: '20-side', name: '20 Twenty Company', style: 'big',
    small: (lc) => `<text x="-15" y="4" font-family="'Sacramento',cursive" font-size="26" fill="${lc}">20</text><text x="10" y="-4" font-family="'DM Sans',sans-serif" font-size="6" fill="${lc}" letter-spacing="2">TWENTY</text><text x="10" y="4" font-family="'DM Sans',sans-serif" font-size="6" fill="${lc}" letter-spacing="2">COMPANY</text>`,
    big: (lc) => `<text x="-60" y="10" font-family="'Sacramento',cursive" font-size="78" fill="${lc}">20</text><text x="8" y="-2" font-family="'DM Sans',sans-serif" font-size="16" fill="${lc}" letter-spacing="4">TWENTY</text><text x="8" y="20" font-family="'DM Sans',sans-serif" font-size="16" fill="${lc}" letter-spacing="4">COMPANY</text>`,
  },
  {
    id: 'twenty-co', name: 'Twenty Co.', style: 'big',
    small: (lc) => `<text x="0" y="-1" font-family="'Sacramento',cursive" font-size="26" fill="${lc}" text-anchor="middle">twenty</text><text x="0" y="9" font-family="'DM Sans',sans-serif" font-size="6" fill="${lc}" text-anchor="middle" letter-spacing="3">CO.</text>`,
    big: (lc) => `<text x="0" y="0" font-family="'Sacramento',cursive" font-size="76" fill="${lc}" text-anchor="middle">Twenty</text><text x="0" y="26" font-family="'DM Sans',sans-serif" font-size="15" fill="${lc}" text-anchor="middle" letter-spacing="9">CO.</text>`,
  },
  {
    id: 'seal', name: 'Selo Circular', style: 'big',
    small: (lc) => `<circle cx="0" cy="0" r="22" stroke="${lc}" stroke-width="0.8" fill="none"/><path id="sfa" d="M -22 0 A 22 22 0 0 1 22 0" fill="none"/><path id="sfb" d="M -22 0 A 22 22 0 0 0 22 0" fill="none"/><text font-family="'DM Sans',sans-serif" font-size="5" fill="${lc}" letter-spacing="2.2"><textPath href="#sfa" startOffset="50%" text-anchor="middle">TWENTY</textPath></text><text font-family="'DM Sans',sans-serif" font-size="5" fill="${lc}" letter-spacing="2"><textPath href="#sfb" startOffset="50%" text-anchor="middle">COMPANY</textPath></text><text x="0" y="7" font-family="'Sacramento',cursive" font-size="20" fill="${lc}" text-anchor="middle">20</text>`,
    big: (lc) => `<circle cx="0" cy="0" r="92" stroke="${lc}" stroke-width="1" fill="none"/><path id="sba" d="M -92 0 A 92 92 0 0 1 92 0" fill="none"/><path id="sbb" d="M -92 0 A 92 92 0 0 0 92 0" fill="none"/><text font-family="'DM Sans',sans-serif" font-size="19" fill="${lc}" letter-spacing="8"><textPath href="#sba" startOffset="50%" text-anchor="middle">TWENTY</textPath></text><text font-family="'DM Sans',sans-serif" font-size="19" fill="${lc}" letter-spacing="7"><textPath href="#sbb" startOffset="50%" text-anchor="middle">COMPANY</textPath></text><text x="0" y="28" font-family="'Sacramento',cursive" font-size="80" fill="${lc}" text-anchor="middle">20</text><circle cx="-95" cy="0" r="2" fill="${lc}"/><circle cx="95" cy="0" r="2" fill="${lc}"/>`,
  },
  {
    id: 'balloon', name: 'Balão 20', style: 'big',
    small: (lc) => `<g transform="translate(-19,-5) scale(0.42)"><path d="M2,-34 C 6,-44 24,-46 30,-36 C 36,-26 24,-14 10,-2 C 2,4 -4,10 -2,16 L 34,16" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="62" cy="-18" rx="24" ry="28" fill="none" stroke="${lc}" stroke-width="3"/><path d="M55 8 L62 10 L69 8" fill="none" stroke="${lc}" stroke-width="2.4" stroke-linecap="round"/></g><text x="5" y="13" font-family="'DM Serif Display','DM Sans',serif" font-size="6.5" fill="${lc}" text-anchor="middle" letter-spacing="2.5">TWENTY</text><text x="5" y="21" font-family="'DM Serif Display','DM Sans',serif" font-size="6.5" fill="${lc}" text-anchor="middle" letter-spacing="2.5">COMPANY</text>`,
    big: (lc) => `<g transform="translate(-50,-30) scale(1.15)"><path d="M2,-34 C 6,-44 24,-46 30,-36 C 36,-26 24,-14 10,-2 C 2,4 -4,10 -2,16 L 34,16" fill="none" stroke="${lc}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="62" cy="-18" rx="24" ry="28" fill="none" stroke="${lc}" stroke-width="3"/><path d="M55 8 L62 10 L69 8" fill="none" stroke="${lc}" stroke-width="2.4" stroke-linecap="round"/><path d="M62 10 C 60 18 68 24 62 32 C 58 38 64 44 62 50" fill="none" stroke="${lc}" stroke-width="1.4" stroke-linecap="round"/></g><text x="0" y="90" font-family="'DM Serif Display','DM Sans',serif" font-size="24" fill="${lc}" text-anchor="middle" letter-spacing="9">TWENTY</text><text x="0" y="118" font-family="'DM Serif Display','DM Sans',serif" font-size="24" fill="${lc}" text-anchor="middle" letter-spacing="9">COMPANY</text>`,
  },
  {
    id: '20-company', name: '20 Company', style: 'big',
    small: (lc) => `<text x="0" y="1" font-family="'Sacramento',cursive" font-size="34" fill="${lc}" text-anchor="middle">20</text><text x="0" y="12" font-family="'DM Sans',sans-serif" font-size="5.5" fill="${lc}" text-anchor="middle" letter-spacing="3">COMPANY</text>`,
    big: (lc) => `<text x="0" y="-10" font-family="'Sacramento',cursive" font-size="96" fill="${lc}" text-anchor="middle">20</text><text x="0" y="18" font-family="'DM Sans',sans-serif" font-size="14" fill="${lc}" text-anchor="middle" letter-spacing="9">COMPANY</text>`,
  },
  {
    id: 'twenty-min', name: 'Twenty Minimal', style: 'big',
    small: (lc) => `<text x="0" y="3" font-family="'Sacramento',cursive" font-size="30" fill="${lc}" text-anchor="middle">twenty</text>`,
    big: (lc) => `<text x="0" y="10" font-family="'Sacramento',cursive" font-size="110" fill="${lc}" text-anchor="middle">twenty</text>`,
  },
  {
    id: '20-serif', name: '20 Serif', style: 'big',
    small: (lc) => `<text x="0" y="3" font-family="'DM Serif Display','DM Sans',serif" font-size="30" fill="${lc}" text-anchor="middle">20</text><text x="0" y="12" font-family="'DM Sans',sans-serif" font-size="5" fill="${lc}" text-anchor="middle" letter-spacing="3">CO.</text>`,
    big: (lc) => `<text x="0" y="5" font-family="'DM Serif Display','DM Sans',serif" font-size="120" fill="${lc}" text-anchor="middle">20</text><text x="0" y="31" font-family="'DM Sans',sans-serif" font-size="14" fill="${lc}" text-anchor="middle" letter-spacing="11">COMPANY</text>`,
  },
  {
    id: 'signature', name: 'Assinatura', style: 'big',
    small: (lc) => `<text x="0" y="0" font-family="'Sacramento',cursive" font-size="24" fill="${lc}" text-anchor="middle" textLength="80" lengthAdjust="spacingAndGlyphs">twenty company</text><line x1="-32" y1="7" x2="20" y2="7" stroke="${lc}" stroke-width="1" opacity="0.8"/>`,
    big: (lc) => `<text x="0" y="0" font-family="'Sacramento',cursive" font-size="54" fill="${lc}" text-anchor="middle" textLength="220" lengthAdjust="spacingAndGlyphs">twenty company</text><line x1="-80" y1="16" x2="60" y2="16" stroke="${lc}" stroke-width="1.6" opacity="0.8"/>`,
  },
  // ---- PATCHES (só versão pequena; usados como estampa discreta) ----
  {
    id: 'patch-oval', name: 'Patch Oval 20', style: 'patch',
    small: (lc) => `<ellipse cx="0" cy="0" rx="28" ry="20" stroke="${lc}" stroke-width="1.4" fill="none"/><ellipse cx="0" cy="0" rx="22" ry="14" stroke="${lc}" stroke-width="0.7" fill="none" opacity="0.55"/><text x="0" y="6" font-family="'Sacramento',cursive" font-size="20" fill="${lc}" text-anchor="middle">20</text>`,
    big: (lc) => `<ellipse cx="0" cy="0" rx="70" ry="50" stroke="${lc}" stroke-width="2.4" fill="none"/><ellipse cx="0" cy="0" rx="55" ry="35" stroke="${lc}" stroke-width="1.2" fill="none" opacity="0.55"/><text x="0" y="16" font-family="'Sacramento',cursive" font-size="50" fill="${lc}" text-anchor="middle">20</text>`,
  },
  {
    id: 'patch-tc', name: 'Patch TC', style: 'patch',
    small: (lc) => `<circle cx="0" cy="0" r="22" stroke="${lc}" stroke-width="1.4" fill="none"/><text x="0" y="7" font-family="'DM Serif Display','DM Sans',serif" font-size="17" fill="${lc}" text-anchor="middle">TC</text>`,
    big: (lc) => `<circle cx="0" cy="0" r="55" stroke="${lc}" stroke-width="2.4" fill="none"/><text x="0" y="18" font-family="'DM Serif Display','DM Sans',serif" font-size="44" fill="${lc}" text-anchor="middle">TC</text>`,
  },
  {
    id: 'patch-20co', name: 'Patch 20CO', style: 'patch',
    small: (lc) => `<rect x="-32" y="-14" width="64" height="28" rx="3" stroke="${lc}" stroke-width="1.2" fill="none"/><text x="0" y="6" font-family="'DM Serif Display','DM Sans',serif" font-size="13" fill="${lc}" text-anchor="middle" letter-spacing="1">20CO</text>`,
    big: (lc) => `<rect x="-80" y="-35" width="160" height="70" rx="6" stroke="${lc}" stroke-width="2.4" fill="none"/><text x="0" y="16" font-family="'DM Serif Display','DM Sans',serif" font-size="34" fill="${lc}" text-anchor="middle" letter-spacing="3">20CO</text>`,
  },
  {
    id: 'patch-shield', name: 'Patch Escudo', style: 'patch',
    small: (lc) => `<path d="M0,-22 L17,-16 L17,4 C17,16 9,23 0,27 C-9,23 -17,16 -17,4 L-17,-16 Z" stroke="${lc}" stroke-width="1.2" fill="none"/><text x="0" y="6" font-family="'DM Serif Display','DM Sans',serif" font-size="13" fill="${lc}" text-anchor="middle">20</text>`,
    big: (lc) => `<path d="M0,-58 L45,-42 L45,10 C45,42 24,60 0,70 C-24,60 -45,42 -45,10 L-45,-42 Z" stroke="${lc}" stroke-width="2.4" fill="none"/><text x="0" y="12" font-family="'DM Serif Display','DM Sans',serif" font-size="36" fill="${lc}" text-anchor="middle">20</text>`,
  },
  {
    id: 'patch-diamond', name: 'Patch Losango', style: 'patch',
    small: (lc) => `<rect x="-18" y="-18" width="36" height="36" rx="4" stroke="${lc}" stroke-width="1.2" fill="none" transform="rotate(45)"/><text x="0" y="5" font-family="'DM Serif Display','DM Sans',serif" font-size="14" fill="${lc}" text-anchor="middle">20</text>`,
    big: (lc) => `<rect x="-45" y="-45" width="90" height="90" rx="8" stroke="${lc}" stroke-width="2.4" fill="none" transform="rotate(45)"/><text x="0" y="13" font-family="'DM Serif Display','DM Sans',serif" font-size="38" fill="${lc}" text-anchor="middle">20</text>`,
  },
  {
    id: 'patch-co-script', name: 'Patch Twenty Co.', style: 'patch',
    small: (lc) => `<ellipse cx="0" cy="0" rx="36" ry="17" stroke="${lc}" stroke-width="1.2" fill="none"/><text x="0" y="6" font-family="'Sacramento',cursive" font-size="24" fill="${lc}" text-anchor="middle">twenty co.</text>`,
    big: (lc) => `<ellipse cx="0" cy="0" rx="90" ry="42" stroke="${lc}" stroke-width="2.4" fill="none"/><text x="0" y="16" font-family="'Sacramento',cursive" font-size="60" fill="${lc}" text-anchor="middle">twenty co.</text>`,
  },
];

export const BIG_LOGOS = LOGOS.filter((l) => l.style === 'big');
export const PATCH_LOGOS = LOGOS.filter((l) => l.style === 'patch');
export const LOGO_BY_ID: Record<string, LogoDef> = Object.fromEntries(LOGOS.map((l) => [l.id, l]));
