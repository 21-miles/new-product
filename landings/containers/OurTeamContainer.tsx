"use client";
import teamData from "@/content/team.json";
import Image from "next/image";
import { Card, CardHeader, CardBody } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export const OurTeam = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [api, current]);

  return (
    <div
      className="bg-brand-green w-full py-16 lg:py-20 anchor-hack overflow-hidden pt-10"
      id="our-team"
    >
      <div className="container mx-auto">
        <div className="flex text-center justify-center items-center gap-4 flex-col z-10 relative">
          <div className="flex gap-2 flex-col relative max-w-screen-md w-full">
            <h2 className="text-3xl z-10 md:text-5xl tracking-tighter max-w-xl text-center font-regular m-auto merriweather text-primary-foreground">
              {teamData.sectionTitle}
            </h2>
            <p className="text-lg z-10 leading-relaxed tracking-tight text-primary-foreground max-w-xl text-center m-auto">
              {teamData.sectionSubtitle}
            </p>
          </div>
          <Carousel setApi={setApi} className="w-full pt-20">
            <CarouselContent>
              {teamData.members.map((member, index) => (
                <CarouselItem
                  key={index}
                  className="flex justify-center basis-1/3"
                >
                  <Card className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="flex flex-col items-center p-4">
                      <Image
                        src={member.image.src}
                        width={200}
                        height={356}
                        alt={member.image.alt}
                        className="rounded-full mb-4"
                      />
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {member.role}
                      </p>
                    </CardHeader>
                    <CardBody className="p-4">
                      <p className="text-center">{member.bio}</p>
                    </CardBody>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
