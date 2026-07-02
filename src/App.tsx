import { CartProvider } from '@/context/CartContext';
import CustomCursor from '@/components/CustomCursor';
import Header from '@/components/Header';
import CartDrawer from '@/components/CartDrawer';
import Hero from '@/sections/Hero';
import Marquee from '@/sections/Marquee';
import About from '@/sections/About';
import Pillars from '@/sections/Pillars';
import Catalog from '@/sections/Catalog';
import Customizer from '@/sections/Customizer';
import Testimonials from '@/sections/Testimonials';
import InfoCompra from '@/sections/InfoCompra';
import FAQ from '@/sections/FAQ';
import Newsletter from '@/sections/Newsletter';
import Footer from '@/sections/Footer';

function App() {
  return (
    <CartProvider>
      <div className="relative bg-black min-h-screen">
        <CustomCursor />
        <Header />
        <CartDrawer />

        <main>
          <Hero />
          <Marquee />
          <About />
          <Pillars />
          <Catalog />
          <Customizer />
          <Testimonials />
          <InfoCompra />
          <FAQ />
          <Newsletter />
        </main>

        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
