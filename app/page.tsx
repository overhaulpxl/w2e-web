'use client';

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LogoTicker from "../components/LogoTicker";
import About from "../components/About";
import AdminList from "../components/AdminList";
import Stats from "../components/Stats";
import CommunityGallery from "../components/CommunityGallery";
import TikTokVideos from "../components/TikTokVideos";
import Benefits from "../components/Benefits";
import WhyPartner from "../components/WhyPartner";
import Roadmap from "../components/Roadmap";
import Packages from "../components/Packages";
import Testimonials from "../components/Testimonials";

import Footer from "../components/Footer";

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Navbar />
      <main>
        <Hero />
        <LogoTicker />
        <About />
        <AdminList />
        <Stats />
        <Roadmap />
        <CommunityGallery />
        <TikTokVideos />
        <Benefits />
        <WhyPartner />
        <Packages />
        <Testimonials />

      </main>
      <Footer />
    </div>
  );
}
