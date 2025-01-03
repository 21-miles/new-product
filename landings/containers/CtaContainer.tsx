import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";
import ctaContent from "@/content/cta-hero.json";

export const CtaContainer = () => (
  <div className="w-full py-10 lg:py-15 mt-12 mb-10">
    <div className="container mx-auto relative">
      {/* {ctaContent.backgroundImage && (
        <Image
          src={ctaContent.backgroundImage.src}
          width={ctaContent.backgroundImage.width}
          height={ctaContent.backgroundImage.height}
          alt={ctaContent.backgroundImage.alt}
          className="decor8 m-auto z-0"
          loading="lazy"
        />
      )} */}
      <div className="flex flex-col text-center bg-muted max-w-screen-md m-auto rounded-md p-4 lg:p-14 gap-8 items-center z-10 relative">
        <Badge className="text-white">{ctaContent.badge.text}</Badge>
        <div className="flex flex-col gap-2">
          <h3
            className={
              "text-3xl md:text-5xl tracking-tighter max-w-xl font-regular mb-6"
            }
          >
            {ctaContent.title.text}
          </h3>
          <p
            className={
              "text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl"
            }
            dangerouslySetInnerHTML={{ __html: ctaContent.description.text }}
          ></p>
        </div>
        <div className="flex flex-row gap-4 cta-btn">
          <Link
            href={ctaContent.ctaButton.href}
            className={
              "bg-primary text-brand-green hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
            }
          >
            {ctaContent.ctaButton.text}
            <MoveRight className="w-5 h-5 inline-block ml-3" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);
