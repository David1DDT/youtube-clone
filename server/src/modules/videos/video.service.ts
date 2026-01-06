import { VideoModel } from "./video.model";

export function createVideo({ owner, extension }: { owner: string, extension: string }) {
    return VideoModel.create({ owner, extension: extension })
}


export function findVideo(videoId: string) {
    return VideoModel.findOne({ videoId })
}

export function findVideos() {
    return VideoModel.find({ published: true }).lean()
}