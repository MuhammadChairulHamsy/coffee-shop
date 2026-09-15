import React from "react";

const Marquee = () => {
  const marqueeData = [
    { text: "COFFESY", isBrand: true },
    { text: "✦", isSeparator: true },
    { text: "100% ETHICALLY SOURCED BEANS", isBrand: false },
    { text: "✦", isSeparator: true },
    { text: "CRAFTED WITH PASSION", isBrand: false },
    { text: "✦", isSeparator: true },
    { text: "SCA CERTIFIED CUPPING", isBrand: false },
    { text: "✦", isSeparator: true },
    { text: "ARTISAN MICRO-BATCH ROAST", isBrand: false },
    { text: "✦", isSeparator: true },
  ];

  const renderContent = (
    <div className="flex items-center space-x-8 px-4">
      {marqueeData.map((item, index) => (
        <span
          key={index}
          className={`text-xs md:text-sm tracking-[0.2em] whitespace-nowrap uppercase transition-colors ${
            item.isBrand
              ? "font-extrabold text-primary-foreground font-playfair italic underline decoration-wavy decoration-1 underline-offset-4"
              : item.isSeparator
              ? "text-primary-foreground/40 font-light text-xs"
              : "font-semibold text-primary-foreground/90 font-inter"
          }`}
        >
          {item.text}
        </span>
      ))}
    </div>
  );

  return (
    <section className="w-full bg-primary py-4 overflow-hidden shadow-sm select-none">
      {/* Kecepatan 35s - 40s ideal agar tidak membuat pengunjung pusing */}
      <div 
        className="flex w-max animate-marquee" 
        style={{ animationDuration: '35s' }}
      >
        {/* Render 4 kelompok untuk memastikan loop berjalan tanpa celah di layar Ultrawide */}
        <div className="flex shrink-0 items-center">
          {renderContent}
          {renderContent}
        </div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {renderContent}
          {renderContent}
        </div>
      </div>
    </section>
  );
};

export default Marquee;