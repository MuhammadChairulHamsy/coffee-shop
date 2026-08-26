"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isInvisible, setIsInvisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsInvisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isInvisible) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={scrollToTop}
        size="icon"
        aria-label="Scroll to top"
        className="rounded-full w-12 h-12 bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default ScrollToTop;
