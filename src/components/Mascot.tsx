import React, { useState, useEffect, useRef } from 'react';
import './Mascot.css';

interface MascotProps {
  state?: 'idle' | 'thinking' | 'talking';
  className?: string;
  scale?: number;
}

const Mascot: React.FC<MascotProps> = ({ state = 'idle', className = '', scale = 1 }) => {
  const [blink, setBlink] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    let blinkTimeout: ReturnType<typeof setTimeout>;
    const interval = setInterval(() => {
      setBlink(true);
      blinkTimeout = setTimeout(() => setBlink(false), 120);
    }, 3500);
    return () => {
      clearInterval(interval);
      clearTimeout(blinkTimeout);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const updateRect = () => {
      if (mascotRef.current) rectRef.current = mascotRef.current.getBoundingClientRect();
    };
    updateRect();

    const handleMouseMove = (e: MouseEvent) => {
      if (!rectRef.current) return;
      const centerX = rectRef.current.left + rectRef.current.width / 2;
      const centerY = rectRef.current.top + rectRef.current.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15, 6);
      setMousePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
    };
  }, [prefersReducedMotion]);

  const isThinking = state === 'thinking';
  const eyeColor = isThinking ? 'var(--color-accent)' : 'var(--color-primary)';
  const eyeGlow = isThinking
    ? '0 0 15px rgba(255,123,123,0.8)'
    : '0 0 15px rgba(255,176,136,0.6)';
  const coreBg = isThinking ? 'rgba(255,123,123,0.1)' : 'rgba(255,176,136,0.1)';
  const coreBorder = isThinking ? '1px solid rgba(255,123,123,0.2)' : '1px solid rgba(255,176,136,0.2)';

  const eye = (
    <div className="relative">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${blink ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
        style={{ backgroundColor: eyeColor, boxShadow: eyeGlow }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1 blur-[0.5px]" />
      </div>
    </div>
  );

  const hand = (side: 'left' | 'right') => (
    <div
      className={`absolute ${side === 'left' ? '-left-6' : '-right-6'} top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl shadow-md ${state === 'talking' ? 'animate-bounce' : 'mascot-bounce-slow'} ${side === 'right' ? '[animation-delay:0.5s]' : ''}`}
      style={{ borderTop: '1px solid rgba(255,255,255,0.5)' }}
    >
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: 'linear-gradient(to bottom right, var(--color-bg), #F5EDE4)' }}
      />
    </div>
  );

  return (
    <div
      ref={mascotRef}
      aria-hidden="true"
      className={`mascot-container relative flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 160 * scale,
        height: 160 * scale,
        flexShrink: 0,
        overflow: 'visible',
      }}
    >
      {/* Scaled inner wrapper */}
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>

      {/* Shadow Base */}
      <div
        className="absolute bottom-12 w-20 h-4 bg-black/10 blur-xl rounded-[100%] transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(0.8)' : 'scale(1)' }}
      />

      {/* Main Character Body Container */}
      <div
        className={`relative transition-all duration-700 ease-out ${isThinking ? 'mascot-thinking' : 'mascot-float'}`}
        style={{ transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0) scale(1)' }}
      >
        {/* Head */}
        <div className="relative w-28 h-28 z-20">
          <div
            className="absolute inset-0 rounded-[32px]"
            style={{
              background: 'linear-gradient(to bottom right, var(--color-bg), #FAF0E6, #F5EDE4)',
              boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.1), inset 3px 3px 8px rgba(255,255,255,0.8), 0 15px 30px -10px rgba(0,0,0,0.15)',
            }}
          >
            {/* Visor (Face) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[55%] rounded-[20px] overflow-hidden shadow-inner flex items-center justify-center"
              style={{
                backgroundColor: 'var(--color-text)',
                borderTop: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              {/* Visor Glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent" />

              {/* Eyes — Follow Mouse */}
              <div
                className="flex gap-4 z-10 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              >
                {eye}
                {eye}
              </div>

              {/* Talking Mouth */}
              {state === 'talking' && (
                <div
                  className="absolute bottom-3 w-8 h-1 rounded-full animate-pulse"
                  style={{ backgroundColor: 'rgba(255,176,136,0.5)' }}
                />
              )}

              {/* Blush */}
              <div
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 blur-md rounded-full transition-opacity duration-500 ${isHovered || state === 'talking' ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: 'rgba(255,123,123,0.1)' }}
              />
            </div>

            {/* Helmet Detail */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-b-md shadow-inner"
              style={{ backgroundColor: '#F5EDE4' }}
            />
          </div>
        </div>

        {/* Floating Hands */}
        {hand('left')}
        {hand('right')}

        {/* Body */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-12 z-10">
          <div
            className="w-full h-full rounded-b-[30px] rounded-t-[8px] shadow-lg relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, var(--color-bg), #F5EDE4)' }}
          >
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: coreBg, border: coreBorder }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: eyeColor }}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Mascot;
