import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeaveItem } from '../types';
import { ArrowUpRight } from 'lucide-react';

const categories = [
  "Semua",
  "Kain Tenun Toraja",
  "Tongkonan AYA TORAJA",
  "Makanan Toraja",
  "Ritual Rambu Solo"
];

const items: WeaveItem[] = [
  // Kain Tenun Toraja
  { 
    id: 1, 
    title: "Pa'tedong", 
    description: "Motif Kerbau. Kemakmuran & Kekuatan.", 
    pattern: "Geometris Kerbau", 
    category: "Kain Tenun Toraja",
    image: "https://images.unsplash.com/photo-1523678802981-959dc4f706f2?q=80&w=2000&auto=format&fit=crop" 
  },
  { 
    id: 2, 
    title: "Pa'sekong", 
    description: "Motif Kait. Kompleksitas & Persatuan.", 
    pattern: "Kait Saling Kunci", 
    category: "Kain Tenun Toraja",
    image: "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?q=80&w=2000&auto=format&fit=crop" 
  },
  { 
    id: 3, 
    title: "Pa'barre Allo", 
    description: "Motif Matahari. Cahaya Ilahi.", 
    pattern: "Matahari Radial", 
    category: "Kain Tenun Toraja",
    image: "https://images.unsplash.com/photo-1590931363880-53546283953f?q=80&w=2000&auto=format&fit=crop" 
  },
  { 
    id: 4, 
    title: "Ne' Limbongan", 
    description: "Sumber Sungai. Aliran Kehidupan.", 
    pattern: "Garis Mengalir", 
    category: "Kain Tenun Toraja",
    image: "https://images.unsplash.com/photo-1584882980322-c7a498873a42?q=80&w=2000&auto=format&fit=crop" 
  },
  // Tongkonan AYA TORAJA
  {
    id: 5,
    title: "Ke'te Kesu",
    description: "Arsitektur Desa Kuno.",
    pattern: "Rumah Adat",
    category: "Tongkonan AYA TORAJA",
    image: "https://images.unsplash.com/photo-1675696082136-535725c14797?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Alang Sura'",
    description: "Lumbung Padi Sakral.",
    pattern: "Struktur Lumbung",
    category: "Tongkonan AYA TORAJA",
    image: "https://images.unsplash.com/photo-1604848672734-766c0e53444e?q=80&w=1974&auto=format&fit=crop"
  },
  // Makanan Toraja
  {
    id: 7,
    title: "Pa'piong",
    description: "Daging dimasak dalam bambu dengan rempah.",
    pattern: "Seni Kuliner",
    category: "Makanan Toraja",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Toraja Arabica",
    description: "Kopi dataran tinggi yang mendunia.",
    pattern: "Biji Kopi",
    category: "Makanan Toraja",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
  },
  // Ritual Rambu Solo
  {
    id: 9,
    title: "Tedong Saleko",
    description: "Kerbau belang, sangat berharga.",
    pattern: "Hewan Kurban",
    category: "Ritual Rambu Solo",
    image: "https://images.unsplash.com/photo-1636032272641-1443a450152f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 10,
    title: "Tau Tau",
    description: "Patung orang yang telah meninggal.",
    pattern: "Ukiran Kayu",
    category: "Ritual Rambu Solo",
    image: "https://images.unsplash.com/photo-1637230377375-8517e690b44a?q=80&w=2070&auto=format&fit=crop"
  }
];

const Gallery: React.FC = () => {
  const [hoveredItem, setHoveredItem] = useState<WeaveItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredItems = activeCategory === "Semua" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <section id="collection" className="py-32 bg-[#fafaf9] relative z-10 min-h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-20">
        <div className="mb-12">
             <h2 className="text-xs uppercase tracking-[0.5em] text-emerald-800 font-semibold mb-8">Koleksi</h2>
             
             {/* Filters */}
             <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-stone-200 pb-6">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`text-lg md:text-xl serif transition-colors relative py-2 ${
                            activeCategory === category 
                            ? 'text-emerald-950 font-medium' 
                            : 'text-stone-400 hover:text-emerald-800'
                        }`}
                    >
                        {category}
                        {activeCategory === category && (
                            <motion.div 
                                layoutId="underline"
                                className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500"
                            />
                        )}
                    </button>
                ))}
             </div>
        </div>

        <motion.div layout className="flex flex-col min-h-[500px]">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div 
                layout
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="group relative border-b border-stone-200 py-12 cursor-pointer transition-all hover:pl-10 duration-500"
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-8">
                      <span className="text-sm text-stone-400 font-mono">{item.id < 10 ? `0${item.id}` : item.id}</span>
                      <h3 className="text-4xl md:text-6xl serif text-stone-300 group-hover:text-emerald-950 transition-colors duration-500">
                          {item.title}
                      </h3>
                  </div>
                  <div className="hidden md:flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span className="text-xs uppercase tracking-widest text-orange-600 mb-1">{item.pattern}</span>
                      <span className="text-sm text-stone-500">{item.description}</span>
                  </div>
                  <ArrowUpRight className="text-stone-300 group-hover:text-emerald-950 transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
              <div className="py-20 text-center text-stone-400 italic font-serif">
                  Tidak ada item ditemukan dalam kategori ini.
              </div>
          )}
        </motion.div>
      </div>

      {/* Hover Image Reveal - Background Fixed/Absolute */}
      <AnimatePresence>
        {hoveredItem && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed pointer-events-none z-0 top-0 left-0 w-full h-full flex items-center justify-center opacity-100"
            >
                <div className="w-[500px] h-[700px] relative shadow-2xl shadow-emerald-900/20 bg-white p-4 transform translate-x-20 rotate-3">
                    <div className="w-full h-full overflow-hidden relative">
                        <img 
                            src={hoveredItem.image} 
                            alt={hoveredItem.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Tape effect */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-white/40 backdrop-blur-sm border border-white/20 shadow-sm rotate-2"></div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;