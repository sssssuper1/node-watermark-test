import { resolve } from 'path'
import { fileURLToPath } from 'url'
// import { addWatermark } from './watermark/jimp.js'
import { addWatermark } from './watermark/sharp.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

const testWatermark = () => {
  const inputPath = resolve(__dirname, './images/wallpaper.jpeg')
  const outputPath = resolve(__dirname, './output/wallpaper-watermarked.jpeg')
  const text = Date.now().toString()
  addWatermark({
    inputPath,
    outputPath,
    text,
  })
}

testWatermark()
