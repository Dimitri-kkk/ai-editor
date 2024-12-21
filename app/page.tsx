"use client"

import Editor from "@/components/Editor";
import { ImageStore } from "@/lib/image-store";

export default function Home() {
  return (
    <ImageStore.Provider initialValue={{ generating: false }}>
      <main className="">
        <Editor />
      </main>
    </ImageStore.Provider>
  );
}
