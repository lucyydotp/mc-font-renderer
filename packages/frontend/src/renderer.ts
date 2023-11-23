import {Font} from "@mc-font-renderer/fonts";

export class Renderer {
    constructor(
        private readonly canvas: HTMLCanvasElement,
        private readonly font: Font,
        private readonly scale: number
    ) {
    }

    render(text: string) {
        const ctx = this.canvas.getContext("2d")!
        ctx.imageSmoothingEnabled = false
        const glyphs = []
        for (const char of text) {
            const glyph = this.font.getGlyph(char)
            if (glyph != null) glyphs.push(glyph)
        }

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        let x = 0
        for (const glyph of glyphs) {
            if (glyph.image) {
                ctx.drawImage(
                    glyph.image,
                    x,
                    (8 - glyph.ascent) * this.scale,
                    glyph.width * this.scale,
                    glyph.height * this.scale
                )
            }
            x += (glyph.width + 1) * this.scale
        }
    }
}
