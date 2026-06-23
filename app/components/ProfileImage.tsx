"use client";

import { useState } from "react";

interface ProfileImageProps {
  src: string;
  alt: string;
  initials: string;
}

export default function ProfileImage({ src, alt, initials }: ProfileImageProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span className="text-3xl font-black text-[var(--muted-foreground)]">
        {initials}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      onError={() => setError(true)}
    />
  );
}
