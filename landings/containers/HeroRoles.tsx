import { MoveRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import heroRolesContent from "@/content/roles-hero.json";

export const HeroRoles = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 z-10 relative">
        <div className="flex gap-4 flex-col">
          <div>
            <Badge variant="outline">{heroRolesContent.badge}</Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-lg tracking-tighter text-left font-regular">
              {heroRolesContent.title}
            </h1>
            <p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
              {heroRolesContent.description}
            </p>
          </div>
          <div className="flex flex-row gap-4 cta-btn">
            <Link
              href={heroRolesContent.ctaButton.href}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
            >
              {heroRolesContent.ctaButton.text}{" "}
              <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {heroRolesContent.images.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
