import { FooterSection } from "@/types";

export const FOOTER_SECTIONS: FooterSection[] = [
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
