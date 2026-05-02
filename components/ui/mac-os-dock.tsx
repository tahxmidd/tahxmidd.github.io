'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

export interface DockApp {
  id: string;
  name: string;
  icon: string | ((size: number) => React.ReactNode);
  separator?: boolean;
}

interface MacOSDockProps {
  apps: DockApp[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  className?: string;
}

const MacOSDock: React.FC<MacOSDockProps> = ({
  apps,
  onAppClick,
  openApps = [],
  className = '',
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(0);

  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return { baseIconSize: 56, maxScale: 1.6, effectWidth: 240 };
    }
    const smallerDimension = Math.min(window.innerWidth, window.innerHeight);
    if (smallerDimension < 480) {
      // Keep icons small enough that all 9 dock items fit within ~340px total width
      return { baseIconSize: Math.max(30, smallerDimension * 0.062), maxScale: 1.2, effectWidth: smallerDimension * 0.38 };
    } else if (smallerDimension < 768) {
      return { baseIconSize: Math.max(44, smallerDimension * 0.06), maxScale: 1.4, effectWidth: smallerDimension * 0.35 };
    } else if (smallerDimension < 1024) {
      return { baseIconSize: Math.max(52, smallerDimension * 0.055), maxScale: 1.55, effectWidth: smallerDimension * 0.3 };
    } else {
      return { baseIconSize: Math.max(56, Math.min(72, smallerDimension * 0.05)), maxScale: 1.75, effectWidth: 280 };
    }
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth } = config;
  const minScale = 1.0;
  const baseSpacing = Math.max(6, baseIconSize * 0.1);

  useEffect(() => {
    const handleResize = () => setConfig(getResponsiveConfig());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback((mousePosition: number | null) => {
    if (mousePosition === null) return apps.map(() => minScale);
    return apps.map((_, index) => {
      const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2;
      const minX = mousePosition - effectWidth / 2;
      const maxX = mousePosition + effectWidth / 2;
      if (normalIconCenter < minX || normalIconCenter > maxX) return minScale;
      const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
      return minScale + scaleFactor * (maxScale - minScale);
    });
  }, [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]);

  const calculatePositions = useCallback((scales: number[]) => {
    let currentX = 0;
    return scales.map((scale) => {
      const scaledWidth = baseIconSize * scale;
      const centerX = currentX + scaledWidth / 2;
      currentX += scaledWidth + baseSpacing;
      return centerX;
    });
  }, [baseIconSize, baseSpacing]);

  useEffect(() => {
    const initialScales = apps.map(() => minScale);
    setCurrentScales(initialScales);
    setCurrentPositions(calculatePositions(initialScales));
  }, [apps, calculatePositions, minScale, config]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.2 : 0.12;

    setCurrentScales(prev =>
      prev.map((s, i) => s + (targetScales[i] - s) * lerpFactor)
    );
    setCurrentPositions(prev =>
      prev.map((p, i) => p + (targetPositions[i] - p) * lerpFactor)
    );

    const scalesNeedUpdate = currentScales.some((s, i) => Math.abs(s - targetScales[i]) > 0.002);
    const positionsNeedUpdate = currentPositions.some((p, i) => Math.abs(p - targetPositions[i]) > 0.1);

    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateToTarget);
    return () => { if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current); };
  }, [animateToTarget]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16) return;
    lastMouseMoveTime.current = now;
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      const padding = Math.max(8, baseIconSize * 0.12);
      setMouseX(e.clientX - rect.left - padding);
    }
  }, [baseIconSize]);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
    setHoveredIndex(null);
  }, []);

  const handleAppClick = (appId: string, index: number) => {
    const el = iconRefs.current[index];
    if (el) {
      const bounceHeight = -(baseIconSize * 0.18);
      el.style.transition = 'transform 0.18s ease-out';
      el.style.transform = `translateY(${bounceHeight}px)`;
      setTimeout(() => { el.style.transform = 'translateY(0px)'; }, 180);
    }
    onAppClick(appId);
  };

  const contentWidth = currentPositions.length > 0
    ? Math.max(...currentPositions.map((pos, i) => pos + (baseIconSize * currentScales[i]) / 2))
    : apps.length * (baseIconSize + baseSpacing) - baseSpacing;

  const padding = Math.max(8, baseIconSize * 0.14);

  // Label position above hovered icon
  const labelLeft = hoveredIndex !== null
    ? (currentPositions[hoveredIndex] ?? 0) + padding
    : 0;

  return (
    <div
      ref={dockRef}
      className={`relative backdrop-blur-md ${className}`}
      style={{
        width: `${contentWidth + padding * 2}px`,
        background: 'rgba(30, 30, 32, 0.72)',
        borderRadius: `${Math.max(14, baseIconSize * 0.38)}px`,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: `
          0 ${Math.max(4, baseIconSize * 0.1)}px ${Math.max(20, baseIconSize * 0.45)}px rgba(0, 0, 0, 0.45),
          0 ${Math.max(2, baseIconSize * 0.04)}px ${Math.max(8, baseIconSize * 0.18)}px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 0 rgba(0, 0, 0, 0.25)
        `,
        padding: `${padding}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Hover label */}
      {hoveredIndex !== null && apps[hoveredIndex] && (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            bottom: `${baseIconSize + padding * 2 + 6}px`,
            left: `${labelLeft}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg whitespace-nowrap"
            style={{
              background: 'rgba(20, 20, 22, 0.85)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
          >
            {apps[hoveredIndex].name}
          </div>
        </div>
      )}

      {/* Icons */}
      <div className="relative" style={{ height: `${baseIconSize}px`, width: '100%' }}>
        {apps.map((app, index) => {
          const scale = currentScales[index] ?? 1;
          const position = currentPositions[index] ?? 0;
          const scaledSize = baseIconSize * scale;

          return (
            <div
              key={app.id}
              ref={el => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex items-end justify-center"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: '0px',
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: 'bottom center',
                zIndex: Math.round(scale * 10),
              }}
            >
              {typeof app.icon === 'string' ? (
                <img
                  src={app.icon}
                  alt={app.name}
                  width={scaledSize}
                  height={scaledSize}
                  className="object-contain"
                  style={{
                    filter: `drop-shadow(0 ${scale > 1.2 ? 4 : 2}px ${scale > 1.2 ? 8 : 4}px rgba(0,0,0,${0.25 + (scale - 1) * 0.15}))`,
                  }}
                />
              ) : (
                app.icon(scaledSize)
              )}

              {/* Open indicator dot */}
              {openApps.includes(app.id) && (
                <div
                  className="absolute"
                  style={{
                    bottom: `${Math.max(-3, -baseIconSize * 0.06)}px`,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: `${Math.max(3, baseIconSize * 0.055)}px`,
                    height: `${Math.max(3, baseIconSize * 0.055)}px`,
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    boxShadow: '0 0 4px rgba(0,0,0,0.4)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
