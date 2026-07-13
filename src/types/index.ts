export type NavbarAuthProps = {
  user: {
    name: string | null;
    avatar: string | null;
    email: string | null;
  } | null;
};


export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  id: number;
  title: string;
  links: FooterLink[];
}

export interface SocialMedia {
  name: string;
  icon: string;
  href: string;
}

export type Product = {
  id: number;
  image: string;
  type: string;
  category: string;
  title: string;
  price: number;
  is_liked: boolean;
  is_special: boolean;
  created_at?: string;
};
export type LatestProductsProps = Product;
export type SpecialProducts = Product;
