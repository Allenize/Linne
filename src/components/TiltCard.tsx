"use client";

import { motion, useMotionValue, useSpring, type MotionProps } from "framer-motion";

/**
 * Drop-in replacement for a `motion.div` card. Accepts the same
 * entrance-animation props (initial / animate / transition) and adds a
 * subtle 3D tilt that follows the cursor while hovered, springing back
 * to flat on mouse leave.
 */
interface TiltCardProps extends MotionProps {
  className?: string;
  children: React.ReactNode;
  max?: number;
}

export default function TiltCard({
  className = "",
  children,
  max = 7,
  style,
  ...motionProps
}: TiltCardProps) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rxs = useSpring(rx, { stiffness: 200, damping: 20, mass: 0.4 });
  const rys = useSpring(ry, { stiffness: 200, damping: 20, mass: 0.4 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rx.set(py * -max);
    ry.set(px * max);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      {...motionProps}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX: rxs, rotateY: rys, transformPerspective: 800, ...style }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
