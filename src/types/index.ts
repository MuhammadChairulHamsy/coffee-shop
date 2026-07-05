export type LatestProductsProps = {
  id: number;
  image: string;
  type: string;
  title: string;
  price: number;
  like: boolean;
};

export type NavbarAuthProps = {
  user: {
    name: string | null;
    avatar: string | null;
    email: string | null
  } | null;
};