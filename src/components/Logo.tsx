import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="KL Radio Logo"
      >
        <path
          d="M3 14V12C3 8.13401 6.13401 5 10 5H14C17.866 5 21 8.13401 21 12V14"
          stroke="#D90429" // Red
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3 14V17C3 18.1046 3.89543 19 5 19H6V14H3Z"
          fill="#8D99AE" // Grey
          stroke="#8D99AE" // Grey
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 14V17C21 18.1046 20.1046 19 19 19H18V14H21Z"
          fill="#8D99AE" // Grey
          stroke="#8D99AE" // Grey
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-xl font-bold font-headline tracking-tighter">
        <span className="text-primary">KL</span>
        <span className="text-foreground">RADIO</span>
      </span>
    </div>
  );
};

export default Logo;
