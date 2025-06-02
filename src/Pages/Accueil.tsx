import React from 'react';
import HeroSection from '../assets/components/HeroSection';
import Features from '../assets/components/Features';
import WhyWakatii from '../assets/components/WhyWhakatii';
import Testimonials from '../assets/components/Testimonials';
import Newsletter from '../assets/components/NewLetters';
import CallToAction from '../assets/components/CalltoAction';
import Header from '../assets/components/Header';
import Footer from '../assets/components/Footer';

const Accueil: React.FC = () => {
  return (
    <>
      <Header/>
      <HeroSection />
      <Features />
      <WhyWakatii />
      <Testimonials />
      <Newsletter />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Accueil;
