import { useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { network, roots, seed, signal } from './shapes'
import { sceneState } from '../lib/scroll'

const vertex = /* glsl */ `
  attribute vec3 aRoots;
  attribute vec3 aNet;
  attribute vec3 aSignal;
  attribute float aRand;
  attribute float aHub;

  uniform float uTime;
  uniform float uStage;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uHub;
  uniform float uMotion;
  uniform vec2 uPointer;

  varying float vRand;
  varying float vGlow;

  float ease(float t) { return t * t * (3.0 - 2.0 * t); }
  float part(float s, float k) { return ease(clamp((s - k) * 1.4 - aRand * 0.4, 0.0, 1.0)); }

  void main() {
    float s = uStage;
    vec3 p = position;
    p = mix(p, aRoots, part(s, 0.0));
    p = mix(p, aNet, part(s, 1.0));
    p = mix(p, aSignal, part(s, 2.0));

    // Particles lift off the shape mid-transition, then settle.
    float mid = 1.0 - abs(fract(s) - 0.5) * 2.0;
    float lift = smoothstep(0.15, 1.0, mid) * step(0.02, s) * step(s, 2.98);
    p += normalize(p + 0.0001) * lift * (aRand - 0.35) * 0.55 * uMotion;

    float t = uTime * 0.3;
    p += 0.025 * uMotion * vec3(sin(t + aRand * 31.0), cos(t * 1.3 + aRand * 17.0), sin(t * 0.7 + aRand * 11.0));

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // The pointer parts the field like a hand through grass.
    vec2 d = mv.xy - uPointer * vec2(4.2, 2.6);
    float f = exp(-dot(d, d) * 1.4) * uMotion;
    mv.xy += normalize(d + 0.0001) * f * 0.32;

    gl_Position = projectionMatrix * mv;

    float hubOn = (uHub >= 0.0 && abs(aHub - uHub) < 0.5) ? 1.0 : 0.0;
    float netIn = part(s, 1.0) * (1.0 - part(s, 2.0));
    vGlow = hubOn * netIn;

    float size = uSize * (0.45 + aRand * 0.95) * (1.0 + vGlow * 1.6);
    gl_PointSize = size * uPixelRatio / -mv.z;
    vRand = aRand;
  }
`

const fragment = /* glsl */ `
  uniform vec3 uGrow;
  uniform vec3 uDiode;
  uniform vec3 uChalk;
  varying float vRand;
  varying float vGlow;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    a *= a;
    // Grow-light mix: mostly magenta, some blue diodes, rare white sparks.
    vec3 col = mix(uGrow, uDiode, smoothstep(0.55, 0.95, vRand));
    col = mix(col, uChalk, step(0.965, vRand) * 0.85);
    col = mix(col, uChalk, vGlow * 0.6);
    gl_FragColor = vec4(col, a * (0.7 + vGlow * 0.3));
  }
`

export function Field({ count, motion }: { count: number; motion: boolean }) {
  const points = useRef<THREE.Points>(null)
  const stage = useRef(0)
  const hub = useRef(-1)
  const { gl, viewport } = useThree()

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const net = network(count)
    const rand = new Float32Array(count)
    for (let i = 0; i < count; i++) rand[i] = Math.random()
    g.setAttribute('position', new THREE.BufferAttribute(seed(count), 3))
    g.setAttribute('aRoots', new THREE.BufferAttribute(roots(count), 3))
    g.setAttribute('aNet', new THREE.BufferAttribute(net.pos, 3))
    g.setAttribute('aSignal', new THREE.BufferAttribute(signal(count), 3))
    g.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
    g.setAttribute('aHub', new THREE.BufferAttribute(net.hub, 1))
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 6)
    return g
  }, [count])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uStage: { value: 0 },
          uSize: { value: 42 },
          uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
          uHub: { value: -1 },
          uMotion: { value: motion ? 1 : 0 },
          uPointer: { value: new THREE.Vector2() },
          uGrow: { value: new THREE.Color('#ff4fb8') },
          uDiode: { value: new THREE.Color('#5b7cff') },
          uChalk: { value: new THREE.Color('#ede6ee') },
        },
      }),
    [gl, motion],
  )

  useFrame((state, delta) => {
    const u = material.uniforms
    const k = motion ? 1 - Math.exp(-delta * 3.2) : 1
    stage.current += (sceneState.stage - stage.current) * k
    hub.current = sceneState.hub
    u.uTime.value = motion ? state.clock.elapsedTime : 0
    u.uStage.value = stage.current
    u.uHub.value = hub.current
    u.uPointer.value.lerp(new THREE.Vector2(sceneState.pointer.x, sceneState.pointer.y), motion ? 0.08 : 1)

    if (!points.current) return
    const s = stage.current
    const narrow = viewport.aspect < 1
    // Shift the shape aside so it never sits under the text column.
    const sideHero = narrow ? 0 : 2.35
    const sideRoots = narrow ? 0 : -1.7
    const sideNet = narrow ? 0 : 1.55
    const sideSignal = narrow ? 0 : 2.1
    const x =
      s < 1
        ? sideHero + (sideRoots - sideHero) * s
        : s < 2
          ? sideRoots + (sideNet - sideRoots) * (s - 1)
          : sideNet + (sideSignal - sideNet) * Math.min(1, s - 2)
    points.current.position.x = x
    points.current.position.y = s > 2 ? -0.35 * Math.min(1, s - 2) : 0
    const scale = narrow ? 0.62 : 1
    points.current.scale.setScalar(scale)
    points.current.rotation.y = (motion ? state.clock.elapsedTime * 0.04 : 0) + s * 0.5
    points.current.rotation.x = s > 2 ? (s - 2) * 0.35 : 0
  })

  return <points ref={points} geometry={geometry} material={material} />
}
