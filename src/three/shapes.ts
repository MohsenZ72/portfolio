// Procedural point clouds for the four acts of the page:
// seed (hero) → roots (background) → network (projects) → signal (contact).
// Deterministic (seeded PRNG) so the shape is the same on every visit.

type V3 = [number, number, number]

function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gauss(rand: () => number) {
  const u = 1 - rand()
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

function normalize(v: V3): V3 {
  const l = Math.hypot(v[0], v[1], v[2]) || 1
  return [v[0] / l, v[1] / l, v[2] / l]
}

export function seed(n: number, rand = mulberry32(7)): Float32Array {
  const out = new Float32Array(n * 3)
  for (let i = 0; i < n; i++) {
    // Points on an elongated shell, with a faint seam down the middle.
    const u = rand() * 2 - 1
    const th = rand() * Math.PI * 2
    const r = Math.sqrt(1 - u * u)
    const shell = 1 + gauss(rand) * 0.035
    let x = r * Math.cos(th) * 0.95 * shell
    const y = u * 1.3 * shell
    let z = r * Math.sin(th) * 0.95 * shell
    if (Math.abs(x) < 0.05 && z > 0) x *= 3
    // Taper the bottom into a point, like a sunflower seed.
    const taper = 1 - Math.max(0, -u) * 0.45
    x *= taper
    z *= taper
    out.set([x, y + 0.15, z], i * 3)
  }
  return out
}

type Segment = { a: V3; b: V3; w: number }

export function roots(n: number, rand = mulberry32(11)): Float32Array {
  const segs: Segment[] = []

  const grow = (p: V3, dir: V3, len: number, w: number, depth: number) => {
    let pos = p
    let d = dir
    const steps = Math.max(4, Math.floor(len / 0.09))
    for (let s = 0; s < steps; s++) {
      d = normalize([
        d[0] + gauss(rand) * 0.22,
        d[1] - 0.05 + gauss(rand) * 0.08,
        d[2] + gauss(rand) * 0.22,
      ])
      const next: V3 = [pos[0] + d[0] * 0.09, pos[1] + d[1] * 0.09, pos[2] + d[2] * 0.09]
      const ww = w * (1 - (s / steps) * 0.75)
      segs.push({ a: pos, b: next, w: ww })
      pos = next
      if (depth < 5 && rand() < 0.13 - depth * 0.012) {
        const side = rand() < 0.5 ? -1 : 1
        const child = normalize([d[0] + side * (0.8 + rand() * 0.6), d[1] * 0.6 - 0.2, d[2] + gauss(rand) * 0.7])
        grow(pos, child, len * (0.35 + rand() * 0.3), ww * 0.62, depth + 1)
      }
    }
  }

  // A short stem above the soil line, then the taproot and two laterals.
  segs.push({ a: [0, 1.0, 0], b: [0, 1.75, 0], w: 0.9 })
  grow([0, 1.0, 0], [0, -1, 0], 4.2, 1, 0)
  grow([0, 0.85, 0], normalize([-1, -0.35, 0.2]), 2.4, 0.7, 1)
  grow([0, 0.7, 0], normalize([1, -0.4, -0.25]), 2.6, 0.7, 1)

  const weights = segs.map((s) => Math.hypot(s.b[0] - s.a[0], s.b[1] - s.a[1], s.b[2] - s.a[2]) * (0.25 + s.w))
  const total = weights.reduce((a, b) => a + b, 0)
  const cdf: number[] = []
  let acc = 0
  for (const w of weights) cdf.push((acc += w / total))

  const out = new Float32Array(n * 3)
  const soil = Math.floor(n * 0.08)
  for (let i = 0; i < n; i++) {
    if (i < soil) {
      // A faint soil horizon.
      out.set([gauss(rand) * 1.9, 1.0 + gauss(rand) * 0.025, gauss(rand) * 0.8], i * 3)
      continue
    }
    const r = rand()
    let lo = 0
    let hi = cdf.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (cdf[mid] < r) lo = mid + 1
      else hi = mid
    }
    const s = segs[lo]
    const t = rand()
    const spread = 0.012 + s.w * 0.04
    out.set(
      [
        s.a[0] + (s.b[0] - s.a[0]) * t + gauss(rand) * spread,
        s.a[1] + (s.b[1] - s.a[1]) * t + gauss(rand) * spread,
        s.a[2] + (s.b[2] - s.a[2]) * t + gauss(rand) * spread,
      ],
      i * 3,
    )
  }
  // Recentre vertically.
  for (let i = 0; i < n; i++) out[i * 3 + 1] += 0.9
  return out
}

// Hub positions are shared with the DOM so labels can sit near them.
export const hubs: V3[] = [
  [-1.9, 0.9, 0.3],
  [1.8, 1.1, -0.2],
  [-1.5, -1.2, -0.3],
  [1.7, -1.0, 0.4],
]

export function network(n: number, rand = mulberry32(23)): { pos: Float32Array; hub: Float32Array } {
  const nodes: { p: V3; hub: boolean }[] = hubs.map((p) => ({ p, hub: true }))
  for (let i = 0; i < 34; i++) {
    const u = rand() * 2 - 1
    const th = rand() * Math.PI * 2
    const rr = 1.2 + rand() * 1.7
    const r = Math.sqrt(1 - u * u)
    nodes.push({ p: [r * Math.cos(th) * rr * 1.15, u * rr * 0.8, r * Math.sin(th) * rr * 0.6], hub: false })
  }
  const edges: [number, number][] = []
  nodes.forEach((a, i) => {
    const near = nodes
      .map((b, j) => ({ j, d: Math.hypot(a.p[0] - b.p[0], a.p[1] - b.p[1], a.p[2] - b.p[2]) }))
      .filter((x) => x.j !== i)
      .sort((x, y) => x.d - y.d)
      .slice(0, a.hub ? 5 : 2)
    near.forEach((x) => edges.push([i, x.j]))
  })
  // Hubs talk to each other: one product, many services.
  for (let i = 0; i < hubs.length; i++) for (let j = i + 1; j < hubs.length; j++) edges.push([i, j])

  const out = new Float32Array(n * 3)
  const hub = new Float32Array(n).fill(-1)
  const atNodes = Math.floor(n * 0.36)
  for (let i = 0; i < n; i++) {
    if (i < atNodes) {
      const hubBias = rand() < 0.45
      const idx = hubBias ? Math.floor(rand() * hubs.length) : Math.floor(rand() * nodes.length)
      const node = nodes[idx]
      if (node.hub) hub[i] = idx
      const s = node.hub ? 0.13 : 0.045
      out.set([node.p[0] + gauss(rand) * s, node.p[1] + gauss(rand) * s, node.p[2] + gauss(rand) * s], i * 3)
    } else {
      const [ia, ib] = edges[Math.floor(rand() * edges.length)]
      const a = nodes[ia].p
      const b = nodes[ib].p
      const t = rand()
      out.set(
        [
          a[0] + (b[0] - a[0]) * t + gauss(rand) * 0.008,
          a[1] + (b[1] - a[1]) * t + gauss(rand) * 0.008,
          a[2] + (b[2] - a[2]) * t + gauss(rand) * 0.008,
        ],
        i * 3,
      )
    }
  }
  return { pos: out, hub }
}

export function signal(n: number, rand = mulberry32(31)): Float32Array {
  const out = new Float32Array(n * 3)
  const rings = 11
  for (let i = 0; i < n; i++) {
    const k = Math.floor(rand() * rings)
    const radius = 0.35 + k * 0.32 + gauss(rand) * 0.012
    const th = rand() * Math.PI * 2
    const x = Math.cos(th) * radius
    const z = Math.sin(th) * radius
    const y = Math.sin(radius * 3.2) * 0.12
    // Tilt the disc toward the viewer.
    out.set([x, y * 0.6 + z * 0.42 - 0.2, z * 0.9 - y * 0.3], i * 3)
  }
  return out
}
