import type { QualityItem} from "@/types"
import { MessageCircle, Box, PackageCheck, Layers } from "lucide-react";

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
