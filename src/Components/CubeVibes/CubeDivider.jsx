/* CubeDivider — bouncing Rubik's colored pips between sections */
const PIPS = [
  { color: "#C41E3A", delay: "0s"    },
  { color: "#0051A2", delay: "0.15s" },
  { color: "#FFD500", delay: "0.30s" },
  { color: "#009B48", delay: "0.45s" },
  { color: "#FF6E00", delay: "0.60s" },
  { color: "#F0F0F0", delay: "0.75s" },
];

export default function CubeDivider() {
  return (
    <>
      <style>{`
        @keyframes pipBounce {
          0%,100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-10px) rotate(45deg); }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 14,
          padding: "36px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        {PIPS.map((p, i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: 3,
              background: p.color,
              boxShadow: `0 0 8px ${p.color}99`,
              animation: `pipBounce 1.8s ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
