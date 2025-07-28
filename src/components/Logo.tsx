import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://placehold.co/120x40.png"
        width={120}
        height={40}
        alt="KL Radio Logo"
        data-ai-hint="logo radio"
      />
    </div>
  );
};

export default Logo;
