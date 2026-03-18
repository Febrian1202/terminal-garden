"use client";

import { useRef, useState, useEffect } from "react";

// 1. DAFTAR PLAYLIST ABANG
const playlist = [
    { title: "Montagem Unknown", src: "/music/phonk.mp3" },
    { title: "Cyberpunk City", src: "/music/cyberpunk.mp3" },
    { title: "Midnight Lofi", src: "/music/lofi.mp3" },
];

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
    const animationRef = useRef<number | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

    // State baru untuk Volume dan Progress Lagu
    const [volume, setVolume] = useState(1); // 1 = 100%
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);

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
                ctx.fillStyle = "#22d3ee";
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

    const nextSong = () => {
        setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
    };

    const prevSong = () => {
        setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    // --- FUNGSI BARU UNTUK SLIDER ---

    // Update progress bar pas lagu jalan
    const handleTimeUpdate = () => {
        if (audioRef.current) setProgress(audioRef.current.currentTime);
    };

    // Ambil durasi total pas lagu dimuat
    const handleLoadedMetadata = () => {
        if (audioRef.current) setDuration(audioRef.current.duration);
    };

    // Geser durasi lagu
    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        if (audioRef.current) audioRef.current.currentTime = time;
        setProgress(time);
    };

    // Ubah volume
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);
        if (audioRef.current) audioRef.current.volume = vol;
        setVolume(vol);
    };

    // Format detik jadi MM:SS
    const formatTime = (time: number) => {
        if (isNaN(time)) return "00:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

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
        <div className="fixed bottom-4 right-4 bg-[#0f141e] border border-cyan-900/50 p-4 rounded-lg shadow-2xl shadow-cyan-900/20 flex flex-col items-center gap-3 z-50 min-w-70">

            {/* Canvas Visualizer */}
            <canvas ref={canvasRef} width="240" height="40" className="rounded"></canvas>

            <div className="flex flex-col w-full gap-2 text-center">
                {/* Info Lagu */}
                <div className="text-xs text-cyan-500 font-bold">
                    <span>NOW PLAYING [{currentSongIndex + 1}/{playlist.length}]</span>
                    <span className="text-cyan-300 truncate block mt-1 text-sm">
                        {currentSong.title}
                    </span>
                </div>

                {/* Progress Slider */}
                <div className="flex items-center gap-2 text-[10px] text-cyan-600 font-mono mt-1">
                    <span>{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={progress}
                        onChange={handleSeek}
                        className="flex-1 h-1 bg-cyan-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                    <span>{formatTime(duration)}</span>
                </div>

                {/* Kontrol Utama (Prev, Play, Next) */}
                <div className="flex justify-center items-center gap-3 mt-1">
                    <button onClick={prevSong} className="text-cyan-950 bg-cyan-800 hover:bg-cyan-500 px-2 py-1 text-xs font-bold rounded transition-colors">
                        {"<<"}
                    </button>

                    <button onClick={togglePlay} className="text-cyan-950 bg-cyan-400 hover:bg-cyan-300 px-4 py-1 text-sm font-bold rounded transition-colors w-20">
                        {isPlaying ? "||" : ">"}
                    </button>

                    <button onClick={nextSong} className="text-cyan-950 bg-cyan-800 hover:bg-cyan-500 px-2 py-1 text-xs font-bold rounded transition-colors">
                        {">>"}
                    </button>
                </div>

                {/* Volume Slider */}
                <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-cyan-600 text-[10px]">VOL</span>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-cyan-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                src={currentSong.src}
                onEnded={nextSong}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                crossOrigin="anonymous"
            ></audio>
        </div>
    );
}