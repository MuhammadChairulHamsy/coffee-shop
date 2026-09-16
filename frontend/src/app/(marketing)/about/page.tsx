import Marquee from "@/components/ui/marquee";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  return (
    <section className="mt-10 lg:mt-24 mb-24">
      {/* Container utama untuk teks dan gambar */}
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          {/* --- BAGIAN KIRI: TEKS & STATISTIK --- */}
          <div className="flex w-full lg:w-[55%] xl:w-[60%] flex-col justify-start gap-6 lg:pr-8">
            <div className="bg-secondary max-w-fit py-1.5 px-4 rounded-full flex items-center gap-2 text-primary text-xs font-bold tracking-widest uppercase">
              <span className="bg-primary rounded-full w-1.5 h-1.5"></span>
              OUR STORY - A JOURNEY OF FLAVORS
            </div>

            <h1 className="text-foreground font-playfair text-3xl sm:text-4xl lg:text-5xl xl:text-6xl lg:leading-[1.15] font-medium wrap-break-word">
              From selected beans, a <br className="hidden lg:block" />
              <span className="italic text-primary">dedication to flavor</span>{" "}
              is born.
            </h1>

            <p className="text-sm md:text-base text-foreground/70 leading-relaxed text-justify mb-2">
              Syycode., we view coffee not merely as a morning brew, but as a
              botanical canvas that captures the climate, volcanic soil, and the
              hard work of hillside farmers. Each roast is a heartfelt tribute
              to the long journey from ripe cherry to your cup.
            </p>

            <div className="bg-sidebar-primary-foreground p-6 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-playfair font-bold text-primary">100%</span>
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase">DIRECT TRADE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-playfair font-bold text-primary">12+</span>
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase">FARMING PARTNERS</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-playfair font-bold text-primary">88.5</span>
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase">AVG SCA SCORE</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-playfair font-bold text-primary">3 Lab</span>
                <span className="text-[10px] font-bold tracking-wider text-primary uppercase">ARTISAN CAFES</span>
              </div>
            </div>
          </div>

          {/* --- BAGIAN KANAN: GAMBAR & BADGE MELAYANG --- */}
          <div className="w-full lg:w-[45%] flex justify-center mt-12 lg:mt-0 relative">
            <div className="relative w-[90%] sm:w-[70%] lg:w-[420px] max-w-full z-10">
              <Image
                src="/image/Image-Profile-About-Coffee.png"
                alt="Image Profile About Coffee"
                width={420}
                height={550}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
                style={{ height: "auto" }}
                className="w-full h-auto object-cover rounded-md shadow-lg"
              />

              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-4 rounded-sm flex items-center justify-between shadow-sm">
                <span className="text-[11px] font-bold tracking-widest text-gray-500 uppercase">
                  MICRO-BATCH ROASTERY
                </span>
                <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">
                  EST. 2026
                </span>
              </div>

              <div className="absolute -bottom-8 -left-4 md:-left-16 bg-[#F6ECE7] p-4 rounded shadow-xl flex items-center gap-3 w-72 md:w-[320px] border border-white z-20">
                <BadgeCheck className="text-primary size-10 shrink-0" />
                <p className="text-xs text-primary leading-snug">
                  <strong>Cupping Room Certified.</strong> Weekly SCA cupping
                  standardization for every batch of green beans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- MARQUEE FULL WIDTH (Di luar container) --- */}
      <div className="mt-24 w-full overflow-hidden">
        <Marquee />
      </div>
    </section>
  );
};

export default AboutPage;