"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import content from "@/content/cases-hero.json";

export const OurTechs = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const logos = useMemo(() => content.logos, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000);
  }, [api, current]);

  return (
    <div className="container mx-auto p-4 space-y-8 pt-36 pb-32" id="our-techs">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10 relative">
          {/* <h2
            className={
              "text-3xl md:text-3xl max-w-2xl text-center font-regular  font-bold m-auto mb-10 merriweather"
            }
          >
            {content.header.text}
          </h2> */}

          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {logos.concat(logos).map((logo, index) => (
                <CarouselItem
                  className="basis-1/4 lg:basis-1/6 logos-carousel"
                  key={index}
                >
                  <Image
                    src={`/assets/images/${logo.src}`}
                    width={logo.width}
                    height={logo.height}
                    alt={logo.alt}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
