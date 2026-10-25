import { Coffee } from "lucide-react";
import Image from "next/image";

export function ProductImage({
  src,
  alt,
  priority,
}: {
  src: string | null;
  alt: string;
  priority: boolean;
}) {
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Coffee className="h-16 w-16 text-muted-foreground/30" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
      className="object-contain p-6 drop-shadow-xl"
    />
  );
}
