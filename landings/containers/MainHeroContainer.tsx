import React from "react";
import Image from "next/image";
import content from "@/content/main-hero.json";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export const MainHero = () => {
  const { logo, decorImage } = content;
  const showDecorImage = decorImage.src && decorImage.src.trim() !== "";

  return (
    <>
      <div className="w-full m-auto main-hero relative" id="main-hero">
        <div className="container m-auto">
          <div className="flex items-center justify-center relative">
            <Image
              src={logo.src}
              alt={logo.alt}
              className="mt-20 z-10"
              width={logo.width}
              height={logo.height}
            />
            {showDecorImage && (
              <Image
                src={decorImage.src}
                width={decorImage.width}
                height={decorImage.height}
                alt={logo.alt}
                className="hero decor1 m-auto z-0"
                loading="lazy"
              />
            )}
          </div>
        </div>
        <div className="half-green-bg w-full m-auto"></div>
      </div>
      <div className="w-full z-10 relative pb">
        <div className="container mx-auto">
          <div className="flex gap-6 py-8 lg:py-8 items-center justify-center flex-col">
            <p className="max-w-xl lg:max-w-lg merriweather text-primary-foreground text-center">
              <strong>{content.link1.text}</strong>
            </p>
            <Link
              href={content.link1.link}
              className="bg-primary text-brand-green hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
            >
              {content.link1.button}{" "}
              <MoveRight className="w-4 h-4 inline-block" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
