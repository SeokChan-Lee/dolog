// ImageBlock.tsx
"use client";

import { useEffect, useState } from "react";

interface Props {
  url: string;
  alt?: string;
}

export default function ImageBlock({ url, alt }: Props) {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    setImgUrl(url);
  }, [url]);

  if (!imgUrl) return null;

  return (
    <img
      src={imgUrl}
      alt={alt || "notion image"}
      width={600}
      height={400}
      style={{ borderRadius: 8 }}
    />
  );
}
