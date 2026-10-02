import React from 'react';
import Navbar from '../components/Navbar';
import Hero from "../components/Hero";
import Categories from '../components/Categories';
import FeaturedServices from '../components/FeaturedServices';
import HowItWorks from '../components/HowItWork';
import CustomerReviews from '../components/CustomerReviews';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>

      <Navbar />

      {/* Home */}
      <section id="home">
        <Hero />
      </section>

      <Categories />

      {/* Services */}
      <section id="services">
        <FeaturedServices />
      </section>

      {/* How It Works */}
      <section id="how-it-works">
        <HowItWorks />
      </section>

      {/* Reviews */}
      <section id="reviews">
        <CustomerReviews />
      </section>
 
      <section id="contact">
        <Contact/>
      </section>

      <Footer />

    </div>
  );
}