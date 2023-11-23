import {Renderer} from "./renderer";
import {DEFAULT_FONT} from "./defaultFont";

const canvas = document.getElementById("output-canvas") as HTMLCanvasElement


const renderer = new Renderer(
    canvas,
    DEFAULT_FONT,
    4
)

document.getElementById("input")!.oninput = (e) => {
    const text = (e.currentTarget as HTMLInputElement).value
    renderer.render(text)
}
