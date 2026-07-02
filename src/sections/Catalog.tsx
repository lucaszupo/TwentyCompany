import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCart } from '@/context/CartContext';
import Toast from '@/components/Toast';
import { ShoppingBag } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: 'Organic Cotton Oversized Tee', price: 149, image: 'TwentyCompany/images/prod-1.jpg', category: 'men' as const, color: '#0a0a0a', colorName: 'Preto' },
  { id: 2, name: 'Heavyweight Logo Hoodie', price: 289, image: '/images/prod-2.jpg', category: 'men' as const, color: '#0a0a0a', colorName: 'Preto' },
  { id: 3, name: 'Relaxed Fit Sweatpants', price: 229, image: '/images/prod-3.jpg', category: 'men' as const, color: '#808080', colorName: 'Cinza' },
  { id: 4, name: 'Minimalist Backpack', price: 349, image: '/images/prod-4.jpg', category: 'accessories' as const, color: '#0a0a0a', colorName: 'Preto' },
  { id: 5, name: 'Structured Cap', price: 129, image: '/images/prod-5.jpg', category: 'accessories' as const, color: '#c8b89a', colorName: 'Areia' },
  { id: 6, name: 'Premium Socks Set', price: 89, image: '/images/prod-6.jpg', category: 'accessories' as const, color: '#ffffff', colorName: 'Branco' },
  { id: 7, name: 'Oversized Tee', price: 149, image: '/images/prod-7.jpg', category: 'men' as const, color: '#1a472a', colorName: 'Verde' },
  { id: 8, name: 'Logo Hoodie', price: 289, image: '/images/prod-8.jpg', category: 'women' as const, color: '#f5f5f0', colorName: 'Off-White' },
  { id: 9, name: 'Essential Tank', price: 119, image: '/images/prod-9.jpg', category: 'men' as const, color: '#0a0a0a', colorName: 'Preto' },
];

const CATEGORIES = ['all', 'men', 'women', 'accessories'] as const;

export default function Catalog() {
  const [activeCat, setActiveCat] = useState<string>('all');
  const { addItem } = useCart();
  const [toast, setToast] = useState({ visible: false, message: '' });
  const ref = useScrollReveal<HTMLElement>({ childSelector: '.product-card', stagger: 0.08, threshold: 0.1 });

  const filtered = activeCat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCat);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    addItem({
      name: product.name,
      color: product.color,
      colorName: product.colorName,
      logo: 'Logo Padrão',
      logoName: 'Logo 01',
      size: 'G',
      price: product.price,
      image: product.image,
    });
    setToast({ visible: true, message: `${product.name} adicionado!` });
  };

  return (
    <section ref={ref} id="catalog" className="section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-cinzel text-5xl md:text-6xl">20</span>
            <span className="text-xs text-white/40 font-dmsans">(01)</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-4 py-2 text-xs tracking-wider uppercase font-dmsans border transition-all ${
                  activeCat === cat
                    ? 'border-white text-white bg-white/5'
                    : 'border-[#333333] text-white/40 hover:border-white/40 hover:text-white/70'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat === 'accessories' ? 'Acessórios' : cat === 'men' ? 'Masculino' : 'Feminino'}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map(product => (
            <div key={product.id} className="product-card group relative">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a] mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleAdd(product)}
                    className="flex items-center gap-2 bg-white text-black px-4 py-2.5 text-xs font-medium tracking-wider hover:bg-white/90 transition-colors"
                  >
                    <ShoppingBag size={14} />
                    ADICIONAR
                  </button>
                </div>
                {/* Monogram stamp */}
                <span className="absolute top-4 right-4 font-cinzel text-6xl text-white/[0.06] pointer-events-none">
                  20
                </span>
              </div>
              {/* Info */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-dmsans text-sm font-medium mb-1 group-hover:tracking-wider transition-all duration-300">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/40">{product.colorName}</p>
                </div>
                <span className="font-dmsans text-sm text-white/60">R$ {product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Toast
        message={toast.message}
        visible={toast.visible}
        onHide={() => setToast(prev => ({ ...prev, visible: false }))}
      />
    </section>
  );
}
