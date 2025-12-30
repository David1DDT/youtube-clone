'use client'
import { useRef, useState } from "react";

interface Video {
    _id: number;
    title: string;
    description: string;
}

interface Props {
    video: Video;
}

export default function VideoCard({ video }: Props) {

    return (
        <div className="video-card">
            <div className="video-info">
                <div>
                    <h3 className="video-title">{video.title}</h3>
                    <p className="channel-name">{video.description}</p>
                </div>
            </div>
        </div>
    );
}
