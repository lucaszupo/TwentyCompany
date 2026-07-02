import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CartDrawer() {
  const { cart, isOpen, closeCart, removeItem, updateQty, totalPrice } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[1002] bg-black/60 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[420px] z-[1003] bg-[#0a0a0a] border-l border-[#333333] transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#333333]">
          <h3 className="font-dmsans text-lg font-medium">Carrinho</h3>
          <button onClick={closeCart} className="text-white/60 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: 'calc(100vh - 140px)' }}>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-white/20 mb-4" />
              <p className="text-white/50 text-sm">Seu carrinho esta vazio</p>
              <button
                onClick={closeCart}
                className="mt-4 text-sm underline underline-offset-4 text-white/70 hover:text-white transition-colors"
              >
                Continue comprando
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 pb-5 border-b border-[#333333]/50">
                  <div className="w-16 h-16 bg-[#111] border border-[#333333] flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-dmsans text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-white/50 mt-0.5">
                      {item.colorName} · {item.logoName} · Tamanho {item.size}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-6 h-6 border border-[#333333] flex items-center justify-center text-white/60 hover:border-white/40 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-6 h-6 border border-[#333333] flex items-center justify-center text-white/60 hover:border-white/40 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="font-dmsans text-sm">R$ {item.price * item.qty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-white/30 hover:text-white/70 transition-colors self-start"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-[#0a0a0a] border-t border-[#333333]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-white/60">Subtotal</span>
              <span className="font-dmsans text-lg font-medium">R$ {totalPrice}</span>
            </div>
            <button
              onClick={() => { closeCart(); setCheckoutOpen(true); }}
              className="w-full bg-white text-black py-3.5 font-dmsans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors"
            >
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
