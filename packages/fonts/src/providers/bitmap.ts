import {Glyph} from "../font/glyph";

function colorAt(image: ImageData, x: number, y: number) {
    const idx = ((image.width * y) + x) * 4
    return [
        image.data[idx],
        image.data[idx + 1],
        image.data[idx + 2],
        image.data[idx + 3],
    ]
}

function getActualWidth(image: ImageData, x: number, y: number, width: number, height: number) {
    let actualWidth = width - 1

    outer: while (true) {
        if (actualWidth <= 0) break
        for (let offsetY = 0; offsetY < height; offsetY++) {
            const color = colorAt(image, x + actualWidth, y + offsetY)
            if (color[3] != 0) break outer
        }
        actualWidth--
    }
    // todo: why 2?
    return actualWidth + 2
}

declare const ctx: CanvasRenderingContext2D

export async function bitmap(
    source: ImageData,
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

        console.log(`row height ${rowHeight}, col width ${colWidth}`)

        for (let colIdx = 0; colIdx < row.length; colIdx++) {
            const char = row[colIdx]
            if (char == '\u0000') continue

            const actualWidth = getActualWidth(
                source,
                colWidth * colIdx,
                dy,
                colWidth,
                rowHeight
                )

            console.log(`${char}: ${actualWidth}`)

            const image = await createImageBitmap(
                source,
                colWidth * colIdx,
                dy,
                actualWidth,
                rowHeight
            )

            glyphs.set(
                char,
                {
                    height,
                    width: actualWidth,
                    image,
                    ascent,
                    char: row[colIdx]
                }
            )
        }
    }

    return glyphs
}
