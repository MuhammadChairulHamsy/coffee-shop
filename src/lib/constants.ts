import type { FooterSection, SocialMedia } from "@/types";

export const NAV_LINKS = [
  { href: "/", label: "Product" },
  { href: "/special-offers", label: "Special Offers" },
  { href: "/the-process", label: "The Process" },
  { href: "/packing", label: "Packing" },
  { href: "/about", label: "About" },
];

export const PRODUCT_FILTERS = [
  { label: "All", value: "all" },
  { label: "Accessories", value: "accessories" },
  { label: "Coffee Beans", value: "coffee-beans" },
  { label: "Apparel", value: "apparel" },
  { label: "Instant Coffee", value: "instant-coffee" },
  { label: "Bundle", value: "bundle" },
] as const;

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

export const SOCIAL_MEDIA: SocialMedia[] = [
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