import { VideoModel } from "./video.model";

export function createVideo({ owner, extention }: { owner: string, extention: string }) {
    return VideoModel.create({ owner, extention: extention })
}


export function findVideo(videoId: string) {
    return VideoModel.findOne({ videoId })
}

export function findVideos() {
    return VideoModel.find({ published: true }).lean()
}