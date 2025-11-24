import React from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Gallery from './components/Gallery';
import GameKainTenun from './components/GameKainTenun';
import GeminiChat from './components/GeminiChat';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

function App() {
    return (
        <div className="bg-[#fafaf9] min-h-screen text-stone-900 selection:bg-emerald-200 selection:text-emerald-950">
            <Navigation />
            <main>
                <Hero />
                <Philosophy />
                <Gallery />
                <GameKainTenun />
                <GeminiChat />
            </main>
            <Footer />
            <WhatsAppButton />

            {/* Grain overlay for texture - Dark grain for light bg */}
            <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.05] mix-blend-multiply"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}

export default App;