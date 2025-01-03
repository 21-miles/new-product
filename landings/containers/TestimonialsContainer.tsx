"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import testimonialsData from "@/content/testimonials.json";

export const TestimonialsContainer = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);
  }, [api, current]);

  return (
    <div
      className="bg-brand-green container mx-auto p-4 space-y-8 pt-28 pb-32"
      id="testimonials"
    >
      <div className="container mx-auto z-10 relative">
        <div className="flex flex-col testimonial">
          <h2 className="text-3xl z-10 md:text-5xl tracking-tighter max-w-xl text-center font-regular m-auto merriweather text-primary-foreground">
            {testimonialsData.title}
          </h2>
          <p className="text-lg z-10 leading-relaxed tracking-tight text-primary-foreground max-w-xl text-center m-auto mb-16">
            {testimonialsData.subheading}
          </p>

          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {testimonialsData.testimonials.map((testimonial, index) => (
                <CarouselItem
                  className="lg:basis-1/2 mr-4 carousel-item"
                  key={index}
                >
                  <div className="bg-muted testimonial-bg rounded-md h-full lg:col-span-2 p-6 flex justify-between flex-col">
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-xl tracking-tight">
                          {testimonial.label}
                        </h3>
                        <p className="text-muted-foreground max-w-xs text-base">
                          {testimonial.content}
                        </p>
                      </div>
                      <p className="flex flex-row gap-2 text-sm items-center">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={`/assets/images/logo-github.png`}
                            alt={"User"}
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{testimonial.author}</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
