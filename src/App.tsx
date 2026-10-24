import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Contact } from './components/Contact';
import { WhatsAppBtn } from './components/WhatsAppBtn';
import { QuoteModal } from './components/QuoteModal';
import { CookieConsent } from './components/CookieConsent';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <main>
        <Hero />
        <About />
        <Brands />
        <Services />
        <Products />
      </main>
      <Contact />
      <WhatsAppBtn />
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      <CookieConsent />
    </div>
  );
};

export default App;
