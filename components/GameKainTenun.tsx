import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Timer, Trophy, RotateCcw, Play } from 'lucide-react';

// Toraja Motifs Data
const MOTIFS = [
    { name: "Pa'tedong", text: "PA'TEDONG", image: "https://i.imgur.com/KeuGg3c.jpeg" },
    { name: "Pa'sekong", text: "PA'SEKONG", image: "https://i.imgur.com/lN63oCP.jpeg" },
    { name: "Pa'barre Allo", text: "PA'BARRE ALLO", image: "https://i.imgur.com/MIWfT43.jpeg" },
    { name: "Ne' Limbongan", text: "NE' LIMBONGAN", image: "https://i.imgur.com/OItpUpe.jpeg" }
];

const MOTIF_NAMES = MOTIFS.map(m => m.name);

const BLUEPRINTS = [
    ["Pa'tedong", "Pa'sekong", "Pa'tedong", "Ne' Limbongan", "Pa'sekong", "Pa'tedong", "Ne' Limbongan", "Pa'barre Allo"],
    ["Pa'barre Allo", "Ne' Limbongan", "Pa'tedong", "Pa'sekong", "Ne' Limbongan", "Pa'tedong", "Pa'sekong", "Pa'barre Allo"],
    ["Pa'sekong", "Pa'tedong", "Ne' Limbongan", "Pa'barre Allo", "Pa'tedong", "Ne' Limbongan", "Pa'sekong", "Pa'tedong"]
];

const GameKainTenun: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timer, setTimer] = useState(30);
    const [score, setScore] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentBlueprint, setCurrentBlueprint] = useState<string[]>([]);
    const [componentOptions, setComponentOptions] = useState<string[]>([]);
    const [message, setMessage] = useState('Tekan Mulai untuk memuat pola tenun!');
    const [gameOver, setGameOver] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [feedbackColor, setFeedbackColor] = useState<'neutral' | 'green' | 'red'>('neutral');

    const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Utility to get motif details
    const getMotifDetails = (motifName: string) => {
        return MOTIFS.find(m => m.name === motifName) || { name: 'unknown', text: '?', image: 'https://placehold.co/80x80?text=?' };
    };

    // Generate Image URL
    const getImageUrl = (motifName: string) => {
        const motif = getMotifDetails(motifName);
        return motif.image;
    };

    // Initialize Game
    const startGame = () => {
        if (isPlaying) return;

        setTimer(30);
        setScore(0);
        setCurrentStep(0);
        setIsPlaying(true);
        setGameOver(false);
        setGameCompleted(false);
        setMessage('Memulai proses menenun...!');
        setFeedbackColor('neutral');

        // Select random blueprint
        const randomIndex = Math.floor(Math.random() * BLUEPRINTS.length);
        setCurrentBlueprint(BLUEPRINTS[randomIndex]);
    };

    // Generate Options when blueprint or step changes
    useEffect(() => {
        if (isPlaying && currentBlueprint.length > 0) {
            generateComponents();
        }
    }, [currentStep, currentBlueprint, isPlaying]);

    const generateComponents = () => {
        if (currentStep >= currentBlueprint.length) return;

        const requiredMotif = currentBlueprint[currentStep];
        const options = new Set<string>();
        options.add(requiredMotif);

        while (options.size < 4) {
            const randomMotif = MOTIF_NAMES[Math.floor(Math.random() * MOTIF_NAMES.length)];
            options.add(randomMotif);
        }

        const optionsArray = Array.from(options).sort(() => Math.random() - 0.5);
        setComponentOptions(optionsArray);
    };

    // Timer Logic
    useEffect(() => {
        if (isPlaying) {
            timerIntervalRef.current = setInterval(() => {
                setTimer((prev) => {
                    if (prev <= 1) {
                        endGame(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        };
    }, [isPlaying]);

    const handleComponentClick = (selectedMotif: string) => {
        if (!isPlaying) return;

        const requiredMotif = currentBlueprint[currentStep];

        if (selectedMotif === requiredMotif) {
            // Correct
            setScore(prev => prev + 10);
            setMessage('MOTIF TEPAT! +10 Skor.');
            setFeedbackColor('green');
            setTimeout(() => setFeedbackColor('neutral'), 500);

            if (currentStep < currentBlueprint.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                // Complete
                const finalScore = score + 10 + (timer * 5);
                setScore(finalScore);
                setMessage(`KAIN SELESAI DITENUN! Bonus Waktu: +${timer * 5}!`);
                endGame(true);
            }
        } else {
            // Wrong
            setScore(prev => Math.max(0, prev - 5));
            setTimer(prev => Math.max(0, prev - 3));
            setMessage('SALAH! -5 Skor, -3s Waktu.');
            setFeedbackColor('red');
            setTimeout(() => setFeedbackColor('neutral'), 500);
        }
    };

    const endGame = (completed: boolean) => {
        setIsPlaying(false);
        setGameOver(true);
        setGameCompleted(completed);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };

    return (
        <section className="py-24 bg-[#f0f4f8] relative border-t border-stone-200">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-xs uppercase tracking-[0.5em] text-emerald-800 font-semibold mb-4">Permainan</h2>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 serif">Tenun Cepat Toraja</h1>
                    <p className="text-gray-600">Padankan motif kain tenun yang tepat secepat mungkin. Batas waktu: 30 detik!</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border-4 border-stone-800 p-6 md:p-8 relative overflow-hidden">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center bg-gray-100 p-4 rounded-xl mb-8 shadow-inner">
                        <div className="flex items-center gap-2 text-lg font-medium">
                            <Timer className={`w-6 h-6 ${timer <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-600'}`} />
                            <span className={timer <= 5 ? 'text-red-600 font-bold' : 'text-gray-800'}>{timer}s</span>
                        </div>
                        <div className="flex items-center gap-2 text-lg font-medium">
                            <Trophy className="w-6 h-6 text-yellow-600" />
                            <span className="text-blue-600 font-bold">{score}</span>
                        </div>
                    </div>

                    {/* Blueprint Area */}
                    <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-3 text-gray-700 flex items-center gap-2">
                            Pola Tenun (Blueprint)
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2 bg-red-50 p-6 rounded-xl min-h-[100px] shadow-inner border border-red-100">
                            {isPlaying || gameOver ? (
                                currentBlueprint.map((motif, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{
                                            scale: index === currentStep ? 1.1 : 1,
                                            opacity: index < currentStep ? 1 : 0.4,
                                            borderColor: index === currentStep ? '#9a3412' : (index < currentStep ? '#10b981' : '#9ca3af')
                                        }}
                                        className={`w-16 h-16 md:w-20 md:h-20 border-2 rounded-lg overflow-hidden transition-all duration-300 ${index < currentStep ? 'bg-emerald-100' : 'bg-white'
                                            } ${index === currentStep ? 'shadow-lg ring-2 ring-orange-200' : ''}`}
                                    >
                                        <img
                                            src={getImageUrl(motif)}
                                            alt={motif}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-gray-400 italic">
                                    Pola akan muncul di sini...
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Component Selection Area */}
                    <div className={`transition-colors duration-300 rounded-xl p-6 ${feedbackColor === 'red' ? 'bg-red-100' : feedbackColor === 'green' ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                        <h3 className="text-lg font-semibold mb-4 text-gray-700">Pilih Motif Benang:</h3>
                        <div className="flex justify-center flex-wrap gap-4 min-h-[100px]">
                            {isPlaying && !gameOver ? (
                                componentOptions.map((motif, index) => (
                                    <motion.button
                                        key={`${motif}-${index}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleComponentClick(motif)}
                                        className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl border-2 border-stone-600 shadow-[0_4px_0_#475569] active:shadow-[0_1px_0_#475569] active:translate-y-[3px] transition-all overflow-hidden"
                                    >
                                        <img
                                            src={getImageUrl(motif)}
                                            alt={motif}
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.button>
                                ))
                            ) : (
                                <div className="flex items-center justify-center w-full text-gray-500">
                                    {gameOver ? 'Permainan Selesai' : 'Tekan Mulai untuk bermain'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Controls & Messages */}
                    <div className="mt-8 text-center">
                        {!isPlaying && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="bg-[#9a3412] text-white px-8 py-3 rounded-lg font-bold shadow-[0_4px_0_#7c2d12] active:shadow-[0_1px_0_#7c2d12] active:translate-y-[3px] transition-all flex items-center gap-2 mx-auto"
                            >
                                {gameOver ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                {gameOver ? 'Main Lagi' : 'Mulai Menenun Baru'}
                            </motion.button>
                        )}
                        <p className={`text-xl mt-6 font-bold transition-colors ${feedbackColor === 'red' ? 'text-red-600' : feedbackColor === 'green' ? 'text-green-600' : 'text-stone-600'
                            }`}>
                            {message}
                        </p>
                    </div>

                    {/* Game Over Overlay */}
                    <AnimatePresence>
                        {gameOver && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.8, y: 20 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className={`bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full border-t-8 ${gameCompleted ? 'border-green-500' : 'border-orange-500'
                                        }`}
                                >
                                    <h3 className="text-3xl font-bold mb-4 text-gray-800">
                                        {gameCompleted ? 'TENUNAN BERHASIL!' : 'WAKTU HABIS!'}
                                    </h3>
                                    <p className="text-xl mb-2 text-gray-600">Skor Akhir Anda:</p>
                                    <p className={`text-6xl font-extrabold mb-8 ${gameCompleted ? 'text-green-600' : 'text-orange-600'
                                        }`}>
                                        {score}
                                    </p>
                                    <button
                                        onClick={startGame}
                                        className="w-full bg-[#9a3412] text-white px-6 py-3 rounded-lg font-bold shadow-[0_4px_0_#7c2d12] active:shadow-[0_1px_0_#7c2d12] active:translate-y-[3px] transition-all"
                                    >
                                        Coba Lagi
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default GameKainTenun;
