import type { CSSProperties } from "react";

type LogoProps = {
  size?: number;
  /** "brand" = colored bars (nav); "mono" = white bars (dark footer). */
  variant?: "brand" | "mono";
  style?: CSSProperties;
};

/** The VueNexa equalizer-bars mark, ported 1:1 from the source SVG. */
export function Logo({ size = 28, variant = "brand", style }: LogoProps) {
  const bars =
    variant === "mono"
      ? [
          { x: 3, h: 24, fill: "oklch(1 0 0)", opacity: 0.55 },
          { x: 15.5, h: 36, fill: "oklch(1 0 0)", opacity: 0.75 },
          { x: 28, h: 48, fill: "oklch(1 0 0)", opacity: 1 },
          { x: 40.5, h: 36, fill: "oklch(1 0 0)", opacity: 0.75 },
          { x: 53, h: 24, fill: "oklch(1 0 0)", opacity: 0.55 },
        ]
      : [
          { x: 3, h: 24, fill: "oklch(0.66 0.12 212)", opacity: 1 },
          { x: 15.5, h: 36, fill: "oklch(0.58 0.15 224)", opacity: 1 },
          { x: 28, h: 48, fill: "oklch(0.45 0.16 250)", opacity: 1 },
          { x: 40.5, h: 36, fill: "oklch(0.58 0.15 224)", opacity: 1 },
          { x: 53, h: 24, fill: "oklch(0.66 0.12 212)", opacity: 1 },
        ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role="img"
      aria-label="VueNexa"
      style={style}
    >
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={8}
          width={8}
          height={b.h}
          rx={4}
          fill={b.fill}
          opacity={b.opacity}
        />
      ))}
    </svg>
  );
}
