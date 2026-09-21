export interface NavLink {
  href: string;
  label: string;
}

export type NavbarAuthUser = {
  name: string | null;
  avatar: string | null;
  email: string | null;
};

export type NavbarAuthProps = {
  user: NavbarAuthUser | null;
};