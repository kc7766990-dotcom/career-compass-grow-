import React from 'react';

/**
 * BackgroundWatermark
 * Renders a subtle, non-intrusive, diagonal repeating vector watermark across the entire application background.
 * Strictly positioned behind all interactive elements with pointer-events-none and low opacity.
 */
export const BackgroundWatermark: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden opacity-[0.04] transition-opacity duration-500"
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="career-compass-watermark"
            width="440"
            height="260"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(-22 220 130)"
          >
            {/* Main Watermark Row 1 */}
            <g transform="translate(110, 60)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                className="font-sans font-semibold uppercase fill-slate-200"
                style={{
                  fontSize: '20px',
                  letterSpacing: '0.28em'
                }}
              >
                CAREER COMPASS
              </text>
              <text
                x="0"
                y="22"
                textAnchor="middle"
                className="font-sans font-normal fill-cyan-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em'
                }}
              >
                AI Career Guidance Platform
              </text>
            </g>

            {/* Alternating Staggered Row 2 */}
            <g transform="translate(330, 190)">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                className="font-sans font-semibold uppercase fill-slate-200"
                style={{
                  fontSize: '20px',
                  letterSpacing: '0.28em'
                }}
              >
                CAREER COMPASS
              </text>
              <text
                x="0"
                y="22"
                textAnchor="middle"
                className="font-sans font-normal fill-cyan-300"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em'
                }}
              >
                AI Career Guidance Platform
              </text>
            </g>
          </pattern>
        </defs>

        <rect
          width="100%"
          height="100%"
          fill="url(#career-compass-watermark)"
        />
      </svg>
    </div>
  );
};
