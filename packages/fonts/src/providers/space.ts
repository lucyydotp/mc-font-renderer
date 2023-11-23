import {Glyph} from "../font/glyph";

export function spaces(advances: {[k: string]: number}) {
    const map = new Map<string, Glyph>()
    for (const [char, advance] of Object.entries(advances)) {
        map.set(
            char,
            {
                char,
                height: 0,
                width: advance,
                ascent: 0,
                image: undefined
            }
        )
    }
    return map
}
