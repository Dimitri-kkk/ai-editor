'use client'

import { useLayerStore } from "@/lib/layer-store"
import { useImageStore } from "@/lib/image-store"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Image } from "lucide-react"
import { bgRemove } from "@/server/bg-remove"

export default function BgRemove() {
    const setGenerating = useImageStore((state) => state.setGenerating)
    const generating = useImageStore((state) => state.generating)
    const activeLayer = useLayerStore((state) => state.activeLayer)
    const addLayer = useLayerStore((state) => state.addLayer)
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer)

    return (
        <Popover>
            <PopoverTrigger disabled={!activeLayer?.url} asChild>
                <Button variant="outline" className="p-8">
                    <span className="flex gap-1 items-center justify-center flex-col text-xs font-medium">
                        Background removal <Image size={20} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div>
                    <h3>Background removal</h3>
                    <p className="text-sm text-muted-foreground">
                        Remove the background of an image with one click
                    </p>
                </div>
                <Button 
                disabled={!activeLayer?.url || generating}
                className="w-full mt-4"
                onClick={async () => {
                    const newLayerId = crypto.randomUUID();

                    setGenerating(true);
                    const res = await bgRemove({
                        activeImage: activeLayer.url!,
                        format: activeLayer.format!,
                    })

                    if(res?.data?.success){
                        addLayer({
                            id: newLayerId,
                            url: res.data.success,
                            format: "png",
                            height: activeLayer.height,
                            width: activeLayer.width,
                            name: "BgRemoved" + activeLayer.name,
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
                    {generating ? 'Removing...' : 'Remove background'}
                </Button>
            </PopoverContent>
        </Popover>
    )
}