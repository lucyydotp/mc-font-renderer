import {Glyph} from "./glyph";

export type ResourceKey = `${string}:${string}`

export interface Font {
    name: ResourceKey,
    getGlyph(char: string): Glyph | undefined
}
