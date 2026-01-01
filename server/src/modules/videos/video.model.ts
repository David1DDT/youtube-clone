import { getModelForClass, prop, type Ref } from '@typegoose/typegoose'
import { User } from '../user/user.model';
import { customAlphabet } from 'nanoid';
import { get } from 'mongoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)


export class Video {
    @prop()
    public title: string

    @prop()
    public description: string

    @prop({ enum: ["mp4"] }) // only mp4 files
    public extension: string;

    @prop({ required: true, ref: () => User })
    public owner: Ref<User>

    @prop({ unique: true, default: () => nanoid() })
    public videoId: string

    @prop({ default: false })
    public published: boolean

}

export const VideoModel = getModelForClass(Video, {
    schemaOptions: {
        timestamps: true
    }
})