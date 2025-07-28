import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KL Radio Logo"
      >
        <path
          d="M14 62L22 62L26 56L32 70L38 48L44 62L52 62"
          stroke="#E53935"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M68 62L76 62L80 56L86 70L92 48L98 62L106 62"
          stroke="#E53935"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 45C30 36.7157 36.7157 30 45 30H50V90H45C36.7157 90 30 83.2843 30 75V45Z"
          fill="#424242"
        />
        <path
          d="M90 45C90 36.7157 83.2843 30 75 30H70V90H75C83.2843 90 90 83.2843 90 75V45Z"
          fill="#424242"
        />
        <path
          d="M30 45V75C30 83.2843 36.7157 90 45 90H75C83.2843 90 90 83.2843 90 75V45"
          stroke="#BDBDBD"
          strokeWidth="4"
        />
        <path
          d="M48 20C48 14.4772 53.4772 10 60 10C66.5228 10 72 14.4772 72 20V30H48V20Z"
          fill="#E53935"
        />
        <rect x="20" y="45" width="10" height="30" fill="#BDBDBD" />
        <rect x="90" y="45" width="10" height="30" fill="#BDBDBD" />

        <g transform="translate(35, 50)">
          <text
            x="0"
            y="28"
            fill="#E53935"
            fontFamily="sans-serif"
            fontSize="32"
            fontWeight="bold"
          >
            <tspan fill="#E53935">KL</tspan>
            <tspan fill="#FFFFFF" dx="-2" dy="5" fontSize="14"> RADIO</tspan>
          </text>
        </g>
      </svg>
      <div className="flex flex-col -ml-2 -space-y-1">
        <span className="text-xl font-bold font-headline tracking-tighter">
          <span className="text-primary">KL</span>
          <span className="text-foreground">RADIO</span>
        </span>
        <span className="text-xs text-muted-foreground font-semibold tracking-widest">
          THE VOICE OF KLIANS
        </span>
      </div>
    </div>
  );
};

export default Logo;
