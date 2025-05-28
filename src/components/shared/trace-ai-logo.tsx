
// src/components/shared/trace-ai-logo.tsx
import type { SVGProps } from 'react';

export function TraceAiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100" // Adjusted viewBox for a more horizontal logo
      width="150" // Default width, can be overridden by props
      height="75" // Default height, can be overridden by props
      {...props}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--secondary))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g fill="hsl(var(--primary))">
        {/* Gear-like shape (simplified) */}
        <path d="M40,15 L40,5 L50,0 L60,5 L60,15 L70,20 L70,30 L60,35 L60,45 L50,50 L40,45 L40,35 L30,30 L30,20 Z M50,25 m -10,0 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0" />
        
        {/* Central semi-circle */}
        <path d="M55,50 A35,35 0 0,1 125,50" fill="hsl(var(--primary))" />

        {/* Connected dots/nodes - right side */}
        <circle cx="130" cy="15" r="5" />
        <line x1="115" y1="45" x2="130" y2="15" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        <circle cx="150" cy="35" r="7" />
        <line x1="120" y1="50" x2="150" y2="35" stroke="hsl(var(--primary))" strokeWidth="2" />
        
        <circle cx="135" cy="55" r="4" />
        <line x1="122" y1="50" x2="135" y2="55" stroke="hsl(var(--primary))" strokeWidth="2" />

         {/* Smaller connected dots/nodes - bottom right */}
        <circle cx="120" cy="70" r="3" />
        <line x1="110" y1="55" x2="120" y2="70" stroke="hsl(var(--primary))" strokeWidth="2" />
        <circle cx="145" cy="75" r="6" />
        <line x1="120" y1="51" x2="145" y2="75" stroke="hsl(var(--primary))" strokeWidth="2" />


      </g>
      <text 
        x="90" 
        y="75" 
        fontFamily="var(--font-geist-sans), sans-serif" 
        fontSize="20" 
        fill="hsl(var(--primary))" 
        textAnchor="middle" 
        fontWeight="bold"
      >
        TRACE AI
      </text>
    </svg>
  );
}
