"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Coffee } from "lucide-react";

const PackingPage = () => {
  return (
    <section className="container mx-auto mt-10 mb-20 lg:mt-20">
      <div className="flex flex-col mx-2 gap-5 pb-5 lg:mb-5 lg:flex-col">
        <div className="bg-secondary max-w-fit py-1.5 px-4 rounded-full flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase">
          <span className="bg-primary rounded-full w-1.5 h-1.5"></span>
          CIRCULAR STEWARDSHIP
        </div>
        <h1 className="text-foreground font-inter text-3xl sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-[1.15] font-bold wrap-break-word">
          Enggineered for <span className="md:block lg:block"> Freshness.</span>
          <span className="text-primary md:block lg:block"> Designed for the Planet.</span>
        </h1>
        <p>
          How we preserve delicate volatile aromatics and sweet natural cup{" "}
          <span className="md:block lg:block">
            profiles while completely eliminating petroleum plastics from your
          </span>
          <span> morning pour-over ritual. </span>
        </p>
      </div>
      <div className="flex flex-row gap-2 mx-2">
        <Button variant="outline">
          <ArrowDown className="mr-1 size-4" /> Explore the pack science
        </Button>
        <Button>
          <Coffee className="mr-1 size-4" />
          Available pack formats
        </Button>
      </div>
    </section>
  );
};

export default PackingPage;
