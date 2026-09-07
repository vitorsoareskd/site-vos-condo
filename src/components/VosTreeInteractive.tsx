import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface VosTreeProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  interactive?: boolean;
  className?: string;
  badgeLabel?: string;
}

export const VosTreeInteractive: React.FC<VosTreeProps> = ({
  size = 'md',
  interactive = true,
  className = '',
  badgeLabel
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFacet, setActiveFacet] = useState<number | null>(null);

  // Motion values for smooth 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-32 h-32',
    lg: 'w-56 h-56',
    hero: 'w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96'
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex flex-col items-center justify-center ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX: interactive ? rotateX : 0,
          rotateY: interactive ? rotateY : 0,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          y: isHovered ? -6 : [0, -8, 0],
          transition: {
            y: isHovered
              ? { duration: 0.3 }
              : { repeat: Infinity, duration: 5, ease: 'easeInOut' }
          }
        }}
        className={`relative ${sizeClasses[size]} flex items-center justify-center filter drop-shadow-sm`}
      >
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full overflow-visible transition-transform duration-300"
        >
          <defs>
            <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Subtle ambient aura behind foliage */}
          <circle cx="250" cy="240" r="160" fill="url(#glowG)" opacity={isHovered ? 0.8 : 0.4} />

          {/* Ground Shadow line */}
          <ellipse
            cx="250"
            cy="428"
            rx="75"
            ry="4.5"
            fill="#181c19"
            className="transition-all duration-300"
            opacity={isHovered ? 0.4 : 0.85}
          />

          {/* Trunk low-poly facets */}
          <g stroke="#181c19" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
            <polygon
              points="244,320 236,375 248,382 252,325"
              fill={activeFacet === 101 ? '#8a523e' : '#6d3d2c'}
              onMouseEnter={() => setActiveFacet(101)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="236,375 220,425 240,425 248,382"
              fill={activeFacet === 102 ? '#a76044' : '#8d4f37'}
              onMouseEnter={() => setActiveFacet(102)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="252,325 248,382 258,388 262,330"
              fill={activeFacet === 103 ? '#c47a59' : '#a56347'}
              onMouseEnter={() => setActiveFacet(103)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="262,330 258,388 274,380 270,340"
              fill={activeFacet === 104 ? '#915139' : '#753f2c'}
              onMouseEnter={() => setActiveFacet(104)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="248,382 240,425 258,425 258,388"
              fill={activeFacet === 105 ? '#d98c63' : '#bc7754'}
              onMouseEnter={() => setActiveFacet(105)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="258,388 258,425 272,425 274,380"
              fill={activeFacet === 106 ? '#a05c40' : '#844a33'}
              onMouseEnter={() => setActiveFacet(106)}
              className="cursor-pointer transition-colors duration-150"
            />
          </g>

          {/* Foliage Canopy low-poly facets */}
          <g
            stroke="#181c19"
            strokeWidth="3.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            {/* Top central pyramid - primary peak */}
            <polygon
              points="265,130 215,160 260,240"
              fill={activeFacet === 1 ? '#34d399' : '#22c55e'}
              onMouseEnter={() => setActiveFacet(1)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="265,130 260,240 282,230 290,185"
              fill={activeFacet === 2 ? '#16a34a' : '#15803d'}
              onMouseEnter={() => setActiveFacet(2)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="265,130 215,160 275,138"
              fill={activeFacet === 3 ? '#6ee7b7' : '#4ade80'}
              onMouseEnter={() => setActiveFacet(3)}
              className="cursor-pointer transition-colors duration-150"
            />

            {/* Top right wing */}
            <polygon
              points="265,130 290,185 325,230 300,165"
              fill={activeFacet === 4 ? '#22c55e' : '#16a34a'}
              onMouseEnter={() => setActiveFacet(4)}
              className="cursor-pointer transition-colors duration-150"
            />

            {/* Left upper facets */}
            <polygon
              points="215,160 205,215 260,240"
              fill={activeFacet === 5 ? '#34d399' : '#10b981'}
              onMouseEnter={() => setActiveFacet(5)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="205,215 190,265 225,268 260,240"
              fill={activeFacet === 6 ? '#10b981' : '#059669'}
              onMouseEnter={() => setActiveFacet(6)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="205,215 170,235 190,265"
              fill={activeFacet === 7 ? '#6ee7b7' : '#34d399'}
              onMouseEnter={() => setActiveFacet(7)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="170,235 140,260 178,285 190,265"
              fill={activeFacet === 8 ? '#059669' : '#047857'}
              onMouseEnter={() => setActiveFacet(8)}
              className="cursor-pointer transition-colors duration-150"
            />

            {/* Far left facet cluster */}
            <polygon
              points="140,260 178,285 185,325 155,305"
              fill={activeFacet === 9 ? '#047857' : '#065f46'}
              onMouseEnter={() => setActiveFacet(9)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="178,285 225,268 220,315 185,325"
              fill={activeFacet === 10 ? '#34d399' : '#10b981'}
              onMouseEnter={() => setActiveFacet(10)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="185,325 220,315 210,345 180,345"
              fill={activeFacet === 11 ? '#10b981' : '#059669'}
              onMouseEnter={() => setActiveFacet(11)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="210,345 220,315 245,340 228,355"
              fill={activeFacet === 12 ? '#6ee7b7' : '#34d399'}
              onMouseEnter={() => setActiveFacet(12)}
              className="cursor-pointer transition-colors duration-150"
            />

            {/* Center main body facets */}
            <polygon
              points="260,240 225,268 250,305"
              fill={activeFacet === 13 ? '#86efac' : '#4ade80'}
              onMouseEnter={() => setActiveFacet(13)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="225,268 220,315 250,305"
              fill={activeFacet === 14 ? '#4ade80' : '#22c55e'}
              onMouseEnter={() => setActiveFacet(14)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="250,305 220,315 245,340 252,325"
              fill={activeFacet === 15 ? '#22c55e' : '#16a34a'}
              onMouseEnter={() => setActiveFacet(15)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="260,240 250,305 285,300 282,230"
              fill={activeFacet === 16 ? '#4ade80' : '#22c55e'}
              onMouseEnter={() => setActiveFacet(16)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="250,305 252,325 272,342 285,300"
              fill={activeFacet === 17 ? '#16a34a' : '#15803d'}
              onMouseEnter={() => setActiveFacet(17)}
              className="cursor-pointer transition-colors duration-150"
            />

            {/* Right facet cluster */}
            <polygon
              points="282,230 285,300 320,290 325,230"
              fill={activeFacet === 18 ? '#34d399' : '#10b981'}
              onMouseEnter={() => setActiveFacet(18)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="325,230 300,165 338,205 348,255"
              fill={activeFacet === 19 ? '#10b981' : '#059669'}
              onMouseEnter={() => setActiveFacet(19)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="325,230 348,255 320,290"
              fill={activeFacet === 20 ? '#059669' : '#047857'}
              onMouseEnter={() => setActiveFacet(20)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="348,255 365,260 345,300 320,290"
              fill={activeFacet === 21 ? '#6ee7b7' : '#34d399'}
              onMouseEnter={() => setActiveFacet(21)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="320,290 285,300 295,335 325,325"
              fill={activeFacet === 22 ? '#10b981' : '#059669'}
              onMouseEnter={() => setActiveFacet(22)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="285,300 272,342 295,335"
              fill={activeFacet === 23 ? '#059669' : '#047857'}
              onMouseEnter={() => setActiveFacet(23)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="295,335 272,342 278,352 312,345"
              fill={activeFacet === 24 ? '#34d399' : '#10b981'}
              onMouseEnter={() => setActiveFacet(24)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="320,290 345,300 325,325"
              fill={activeFacet === 25 ? '#22c55e' : '#15803d'}
              onMouseEnter={() => setActiveFacet(25)}
              className="cursor-pointer transition-colors duration-150"
            />
            <polygon
              points="325,325 312,345 330,340"
              fill={activeFacet === 26 ? '#059669' : '#047857'}
              onMouseEnter={() => setActiveFacet(26)}
              className="cursor-pointer transition-colors duration-150"
            />
          </g>
        </svg>
      </motion.div>

      {badgeLabel && (
        <div className="mt-2 text-xs font-medium tracking-wider uppercase text-[#476051] bg-[#E8F5EE] border border-[#CEEBD9] px-3 py-1 rounded-full shadow-xs">
          {badgeLabel}
        </div>
      )}
    </div>
  );
};
