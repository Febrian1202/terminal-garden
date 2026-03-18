"use client";

import { useRef, useState, useEffect } from "react";

// 1. DAFTAR PLAYLIST ABANG DISINI
const playlist = [
    { title: "Montagem Unknown", src: "/music/phonk.mp3" },
    { title: "Montagem Alquimia", src: "/music/MONTAGEM ALQUIMIA.mp3" },
    { title: "Montagem Ladrao", src: "/music/MONTAGEM LADRAO Slowed.mp3" },
    { title: "Semper", src: "/music/SEMPERO.mp3" },
];

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    // 2. State untuk melacak urutan lagu
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    const initAudioContext = () => {
        if (!audioRef.current || audioContextRef.current) return;

        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;

        const source = audioCtx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);

        audioContextRef.current = audioCtx;
        analyserRef.current = analyser;
        sourceRef.current = source;
    };

    const drawVisualizer = () => {
        if (!canvasRef.current || !analyserRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const analyser = analyserRef.current;

        if (!ctx) return;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const draw = () => {
            animationRef.current = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            ctx.fillStyle = "#0b0e14";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const barWidth = (canvas.width / bufferLength) * 1.5;
            let barHeight;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
                barHeight = (dataArray[i] / 255) * canvas.height;
                ctx.fillStyle = "#22d3ee"; // Warna bar Cyan
                ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
                x += barWidth;
            }
        };
        draw();
    };

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (!audioContextRef.current) {
            initAudioContext();
            drawVisualizer();
        }
        if (audioContextRef.current?.state === "suspended") {
            audioContextRef.current.resume();
        }

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // 3. Fungsi ganti lagu
    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    // 4. Efek untuk memutar otomatis saat ganti lagu (jika sebelumnya sedang play)
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play();
        }
    }, [currentSongIndex, isPlaying]);

    useEffect(() => {
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (audioContextRef.current) audioContextRef.current.close();
        };
    }, []);

    const currentSong = playlist[currentSongIndex];

    return (
        <div className="fixed bottom-4 right-4 bg-[#0f141e] border border-cyan-900/50 p-4 rounded-lg shadow-2xl shadow-cyan-900/20 flex flex-col items-center gap-3 z-50 min-w-62.5">
            <canvas ref={canvasRef} width="200" height="50" className="rounded"></canvas>

            <div className="flex flex-col w-full gap-2 text-center">
                <div className="text-xs text-cyan-500 font-bold">
                    <span>NOW PLAYING [{currentSongIndex + 1}/{playlist.length}]</span>
                    <br />
                    <span className="text-cyan-300 truncate block mt-1">
                        {currentSong.title}
                    </span>
                </div>

                <div className="flex justify-center gap-2 mt-2">
                    <button onClick={prevSong} className="text-cyan-950 bg-cyan-700 hover:bg-cyan-500 px-2 py-1 text-xs font-bold rounded transition-colors">
                        {"<<"}
                    </button>

                    <button onClick={togglePlay} className="text-cyan-950 bg-cyan-400 hover:bg-cyan-300 px-4 py-1 text-sm font-bold rounded transition-colors w-20">
                        {isPlaying ? "|| STOP" : "> PLAY"}
                    </button>

                    <button onClick={nextSong} className="text-cyan-950 bg-cyan-700 hover:bg-cyan-500 px-2 py-1 text-xs font-bold rounded transition-colors">
                        {">>"}
                    </button>
                </div>
            </div>

            {/* Putar lagu selanjutnya otomatis kalau lagu sekarang habis */}
            <audio
                ref={audioRef}
                src={currentSong.src}
                onEnded={nextSong}
                crossOrigin="anonymous"
            ></audio>
        </div>
    );
}