export interface CartItem {
  id: string;
  name: string;
  color: string;
  colorName: string;
  logo: string;
  logoName: string;
  size: string;
  price: number;
  qty: number;
  image: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'men' | 'women' | 'accessories';
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export type PaymentMethod = 'cartao' | 'pix' | 'boleto';

export interface CheckoutData {
  nome: string;
  email: string;
  cpf: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
}
