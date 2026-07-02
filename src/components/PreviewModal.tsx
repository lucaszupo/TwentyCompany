import { useEffect, useRef } from 'react';
import { X, Download } from 'lucide-react';
import gsap from 'gsap';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  svgContent: string;
  title: string;
  subtitle: string;
}

export default function PreviewModal({ isOpen, onClose, svgContent, title, subtitle }: PreviewModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.from(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.4, ease: 'power2.out', delay: 0.1 });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, { scale: 0.9, opacity: 0, duration: 0.2, ease: 'power2.in' });
    gsap.to(overlayRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      ease: 'power2.in',
      onComplete: onClose 
    });
  };

  const handleDownload = () => {
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `20co-${title.toLowerCase().replace(/\s+/g, '-')}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4 md:p-8"
      style={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)' }}
      onClick={handleClose}
    >
      <div 
        ref={contentRef}
        className="relative w-full max-w-2xl bg-[#0a0a0a] border border-[#333333]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#333333]">
          <div>
            <h3 className="font-dmsans text-sm font-medium text-white tracking-wider">{title}</h3>
            <p className="font-dmsans text-xs text-white/40 mt-1">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-3 py-2 border border-[#333333] text-white/60 hover:text-white hover:border-white/30 transition-all"
            >
              <Download size={14} />
              <span className="text-xs tracking-wider hidden sm:inline">SVG</span>
            </button>
            <button 
              onClick={handleClose}
              className="p-2 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="p-8 md:p-12 flex items-center justify-center bg-[#111]">
          <div 
            className="w-full max-w-[400px]"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-[#333333]">
          <p className="text-center text-[11px] tracking-[0.2em] uppercase text-white/30 font-dmsans">
            Preview da sua peça personalizada · 20COMPANY
          </p>
        </div>
      </div>
    </div>
  );
}
