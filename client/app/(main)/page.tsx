import Link from 'next/link';
import VideoCard from '../components/VideoCard';


export default async function Home() {
    const videos: any[] = await (await fetch('http://127.0.0.1:4000/api/videos')).json()
    return (
        <div className="video-grid">
            {videos.map(video => (
                <Link key={video._id} href={`/videos/${video.videoId}`}>
                    <VideoCard video={video} />
                </Link>
            ))}
        </div>
    );
}
