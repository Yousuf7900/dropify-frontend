import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Banner = () => {
    const slides = [
        {
            id: 1,
            title: "Discover Digital Products That Save You Time",
            subtitle:
                "Templates, UI kits, plugins, and tools — curated for creators and teams.",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        },
        {
            id: 2,
            title: "Launch Your Template, Course, or SaaS in Minutes",
            subtitle:
                "Publish your digital product, collect feedback, and grow with Dropify.",
            image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
        },
        {
            id: 3,
            title: "Build Faster With Ready-Made Assets",
            subtitle:
                "Get polished resources for design, development, and marketing — all in one place.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        },
    ];

    return (
        <section className="w-full">
            <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                pagination={{ clickable: true }}
                className="h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="h-full w-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >

                            <div className="absolute inset-0 bg-black/55" />

                            {/* content */}
                            <div className="relative z-10 h-full flex items-center">
                                <div className="max-w-7xl mx-auto px-6">
                                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                                        {slide.title}
                                    </h1>
                                    <p className="text-white/85 max-w-xl text-base md:text-lg">
                                        {slide.subtitle}
                                    </p>

                                    <div className="mt-7 flex flex-wrap gap-3">
                                        <a href="/products" className="btn btn-primary rounded-xl">
                                            Explore Products
                                        </a>
                                        <a
                                            href="/dashboard/add-product"
                                            className="btn btn-ghost rounded-xl text-white hover:bg-white/10"
                                        >
                                            Add Your Product
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;
