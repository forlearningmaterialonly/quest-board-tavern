import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const GoldParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);
  const lastMouse = useRef({ x: 0, y: 0 });
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile.current) return; // disable on mobile

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, .quest-card, .btn-adventure, .btn-gold, [role='button']");
      if (!interactive) return;

      const dx = e.clientX - lastMouse.current.x;
      const dy = e.clientY - lastMouse.current.y;
      if (Math.abs(dx) + Math.abs(dy) < 3) return;
      lastMouse.current = { x: e.clientX, y: e.clientY };

      for (let i = 0; i < 2; i++) {
        particles.current.push({
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    document.addEventListener("mousemove", handleMove, { passive: true });

    const animate = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02;
        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(42, 80%, 55%, ${alpha * 0.7})`;
        ctx.fill();
        return true;
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default GoldParticles;
