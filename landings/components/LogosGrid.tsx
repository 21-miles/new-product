import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface Logo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface LogoGridProps {
  title: string;
  logos: Logo[];
  gridClasses: string;
  configName: string;
}

export default function LogoGrid({
  title,
  logos,
  gridClasses,
  configName,
}: LogoGridProps) {
  return (
    <div
      id={configName}
      className="container mx-auto p-4 space-y-8 z-10 relative logosGrid pt-24 pb-32"
    >
      <Card>
        <CardHeader>
          <h2 className="text-3xl z-10 md:text-5xl tracking-tighter max-w-xl text-center font-regular m-auto merriweather">
            {title}
          </h2>
          <p className="text-lg z-10 leading-relaxed tracking-tight max-w-xl text-center m-auto mb-16">
            {title}
          </p>
          {/* <CardTitle className="text-3xl md:text-3xl max-w-2xl text-center font-regular merriweather font-bold m-auto mb-10">
            {title}
          </CardTitle> */}
        </CardHeader>
        <CardContent>
          <div className={gridClasses}>
            {logos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center p-4">
                <Image
                  src={`assets/images/${logo.src}`}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
