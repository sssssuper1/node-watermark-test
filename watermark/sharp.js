import Sharp from "sharp";

const defaultOptions = {
  ratio: 0.4,
  dpi: 300,
  opacity: 0.6,
  position: "center",
  x: undefined,
  y: undefined,
};

const positions = {
  center: "center",
  top: "north",
  bottom: "south",
  left: "west",
  right: "east",
  topLeft: "northwest",
  topRight: "northeast",
  bottomLeft: "southwest",
  bottomRight: "southeast",
};

const getTextAlignment = (position) => {
  if (["left", "top-left", "bottom-left"].includes(position)) return "left";
  if (["right", "top-right", "bottom-right"].includes(position)) return "right";
  return "center";
};

const getAlpha = (opacity) => {
  return Math.round(opacity * 255).toString(16).padStart(2, "0");
};

const addTextWatermark = async (mainImage, watermarkText, options = {}) => {
  const allOptions = { ...defaultOptions, ...options };
  const { dpi, opacity, position, x, y } = allOptions;

  const mainImageBuffer = await Sharp(mainImage).toBuffer();

  const textColor = `#000000${getAlpha(opacity)}`;

  const watermarkObj = {
    text: {
      text: `<span foreground="${textColor}">${watermarkText}</span>`,
      align: getTextAlignment(position),
      dpi: dpi,
      rgba: true,
    },
  };

  return Sharp(mainImageBuffer)
    .composite([
      {
        input: watermarkObj,
        top: y,
        left: x,
        gravity: positions[position],
      },
    ])
    .withMetadata();
};

export const addWatermark = async ({ inputPath, outputPath, text }) => {
  const compositeImage = await addTextWatermark(inputPath, text, {
    x: 10,
    y: 10,
  });

  await compositeImage.toFile(outputPath);
};
