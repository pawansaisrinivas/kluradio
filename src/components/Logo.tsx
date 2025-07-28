import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="https://storage.googleapis.com/project-spark-b2489c64/tools/genie/5f822361-55c3-4395-82b5-16d55f2479e0/KL_RADIO_THE_VOICE_OF_KLIANS.png"
        width={100}
        height={100}
        alt="KL Radio Logo"
        data-ai-hint="logo radio"
        className="object-contain"
      />
    </div>
  );
};

export default Logo;
