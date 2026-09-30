"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";

const banners = [
    {
        src: "/banner-skd.png",
        alt: "Banner SKD",
    },
    {
        src: "/banner-toefl.png",
        alt: "Banner TOEFL",
    },
    {
        src: "/banner-skd1.png",
        alt: "Banner SKD",
    },
    {
        src: "/banner-toefl2.png",
        alt: "Banner TOEFL",
    },
];

export function Banner() {

    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    const plugin = React.useMemo(
        () =>
            Autoplay({
                delay: 4000,
                stopOnInteraction: false,
            }),
        []
    );

    React.useEffect(() => {
        if (!api) return;

        const onSelect = () => {
            setCurrent(api.selectedScrollSnap());
        };

        onSelect();
        api.on("select", onSelect);

        return () => {
            api.off("select", onSelect);
        };
    }, [api]);

    return (
        <section className="mt-5 w-full">
            <Carousel setApi={setApi} plugins={[plugin]} opts={{ loop: true, }} className="w-full max-w-[1728px] mx-auto">
                <CarouselContent className="w-full mx-auto">
                    {banners.map((banner, index) => (
                        <CarouselItem key={banner.src} className="basis-full px-4 md:px-9 lg:px-15">
                            {/*Banner*/}
                            <div className="relative w-full aspect-[16/5] rounded-xl overflow-hidden">
                                <Image src={banner.src} alt={banner.alt} fill priority={index === 0} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1728px" className="object-cover" />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Indikator */}
                <div className="absolute bottom-2 md:bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-0.5 md:gap-1.5">
                    {banners.map((banner, index) => (
                        <button
                            key={banner.src}
                            type="button"
                            aria-label={`Ke banner ${index + 1}`}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-1 md:h-1.5 rounded-full transition-all duration-300
                                ${current === index
                                    ? "w-4 md:w-8 bg-[#0068F3]"
                                    : "w-2 md:w-4 bg-gray-300"
                                }
                            `}
                        />
                    ))}
                </div>
            </Carousel>
        </section >
    )
}