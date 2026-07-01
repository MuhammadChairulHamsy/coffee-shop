export type LatestProductsProps = {
  id: number;
  image: string;
  type: string;
  title: string;
  price: number;
  like: boolean;
};

export const Latest_Products: LatestProductsProps[] = [
  {
    id: 1,
    image: "/image/Spice-iceland-blend-removebg-preview.png",
    type: "Blend",
    title: "Spice Iceland Blend",
    price: 12,
    like: true,
  },
  {
    id: 2,
    image: "/image/Hair-bender-removebg-preview.png",
    type: "Blend",
    title: "Hair Bender",
    price: 12,
    like: true,
  },
  {
    id: 3,
    image: "/image/Cold-brew-blend-removebg-preview.png",
    type: "Blend",
    title: "Cold Brew Blend",
    price: 16,
    like: false,
  },
];
