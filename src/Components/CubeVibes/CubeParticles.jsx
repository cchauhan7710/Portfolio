/* CubeParticles — fixed ambient background of tiny rotating cube squares.
   Pure CSS, zero JS rAF loop → zero performance cost. */

const CUBE_COLORS = [
  "#C41E3A", // red
  "#0051A2", // blue
  "#FFD500", // yellow
  "#009B48", // green
  "#FF6E00", // orange
  "#F0F0F0", // white
];

// Pre-generated deterministic positions so they look natural but don't shift on re-render
const PARTICLES = [
  { x:4,  y:12, s:7,  d:18, delay:0,   color:0 },
  { x:92, y:7,  s:10, d:22, delay:1.2, color:1 },
  { x:18, y:65, s:6,  d:15, delay:0.5, color:2 },
  { x:78, y:80, s:8,  d:20, delay:2.1, color:3 },
  { x:45, y:30, s:5,  d:25, delay:0.8, color:4 },
  { x:60, y:90, s:9,  d:17, delay:3.0, color:5 },
  { x:10, y:45, s:7,  d:21, delay:1.7, color:1 },
  { x:85, y:35, s:6,  d:19, delay:0.3, color:2 },
  { x:33, y:78, s:11, d:23, delay:2.5, color:0 },
  { x:70, y:55, s:5,  d:16, delay:1.0, color:3 },
  { x:22, y:22, s:8,  d:24, delay:3.5, color:4 },
  { x:55, y:10, s:6,  d:20, delay:0.6, color:5 },
  { x:88, y:60, s:9,  d:18, delay:2.8, color:0 },
  { x:40, y:94, s:7,  d:22, delay:1.4, color:2 },
  { x:15, y:85, s:5,  d:15, delay:4.0, color:1 },
  { x:66, y:20, s:10, d:26, delay:0.2, color:4 },
  { x:50, y:70, s:6,  d:19, delay:2.2, color:3 },
  { x:95, y:45, s:8,  d:21, delay:1.9, color:5 },
  { x:28, y:50, s:7,  d:17, delay:3.3, color:0 },
  { x:75, y:15, s:5,  d:23, delay:0.9, color:2 },
];

export default function CubeParticles() {
  return (
    <>
      <style>{`
        @keyframes cubeDrift {
          0%   { transform: translateY(0)   rotate(0deg);   opacity: .0; }
          10%  { opacity: var(--op); }
          90%  { opacity: var(--op); }
          100% { transform: translateY(-60px) rotate(180deg); opacity: 0; }
        }
        @keyframes cubeSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left:   `${p.x}%`,
              top:    `${p.y}%`,
              width:  p.s,
              height: p.s,
              borderRadius: 2,
              background: CUBE_COLORS[p.color],
              "--op": "0.35",
              opacity: 0,
              boxShadow: `0 0 12px ${CUBE_COLORS[p.color]}80`,
              willChange: "transform, opacity",
              animation: `cubeDrift ${p.d}s ease-in-out ${p.delay}s infinite, cubeSpin ${p.d * 0.6}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
