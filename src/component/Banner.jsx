"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

import {
    Autoplay,
    Navigation,
    Pagination,
} from "swiper/modules";

import bannerData from "@/data/Bannerdata";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const Banner = () => {
    return (
        <section className="relative">

            <Swiper
                modules={[
                    Autoplay,
                    Navigation,
                    Pagination,
                ]}
                slidesPerView={1}
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                className="h-[85vh]"
            >
                {bannerData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div
                            className="relative w-full h-[85vh] bg-cover bg-center"
                            style={{
                                backgroundImage: `url(${slide.image})`,
                            }}
                        >
                            <div className="absolute inset-0 bg-black/55"></div>
                            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">

                                <div className="max-w-3xl text-white">
                                    <div className="inline-block bg-white/90 text-slate-800 px-5 py-2 rounded-full text-sm font-bold tracking-wide mb-6">
                                        {slide.badge}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                                        {slide.title}
                                    </h1>

                                    <p className="mt-6 text-lg md:text-2xl text-slate-200 leading-relaxed max-w-2xl">
                                        {slide.description}
                                    </p>
                                    <Link
                                        href="/ideas"
                                        className="inline-flex items-center gap-3 mt-10 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 px-8 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:scale-105"
                                    >
                                        {slide.button}
                                        <span className="text-2xl">
                                            <ArrowBigRight></ArrowBigRight>
                                        </span>
                                    </Link>
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