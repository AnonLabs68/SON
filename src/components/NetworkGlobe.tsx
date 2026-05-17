import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

type Beacon = {
  city: string;
  lat: number;
  lon: number;
  status: 'lab' | 'planned' | 'edge';
};

const beacons: Beacon[] = [
  { city: 'Mumbai', lat: 19.076, lon: 72.8777, status: 'lab' },
  { city: 'Bengaluru', lat: 12.9716, lon: 77.5946, status: 'edge' },
  { city: 'Delhi', lat: 28.6139, lon: 77.209, status: 'planned' },
  { city: 'Singapore', lat: 1.3521, lon: 103.8198, status: 'planned' },
  { city: 'Frankfurt', lat: 50.1109, lon: 8.6821, status: 'planned' },
  { city: 'New York', lat: 40.7128, lon: -74.006, status: 'planned' },
];

const telemetryRows = [
  { label: 'HexaField packet width', value: '48 B', tone: 'text-theme-accent' },
  { label: 'Local apply target', value: '<=1 ms', tone: 'text-[#22c55e]' },
  { label: 'LAN propagation target', value: '<=5 ms', tone: 'text-[#f4b740]' },
  { label: 'Backfill correctness target', value: '>=99%', tone: 'text-white' },
  { label: 'Duplicate packet accepts', value: '0', tone: 'text-[#22c55e]' },
  { label: 'Synthetic candle policy', value: 'off', tone: 'text-[#f43f5e]' },
];

function latLonToVector(lat: number, lon: number, radius = 1.045) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function LatLongGrid() {
  const latitudes = [-60, -30, 0, 30, 60];
  const longitudes = Array.from({ length: 12 }, (_, index) => index * 15);

  return (
    <group>
      {latitudes.map((lat) => {
        const y = Math.sin(THREE.MathUtils.degToRad(lat));
        const radius = Math.cos(THREE.MathUtils.degToRad(lat));
        return (
          <mesh key={`lat-${lat}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[radius, 0.0015, 6, 144]} />
            <meshBasicMaterial color="#00f5ff" transparent opacity={lat === 0 ? 0.2 : 0.1} />
          </mesh>
        );
      })}
      {longitudes.map((lon) => (
        <mesh key={`lon-${lon}`} rotation={[Math.PI / 2, 0, THREE.MathUtils.degToRad(lon)]}>
          <torusGeometry args={[1, 0.0012, 6, 144]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

function BeaconPoint({ beacon }: { beacon: Beacon }) {
  const pulseRef = useRef<THREE.Mesh>(null);
  const point = useMemo(() => latLonToVector(beacon.lat, beacon.lon), [beacon.lat, beacon.lon]);
  const color = beacon.status === 'lab' ? '#00f5ff' : beacon.status === 'edge' ? '#22c55e' : '#f4b740';

  useFrame(({ clock }) => {
    if (!pulseRef.current) return;
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2.5 + point.x * 8) * 0.18;
    pulseRef.current.scale.setScalar(scale);
  });

  return (
    <group position={point}>
      <mesh>
        <sphereGeometry args={[0.021, 14, 14]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.055, 14, 14]} />
        <meshBasicMaterial color={color} transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

function Arc({ from, to }: { from: Beacon; to: Beacon }) {
  const line = useMemo(() => {
    const start = latLonToVector(from.lat, from.lon, 1.055);
    const end = latLonToVector(to.lat, to.lon, 1.055);
    const mid = start.clone().add(end).normalize().multiplyScalar(1.34);
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(40));
    const material = new THREE.LineBasicMaterial({
      color: '#00f5ff',
      transparent: true,
      opacity: 0.2,
    });

    return new THREE.Line(geometry, material);
  }, [from, to]);

  return <primitive object={line} />;
}

function AnimatedGlobe() {
  const globeRef = useRef<THREE.Group>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const activeBeacon = beacons[0];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y = t * 0.12;
    if (octaRef.current) {
      octaRef.current.rotation.x = t * 0.09;
      octaRef.current.rotation.y = -t * 0.18;
      octaRef.current.rotation.z = t * 0.04;
    }
  });

  return (
    <group>
      <ambientLight intensity={0.35} />
      <pointLight position={[3, 4, 4]} intensity={2.2} color="#00f5ff" />
      <pointLight position={[-3, -2, -4]} intensity={1.6} color="#22c55e" />
      <group ref={globeRef}>
        <mesh>
          <sphereGeometry args={[1, 64, 36]} />
          <meshStandardMaterial color="#061015" transparent opacity={0.86} roughness={0.9} metalness={0.08} />
        </mesh>
        <mesh>
          <sphereGeometry args={[1.006, 64, 36]} />
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.08} />
        </mesh>
        <LatLongGrid />
        {beacons.map((beacon) => (
          <BeaconPoint key={beacon.city} beacon={beacon} />
        ))}
        {beacons.slice(1).map((beacon) => (
          <Arc key={`${activeBeacon.city}-${beacon.city}`} from={activeBeacon} to={beacon} />
        ))}
      </group>

      <mesh ref={octaRef}>
        <octahedronGeometry args={[1.38, 0]} />
        <meshStandardMaterial
          color="#00f5ff"
          wireframe
          transparent
          opacity={0.52}
          emissive="#00f5ff"
          emissiveIntensity={0.65}
        />
      </mesh>
    </group>
  );
}

export default function NetworkGlobe() {
  return (
    <div className="glass-panel relative my-10 flex min-h-[560px] w-full items-center justify-center overflow-hidden border-theme-border/30 bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,245,255,0.16),transparent_34%),radial-gradient(circle_at_62%_60%,rgba(34,197,94,0.12),transparent_24%)]" />
      <div className="absolute inset-0 z-0 opacity-95">
        <Canvas camera={{ position: [0, 0, 3.35], fov: 42 }}>
          <AnimatedGlobe />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute left-5 top-5 z-10 max-w-[310px] font-mono md:left-8 md:top-8">
        <div className="mb-5 inline-flex items-center gap-2 border border-theme-accent/25 bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-theme-accent backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-theme-accent shadow-[0_0_10px_rgba(0,245,255,0.9)]" />
          Active Network Telemetry
        </div>
        <div className="text-5xl font-black leading-none tracking-normal text-white md:text-6xl">48B</div>
        <div className="mt-2 text-[11px] uppercase tracking-[0.24em] text-theme-text-secondary">
          strict market-state packet
        </div>
        <div className="mt-6 grid gap-2 border-t border-white/10 pt-5">
          {telemetryRows.map((row) => (
            <div key={row.label} className="grid grid-cols-[1fr_auto] gap-4 border border-white/[0.06] bg-black/30 px-3 py-2 text-[11px]">
              <span className="text-theme-text-muted">{row.label}</span>
              <span className={`font-bold ${row.tone}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 right-5 z-10 max-w-[300px] border border-theme-border bg-black/45 p-4 text-right font-mono text-[10px] uppercase tracking-[0.18em] text-theme-text-muted backdrop-blur md:bottom-8 md:right-8">
        <div className="mb-2 text-theme-accent">Observed-state sharing</div>
        <div className="leading-5">
          New nodes hydrate from active peer ranges first. Synthetic historical candles stay disabled until verified data is unavailable and explicitly marked.
        </div>
      </div>
    </div>
  );
}
