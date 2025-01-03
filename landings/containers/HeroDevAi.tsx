import Link from "next/link";
import { MoveRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import heroDevAiContent from "@/content/dev-ai-hero.json";

export const HeroDevAi = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 z-10 relative">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">{heroDevAiContent.badge}</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1
              className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular"
              dangerouslySetInnerHTML={{ __html: heroDevAiContent.title }}
            />
            <p
              className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left"
              dangerouslySetInnerHTML={{ __html: heroDevAiContent.description }}
            />
          </div>
          <div className="flex flex-row gap-4 cta-btn">
            <Link
              href={heroDevAiContent.ctaButton.href}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
            >
              {heroDevAiContent.ctaButton.text}{" "}
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="rounded-md aspect-square flex items-center ml-auto">
          <Image
            src={heroDevAiContent.image.src}
            alt={heroDevAiContent.image.alt}
            width={heroDevAiContent.image.width}
            height={heroDevAiContent.image.height}
          />
        </div>
      </div>
    </div>
  </div>
);
