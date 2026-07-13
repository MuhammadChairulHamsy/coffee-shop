"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tambahkan logika submit newsletter di sini
    console.log("Subscribed email:", email);
  };

  return (
    <section className="container mx-auto mt-12 lg:mt-32 px-4 mb-20">
      <div className="relative overflow-hidden rounded-3xl bg-[#f5e9e2] dark:bg-zinc-900 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
        {/* Decorative Coffee Cup - Left */}
        <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 ">
          <Image
            src="/image/Coffee-cup-removebg-preview.webp"
            alt="Coffee Cup"
            width={400}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Join in and get %25 OFF!
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base font-medium">
            Subscribe to our newsletter and get %25 OFF discount code.
          </p>

          {/* Form Input */}
          <form
            onSubmit={handleSubmit}
            className="pt-4 flex flex-col sm:flex-row gap-3 items-center justify-center"
          >
            <div className="relative w-full sm:w-80">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-background dark:bg-zinc-800 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
            <Button
              size="lg"
              className="rounded-full px-8 w-full sm:w-auto font-semibold cursor-pointer"
            >
              Subscribe
            </Button>
          </form>
        </div>

        {/* Decorative Coffee Beans - Right */}
        <div className="hidden lg:block absolute -right-16 -bottom-8">
          <Image
            src="/image/Seed-coffee-test.webp"
            alt="Coffee Beans"
            width={230}
            height={230}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
