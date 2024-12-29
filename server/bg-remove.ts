'use server'

import { checkImageProcessing } from "@/lib/check-processing"
import { actionClient } from "@/lib/safe-action"
import { v2 as cloudinary } from "cloudinary"
import { z } from "zod"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
})


const bgRemoveSchema = z.object({
    activeImage: z.string(),
    format: z.string(),
})

export const bgRemove = actionClient.schema(bgRemoveSchema).action(async ({parsedInput: {activeImage, format}}) => {
    const form = activeImage.split(format);
    const pngConvert = form[0] + "png"
    const parts = pngConvert.split('/upload/')
    const bgRemoveUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`

    let isProcessed = false
    const maxAttempts = 20
    const delay = 1000
    for(let attempt = 0; attempt < maxAttempts; attempt++) {
        isProcessed = await checkImageProcessing(bgRemoveUrl) ?? false;
        if(isProcessed) {
            break
        }
        await new Promise((resolve) => setTimeout(resolve, delay))
    }

    if(!isProcessed) {
        throw new Error("image not processed")
    }

    return {success: bgRemoveUrl}
})