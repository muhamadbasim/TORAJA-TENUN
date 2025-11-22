import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the background image
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Fade out slower so the background stays visible longer
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]); 
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  return (
    <div ref={containerRef} id="heritage" className="relative h-screen w-full overflow-hidden bg-[#fafaf9] flex flex-col justify-center items-center">
      
      {/* Background Image - Pemandangan Budaya Toraja */}
      <motion.div 
        style={{ scale, y, opacity }}
        className="absolute inset-0 z-0"
      >
        {/* Gradient overlay to ensure text readability while keeping image visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/30 via-white/40 to-[#fafaf9] z-10" />
        
        {/* High-quality landscape image of Toraja Tongkonan & Nature */}
        <img 
          src="https://images.unsplash.com/photo-1599404447298-f48e8865b039?q=80&w=2070&auto=format&fit=crop" 
          alt="Pemandangan Desa Adat Toraja - Tongkonan Traditional Village" 
          className="w-full h-full object-cover object-center"
        />
      </motion.div>
      
      {/* Subtle watercolor decorative blobs (kept minimal to show background) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 mix-blend-overlay opacity-60">
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-emerald-200/30 rounded-full blur-[100px]" />
          <div className="absolute top-[40%] -right-40 w-[500px] h-[500px] bg-orange-200/30 rounded-full blur-[100px]" />
      </div>

      {/* Main Typography */}
      <div className="relative z-20 w-full px-6 flex flex-col items-center justify-center h-full mt-16">
        <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
        >
            <div className="inline-block mb-4 border border-emerald-900/20 bg-white/60 backdrop-blur-md px-4 py-1 rounded-full shadow-sm">
                 <h2 className="text-xs uppercase tracking-[0.3em] text-emerald-900 font-bold">
                    Tana Toraja, Sulawesi
                </h2>
            </div>
           
            <h1 className="text-[13vw] leading-[0.85] font-medium tracking-tighter text-emerald-950 serif drop-shadow-sm">
                TORAJA
            </h1>
            <div className="overflow-hidden">
                <motion.h1 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[13vw] leading-[0.85] font-medium tracking-tighter text-emerald-900/20 text-outline serif"
                >
                    TENUN
                </motion.h1>
            </div>
            
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-8 text-lg md:text-xl text-emerald-950 font-medium max-w-xl mx-auto bg-white/40 backdrop-blur-md p-6 rounded-xl border border-white/50 shadow-lg"
            >
                Menjelajahi keindahan budaya luhur, dari Tongkonan hingga helai tenun yang abadi.
            </motion.p>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-6 md:left-12 z-20 flex flex-col gap-2"
      >
         <span className="text-xs font-serif italic text-emerald-900 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-md">
             Warisan Budaya Dunia
         </span>
         <div className="w-24 h-[1px] bg-emerald-900/50" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 right-6 md:right-12 z-20"
      >
        <div className="relative group cursor-pointer overflow-hidden rounded-full border border-emerald-900/20 p-6 transition-colors hover:bg-emerald-900/10 hover:border-emerald-900/40 bg-white/30 backdrop-blur-md shadow-sm">
            <ArrowDown className="text-emerald-950 animate-bounce" size={24} />
        </div>
      </motion.div>

      {/* Infinite Marquee */}
      <div className="absolute bottom-32 w-full overflow-hidden z-10 opacity-30 pointer-events-none mix-blend-darken">
        <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            className="flex whitespace-nowrap"
        >
            {[...Array(4)].map((_, i) => (
                <span key={i} className="text-7xl md:text-8xl font-serif italic mr-16 text-emerald-900">
                    Budaya • Sejarah • Alam • Roh •
                </span>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;