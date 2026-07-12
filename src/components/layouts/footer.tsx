import Image from "next/image";
import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    id: 1,
    title: "Privacy",
    links: [
      { label: "Terms of use", href: "/terms" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
  {
    id: 2,
    title: "Services",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Order ahead", href: "/order" },
      { label: "Menu", href: "/menu" },
    ],
  },
  {
    id: 3,
    title: "About us",
    links: [
      { label: "Find a location", href: "/location" },
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/story" },
    ],
  },
  {
    id: 4,
    title: "Information",
    links: [
      { label: "Plans & pricing", href: "/pricing" },
      { label: "Jobs", href: "/jobs" },
      { label: "Sell your product", href: "/sell" },
    ],
  },
];

const SOCIAL_MEDIA = [
  {
    name: "Twitter",
    icon: "/icons/twitter-bird.webp",
    href: "https://twitter.com",
  },
  {
    name: "Instagram",
    icon: "/icons/instagram.webp",
    href: "https://instagram.com",
  },
  {
    name: "Facebook",
    icon: "/icons/facebook.webp",
    href: "https://facebook.com",
  },
  {
    name: "YouTube",
    icon: "/icons/youtube.webp",
    href: "https://youtube.com",
  },
];

const Footer = () => {
  return (
    <footer className="container mx-auto mt-12 lg:mt-32">
      {/* Outer Card Container */}
      <div className="bg-[#211816] text-[#e0d6d3] rounded-t-3xl overflow-hidden shadow-2xl">
        {/* Top Grid Area */}
        <div className="p-8 sm:p-12 lg:p-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.id} className="space-y-4">
              <h3 className="text-white font-bold text-lg tracking-tight">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#b2a5a0] hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media Section */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h3 className="text-white font-bold text-lg tracking-tight">
              Social media
            </h3>
            <div className="flex items-center gap-4 pt-1">
              {SOCIAL_MEDIA.map((social) => {
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#c4a492] transition-colors duration-200"
                    aria-label={social.name}
                  >
                    <Image
                      src={social.icon}
                      alt={social.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 object-contain bg-white rounded-lg"
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="bg-[#2c201d] px-8 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a0928d]">
          <p>Copyright © 2026, Coffesy.io</p>

          <div className="flex items-center gap-2">
            <Link
              href="/favicon"
              className="hover:text-white transition-colors"
            >
              Favicon
            </Link>
            <span>•</span>
            <Link
              href="/support"
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
            <span>•</span>
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
