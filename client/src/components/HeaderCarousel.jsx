import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,

  CarouselPrevious,
  CarouselNext
} from "./ui/carousel";

import { Card, CardContent } from "./ui/card"


export function HeaderCarousel() {

    const images = [
        "https://image.lexica.art/md/0482ee68-0368-4eca-8846-5930db866b33",
        "https://image.lexica.art/md/76318f25-5736-4cda-965d-96fe34823263",
        "https://image.lexica.art/md/c11dd279-757e-43ff-8305-43e106f6c345",
        "https://image.lexica.art/md/f38d92bb-99bc-4611-938f-c5d6cc70d6ea",
        "https://image.lexica.art/md/dbbb96f1-fce2-4970-ab62-b4b4e6859fe9"
      ];
      
      
  const plugin = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1 w-1000 h-100">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-0">
                {
                    <img
                        src={images[index]}
                        alt={`Image ${index + 1}`}
                        className="object-cover w-full h-full rounded-lg"
                    />
                    
                }
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
