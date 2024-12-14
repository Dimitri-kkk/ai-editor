"use client"

import { useDropzone } from "react-dropzone"

export default function UploadImage () {
    const {} = useDropzone({
        maxFiles: 1,
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg'],
            'image/webp': ['.webp'],
            'image/jpeg': ['.jpeg'],
        },
        onDrop: async (acceptFiles, fileRejections) => {
            if(acceptFiles.length) {
                const formData = new FormData();
                formData.append('image', acceptFiles[0])
                const objectUrl = URL.createObjectURL(acceptFiles[0])
                const res = await uploadImage()
            }
        }
    })

    return (
        <div>
            <h1>upload image</h1>
        </div>
    )
}