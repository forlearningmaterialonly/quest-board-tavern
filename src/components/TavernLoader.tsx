import { useEffect, useState } from "react";

const TavernLoader = () => {
  const [stage, setStage] = useState<"idle" | "opening" | "flash" | "done">("idle");

  useEffect(() => {
    // small delay so the closed doors are visible briefly
    const t1 = setTimeout(() => setStage("opening"), 400);
    const t2 = setTimeout(() => setStage("flash"), 1700);
    const t3 = setTimeout(() => setStage("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  if (stage === "done") return null;

  const opening = stage === "opening" || stage === "flash";
  const flashing = stage === "flash";

  return (
    <div
      className="fixed inset-0 z-[10000] overflow-hidden pointer-events-none"
      aria-hidden="true"
      style={{
        perspective: "1400px",
        background: "radial-gradient(ellipse at center, hsl(var(--wood)) 0%, hsl(var(--background)) 80%)",
        opacity: flashing ? 0 : 1,
        transition: "opacity 0.9s ease-out 0.2s",
      }}
    >
      {/* Inner light that grows as doors open */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(var(--gold) / 0.95) 0%, hsl(var(--ember) / 0.6) 30%, transparent 70%)",
          transform: opening ? "scale(1.6)" : "scale(0.2)",
          opacity: opening ? 1 : 0.4,
          transition: "transform 1.3s ease-in, opacity 1.3s ease-in",
        }}
      />

      {/* Door frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: "min(90vw, 720px)",
            height: "min(95vh, 920px)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Stone arch frame */}
          <div
            className="absolute -inset-6 rounded-t-[50%] border-[14px]"
            style={{
              borderColor: "hsl(var(--wood-light))",
              background:
                "linear-gradient(180deg, hsl(var(--wood-light)) 0%, hsl(var(--wood)) 100%)",
              boxShadow:
                "inset 0 0 60px hsl(0 0% 0% / 0.6), 0 0 80px hsl(var(--gold) / 0.25)",
            }}
          />

          {/* Left door */}
          <Door side="left" opening={opening} />
          {/* Right door */}
          <Door side="right" opening={opening} />

          {/* Center seam shadow when closed */}
          <div
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-black/70"
            style={{ opacity: opening ? 0 : 1, transition: "opacity 0.4s" }}
          />
        </div>
      </div>
    </div>
  );
};

const Door = ({ side, opening }: { side: "left" | "right"; opening: boolean }) => {
  const isLeft = side === "left";
  return (
    <div
      className="absolute top-0 bottom-0"
      style={{
        width: "50%",
        [isLeft ? "left" : "right"]: 0,
        transformOrigin: isLeft ? "left center" : "right center",
        transform: opening
          ? `rotateY(${isLeft ? -105 : 105}deg)`
          : "rotateY(0deg)",
        transition: "transform 1.3s cubic-bezier(0.5, 0, 0.7, 0.4)",
        background:
          "repeating-linear-gradient(180deg, hsl(30 35% 22%) 0px, hsl(30 35% 18%) 6px, hsl(30 30% 14%) 12px, hsl(30 35% 20%) 18px)",
        boxShadow: isLeft
          ? "inset -8px 0 20px hsl(0 0% 0% / 0.6), inset 4px 0 10px hsl(var(--wood-light))"
          : "inset 8px 0 20px hsl(0 0% 0% / 0.6), inset -4px 0 10px hsl(var(--wood-light))",
        borderTop: "4px solid hsl(var(--wood-light))",
        borderBottom: "4px solid hsl(var(--wood-light))",
        [isLeft ? "borderLeft" : "borderRight"]: "4px solid hsl(var(--wood-light))",
      }}
    >
      {/* Iron bands */}
      <div className="absolute left-0 right-0 top-[18%] h-2 bg-[hsl(30_15%_8%)] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
      <div className="absolute left-0 right-0 bottom-[18%] h-2 bg-[hsl(30_15%_8%)] shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />

      {/* Studs */}
      {[0.05, 0.95].map((x) =>
        [0.1, 0.9].map((y) => (
          <div
            key={`${x}-${y}`}
            className="absolute w-3 h-3 rounded-full bg-[hsl(30_10%_5%)] shadow-[inset_-1px_-1px_2px_rgba(255,255,255,0.15)]"
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, transform: "translate(-50%, -50%)" }}
          />
        ))
      )}

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-4 h-10 rounded-full bg-gradient-to-b from-[hsl(var(--gold))] to-[hsl(var(--gold-dim))] shadow-[0_0_8px_hsl(var(--gold)/0.6)]"
        style={{ [isLeft ? "right" : "left"]: "10%" }}
      />

      {/* OPEN sign on left door only */}
      {isLeft && (
        <div
          className="absolute left-1/2 top-[30%] -translate-x-1/4 rotate-[-6deg] px-4 py-2 rounded-md border-2 font-heading font-bold text-sm tracking-widest"
          style={{
            background: "hsl(var(--parchment))",
            color: "hsl(var(--wood))",
            borderColor: "hsl(var(--wood-light))",
            boxShadow: "0 4px 10px rgba(0,0,0,0.5), 0 0 12px hsl(var(--gold) / 0.4)",
            whiteSpace: "nowrap",
          }}
        >
          ⚔ OPEN ⚔
        </div>
      )}
    </div>
  );
};

export default TavernLoader;
