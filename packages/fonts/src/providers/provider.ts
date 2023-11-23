import {Glyph} from "../font/glyph";

export interface Provider {
    glyphs: Map<string, Glyph>
}
