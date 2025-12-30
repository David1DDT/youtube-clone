'use client'
import { useContext, useRef } from "react"
import { UploadContext } from "./UploadContext"
// @ts-ignore
import './upload.css'

const Upload = () => {
    const context = useContext(UploadContext)
    const fileRef = useRef<HTMLInputElement | null>(null)
    const titleRef = useRef<HTMLInputElement | null>(null)
    const descriptionRef = useRef<HTMLTextAreaElement | null>(null)
    const publicRef = useRef<HTMLInputElement>(null)

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!fileRef.current?.files?.[0]) return

        const file = fileRef.current.files[0]
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch('http://127.0.0.1:4000/api/videos', {
            method: 'POST',
            body: formData,
            credentials: 'include',
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        console.log("Uploaded video:", data)

        const updateVideoResponse = await fetch(`http://127.0.0.1:4000/api/videos/${data.videoId}`, {
            method: "PATCH",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: titleRef.current?.value,
                description: descriptionRef.current?.value,
                published: publicRef.current?.checked
            })
        })

        context?.toggle()
        window.location.reload()
    }

    if (context?.visible === false) return null

    return (
        <div className="updateContainer">
            <button onClick={() => context?.toggle()} className="closebtn">X</button>
            <form className="uploadform" onSubmit={submitHandler}>
                <input type="file" accept=".mp4" ref={fileRef} />
                <input type="text" placeholder="title" ref={titleRef} />
                <textarea placeholder="description" ref={descriptionRef}></textarea>
                <div className="checkbox-container">
                    <input type="checkbox" id="public" ref={publicRef} />
                    <label htmlFor="public">Public?</label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Upload
