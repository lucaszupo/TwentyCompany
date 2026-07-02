import { useState } from 'react';
import { X, Check, Copy, Truck, RefreshCw, Clock, CreditCard, QrCode, FileText } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import type { PaymentMethod } from '@/types';

interface Props {
  open: boolean;
  onClose: () => void;
}

const ESTADOS = ['SP', 'RJ', 'MG', 'RS', 'PR', 'SC', 'BA', 'CE', 'PE', 'GO', 'DF', 'Outro'];

const PARCELAS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function CheckoutModal({ open, onClose }: Props) {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [payMethod, setPayMethod] = useState<PaymentMethod>('cartão');
  const [parcela, setParcela] = useState(1);
  const [copied, setCopied] = useState(false);
  const [orderNum, setOrderNum] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    nome: '', email: '', cpf: '', cep: '',
    rua: '', número: '', complemento: '', bairro: '', cidade: '', estado: ''
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => { const e = { ...prev }; delete e[field]; return e; });
  };

  const formatCPF = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 11);
    return digits.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const formatCEP = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 8);
    return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
  };

  const formatCard = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.nome.trim()) e.nome = 'Campo obrigatório';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Email inválido';
    if (formData.cpf.replace(/\D/g, '').length !== 11) e.cpf = 'CPF inválido';
    if (formData.cep.replace(/\D/g, '').length !== 8) e.cep = 'CEP inválido';
    if (!formData.rua.trim()) e.rua = 'Campo obrigatório';
    if (!formData.número.trim()) e.número = 'Campo obrigatório';
    if (!formData.cidade.trim()) e.cidade = 'Campo obrigatório';
    if (!formData.estado) e.estado = 'Selecione um estado';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleContinue = () => {
    if (validateStep1()) setStep(2);
  };

  const handleFinish = () => {
    const num = `20CO-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNum(num);
    setStep(3);
  };

  const handleClose = () => {
    if (step === 3) clearCart();
    onClose();
    setTimeout(() => { setStep(1); setErrors({}); }, 300);
  };

  const copyBoleto = () => {
    navigator.clipboard.writeText('23793.38128 60007.827136 95000.063305 1 87340000014900');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const discount = payMethod === 'pix' ? Math.round(totalPrice * 0.05) : 0;
  const finalTotal = totalPrice - discount;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[1004] bg-black/85 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-[900px] mx-auto bg-[#0a0a0a] border border-[#333333]">
          {/* Top */}
          <div className="flex justify-between items-center px-6 md:px-10 h-16 border-b border-[#333333]">
            <span className="font-cinzel text-xl tracking-[0.1em]">20COMPANY</span>
            <button onClick={handleClose} className="text-white/50 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-0 px-6 md:px-10 pt-6">
            {[
              { num: 1, label: 'Entrega' },
              { num: 2, label: 'Pagamento' },
              { num: 3, label: 'Confirmação' },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center">
                <div className={`flex items-center gap-2 text-xs tracking-[0.15em] uppercase ${
                  step >= s.num ? (step > s.num ? 'text-white/50' : 'text-white') : 'text-white/30'
                }`}>
                  <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${
                    step >= s.num ? (step > s.num ? 'border-white/50 text-white/50' : 'border-white text-white') : 'border-white/30 text-white/30'
                  }`}>
                    {step > s.num ? <Check size={10} /> : s.num}
                  </span>
                  {s.label}
                </div>
                {i < 2 && <div className="w-6 h-px bg-[#333333] mx-3" />}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_340px] mt-6">
            {/* Form */}
            <div className="px-6 md:px-10 pb-10 border-r border-[#333333]/50">
              {step === 1 && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-cinzel text-lg tracking-wider mb-6">Dados Pessoais</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field label="Nome" value={formData.nome} onChange={v => updateField('nome', v)} error={errors.nome} placeholder="João" />
                    <Field label="Sobrenome" onChange={() => {}} placeholder="Silva" />
                  </div>
                  <div className="mb-4">
                    <Field label="Email" value={formData.email} onChange={v => updateField('email', v)} error={errors.email} placeholder="joao@email.com" type="email" />
                  </div>
                  <div className="mb-4">
                    <Field label="CPF" value={formData.cpf} onChange={v => updateField('cpf', formatCPF(v))} error={errors.cpf} placeholder="000.000.000-00" />
                  </div>

                  <h4 className="font-cinzel text-lg tracking-wider mb-6 mt-8">Endereço de Entrega</h4>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field label="CEP" value={formData.cep} onChange={v => updateField('cep', formatCEP(v))} error={errors.cep} placeholder="00000-000" />
                    <div>
                      <label className="text-[11px] tracking-[0.2em] uppercase text-white/40 block mb-1.5">Estado</label>
                      <select
                        value={formData.estado}
                        onChange={e => updateField('estado', e.target.value)}
                        className={`w-full bg-transparent border-b ${errors.estado ? 'border-red-500' : 'border-white/20'} py-2.5 text-sm outline-none focus:border-white transition-colors`}
                      >
                        <option value="">—</option>
                        {ESTADOS.map(e => <option key={e} value={e} className="bg-[#1a1a1a]">{e}</option>)}
                      </select>
                      {errors.estado && <span className="text-red-500 text-xs mt-1">{errors.estado}</span>}
                    </div>
                  </div>
                  <div className="mb-4">
                    <Field label="Rua" value={formData.rua} onChange={v => updateField('rua', v)} error={errors.rua} placeholder="Rua das Flores" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Field label="Número" value={formData.número} onChange={v => updateField('número', v)} error={errors.número} placeholder="123" />
                    <Field label="Complemento" value={formData.complemento} onChange={v => updateField('complemento', v)} placeholder="Apto 4B" />
                  </div>
                  <div className="mb-4">
                    <Field label="Bairro" value={formData.bairro} onChange={v => updateField('bairro', v)} placeholder="Centro" />
                  </div>
                  <div className="mb-6">
                    <Field label="Cidade" value={formData.cidade} onChange={v => updateField('cidade', v)} error={errors.cidade} placeholder="São Paulo" />
                  </div>

                  <button
                    onClick={handleContinue}
                    className="w-full bg-white text-black py-3.5 font-dmsans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors"
                  >
                    CONTINUAR PARA PAGAMENTO
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="animate-in fade-in duration-300">
                  <h4 className="font-cinzel text-lg tracking-wider mb-6">Metodo de Pagamento</h4>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { key: 'cartão' as PaymentMethod, icon: CreditCard, label: 'Cartão' },
                      { key: 'pix' as PaymentMethod, icon: QrCode, label: 'PIX' },
                      { key: 'boleto' as PaymentMethod, icon: FileText, label: 'Boleto' },
                    ].map(m => (
                      <button
                        key={m.key}
                        onClick={() => setPayMethod(m.key)}
                        className={`flex flex-col items-center gap-2 py-4 border transition-all ${
                          payMethod === m.key ? 'border-white bg-white/5' : 'border-[#333333] hover:border-white/30'
                        }`}
                      >
                        <m.icon size={20} />
                        <span className="text-xs tracking-wider uppercase">{m.label}</span>
                      </button>
                    ))}
                  </div>

                  {payMethod === 'cartão' && (
                    <div className="animate-in fade-in duration-200">
                      <div className="mb-4">
                        <Field label="Número do Cartão" placeholder="0000 0000 0000 0000" onChange={() => {}} format={formatCard} />
                      </div>
                      <div className="mb-4">
                        <Field label="Nome no Cartão" placeholder="JOÃO SILVA" onChange={() => {}} />
                      </div>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <Field label="Validade" placeholder="MM/AA" onChange={() => {}} format={formatExpiry} />
                        <Field label="CVV" placeholder="000" onChange={() => {}} />
                        <div>
                          <label className="text-[11px] tracking-[0.2em] uppercase text-white/40 block mb-1.5">Tipo</label>
                          <select className="w-full bg-transparent border-b border-white/20 py-2.5 text-sm outline-none focus:border-white">
                            <option className="bg-[#1a1a1a]">Crédito</option>
                            <option className="bg-[#1a1a1a]">Débito</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-6">
                        <label className="text-[11px] tracking-[0.2em] uppercase text-white/40 block mb-2">Parcelamento</label>
                        <div className="flex flex-wrap gap-2">
                          {PARCELAS.map(n => {
                            const val = (finalTotal / n).toFixed(2).replace('.', ',');
                            return (
                              <button
                                key={n}
                                onClick={() => setParcela(n)}
                                className={`px-3 py-1.5 text-xs border transition-colors ${
                                  parcela === n ? 'border-white text-white' : 'border-[#333333] text-white/40 hover:border-white/40'
                                }`}
                              >
                                {n}x R$ {val}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {payMethod === 'pix' && (
                    <div className="animate-in fade-in duration-200 border border-[#333333] p-6 text-center mb-6">
                      <div className="w-28 h-28 bg-[#1a1a1a] mx-auto mb-4 flex items-center justify-center">
                        <QrCode size={48} className="text-white/30" />
                      </div>
                      <p className="text-sm text-white/50 mb-2">Chave PIX: <strong className="text-white">20company@pix.com.br</strong></p>
                      <p className="text-xs text-green-400 tracking-wider">5% de desconto no PIX</p>
                    </div>
                  )}

                  {payMethod === 'boleto' && (
                    <div className="animate-in fade-in duration-200 border border-[#333333] p-6 mb-6">
                      <p className="text-sm text-white/50 mb-4 leading-relaxed">
                        Vencimento em 3 dias úteis. Após o pagamento, a confirmação ocorre em até 2 dias úteis.
                      </p>
                      <div className="flex gap-3 items-center">
                        <p className="text-xs text-white/30 tracking-wider flex-1 break-all leading-relaxed">
                          23793.38128 60007.827136 95000.063305 1 87340000014900
                        </p>
                        <button
                          onClick={copyBoleto}
                          className="px-3 py-2 border border-[#333333] text-xs tracking-wider hover:border-white/40 transition-colors flex items-center gap-1.5 flex-shrink-0"
                        >
                          {copied ? <Check size={12} /> : <Copy size={12} />}
                          {copied ? 'Copiado' : 'Copiar'}
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleFinish}
                    className="w-full bg-white text-black py-3.5 font-dmsans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors"
                  >
                    CONFIRMAR PEDIDO
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full mt-3 text-xs tracking-wider text-white/40 hover:text-white/70 underline underline-offset-4 transition-colors"
                  >
                    Voltar
                  </button>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full border border-green-400 flex items-center justify-center mb-6">
                    <Check size={28} className="text-green-400" />
                  </div>
                  <h2 className="font-cinzel text-3xl tracking-wider mb-3">Pedido Confirmado!</h2>
                  <p className="text-sm text-white/50 max-w-sm leading-relaxed mb-2">
                    Sua camiseta personalizada esta sendo preparada. Você receberá um email com os detalhes e o rastreamento em breve.
                  </p>
                  <p className="font-cinzel text-sm tracking-[0.2em] text-white/70 mt-4 mb-8">PEDIDO #{orderNum}</p>
                  <button
                    onClick={handleClose}
                    className="bg-white text-black px-8 py-3 font-dmsans text-sm font-medium tracking-wider hover:bg-white/90 transition-colors"
                  >
                    VOLTAR A LOJA
                  </button>
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="hidden md:block px-6 md:px-8 py-6 bg-[#050505]">
              <h4 className="font-cinzel text-base tracking-wider mb-4">Seu Pedido</h4>
              <div className="flex flex-col gap-3 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="w-12 h-12 bg-[#111] border border-[#333333] flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{item.name} x{item.qty}</p>
                      <p className="text-[10px] text-white/40">{item.colorName} · {item.size}</p>
                    </div>
                    <span className="text-sm">R$ {item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#333333] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Subtotal</span>
                  <span>R$ {totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Frete</span>
                  <span className="text-green-400">Grátis</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Desconto PIX (5%)</span>
                    <span className="text-white/70">- R$ {discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-medium border-t border-[#333333] pt-3 mt-2">
                  <span className="text-xs tracking-wider uppercase text-white/50 self-center">Total</span>
                  <span className="font-cinzel">R$ {finalTotal}</span>
                </div>
              </div>

              {/* Info icons */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Truck size={14} /> Frete grátis acima de R$200
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <RefreshCw size={14} /> 7 dias para troca
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <Clock size={14} /> 5 dias úteis de produção
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, error, placeholder, type = 'text', format }: {
  label: string; value?: string; onChange: (v: string) => void; error?: string;
  placeholder?: string; type?: string; format?: (v: string) => string;
}) {
  return (
    <div>
      <label className="text-[11px] tracking-[0.2em] uppercase text-white/40 block mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(format ? format(e.target.value) : e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-white/20'} py-2.5 text-sm outline-none focus:border-white transition-colors placeholder:text-white/15`}
      />
      {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
    </div>
  );
}
