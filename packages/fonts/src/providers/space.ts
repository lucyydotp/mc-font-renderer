import {Provider} from "./provider";
import {Glyph} from "../font/glyph";

interface SpaceProviderDefinition {
    type: "space",
    advances: {
        [k: string]: number
    }
}

export class SpaceProvider implements Provider {

    private static readonly EMPTY_IMAGE = new ImageBitmap()
    private readonly map = new Map<string, Glyph>()

    constructor(private readonly definition: SpaceProviderDefinition) {
        for (const [char, advance] of Object.entries(this.definition.advances)) {
            this.map.set(
                char,
                {
                    char,
                    height: 0,
                    width: advance,
                    ascent: 0,
                    image: SpaceProvider.EMPTY_IMAGE
                }
            )
        }
    }

    get glyphs() {
        return this.map
    }
}
