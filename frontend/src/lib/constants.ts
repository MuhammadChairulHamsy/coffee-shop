import type { QualityItem, FooterSection, SocialMedia, NavLink } from "@/types";
import { MessageCircle, Box, PackageCheck, Layers } from "lucide-react";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "" },
  { href: "/product", label: "Product" },
  { href: "/special-offers", label: "Special Offers" },
  { href: "/the-process", label: "The Process" },
  { href: "/packing", label: "Packing" },
  { href: "/about", label: "About" },
];

export const PRODUCT_FILTERS = [
  { label: "All", value: "All" },
  { label: "Accessories", value: "Accessories" },
  { label: "Coffee Beans", value: "Coffee Beans" },
  { label: "Apparel", value: "Apparel" },
  { label: "Instant Coffee", value: "Instant Coffee" },
  { label: "Bundle", value: "Bundle" },
] as const;

export const QUALITY_ITEMS: QualityItem[] = [
  {
    id: 1,
    icon: MessageCircle,
    title: "Active community",
    description: "You can reach out whenever you want!",
  },
  {
    id: 2,
    icon: Box,
    title: "Best product design",
    description: "We worked a lot to make a great experience",
  },
  {
    id: 3,
    icon: PackageCheck,
    title: "Premium quality",
    description: "A premium quality coffee is what our customers deserve",
  },
  {
    id: 4,
    icon: Layers,
    title: "The best material",
    description: "Our product is made by premium materials",
  },
];

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