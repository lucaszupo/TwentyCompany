import { useEffect } from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
  duration?: number;
}

export default function Toast({ message, visible, onHide, duration = 2800 }: ToastProps) {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onHide, duration);
    return () => clearTimeout(timer);
  }, [visible, duration, onHide]);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="flex items-center gap-3 bg-white text-black px-6 py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black">
          <Check className="w-3 h-3 text-white" strokeWidth={3} />
        </span>
        <span className="text-sm font-dmsans tracking-wide">{message}</span>
      </div>
    </div>
  );
}
