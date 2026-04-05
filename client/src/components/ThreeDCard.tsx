import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function ThreeDCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse positions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement
  const springConfig = { damping: 20, stiffness: 150 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig,
  );

  // Flare/Glare effect following the mouse
  const opacity = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    // Calculate normalized mouse position (-0.5 to 0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    opacity.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "1000px" }} // Critical for 3D depth
      className="relative flex items-center justify-center"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{ transform: "translateZ(50px)" }}
          className="relative z-20"
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}
