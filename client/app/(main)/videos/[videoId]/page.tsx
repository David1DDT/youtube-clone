"use client";
import { use, useRef, useState, useEffect } from "react";
// @ts-ignore
import './videoPlayer.css'

export default function Page({ params }: { params: Promise<{ videoId: string }> }) {
    const { videoId } = use(params);
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    const [playing, setPlaying] = useState(true)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [showControls, setShowControls] = useState(false)

    const togglePlay = () => {
        if (!videoRef.current) return

        playing ? videoRef.current.pause() : videoRef.current.play()

        setPlaying(!playing)

    }

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setProgress(videoRef.current.currentTime);
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect() // get duration bar
        const percent = (e.clientX - rect.left) / rect.width
        videoRef.current.currentTime = percent * videoRef.current.duration
    }

    const toggleFullScreen = () => {
        if (!containerRef.current) return
        document.fullscreenElement ? document.exitFullscreen() : containerRef.current.requestFullscreen()
    }

    const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    const handleMouseMove = () => {
        setShowControls(true)
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current)
        }
        hideTimeoutRef.current = setTimeout(() => setShowControls(false), 2000)
    }

    // keyboard shortcuts

    useEffect(() => {
        const keyHandler = (e: KeyboardEvent) => {
            if (!videoRef.current) return

            switch (e.code) {
                case "Space":
                    e.preventDefault()
                    togglePlay()
                case "ArrowRight":
                    videoRef.current.currentTime += 5
                case "ArrowLeft":
                    videoRef.current.currentTime -= 5
            }
        }
        window.addEventListener("keydown", keyHandler)

        return () => window.removeEventListener("keydown", keyHandler) // cleanup function so after it ends it does not execute
    }, [playing])

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`yt-player ${!showControls ? 'hide-controls' : ''}`}
        >
            {/* VIDEO */}
            <video
                src={`http://localhost:4000/api/videos/${videoId}`}
                height={800}
                width="auto"
                controls={false}
                autoPlay
                crossOrigin="anonymous"
                id="video-player"
                ref={videoRef}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={() =>
                    setDuration(videoRef.current?.duration || 0)
                }
                onClick={togglePlay}
            />

            {/* CENTER PLAY */}
            {!playing && (
                <button
                    onClick={togglePlay}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="yt-center-play">
                        ▶
                    </div>
                </button>
            )}

            {/* CONTROLS */}
            <div
                className={"mask-y-to-0%controls"}
            >
                {/* GRADIENT */}
                <div className="yt-controls-bg">

                    {/* PROGRESS BAR */}
                    <div
                        onClick={handleSeek}
                        className="yt-progress"
                    >
                        <div
                            className="yt-progress-filled"
                            style={{ width: `${(progress / duration) * 100}%` }}
                        >
                            <div className="yt-scrubber" />
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="yt-controls-row">
                        <div className="yt-left">
                            <button onClick={togglePlay} className="yt-btn">
                                {playing ? "❚❚" : "▶"}
                            </button>

                            <input className="yt-volume"
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={volume}
                                onChange={(e) => {
                                    const v = Number(e.target.value);
                                    setVolume(v);
                                    if (videoRef.current) videoRef.current.volume = v;
                                }}
                            />
                            <span>
                                {Math.floor(progress / 60)}:
                                {String(Math.floor(progress % 60)).padStart(2, "0")}
                            </span>
                        </div>

                        <button onClick={toggleFullScreen} className="yt-btn yt-fullscreen">⛶</button>
                    </div>
                </div>
            </div>
        </div>
    );
}