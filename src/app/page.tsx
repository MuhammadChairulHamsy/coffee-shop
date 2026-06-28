import Navbar from "./components/layouts/navbar";
import Hero from "./components/sections/Hero";

export default function Home() {
  return (
    <div className="min-h-screen relative font-sans">
      <header className="container mx-auto px-4 md:px-6 pt-5 md:pt-10 relative z-10 pb-24 md:pb-8">
        <Navbar />
      </header>
      <main>
        <Hero/>
      </main>
    </div>
  );
}
