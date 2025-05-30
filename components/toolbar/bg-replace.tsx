'use client'

import { useLayerStore } from "@/lib/layer-store"
import { useImageStore } from "@/lib/image-store"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { ImageOff } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState } from "react"
import { bgReplace } from "@/server/bg-replace"


export default function BgReplace() {
    const setGenerating = useImageStore((state) => state.setGenerating)
    const generating = useImageStore((state) => state.generating)
    const activeLayer = useLayerStore((state) => state.activeLayer)
    const addLayer = useLayerStore((state) => state.addLayer)
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer)

    const [prompt, setPrompt] = useState("")

    return (
        <Popover>
            <PopoverTrigger disabled={!activeLayer?.url} asChild>
                <Button variant="outline" className="p-8">
                    <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
                        Background replace <ImageOff size={20} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div>
                    <h3>Background replace</h3>
                    <p className="text-sm text-muted-foreground">
                        Replace the background of an image with one click
                    </p>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="prompt" >Prompt</Label>
                    <Input id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Describe new background" />
                </div>

                <Button 
                disabled={!activeLayer?.url || generating}
                className="w-full mt-4"
                onClick={async () => {
                    const newLayerId = crypto.randomUUID();

                    setGenerating(true);
                    const res = await bgReplace({
                        activeImage: activeLayer.url!,
                        prompt: prompt,
                    })

                    if(res?.data?.success){
                        addLayer({
                            id: newLayerId,
                            url: res.data.success,
                            format: activeLayer.format,
                            height: activeLayer.height,
                            width: activeLayer.width,
                            name: "BgReplaced" + activeLayer.name,
                            publicId: activeLayer.publicId,
                            resourceType: "image",
                        })
                        setActiveLayer(newLayerId)
                        setGenerating(false)
                    }
                    if(res?.serverError) {
                        setGenerating(false)
                        throw new Error(res.serverError)
                    }
                }}
                >
                    {generating ? 'Replacing...' : 'Replace background'}
                </Button>
            </PopoverContent>
        </Popover>
    )
}