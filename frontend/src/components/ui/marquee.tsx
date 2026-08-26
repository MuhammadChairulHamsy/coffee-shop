const Marquee = () => {
  const marqueeData = [
    { text: "COFFESY", isBrand: true },
    { text: "✦", isSeparator: true },
    { text: "FRESHLY BREWED EVERY DAY", isBrand: false },
    { text: "✦", isSeparator: true },
    { text: "PREMIUM COFFEE EXPERIENCE", isBrand: false },
    { text: "✦", isSeparator: true },
    { text: "GET 10% OFF YOUR FIRST CUP", isBrand: false },
    { text: "✦", isSeparator: true },
  ];

  const renderContent = (
    <div className="flex items-center space-x-6 px-3">
      {marqueeData.map((item, index) => (
        <span
          key={index}
          className={`text-sm md:text-base tracking-widest whitespace-nowrap uppercase ${
            item.isBrand 
              ? "font-black text-background underline decoration-wavy decoration-2" 
              : item.isSeparator 
              ? "text-background/60 font-normal animate-pulse" 
              : "font-medium text-background/90"
          }`}
        >
          {item.text}
        </span>
      ))}
    </div>
  );

  return (
    <section className="w-full mt-24 bg-primary mb-20 overflow-hidden py-5 shadow-sm">
      {/* Kecepatan disetel 40s agar teks yang panjang nyaman dibaca */}
      <div className="marquee-wrapper animate-marquee" style={{ animationDuration: '40s' }}>
        
        {/* Kelompok A */}
        <div className="marquee-content">
          {renderContent}
          {renderContent} {/* Diulang agar memenuhi layar lebar */}
        </div>
        
        {/* Kelompok B (Duplikat Seamless) */}
        <div className="marquee-content" aria-hidden="true">
          {renderContent}
          {renderContent}
        </div>
        
      </div>
    </section>
  );
};

export default Marquee;