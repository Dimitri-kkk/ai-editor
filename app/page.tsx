"use client"

import Editor from "@/components/Editor";
import { ImageStore } from "@/lib/image-store";
import { LayerStore } from "@/lib/zustand-context";

export default function Home() {
  return (
    <LayerStore.Provider initialValue={{
      layerComparisonMode: false,
      layers: [{
      id: crypto.randomUUID(),
      url: "",
      height: 0,
      width: 0,
      publicId: "",
    }]}}>
    <ImageStore.Provider initialValue={{ generating: false }}>
      <main className="">
        <Editor />
      </main>
    </ImageStore.Provider>
    </LayerStore.Provider>
  );
}
