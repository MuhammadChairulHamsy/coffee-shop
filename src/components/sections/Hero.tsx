import Image from "next/image";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="container mt-3 lg:mt-20">
      <div className="flex flex-col items-center lg:flex-row justify-center">
        <div className="flex flex-col space-y-5 px-10 lg:px-0 lg:space-y-10">
          <h1 className="text-primary font-playfair font-extrabold text-5xl lg:text-8xl">
            COFFESY
          </h1>
          <span className="text-foreground font-inter text-3xl font-bold lg:text-5xl">
            An online coffee store
          </span>
          <p className="max-w-4xl text-muted-foreground font-inter font-medium text-[15px] lg:text-2xl tracking-tight">
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
              <span className="text-muted-foreground text-sm">Our products</span>
              <span className="text-foreground font-bold text-xl">+1000</span>
            </div>
            <div className="border-l border-border"></div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Total sales</span>
              <span className="text-foreground font-bold text-xl">+340k</span>
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/image/Coffee-shop.webp"
            unoptimized
            priority
            width={400}
            height={400}
            alt="Hero Coffee"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;