/**
 * Sits between two sections of different background colors. Renders a
 * strip filled with `from`, with a soft wave of `to` flowing across the
 * bottom, so the transition reads as one liquid surface rather than a
 * hard cut — echoes the liquid-fill motif from the Hero name reveal.
 */
export default function WaveDivider({
  from,
  to,
  flip = false,
}: {
  from: string;
  to: string;
  flip?: boolean;
}) {
  return (
    <div
      style={{ backgroundColor: from }}
      className="relative w-full overflow-hidden leading-none"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className={`block w-full h-10 md:h-16 ${flip ? "-scale-y-100" : ""}`}
      >
        <path
          fill={to}
          d="M0,40 C220,90 480,0 720,30 C960,60 1200,95 1440,35 L1440,100 L0,100 Z"
        />
      </svg>
    </div>
  );
}
