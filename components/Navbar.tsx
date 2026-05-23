'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { LogOut, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Team', href: '/#team' },
    { label: 'Stats', href: '/#stats' },
    { label: 'Roadmap', href: '/#roadmap' },
    { label: 'Services', href: '/#offer' },
    { label: 'Partnership', href: '/#partnership' },
    { label: 'Reviews', href: '/#testimonials' },
    { label: 'Contact', href: '/#contact' }
  ];

  return (
    <>
      <div style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        width: '100%',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        padding: '0 16px',
      }}>
        <nav style={{
          width: '100%',
          maxWidth: '1000px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          border: scrolled ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '999px',
          background: scrolled ? 'rgba(5, 5, 5, 0.85)' : 'rgba(5, 5, 5, 0)',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          boxShadow: scrolled ? '0 12px 40px rgba(0, 0, 0, 0.6)' : 'none',
          padding: '0 12px 0 24px',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
            {/* Logo */}
            <Link
              href="/"
              style={{ display: 'flex', alignItems: 'center' }}
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <img src="/logo-v2.png" alt="W2E Logo" style={{ height: '56px', objectFit: 'contain' }} />
            </Link>

            {/* Desktop nav links */}
            <div className="nav-links" style={{ display: 'flex', gap: '20px', alignItems: 'center', overflowX: 'auto', scrollbarWidth: 'none', padding: '0 8px' }}>
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', transition: 'color 0.2s', fontWeight: 500, whiteSpace: 'nowrap' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#fff'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </Link>
              ))}

              <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

              <a href="https://discord.gg/way2eternal" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Join Discord
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: 'none',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                padding: '10px',
                cursor: 'pointer',
                color: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            style={{
              position: 'fixed',
              top: '96px',
              left: '16px',
              right: '16px',
              zIndex: 99,
              background: 'rgba(8, 8, 8, 0.95)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, ease: [0.19, 1, 0.22, 1] }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; }}
                  onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', margin: '8px 0' }} />

            <a
              href="https://discord.gg/way2eternal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-accent"
              onClick={() => setMobileOpen(false)}
              style={{ textAlign: 'center', padding: '14px', fontSize: '0.95rem', textDecoration: 'none', borderRadius: '12px' }}
            >
              Join Discord
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
