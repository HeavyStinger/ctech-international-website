/* ============================================================
   Ctech / Tesseract hero sky
   Procedural deep-space star field + chart-style constellations,
   one of which is a hidden 16-star projected-4D tesseract asterism.
   Vanilla JS + one <canvas>. No dependencies. rAF, transforms only.
   Attach point: <div class="hero-sky" data-hero-sky></div>
   Constellations are DATA (NAMED + buildTesseract) - add more freely.
   ============================================================ */
(function () {
  'use strict';

  var host = document.querySelector('[data-hero-sky]');
  if (!host) return;

  var canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  var ctx = canvas.getContext('2d');
  host.appendChild(canvas);

  var reduceMotion = false;
  try { reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

  /* ---------- deterministic rng: the sky is stable, no repeating tiles ---------- */
  var seed = 987654321;
  function rng() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

  /* white (common) / blue-white / rare pale cyan */
  function starColor() {
    var r = rng();
    if (r < 0.72) return '255,255,255';
    if (r < 0.95) return '224,234,255';
    return '186,226,240';
  }

  /* ---------- named constellations (normalized coords, chart-inspired) ---------- */
  var NAMED = [
    { name: 'Cassiopeia', stars: [
        { x: 0.00, y: 0.38, b: 0.90 },
        { x: 0.24, y: 0.62, b: 1.00 },
        { x: 0.50, y: 0.34, b: 0.95 },
        { x: 0.74, y: 0.55, b: 0.75 },
        { x: 1.00, y: 0.30, b: 0.65 }
      ], lines: [[0,1],[1,2],[2,3],[3,4]] },
    { name: 'Lyra', stars: [
        { x: 0.42, y: 0.06, b: 1.00 },
        { x: 0.62, y: 0.02, b: 0.50 },
        { x: 0.52, y: 0.24, b: 0.60 },
        { x: 0.72, y: 0.48, b: 0.55 },
        { x: 0.60, y: 0.74, b: 0.75 },
        { x: 0.38, y: 0.66, b: 0.70 }
      ], lines: [[0,1],[0,2],[2,3],[3,4],[4,5],[5,2]] },
    { name: 'Cygnus', stars: [
        { x: 0.50, y: 0.02, b: 1.00 },
        { x: 0.48, y: 0.38, b: 0.85 },
        { x: 0.44, y: 0.62, b: 0.50 },
        { x: 0.38, y: 0.92, b: 0.65 },
        { x: 0.24, y: 0.26, b: 0.70 },
        { x: 0.10, y: 0.16, b: 0.50 },
        { x: 0.02, y: 0.10, b: 0.45 },
        { x: 0.72, y: 0.52, b: 0.75 },
        { x: 0.92, y: 0.66, b: 0.55 }
      ], lines: [[0,1],[1,2],[2,3],[1,4],[4,5],[5,6],[1,7],[7,8]] }
  ];

  /* Rescale a definition's stars into a unit box (aspect preserved). */
  function normalize(c) {
    var minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, i, s;
    for (i = 0; i < c.stars.length; i++) {
      s = c.stars[i];
      if (s.x < minX) minX = s.x; if (s.x > maxX) maxX = s.x;
      if (s.y < minY) minY = s.y; if (s.y > maxY) maxY = s.y;
    }
    var span = Math.max(maxX - minX, maxY - minY) || 1;
    for (i = 0; i < c.stars.length; i++) {
      s = c.stars[i];
      s.x = (s.x - minX) / span;
      s.y = (s.y - minY) / span;
    }
    return c;
  }

  function cloneDef(d) {
    var stars = [], i;
    for (i = 0; i < d.stars.length; i++) stars.push({ x: d.stars[i].x, y: d.stars[i].y, b: d.stars[i].b });
    return { name: d.name, tesseract: d.tesseract, stars: stars, lines: d.lines };
  }

  /* ---------- the hidden Tesseract asterism, generated as data ----------
     16 stars = vertices of a 4-cube, rotated in the xw and yz planes
     (asymmetric on purpose) then projected 4D -> 3D -> 2D with perspective,
     so edges overlap and the geometry reads as nested cells, not a flat cube. */
  function buildTesseract() {
    var a = 0.62, b = 0.33;
    var ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b);
    var stars = [], lines = [], i, j;
    for (i = 0; i < 16; i++) {
      var x = (i & 1) ? 1 : -1, y = (i & 2) ? 1 : -1, z = (i & 4) ? 1 : -1, w = (i & 8) ? 1 : -1;
      var x2 = x * ca - w * sa, w2 = x * sa + w * ca;   /* rotate xw */
      var y2 = y * cb - z * sb, z2 = y * sb + z * cb;   /* rotate yz */
      var s4 = 1 / (2.6 - w2 * 0.85);                   /* 4D -> 3D perspective */
      var X = x2 * s4, Y = y2 * s4, Z = z2 * s4;
      var s3 = 1 / (2.1 - Z * 0.9);                     /* 3D -> 2D perspective */
      stars.push({
        x: 0.5 + X * s3 * 1.55 + (rng() - 0.5) * 0.035, /* jitter: no perfect symmetry */
        y: 0.5 + Y * s3 * 1.55 + (rng() - 0.5) * 0.035,
        b: (w2 > 0 && x2 > 0) ? 1.0 : 0.5 + rng() * 0.2 /* four brighter anchor stars */
      });
    }
    /* vertices differing by exactly one coordinate bit form the 32 edges */
    for (i = 0; i < 16; i++) for (j = i + 1; j < 16; j++) {
      var d = i ^ j;
      if ((d & (d - 1)) === 0) lines.push([i, j]);
    }
    return normalize({ name: 'Tesseract', tesseract: true, stars: stars, lines: lines });
  }

  /* ---------- believable filler constellations: meandering chains ---------- */
  function buildFiller() {
    var n = 5 + Math.floor(rng() * 8); /* 5..12 stars */
    var stars = [], lines = [];
    var x = 0, y = 0, ang = rng() * Math.PI * 2, i;
    for (i = 0; i < n; i++) {
      stars.push({ x: x, y: y, b: 0.45 + rng() * 0.55 });
      ang += (rng() - 0.5) * 1.9;
      var step = 0.35 + rng() * 0.45;
      x += Math.cos(ang) * step;
      y += Math.sin(ang) * step;
      if (i > 0) lines.push([i - 1, i]);
    }
    if (n >= 7 && rng() < 0.6) lines.push([1 + Math.floor(rng() * 2), n - 1]); /* occasional branch */
    return normalize({ stars: stars, lines: lines });
  }

  /* ---------- world state ---------- */
  var W = 0, H = 0, dpr = 1;
  var bgStars = [], constellations = [];
  var mouse = { x: -1e4, y: -1e4 };
  var par = { x: 0, y: 0 };

  /* ---------- shooting stars: rare, thin, calm ---------- */
  var meteors = [], nextMeteor = 3000, lastT = 0;

  function buildStars() {
    bgStars = [];
    /* px^2 of sky per star: mobile ~50% density of desktop */
    var density = W < 640 ? 1500 : (W < 1024 ? 1000 : 750);
    var count = Math.round((W * H) / density);
    for (var i = 0; i < count; i++) {
      bgStars.push({
        x: rng() * W, y: rng() * H,
        r: rng() < 0.85 ? 0.4 + rng() * 0.6 : 1.0 + rng() * 0.7,
        depth: 0.25 + rng() * 0.75,
        a: 0.12 + rng() * 0.55,
        ph: rng() * Math.PI * 2,
        sp: 0.3 + rng() * 1.1,
        color: starColor()
      });
    }
  }

  function findSpot(scale, placed, isTesseract) {
    var margin = scale * 0.6 + 24;
    var spanX = Math.max(1, W - margin * 2), spanY = Math.max(1, H - margin * 2);
    for (var t = 0; t < 80; t++) {
      var x = margin + rng() * spanX, y = margin + rng() * spanY;
      if (isTesseract) {
        var nx = x / W, ny = y / H;
        /* off-center, never behind the headline block */
        if (nx > 0.26 && nx < 0.74 && ny > 0.18 && ny < 0.72) continue;
      }
      var ok = true;
      for (var i = 0; i < placed.length; i++) {
        var dx = x - placed[i].x, dy = y - placed[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < placed[i].r + scale * 0.7) { ok = false; break; }
      }
      if (ok) return { x: x, y: y };
    }
    return { x: margin + rng() * spanX, y: margin + rng() * spanY };
  }

  function placeConstellations() {
    constellations = [];
    var mobile = W < 640;
    var base = Math.min(W, H);
    var defs = [], i;
    for (i = 0; i < NAMED.length; i++) defs.push(normalize(cloneDef(NAMED[i])));
    var total = mobile ? 6 : 12 + Math.floor(rng() * 3); /* 6 mobile / 12-14 desktop */
    var fillers = Math.max(0, total - defs.length - 1);
    for (i = 0; i < fillers; i++) defs.push(buildFiller());
    defs.push(buildTesseract()); /* always preserved */

    var placed = [];
    for (i = 0; i < defs.length; i++) {
      var def = defs[i];
      /* tesseract runs ~20% larger than its neighbors */
      var scale = base * (0.13 + rng() * 0.05) * (def.tesseract ? 1.2 : 1);
      var rot = (rng() - 0.5) * (def.name ? 0.9 : Math.PI * 2);
      var pos = findSpot(scale, placed, !!def.tesseract);
      var cos = Math.cos(rot), sin = Math.sin(rot);
      var stars = [];
      for (var j = 0; j < def.stars.length; j++) {
        var s = def.stars[j];
        var lx = (s.x - 0.5) * scale, ly = (s.y - 0.5) * scale;
        stars.push({
          x: pos.x + lx * cos - ly * sin,
          y: pos.y + lx * sin + ly * cos,
          r: def.tesseract && s.b >= 1 ? 2.1 : 0.9 + s.b * 1.0,
          b: s.b,
          color: starColor(),
          ph: rng() * Math.PI * 2,
          sp: 0.4 + rng() * 0.8
        });
      }
      constellations.push({
        stars: stars, lines: def.lines, glow: 0,
        cx: pos.x, cy: pos.y, radius: scale * 0.62,
        tesseract: !!def.tesseract
      });
      placed.push({ x: pos.x, y: pos.y, r: scale * 0.7 });
    }
  }

  function draw(t) {
    var dt = lastT ? Math.min(64, t - lastT) : 16;
    lastT = t;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    /* parallax eases toward the pointer; only a few px, never floaty */
    var tx = mouse.x > -1e3 ? (mouse.x / W - 0.5) : 0;
    var ty = mouse.y > -1e3 ? (mouse.y / H - 0.5) : 0;
    if (reduceMotion) { tx = 0; ty = 0; }
    par.x += (tx - par.x) * 0.04;
    par.y += (ty - par.y) * 0.04;

    var i, j, s;
    for (i = 0; i < bgStars.length; i++) {
      s = bgStars[i];
      var tw = reduceMotion ? 1 : 0.72 + 0.28 * Math.sin(t * 0.001 * s.sp + s.ph);
      ctx.fillStyle = 'rgba(' + s.color + ',' + (s.a * tw).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(s.x + par.x * 10 * s.depth, s.y + par.y * 10 * s.depth, s.r, 0, 6.2832);
      ctx.fill();
    }

    /* shooting stars */
    if (!reduceMotion) {
      if (t > nextMeteor) {
        meteors.push({
          x: W * (0.05 + Math.random() * 0.9),
          y: H * Math.random() * 0.35,
          ang: Math.PI * (0.18 + Math.random() * 0.18), /* shallow downward diagonal */
          v: 0.45 + Math.random() * 0.35,               /* px per ms */
          life: 0,
          max: 700 + Math.random() * 500,
          flip: Math.random() < 0.5 ? -1 : 1
        });
        nextMeteor = t + 5000 + Math.random() * 7000;
      }
      for (i = meteors.length - 1; i >= 0; i--) {
        var m = meteors[i];
        m.life += dt;
        if (m.life > m.max) { meteors.splice(i, 1); continue; }
        var ux = Math.cos(m.ang) * m.flip, uy = Math.sin(m.ang);
        m.x += ux * m.v * dt;
        m.y += uy * m.v * dt;
        var env = Math.sin(Math.PI * (m.life / m.max)); /* fade in and out */
        var len = 70 + m.v * 60;
        var grad = ctx.createLinearGradient(m.x, m.y, m.x - ux * len, m.y - uy * len);
        grad.addColorStop(0, 'rgba(255,255,255,' + (0.7 * env).toFixed(3) + ')');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - ux * len, m.y - uy * len);
        ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,' + (0.85 * env).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(m.x, m.y, 1.2, 0, 6.2832); ctx.fill();
      }
    }

    for (i = 0; i < constellations.length; i++) {
      var c = constellations[i];
      var ox = par.x * 14, oy = par.y * 14; /* whole group moves as one: shape preserved */

      /* proximity glow, smooth in and out */
      var dx = mouse.x - (c.cx + ox), dy = mouse.y - (c.cy + oy);
      var target = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / (c.radius * 1.9));
      c.glow += (target - c.glow) * 0.07;
      var g = c.glow;

      /* lines: 1px, rgba(255,255,255,.08-.18), soft under-glow, never overpowering */
      var la = Math.min(0.18, (c.tesseract ? 0.09 : 0.11) * (1 + g * 0.9));
      ctx.beginPath();
      for (j = 0; j < c.lines.length; j++) {
        var A = c.stars[c.lines[j][0]], B = c.stars[c.lines[j][1]];
        ctx.moveTo(A.x + ox, A.y + oy);
        ctx.lineTo(B.x + ox, B.y + oy);
      }
      ctx.lineWidth = 2.4;
      ctx.strokeStyle = 'rgba(255,255,255,' + (la * 0.35).toFixed(3) + ')';
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255,255,255,' + la.toFixed(3) + ')';
      ctx.stroke();

      for (j = 0; j < c.stars.length; j++) {
        s = c.stars[j];
        var tw2 = reduceMotion ? 1 : 0.8 + 0.2 * Math.sin(t * 0.001 * s.sp + s.ph);
        var a = Math.min(1, (0.4 + s.b * 0.5) * tw2 * (1 + g * 0.5));
        var x = s.x + ox, y = s.y + oy;
        ctx.fillStyle = 'rgba(255,255,255,' + (a * 0.1 * (1 + g)).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, s.r * 3.2, 0, 6.2832); ctx.fill();
        ctx.fillStyle = 'rgba(' + s.color + ',' + a.toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, s.r, 0, 6.2832); ctx.fill();
      }
    }
  }

  var resizeTimer = null;
  function resize() {
    var rect = host.getBoundingClientRect();
    W = Math.max(1, rect.width);
    H = Math.max(1, rect.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    seed = 987654321; /* same sky at every size class */
    buildStars();
    placeConstellations();
  }
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  window.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  document.addEventListener('mouseleave', function () { mouse.x = -1e4; mouse.y = -1e4; });

  function loop(t) { draw(t); requestAnimationFrame(loop); }
  resize();
  requestAnimationFrame(loop);
})();
