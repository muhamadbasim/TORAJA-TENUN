import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, User, Bot } from 'lucide-react';
import { askCulturalExpert } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiChat: React.FC = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Salama'. Saya adalah semangat tenun. Tanyakan saya tentang pola, dan saya akan mengungkapkan maknanya." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userText = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const answer = await askCulturalExpert(userText);
    
    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <section id="ask-the-weaver" className="py-32 bg-gradient-to-b from-[#fafaf9] to-emerald-50/50 relative overflow-hidden flex items-center justify-center">
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-16">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 text-emerald-700 mb-4 border border-emerald-200 px-4 py-2 rounded-full bg-emerald-50"
             >
                <Sparkles size={14} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Pemandu Budaya AI</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl serif text-emerald-950 mb-4">Berbicara dengan <span className="text-emerald-600 italic">Leluhur</span></h2>
            <p className="text-stone-500 font-light">Temukan kearifan tersembunyi dalam setiap helai benang.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_50px_rgba(6,78,59,0.1)] rounded-3xl overflow-hidden h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-stone-100 flex justify-between items-center bg-white/50">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono text-emerald-800">KONEKSI LANGSUNG</span>
                </div>
                <span className="text-xs text-stone-400">Gemini 2.5 Flash</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar" ref={scrollRef}>
                {messages.map((msg, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                         {msg.role === 'model' && (
                            <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                <Bot size={16} className="text-emerald-700" />
                            </div>
                        )}
                        <div className={`max-w-[80%] md:max-w-[60%] p-5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-emerald-900 text-white rounded-tr-sm' 
                            : 'bg-white text-stone-700 border border-stone-100 rounded-tl-sm'
                        }`}>
                            {msg.text}
                        </div>
                        {msg.role === 'user' && (
                            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center shrink-0">
                                <User size={16} className="text-stone-600" />
                            </div>
                        )}
                    </motion.div>
                ))}
                {isLoading && (
                    <div className="flex gap-4">
                         <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                                <Bot size={16} className="text-emerald-700" />
                        </div>
                        <div className="bg-white p-4 rounded-2xl rounded-tl-sm flex items-center gap-3 shadow-sm border border-stone-100">
                            <Loader2 size={16} className="animate-spin text-emerald-600" />
                            <span className="text-xs text-emerald-600 tracking-wider">MENAFSIRKAN POLA...</span>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Input */}
            <div className="p-6 bg-stone-50/50 border-t border-stone-100">
                <form onSubmit={handleAsk} className="relative">
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tanyakan tentang arti 'Pa'tedong' atau warna 'Merah'..."
                        className="w-full bg-white text-stone-800 placeholder-stone-400 focus:outline-none font-light rounded-full py-4 px-6 pr-14 border border-stone-200 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all shadow-sm"
                    />
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-900 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-emerald-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Send size={16} />
                    </button>
                </form>
                <div className="mt-4 flex justify-center gap-4">
                    {["Simbolisme Kerbau", "Ritual Pemakaman", "Arti Warna"].map(suggestion => (
                        <button 
                            key={suggestion}
                            onClick={() => setQuery(suggestion)}
                            className="text-[10px] uppercase tracking-wider text-stone-500 hover:text-emerald-700 transition-colors"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default GeminiChat;