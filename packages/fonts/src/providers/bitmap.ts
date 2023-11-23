import {Glyph} from "../font/glyph";

export async function bitmap(
    source: ImageBitmap,
    ascent: number,
    height: number = 8,
    chars: string[]
): Promise<Map<string, Glyph>> {

    const glyphs = new Map<string, Glyph>()

    const rowHeight = source.height / chars.length

    for (let rowIdx = 0; rowIdx < chars.length; rowIdx++) {
        const dy = rowIdx * rowHeight
        const row = chars[rowIdx]

        const colWidth = source.width / row.length

        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const image = await createImageBitmap(
                source,
                colWidth * colIdx,
                dy,
                colWidth,
                rowHeight
            )

            // TODO: trim the glyph to size in the X axis
            glyphs.set(
                row[colIdx],
                {
                    height,
                    width: colWidth,
                    image,
                    ascent,
                    char: row[colIdx]
                }
            )
        }
    }

    return glyphs
}
