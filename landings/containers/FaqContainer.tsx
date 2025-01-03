import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "@/content/faq.json";

export const FaqContainer = () => (
  <div
    className="w-full testimonial-wrapper overflow-hidden pb-28 pt-32"
    id="faq"
  >
    <div className="container mx-auto relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-10 z-10 relative">
        <div className="flex gap-10 flex-col">
          <div className="flex gap-4 flex-col">
            <div className="flex gap-2 flex-col">
              <h2 className="text-3xl z-10 md:text-5xl tracking-tighter max-w-xl text-center font-regular m-auto merriweather mb-4">
                {faqData.title}
              </h2>
              <p className="text-lg z-10 leading-relaxed tracking-tight max-w-xl text-center m-auto mb-4">
                {faqData.description}
              </p>
              <a
                href={faqData.button.url}
                target="_blank"
                rel="nofollow noindex noreferrer"
                className="bg-primary text-brand-green hover:bg-primary/90 h-10 rounded-md px-8 gap-4 purple-btn"
              >
                {faqData.button.text}
              </a>
            </div>
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full bg-muted faq">
          {faqData.faqItems.map((item, index) => (
            <AccordionItem key={index} value={"index-" + index}>
              <AccordionTrigger>{item.label}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </div>
);
