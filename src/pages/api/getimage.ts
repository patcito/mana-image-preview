import { createCanvas, loadImage } from "canvas";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  imageUrlFinal: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const text = query.text;
  const imagePath = "./public/images/manatweet.jpg";

  // Load image from URL
  const image = await loadImage(imagePath as string);

  console.log(1, image);

  // Create canvas
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext("2d");

  // Draw image on canvas
  ctx.drawImage(image, 0, 0, image.width, image.height);

  // Draw text on canvas
  ctx.font = "bold 100px Arial";
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.fillText(text as string, canvas.width / 2, 208);

  // Convert canvas to image buffer

  // Save image buffer to file

  // Send image URL as response
  // Convert canvas to image buffer
  const buffer = canvas.toBuffer("image/jpeg");

  // Send image buffer as response
  res.setHeader("Content-Type", "image/jpeg");
  res.setHeader("Cache-Control", "public, max-age=604800, immutable");
  //@ts-ignore
  res.send(buffer);
}
