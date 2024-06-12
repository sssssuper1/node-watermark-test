import Jimp from 'jimp'

export const addWatermark = async ({
  inputPath,
  outputPath,
  text,
}) => {
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
  const image = await Jimp.read(inputPath);

  image.print(font, 10, 10, text);

  await image.writeAsync(outputPath)
}
