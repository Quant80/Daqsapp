import { useState, useEffect } from "react";

interface Props {
  images: string[];
  interval?: number;
  className?: string;
  alt?: string;
}

export default function SlideshowBanner({ images, interval = 3500, className = "", alt = "" }: Props) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover animate-ken-burns animate-neon-pulse transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          style={{ animationDelay: `${i * -3}s` }}
        />
      ))}
    </div>
  );
}
