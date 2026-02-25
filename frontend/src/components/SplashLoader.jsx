import React from "react";
import "./SplashLoader.css";

export default function SplashLoader({ vanish }) {
  return (
    <div className="splash-loader-svg-wrap" style={{ position: 'relative', width: 80, height: 80 }}>
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="splash-svg-spinner"
      >
        <defs>
          <linearGradient id="splash-gradient" x1="0" y1="0" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#111" />
            <stop offset="1" stopColor="#444" />
          </linearGradient>
        </defs>
        <circle
          cx="40"
          cy="40"
          r="32"
          stroke="url(#splash-gradient)"
          strokeWidth="8"
          strokeDasharray="60 40"
          strokeLinecap="round"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="22"
          stroke="#111"
          strokeWidth="3"
          opacity="0.18"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="12"
          fill="#111"
          opacity="0.13"
        />
      </svg>
      {vanish && (
        <div className="splash-ripples">
          <div className="splash-ripple r1" />
          <div className="splash-ripple r2" />
          <div className="splash-ripple r3" />
          <div className="splash-ripple r4" />
        </div>
      )}
    </div>
  );
}
