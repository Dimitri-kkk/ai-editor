"use client"

import Layers from "./layers/layers"
import UploadImage from "./upload/upload-image"

export default function Editor () {
    return (
        <div>
            <h1>editor</h1>
            <UploadImage />
            <Layers />
        </div>
    )
}