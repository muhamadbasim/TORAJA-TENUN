import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Warisan', href: '#heritage' },
    { label: 'Koleksi', href: '#collection' },
    { label: 'Filosofi', href: '#philosophy' },
    { label: 'Tanya Penenun', href: '#ask-the-weaver' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#fafaf9]/90 backdrop-blur-sm border-b border-stone-200' : 'py-8'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center text-emerald-950">
          <a href="#" className="text-2xl font-bold tracking-tighter serif relative group">
            TORAJA
            <span className="text-orange-600 absolute -right-3 top-0 opacity-0 group-hover:opacity-100 transition-opacity">.</span>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="group flex items-center gap-4 focus:outline-none"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-stone-500 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 hidden md:block">
              Menu
            </span>
            <div className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center group-hover:bg-emerald-950 group-hover:border-emerald-950 group-hover:text-white transition-all duration-300">
              {isOpen ? <X size={14} /> : <Menu size={14} />}
            </div>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-emerald-950 z-40 flex flex-col justify-center items-center text-[#fafaf9]"
          >
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between h-full py-32">
              <div className="flex flex-col justify-between">
                <span className="text-sm uppercase tracking-widest text-emerald-500">Navigasi</span>
                <div className="text-xs text-emerald-400/60">
                  <p>Sulawesi Selatan,</p>
                  <p>Indonesia</p>
                </div>
              </div>

              <ul className="flex flex-col justify-center space-y-4">
                {menuItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i + 0.3 }}
                    className="overflow-hidden"
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-5xl md:text-8xl serif hover:text-emerald-400 transition-colors block leading-[1.1] tracking-tight"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col justify-end items-end">
                <span className="text-sm uppercase tracking-widest text-emerald-500 mb-4">Sosial</span>
                <div className="flex flex-col text-right space-y-2 font-medium text-emerald-100">
                  <a href="#" className="hover:underline">Instagram</a>
                  <a href="#" className="hover:underline">Twitter</a>
                  <a href="#" className="hover:underline">Email</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;