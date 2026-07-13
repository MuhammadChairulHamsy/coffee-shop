import { FOOTER_SECTIONS, SOCIAL_MEDIA } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";


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
