import { useLayerStore } from "@/lib/zustand-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { useImageStore } from "@/lib/image-store";
import { Button } from "../ui/button";
import { Layers2 } from "lucide-react";

export default function Layers() {
    const layers = useLayerStore((state) => state.layers);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const generating = useImageStore((state) => state.generating);

    return (
        <Card className="basis-[320px] shrink-0 scrollbar-thin scrollbar-track-secondary overflow-y-scroll 
        scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full 
        overflow-x-hidden relative flex flex-col shadow-2xl"
        >
            <CardHeader className="">
                <div>
                    <CardTitle className="text-sm">{activeLayer.name || "Layers"}</CardTitle>
                    {activeLayer.width && activeLayer.height ? (
                        <CardDescription>
                            {activeLayer.width}x{activeLayer.height}
                        </CardDescription>
                    ) : null}
                </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                {layers.map((layer, index) => 
                  <div className={cn("cursor-pointer ease-in-out hover:bg-secondary border border-transparent", {"animate-pulse" : generating})} key={layer.id}>
                    <div className="relative p-4 flex items-center">
                        <div className="flex gap-2 items-center h-8 w-full justify-between">
                            {!layer.url ? (
                                <p className="text-xs font-medium justify-end">New layer</p>
                            ) : null}
                        </div>
                    </div>
                  </div>
                )}
            </CardContent>
            <div className="sticky bottom-0 bg-card flex gap-2 shrink-0">
                <Button className="w-full flex gap-2" variant={"outline"}>
                    <span>Create Layer</span>
                    <Layers2 size={18} className="text-secondary-foreground" />
                </Button>
            </div>
        </Card>
    )
}