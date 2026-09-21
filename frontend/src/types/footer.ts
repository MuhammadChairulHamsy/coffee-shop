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