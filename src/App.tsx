import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Brands } from './components/Brands';
import { Services } from './components/Services';
import { Products } from './components/Products';
import { Contact } from './components/Contact';
import { WhatsAppBtn } from './components/WhatsAppBtn';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Brands />
        <Services />
        <Products />
      </main>
      <Contact />
      <WhatsAppBtn />
    </div>
  );
};

export default App;
