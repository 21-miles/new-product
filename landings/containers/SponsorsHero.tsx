import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import content from "@/content/stacks-hero.json";

export const StacksHero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => content.titles, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full z-10 relative">
      <div className="container mx-auto">
        <div className="flex gap-8 py-16 lg:py-16 items-center justify-center flex-col">
          <Link
            href={content.link1.link}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
          >
            {content.link1.text} <MoveRight className="w-4 h-4 inline-block" />
          </Link>
          <div className="flex gap-4 flex-col">
            <h2 className="text-5xl md:text-7xl max-w-2xl text-center font-regular workSans">
              <span className="text-spektr-cyan-50 flex justify-center mb-14">
                Início rápido com
              </span>
              <span className="relative flex justify-center items-center overflow-hidden text-center unkempt h100 bg-muted w-logos rounded m-auto mb-10">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                    }
                  >
                    <div>
                      {title.src === null ? (
                        <p className="text-black">{title.alt}</p>
                      ) : (
                        <Image
                          src={`/assets/images/${title.src}`}
                          alt={title.alt}
                          width={title.w}
                          height={title.h}
                        />
                      )}
                    </div>
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl text-center workSans">
              {content.description}
            </p>
          </div>
          <div className="flex flex-row gap-3 cta-btn">
            <Link
              href={content.button2.link}
              className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
            >
              {content.button2.text} <MoveRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
