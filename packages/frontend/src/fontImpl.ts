import {Font, Provider} from "@mc-font-renderer/fonts";
import {Glyph} from "@mc-font-renderer/fonts";

export class FontImpl implements Font {
    readonly name = "minecraft:default"
    constructor(private readonly providers: Map<string, Glyph>[]) {

    }

    getGlyph(char: string): Glyph | undefined {
        for (const provider of this.providers) {
            const glyph = provider.get(char)
            if (glyph != undefined) return glyph
        }
        return undefined
    }
}


