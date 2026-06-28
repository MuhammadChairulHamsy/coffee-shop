import Image from "next/image";
import { Button } from "../ui/button";

const hero = () => {
  return (
    <section className="container mt-20">
      <div className="flex flex-col items-center lg:flex-row justify-center">
        <div className="flex flex-col space-y-10 px-10 lg:px-0">
          <h1 className="text-[#77463D] font-inter font-bold text-[14px] lg:text-8xl ">
            COFFEO
          </h1>
          <span className="text-[#3B180A] font-inter text-lg font-bold lg:text-5xl">
            An online coffee store
          </span>
          <p className="max-w-4xl text-[#686160] font-inter font-medium text-sm lg:text-2xl tracking-tight">
            Straight to your doorstep. We don't roast our beans until we have
            your order. Every order is roasted and shipped the same day.
          </p>
          <div className="flex gap-3">
            <Button className="font-semibold rounded-2xl py-6 px-5 cursor-pointer">
              Explore our Products
            </Button>
            <Button
              variant={"outline"}
              className="font-semibold rounded-2xl py-6 px-5 cursor-pointer"
            >
              Log in / sign up
            </Button>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <span className="">Our products</span>
              +1000
            </div>
            <div className="border"></div>
            <div className="flex flex-col">
              <span>Total sales</span>
              +340k
            </div>
          </div>
        </div>
        <div>
          <Image
            src="/coffeo.svg"
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

export default hero;
