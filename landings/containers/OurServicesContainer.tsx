"use client";
import { useEffect, useMemo, useState } from "react";
import services from "@/content/our-services.json";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import hero from "@/content/cases-hero.json";

export const OurServices = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const logos = useMemo(() => hero.logos, []);

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
    <div
      className="max-w-screen-lg m-auto overflow-hidden pb-10 pt-36 w-full"
      id="what-we-do"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl z-10 md:text-5xl tracking-tighter max-w-xl text-center font-regular m-auto merriweather pt-20">
          {services.title}
        </h2>
        <p className="text-lg z-10 leading-relaxed tracking-tight max-w-xl text-center m-auto mb-16">
          {services.subheading}
        </p>
        <div
          className="container mx-auto p-4 space-y-8 pt-6 pb-24"
          id="our-techs"
        >
          <div className="container mx-auto">
            <div className="flex flex-col gap-10 relative">
              {/* <h2
            className={
              "text-3xl md:text-3xl max-w-2xl text-center font-regular  font-bold m-auto mb-10 merriweather"
            }
          >
            {content.header.text}
          </h2> */}

              <Carousel
                setApi={setApi}
                className="w-full"
                slidesToScroll={1}
                slidesToShow={3}
              >
                {" "}
                {/* Add slidesToShow prop */}
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
        <div className="pb-28">
          {services.description.map((desc, index) => (
            <p
              key={index}
              className={
                "text-xl leading-relaxed tracking-tight text-muted-foreground text-center "
              }
              dangerouslySetInnerHTML={{ __html: desc.text }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
