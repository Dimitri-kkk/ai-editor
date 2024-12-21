import { createStore } from "zustand/vanilla"
import { StoreApi, useStore } from "zustand"
import React from "react"
import { persist, createJSONStorage } from "zustand/middleware"




export type Layer = {
    publicId?: string
    width?: number
    height?: number
    url?: string
    id: string
    name?: string
    format?: string
    poster?: string
    resourceType?: string
    transcriptionURL?: string
  }

  type State = {
    layers: Layer[]
    addLayer: (layer: Layer) => void
    removeLayer: (id: string) => void
    setActiveLayer: (id: string) => void
    activeLayer: Layer
    updateLayer: (layer: Layer) => void
    setPoster: (id: string, posterUrl: string) => void
    setTranscription: (id: string, transcriptionURL: string) => void 
    layerComparisonMode: boolean
    setLayerComparisonMode: (mode: boolean) => void
    comparedLayers: string[]
    setComparedLayers: (layers: string[]) => void
    toggleComparedLayer: (id: string) => void
  }