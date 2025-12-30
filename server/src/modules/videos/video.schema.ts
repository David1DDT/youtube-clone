import { object, string, boolean, TypeOf } from 'zod'


export const UpdateVideoSchema = {
    body: object({
        title: string(),
        description: string(),
        published: boolean()
    }),
    params: object({
        videoId: string()
    })
}

export type UpdateVideoBody = TypeOf<typeof UpdateVideoSchema.body>
export type UpdateVideoParams = TypeOf<typeof UpdateVideoSchema.params>