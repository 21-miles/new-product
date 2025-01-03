"use client";
export default function myImageLoader({ src, width, height, quality }) {
  let finalSrc =
    src + `?w=${width || 150}&h=${height || 150}&q=${quality || "auto"}`;

  if (src.includes("cloudinary") && !src.includes("w_")) {
    finalSrc = src.split("/image/upload/");
    finalSrc =
      finalSrc[0] +
      `/q_${quality || "auto"}/w_${width || "620"},f_auto/` +
      finalSrc[1];
  }
  const objReturn = `${finalSrc || "placeholder.png"}`;

  return `${objReturn}`;
}
