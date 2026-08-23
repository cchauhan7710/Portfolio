import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   RubiksCube — optimized + glowing
   GLOW STRATEGY: filter:drop-shadow on the viewport div (ONE
   GPU composite layer) — NOT per-face box-shadow (162 layers).
   This gives rich glow with zero colour-latency on 3D faces.
   ───────────────────────────────────────────────────────────── */
export default function RubiksCube() {
  const sceneRef       = useRef(null);
  const vpRef          = useRef(null);   // viewport div (holds the drop-shadow filter)
  const statusRef      = useRef(null);
  const scrambleBtnRef = useRef(null);
  const solveBtnRef    = useRef(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // ── Constants ────────────────────────────────────────────
    const S    = 68;   // cubie size px
    const H    = S / 2;
    const STEP = S;

    const COLOR = {
      front:  "#009B48",
      back:   "#0051A2",
      right:  "#C41E3A",
      left:   "#FF6E00",
      top:    "#F0F0F0",
      bottom: "#FFD500",
    };

    const FACES = [
      { key:"front",  t:`translateZ(${H}px)` },
      { key:"back",   t:`rotateY(180deg) translateZ(${H}px)` },
      { key:"right",  t:`rotateY(90deg)  translateZ(${H}px)` },
      { key:"left",   t:`rotateY(-90deg) translateZ(${H}px)` },
      { key:"top",    t:`rotateX(90deg)  translateZ(${H}px)` },
      { key:"bottom", t:`rotateX(-90deg) translateZ(${H}px)` },
    ];

    const MOVES = [
      {a:"y",s: 1,d: 90},{a:"y",s: 1,d:-90},
      {a:"y",s: 0,d: 90},{a:"y",s: 0,d:-90},
      {a:"y",s:-1,d: 90},{a:"y",s:-1,d:-90},
      {a:"x",s: 1,d: 90},{a:"x",s: 1,d:-90},
      {a:"x",s: 0,d: 90},{a:"x",s: 0,d:-90},
      {a:"x",s:-1,d: 90},{a:"x",s:-1,d:-90},
      {a:"z",s: 1,d: 90},{a:"z",s: 1,d:-90},
      {a:"z",s:-1,d: 90},{a:"z",s:-1,d:-90},
    ];

    // ── Mutable state ────────────────────────────────────────
    const cubies = [];
    let history  = [];
    let busy     = false;

    let rotX=28, rotY=45, velX=0, velY=0;
    let dragging=false, px=0, py=0, dx=0, dy=0;
    let manualMode=false, manualTimer=null;
    let animId;

    const setStatus = t => { if (statusRef.current) statusRef.current.textContent = t; };
    const setBtns   = d => {
      if (scrambleBtnRef.current) scrambleBtnRef.current.disabled = d;
      if (solveBtnRef.current)    solveBtnRef.current.disabled    = d;
    };
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    // ── Snap matrix to integer lattice ───────────────────────
    function snap(m){
      // Snap translation
      m.m41 = Math.round(m.m41/STEP)*STEP;
      m.m42 = Math.round(m.m42/STEP)*STEP;
      m.m43 = Math.round(m.m43/STEP)*STEP;
      // Snap rotation + clean precision errors for the whole 4x4
      const fs = [
        "m11","m12","m13","m14",
        "m21","m22","m23","m24",
        "m31","m32","m33","m34",
        "m41","m42","m43","m44"
      ];
      fs.forEach(f => {
        // Translations already handled special above
        if (f === "m41" || f === "m42" || f === "m43") return;
        if (f === "m44") { m.m44 = 1; return; }
        // Snap everything else to -1, 0, or 1
        if (Math.abs(m[f]) < 0.01) m[f] = 0;
        else if (Math.abs(m[f] - 1) < 0.01) m[f] = 1;
        else if (Math.abs(m[f] + 1) < 0.01) m[f] = -1;
      });
    }

    // ── Build 27-cubie cube ──────────────────────────────────
    function makeCubie(cx, cy, cz){
      const el = document.createElement("div");
      el.style.cssText =
        `position:absolute;width:${S}px;height:${S}px;`+
        `margin:${-H}px 0 0 ${-H}px;transform-style:preserve-3d;`;

      FACES.forEach(({ key, t }) => {
        const color = (
          key==="front"  && cz=== 1 ? COLOR.front  :
          key==="back"   && cz===-1 ? COLOR.back   :
          key==="right"  && cx=== 1 ? COLOR.right  :
          key==="left"   && cx===-1 ? COLOR.left   :
          key==="top"    && cy=== 1 ? COLOR.top    :
          key==="bottom" && cy===-1 ? COLOR.bottom : null
        );
        const face = document.createElement("div");
        if (color) {
          /* Only inset shadow — outer glow lives on the viewport
             (filter:drop-shadow) so zero per-face GPU layers. */
          face.style.cssText =
            `position:absolute;width:${S}px;height:${S}px;`+
            `border-radius:9px;border:3px solid #040404;`+
            `backface-visibility:hidden;`+
            `background:${color};`+
            `box-shadow:inset 0 -5px 0 rgba(0,0,0,.25),inset 0 2px 0 rgba(255,255,255,.12);`+
            `transform:${t} scale(0.96);`;
          // gloss sheen
          const g = document.createElement("div");
          g.style.cssText =
            `position:absolute;inset:0;border-radius:7px;`+
            `background:linear-gradient(135deg,rgba(255,255,255,.3) 0%,transparent 50%);`+
            `pointer-events:none;z-index:1;`;
          // bottom shadw
          const sh = document.createElement("div");
          sh.style.cssText =
            `position:absolute;bottom:0;left:0;right:0;height:30%;`+
            `border-radius:0 0 7px 7px;background:rgba(0,0,0,.18);`+
            `pointer-events:none;z-index:1;`;
          face.appendChild(g);
          face.appendChild(sh);
        } else {
          face.style.cssText =
            `position:absolute;width:${S}px;height:${S}px;`+
            `border-radius:9px;border:2px solid #0a0a0a;`+
            `backface-visibility:hidden;background:#111;`+
            `transform:${t} scale(.94);opacity:.08;`;
        }
        el.appendChild(face);
      });

      const m = new DOMMatrix().translate(cx*STEP, -cy*STEP, cz*STEP);
      el.style.transform = m.toString();
      return { el, m };
    }

    function buildCube(){
      scene.innerHTML = ""; cubies.length = 0;
      for (let y=1; y>=-1; y--)
        for (let x=-1; x<=1; x++)
          for (let z=1; z>=-1; z--){
            const c = makeCubie(x, y, z);
            scene.appendChild(c.el);
            cubies.push(c);
          }
    }

    // ── Layer rotation — transitionend for perfect sync ──────
    function rotateLayer(axis, slice, angle, ms){
      return new Promise(resolve => {
        const layer = cubies.filter(c => {
          const v =
            axis==="x" ? Math.round( c.m.m41/STEP) :
            axis==="y" ? Math.round(-c.m.m42/STEP) :
                         Math.round( c.m.m43/STEP);
          return v === slice;
        });
        if (!layer.length){ resolve(); return; }

        const pivot = document.createElement("div");
        pivot.style.cssText =
          "position:absolute;width:0;height:0;transform-style:preserve-3d;";
        scene.appendChild(pivot);
        layer.forEach(c => pivot.appendChild(c.el));
        pivot.offsetHeight; // force layout

        const target =
          axis==="y" ? `rotateY(${angle}deg)` :
          axis==="x" ? `rotateX(${angle}deg)` :
                       `rotateZ(${angle}deg)`;

        let committed = false;
        const commit = () => {
          if (committed || !pivot.parentNode) return;
          committed = true;
          const rotM = new DOMMatrix(target);
          layer.forEach(c => {
            c.m = rotM.multiply(c.m);
            snap(c.m);
            // Move back to main scene BEFORE setting final transform to avoid flicker
            scene.appendChild(c.el);
            c.el.style.transition = "none";
            c.el.style.transform  = c.m.toString();
            c.el.offsetHeight; // force sync
          });
          pivot.remove();
          resolve();
        };

        if (ms > 0){
          pivot.style.transition = `transform ${ms}ms cubic-bezier(0.15, 0, 0.15, 1)`;
          pivot.style.transform  = target;
          pivot.addEventListener("transitionend", commit, { once: true });
          // Fallback: hidden tab / browser quirk
          setTimeout(commit, ms + 100);
        } else {
          pivot.style.transform = target;
          commit();
        }
      });
    }

    // ── Scramble / Solve ─────────────────────────────────────
    async function scramble(n=14, ms=155){
      if (busy) return;
      busy=true; setBtns(true); setStatus("Scrambling...");
      history=[];
      for (let i=0; i<n; i++){
        let mv;
        do { mv = MOVES[Math.floor(Math.random()*MOVES.length)]; }
        while (history.length && history.at(-1).a===mv.a && history.at(-1).s===mv.s);
        history.push(mv);
        await rotateLayer(mv.a, mv.s, mv.d, ms);
        await sleep(Math.max(5, Math.floor(ms * 0.08)));
      }
      busy=false; setBtns(false); setStatus("Scrambled ✦ — press Solve");
    }

    async function solve(ms=295){
      if (busy || !history.length) return;
      busy=true; setBtns(true); setStatus("Solving...");
      for (const mv of [...history].reverse()){
        await rotateLayer(mv.a, mv.s, -mv.d, ms);
        await sleep(Math.max(8, Math.floor(ms * 0.1)));
      }
      history=[]; busy=false; setBtns(false); setStatus("Solved ✓");
    }

    // ── One-shot startup (scramble instant → animate solve) ──
    async function oneShot(){
      scene.style.opacity = "0";
      // Scramble with a very fast animation instead of instant
      await scramble(10, 80);
      scene.style.opacity = "1";
      await sleep(600);
      await solve(380);
    }

    // ── Glow pulse: shift viewport drop-shadow while solving ─
    function updateGlow(isSolving){
      if (!vpRef.current) return;
      vpRef.current.style.filter = isSolving
        ? "drop-shadow(0 0 28px rgba(244,180,0,.55)) drop-shadow(0 0 12px rgba(249,115,22,.35))"
        : "drop-shadow(0 0 18px rgba(244,180,0,.35)) drop-shadow(0 0 6px rgba(249,115,22,.2))";
    }

    // ── Auto-rotate rAF loop ─────────────────────────────────
    function tick(){
      if (!dragging){
        velY *= 0.94; velX *= 0.94;
        if (!manualMode){ velY += (0.28-velY)*0.018; velX += (0-velX)*0.018; }
        rotY += velY; rotX += velX;
        rotX = Math.max(-60, Math.min(60, rotX));
      }
      scene.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      animId = requestAnimationFrame(tick);
    }

    // ── Input handlers ───────────────────────────────────────
    const vp = scene.parentElement;
    const mDown = e => {
      dragging=true; px=e.clientX; py=e.clientY;
      velX=0; velY=0; dx=0; dy=0;
      manualMode=true; clearTimeout(manualTimer); e.preventDefault();
    };
    const mMove = e => {
      if (!dragging) return;
      dx=(e.clientX-px)*0.42; dy=(e.clientY-py)*0.42;
      rotY+=dx; rotX-=dy; rotX=Math.max(-60,Math.min(60,rotX));
      px=e.clientX; py=e.clientY;
    };
    const mUp = () => {
      if (!dragging) return;
      dragging=false; velY=dx*0.9; velX=-dy*0.9;
      manualTimer=setTimeout(()=>{manualMode=false;},6000);
    };
    const tStart = e => {
      dragging=true; px=e.touches[0].clientX; py=e.touches[0].clientY;
      velX=0; velY=0; dx=0; dy=0; manualMode=true; clearTimeout(manualTimer);
    };
    const tMove = e => {
      if (!dragging) return;
      dx=(e.touches[0].clientX-px)*0.42; dy=(e.touches[0].clientY-py)*0.42;
      rotY+=dx; rotX-=dy; rotX=Math.max(-60,Math.min(60,rotX));
      px=e.touches[0].clientX; py=e.touches[0].clientY;
    };

    const onScramble = () => { if (!busy){ updateGlow(false); scramble(14, 220); } };
    const onSolve    = () => { if (!busy){ updateGlow(true);  solve(420);      } };

    // ── Boot ─────────────────────────────────────────────────
    buildCube();
    updateGlow(false);
    animId = requestAnimationFrame(tick);
    oneShot().then(() => updateGlow(false));

    vp.addEventListener("mousedown", mDown);
    document.addEventListener("mousemove", mMove);
    document.addEventListener("mouseup", mUp);
    vp.addEventListener("touchstart", tStart, { passive:true });
    document.addEventListener("touchmove", tMove, { passive:true });
    document.addEventListener("touchend", mUp);
    scrambleBtnRef.current?.addEventListener("click", onScramble);
    solveBtnRef.current?.addEventListener("click", onSolve);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(manualTimer);
      vp.removeEventListener("mousedown", mDown);
      document.removeEventListener("mousemove", mMove);
      document.removeEventListener("mouseup", mUp);
      vp.removeEventListener("touchstart", tStart);
      document.removeEventListener("touchmove", tMove);
      document.removeEventListener("touchend", mUp);
      scrambleBtnRef.current?.removeEventListener("click", onScramble);
      solveBtnRef.current?.removeEventListener("click", onSolve);
    };
  }, []);

  // ── JSX ───────────────────────────────────────────────────
  return (
    <div className="relative flex flex-col items-center flex-shrink-0 z-10 select-none">

      {/* Soft ambient aura behind the cube */}
      <div style={{
        position:"absolute", inset:"-90px", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(244,180,0,.12) 0%, rgba(249,115,22,.07) 45%, transparent 68%)",
        animation:"cubeAura 4s ease-in-out infinite",
      }}/>
      <div style={{
        position:"absolute", inset:"-45px", borderRadius:"50%", pointerEvents:"none",
        background:"radial-gradient(circle, rgba(196,30,58,.08) 0%, transparent 65%)",
        animation:"cubeAura 6s ease-in-out infinite reverse",
      }}/>

      {/* 3-D viewport — glow lives HERE (one GPU layer) */}
      <div
        ref={vpRef}
        style={{
          width:280, height:280,
          perspective:1050, perspectiveOrigin:"50% 50%",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"grab",
          /* initial glow — updated by updateGlow() */
          transition:"filter .6s ease",
          transformStyle:"preserve-3d",
        }}
      >
        <div ref={sceneRef} style={{
          width:0, height:0,
          transformStyle:"preserve-3d",
          transform:"rotateX(28deg) rotateY(45deg)",
          transition:"opacity .35s",
        }}/>
      </div>

      {/* Status + buttons */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, marginTop:68 }}>

        <div ref={statusRef} style={{
          fontSize:"0.85rem", fontWeight:500, letterSpacing:"1.8px",
          color:"var(--accent)",
          textShadow:"0 0 10px var(--accent-glow)",
          minWidth:175, textAlign:"center",
        }}>Initializing...</div>

        <div style={{ display:"flex", gap:10 }}>
          <button ref={scrambleBtnRef} style={{
            padding:"7px 20px", borderRadius:10,
            border:"1px solid var(--glass-border)",
            background:"var(--glass-bg)",
            color:"var(--text-secondary)",
            fontSize:"0.8rem", fontWeight:600, cursor:"pointer",
            transition: "all 0.3s ease",
          }}>Scramble</button>

          <button ref={solveBtnRef} style={{
            padding:"7px 20px", borderRadius:10,
            border:"1px solid rgba(244,180,0,.35)",
            background:"rgba(244,180,0,.07)",
            color:"var(--accent)",
            fontSize:"0.8rem", fontWeight:600, cursor:"pointer",
            transition: "all 0.3s ease",
          }}>Solve ✦</button>
        </div>

        <div style={{ fontSize:"0.68rem", color:"var(--text-secondary)", opacity: 0.7, letterSpacing:".3px" }}>
          Drag to rotate
        </div>
      </div>

      <style>{`
        @keyframes cubeAura {
          0%,100%{ transform:scale(1); opacity:.75; }
          50%     { transform:scale(1.1); opacity:1; }
        }
      `}</style>
    </div>
  );
}
