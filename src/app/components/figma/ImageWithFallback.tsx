import { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

export function ImageWithFallback({ src, fallbackSrc = '/fallback-image.jpg', alt, ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallbackSrc)}
      {...props}
    />
  );
}