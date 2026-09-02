import { existsSync, readdirSync } from "fs";
import path from "path";

const publicDir = path.join(process.cwd(), "public");
const productDir = path.join(publicDir, "product");

function publicExists(...segments: string[]): boolean {
  return existsSync(path.join(publicDir, ...segments));
}

export function getProductMedia() {
  const demoVideo = publicExists("product", "demo.mp4")
    ? "/product/demo.mp4"
    : null;

  const cacJpg = publicExists("product", "cac-certificate.jpg");
  const cacPng = publicExists("product", "cac-certificate.png");
  const cacImage = cacJpg
    ? "/product/cac-certificate.jpg"
    : cacPng
      ? "/product/cac-certificate.png"
      : null;

  const cacPdf = publicExists("cac-certificate.pdf")
    ? "/cac-certificate.pdf"
    : null;

  const preferredShots = [
    "desk-command.png",
    "desk-incident.png",
    "desk-intake.png",
    "desk-fields.png",
    "desk-market.png",
    "desk-weather.png",
  ];

  let screenshots: string[] = preferredShots
    .filter((name) => publicExists("product", name))
    .map((name) => `/product/${name}`);

  if (screenshots.length < 4 && existsSync(productDir)) {
    screenshots = readdirSync(productDir)
      .filter((name) => /^(desk-|shot-).+\.(png|jpg|jpeg|webp)$/i.test(name))
      .sort()
      .map((name) => `/product/${name}`);
  }

  const logoSvg = publicExists("logo.svg");
  const logoPng = publicExists("logo.png");
  const logo = logoSvg ? "/logo.svg" : logoPng ? "/logo.png" : null;

  return {
    demoVideo,
    screenshots,
    cacImage,
    cacPdf,
    logo,
  };
}

export type ProductMedia = ReturnType<typeof getProductMedia>;
