import { useEffect, useRef } from "react";

const AnimatedDice = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 64;
    canvas.width = size;
    canvas.height = size;
    let angle = 0;
    let bounceOffset = 0;
    let frame = 0;

    const dotPositions: Record<number, [number, number][]> = {
      1: [[0.5, 0.5]],
      2: [[0.25, 0.25], [0.75, 0.75]],
      3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
      4: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]],
      5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
      6: [[0.25, 0.25], [0.75, 0.25], [0.25, 0.5], [0.75, 0.5], [0.25, 0.75], [0.75, 0.75]],
    };

    const faces = [5, 3, 6, 1, 4, 2];
    let faceIndex = 0;
    let faceTimer = 0;

    const draw = () => {
      frame++;
      angle += 0.015;
      bounceOffset = Math.sin(frame * 0.03) * 3;
      faceTimer++;
      if (faceTimer > 120) {
        faceTimer = 0;
        faceIndex = (faceIndex + 1) % faces.length;
      }

      ctx.clearRect(0, 0, size, size);
      ctx.save();
      ctx.translate(size / 2, size / 2 + bounceOffset);
      ctx.rotate(Math.sin(angle) * 0.15);

      // Glow
      ctx.shadowColor = "hsla(42, 80%, 55%, 0.5)";
      ctx.shadowBlur = 15;

      // Dice body
      const s = 22;
      const r = 5;
      ctx.beginPath();
      ctx.roundRect(-s, -s, s * 2, s * 2, r);
      ctx.fillStyle = "hsl(30, 20%, 16%)";
      ctx.fill();
      ctx.strokeStyle = "hsla(42, 80%, 55%, 0.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.shadowBlur = 0;

      // Dots
      const face = faces[faceIndex];
      const dots = dotPositions[face];
      dots.forEach(([dx, dy]) => {
        const x = -s + dx * s * 2;
        const y = -s + dy * s * 2;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(42, 80%, 55%)";
        ctx.fill();
      });

      ctx.restore();
      requestAnimationFrame(draw);
    };

    const id = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0"
      style={{ imageRendering: "auto" }}
      aria-hidden="true"
    />
  );
};

export default AnimatedDice;
