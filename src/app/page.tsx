import Navbar from "./components/layouts/Navbar";


export default function Home() {
  return (
    <div className="min-h-screen relative font-sans">
     <header className="container mx-auto px-4 md:px-6 pt-5 md:pt-10 relative z-10 max-w-6xl pb-24 md:pb-8">
        <Navbar/>
     </header>
    </div>
  );
}
