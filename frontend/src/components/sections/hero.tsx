"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const Hero = () => {
  const { isLoggedIn, isLoading } = useAuth();

  return (
    <section className="container mx-auto min-h-[90vh] flex items-center lg:mt-0 overflow-hidden px-4 md:px-10">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 lg:gap-8 xl:gap-16">
        
        {/* --- BAGIAN TEKS --- */}
        <div className="flex w-full lg:w-[55%] xl:w-[60%] flex-col space-y-5 lg:space-y-6 mt-10 lg:mt-0 z-10">
          <h1 className="text-primary font-playfair font-extrabold text-6xl lg:text-7xl xl:text-8xl leading-[0.9] tracking-tight">
            COFFESY
          </h1>
          
          <h2 className="text-foreground font-inter text-3xl lg:text-4xl xl:text-5xl font-bold">
            An online coffee store
          </h2>
          
          <p className="max-w-3xl text-muted-foreground font-inter font-medium text-base lg:text-lg xl:text-xl tracking-tight leading-relaxed">
            Straight to your doorstep. We don&apos;t roast our beans until we have
            your order. Every order is roasted and shipped the same day.
          </p>
          
          {/* Tombol diperbesar agar seimbang dengan teks raksasa */}
          <div className="flex  flex-wrap gap-4 pt-2">
            <Button className="bg-primary text-primary-foreground font-semibold rounded-2xl py-6 px-5 text-lg cursor-pointer hover:bg-primary/90 transition-colors duration-500 ease-out">
              Explore our Products
            </Button>
            {!isLoggedIn && !isLoading && (
              <Link href="/login">
                <Button
                  variant="outline"
                  className="font-semibold rounded-2xl py-6 px-5 text-lg cursor-pointer border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-500 ease-out"
                >
                  Log in / sign up
                </Button>
              </Link>
            )}
          </div>
          
          <div className="flex gap-12 pt-4">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-sm lg:text-base uppercase tracking-wider">
                Our products
              </span>
              <span className="text-foreground font-extrabold text-2xl lg:text-2xl">+1000</span>
            </div>
            <div className="border-l-2 border-border/50"></div>
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-sm lg:text-base uppercase tracking-wider">
                Total sales
              </span>
              <span className="text-foreground font-extrabold text-2xl lg:text-2xl">+340k</span>
            </div>
          </div>
        </div>

        {/* --- BAGIAN GAMBAR --- */}
        <div className="w-full lg:w-[45%] xl:w-[40%] flex justify-center lg:justify-end">
          {/* Wrapper gambar didorong hingga 800px di layar lebar */}
          <div className="relative w-[90%] sm:w-[80%] lg:w-full max-w-96 lg:max-w-2xl xl:max-w-4xl aspect-square flex items-center justify-center group shrink-0">
            
            {/* Background Blobmaker SVG */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-[110%] h-[110%] opacity-90 drop-shadow-lg transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3"
              >
                <path
                  fill="#BD6C2C"
                  d="M37.6,-54.7C48.7,-51.3,57.7,-40.9,63.8,-28.8C69.9,-16.7,73,-2.9,69,8.4C65,19.7,54,28.5,43.1,32.8C32.2,37,21.5,36.8,9.8,46C-1.9,55.3,-14.5,73.9,-20.6,71.6C-26.7,69.2,-26.2,45.8,-35.5,32.3C-44.7,18.8,-63.7,15.4,-72.3,5.8C-80.8,-3.8,-79.1,-19.6,-71.6,-31.4C-64.1,-43.2,-51,-51,-38.1,-53.6C-25.2,-56.1,-12.6,-53.4,0.3,-53.8C13.2,-54.3,26.4,-58,37.6,-54.7Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>

            {/* Foreground Coffee Image */}
            <div className="relative z-10 w-[90%] h-[90%] transition-transform duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-105">
              <Image
                src="/image/Hero-coffee.webp"
                alt="Hero Coffee Product"
                fill
                priority
                sizes="(max-width: 640px) 400px, (max-width: 1024px) 600px, 800px"
                className="object-contain drop-shadow-2xl cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;