import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const philosophySteps = [
  {
    id: 1,
    title: "Sumber Alam",
    description: "Kapas dipintal dengan tangan, menyatukan doa dan semangat para leluhur dalam setiap helai benang.",
    image: "https://i.imgur.com/PcT8Dt1.jpeg" // User provided: Raw Fabric/Material

  },
  {
    id: 2,
    title: "Pewarna Alami",
    description: "Akar, daun, dan tanah liat diolah untuk menciptakan warna merah, hitam, dan kuning yang sakral.",
    image: "https://i.imgur.com/UO5vx8u.jpeg" // Natural Cotton/Dye context
  },
  {
    id: 3,
    title: "Proses Tenun",
    description: "Irama alat tenun gedogan yang konstan, meniru detak jantung kehidupan dan ketekunan.",
    image: "https://i.imgur.com/KrK9g6x.jpeg" // Loom Weaving
  },
  {
    id: 4,
    title: "Simbol & Ritual",
    description: "Ukiran Pa'ssura dan kain tenun menyatu, menjadi elemen penting dalam upacara Rambu Solo' dan status sosial.",
    image: "https://i.imgur.com/03kW5NN.jpeg"
  }
];

const Philosophy: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} id="philosophy" className="relative h-[300vh] bg-[#fafaf9]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">

        {/* Intro Text overlaying the start */}
        <div className="absolute top-24 left-10 z-20 max-w-xs pointer-events-none">
          <div className="w-12 h-1 bg-emerald-900 mb-4"></div>
          <h2 className="text-sm uppercase tracking-widest text-emerald-800 mb-4">Filosofi</h2>
          <p className="text-3xl serif leading-snug text-emerald-950">Dari bumi menuju alam roh.</p>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-20 pl-[30vw]">
          {philosophySteps.map((step) => (
            <div key={step.id} className="group relative h-[65vh] w-[80vw] md:w-[35vw] shrink-0 overflow-hidden bg-white shadow-xl shadow-emerald-900/5 border border-stone-200 rounded-t-[100px] md:rounded-none">
              <div className="h-[60%] w-full overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 sepia-[0.1]"
                />
              </div>
              <div className="h-[40%] p-10 flex flex-col justify-between bg-white relative">
                <span className="text-8xl font-serif text-stone-100 absolute -top-10 right-4 z-0">{step.id}</span>
                <div className="relative z-10">
                  <h3 className="text-3xl serif text-emerald-950 mb-3">{step.title}</h3>
                  <p className="text-stone-500 font-light leading-relaxed">{step.description}</p>
                </div>
                <div className="w-full h-[1px] bg-stone-200 mt-4"></div>
              </div>
            </div>
          ))}

          {/* End Card */}
          <div className="h-[65vh] w-[35vw] shrink-0 flex flex-col items-center justify-center bg-emerald-50 border border-emerald-100 rounded-sm p-10 text-center">
            <h3 className="text-5xl serif text-emerald-950 mb-6">
              Ditenun untuk <br /> <span className="italic text-orange-600">Keabadian</span>
            </h3>
            <p className="text-stone-600 max-w-xs">Menjaga tradisi leluhur di masa kini.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;