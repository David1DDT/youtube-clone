'use client'
import { useContext } from "react"
import { UploadContext } from "./UploadContext"

const UploadButton = () => {
    const context = useContext(UploadContext)

    return (
        <button onClick={() => context?.toggle()}>Upload</button>
    )
}

export default UploadButton