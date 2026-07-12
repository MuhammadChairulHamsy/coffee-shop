import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="container mt-3 lg:mt-10">
      <div className="flex flex-col items-center lg:flex-row justify-around">
        <div className="flex flex-col space-y-5 px-10 lg:px-0 lg:space-y-7">
          <h1 className="text-primary font-playfair font-extrabold text-5xl lg:text-8xl">
            COFFESY
          </h1>
          <h2 className="text-foreground font-inter text-3xl font-bold lg:text-5xl">
            An online coffee store
          </h2>
          <p className="max-w-[730px] text-muted-foreground font-inter font-medium text-[15px] lg:text-xl tracking-tight">
            Straight to your doorstep. We don't roast our beans until we have
            your order. Every order is roasted and shipped the same day.
          </p>
          <div className="flex gap-3">
            <Button className="bg-primary text-primary-foreground font-semibold rounded-2xl py-6 px-5 cursor-pointer hover:bg-primary/90">
              Explore our Products
            </Button>
            <Button
              variant="outline"
              className="font-semibold rounded-2xl py-6 px-5 cursor-pointer border-border text-foreground hover:bg-accent hover:text-accent-foreground"
            >
              Log in / sign up
            </Button>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">
                Our products
              </span>
              <span className="text-foreground font-bold text-xl">+1000</span>
            </div>
            <div className="border-l border-border"></div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Total sales</span>
              <span className="text-foreground font-bold text-xl">+340k</span>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[550px] aspect-square flex items-center justify-center">
          {/* Background Blobmaker SVG */}
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <svg
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full scale-110 opacity-90 drop-shadow-lg transition-transform duration-500 hover:scale-115"
            >
              <path
                fill="#BD6C2C"
                d="M37.6,-54.7C48.7,-51.3,57.7,-40.9,63.8,-28.8C69.9,-16.7,73,-2.9,69,8.4C65,19.7,54,28.5,43.1,32.8C32.2,37,21.5,36.8,9.8,46C-1.9,55.3,-14.5,73.9,-20.6,71.6C-26.7,69.2,-26.2,45.8,-35.5,32.3C-44.7,18.8,-63.7,15.4,-72.3,5.8C-80.8,-3.8,-79.1,-19.6,-71.6,-31.4C-64.1,-43.2,-51,-51,-38.1,-53.6C-25.2,-56.1,-12.6,-53.4,0.3,-53.8C13.2,-54.3,26.4,-58,37.6,-54.7Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          {/* Foreground Coffee Image */}
          <div className="relative z-10 w-[85%] h-[85%] transition-transform duration-500 ease-out hover:-translate-y-2">
            <Image
              src="/image/Hero-coffee.webp"
              alt="Hero Coffee Product"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 420px, 500px"
              className="object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
