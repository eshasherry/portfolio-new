import React, { useState, useEffect, useRef } from 'react';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 120);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!mascotRef.current) return;

      const rect = mascotRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 15, 6);

      setMousePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={mascotRef}
      className={`relative flex items-center justify-center cursor-pointer select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transform: `scale(${scale})` }}
    >
      {/* Shadow Base */}
      <div
        className="absolute bottom-12 w-20 h-4 bg-black/10 blur-xl rounded-[100%] transition-transform duration-500"
        style={{ transform: isHovered ? 'scale(0.8)' : 'scale(1)' }}
      ></div>

      {/* Main Character Body Container */}
      <div
        className={`relative transition-all duration-700 ease-out ${state === 'thinking' ? 'mascot-thinking' : 'mascot-float'}`}
        style={{ transform: isHovered ? 'translateY(-15px) scale(1.05)' : 'translateY(0) scale(1)' }}
      >

        {/* The Head - Warm Gradient Helmet */}
        <div className="relative w-28 h-28 z-20">
          {/* Main Head Shape */}
          <div
            className="absolute inset-0 rounded-[32px]"
            style={{
              background: 'linear-gradient(to bottom right, #FFF8F0, #FAF0E6, #F5EDE4)',
              boxShadow: 'inset -3px -3px 8px rgba(0,0,0,0.1), inset 3px 3px 8px rgba(255,255,255,0.8), 0 15px 30px -10px rgba(0,0,0,0.15)'
            }}
          >

            {/* Visor (The Face) */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[55%] rounded-[20px] overflow-hidden shadow-inner flex items-center justify-center"
              style={{
                backgroundColor: '#3D2C2C',
                borderTop: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              {/* Visor Glare */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>

              {/* Eyes Container - Follows Mouse */}
              <div
                className="flex gap-4 z-10 transition-transform duration-200 ease-out"
                style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
              >
                <div className="relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${blink ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
                    style={{
                      backgroundColor: state === 'thinking' ? '#FF7B7B' : '#FFB088',
                      boxShadow: state === 'thinking'
                        ? '0 0 15px rgba(255,123,123,0.8)'
                        : '0 0 15px rgba(255,176,136,0.6)'
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1 blur-[0.5px]"></div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${blink ? 'scale-y-0 opacity-0' : 'scale-y-100 opacity-100'}`}
                    style={{
                      backgroundColor: state === 'thinking' ? '#FF7B7B' : '#FFB088',
                      boxShadow: state === 'thinking'
                        ? '0 0 15px rgba(255,123,123,0.8)'
                        : '0 0 15px rgba(255,176,136,0.6)'
                    }}
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-1 left-1 blur-[0.5px]"></div>
                  </div>
                </div>
              </div>

              {/* Talking Animation (Mouth) */}
              {state === 'talking' && (
                <div
                  className="absolute bottom-3 w-8 h-1 rounded-full animate-pulse"
                  style={{ backgroundColor: 'rgba(255,176,136,0.5)' }}
                ></div>
              )}

              {/* Blushing Effect */}
              <div
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-3 blur-md rounded-full transition-opacity duration-500 ${isHovered || state === 'talking' ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundColor: 'rgba(255,123,123,0.1)' }}
              ></div>
            </div>

            {/* Helmet Detail */}
            <div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-b-md shadow-inner"
              style={{ backgroundColor: '#F5EDE4' }}
            ></div>
          </div>
        </div>

        {/* Small Floating Hands */}
        <div
          className={`absolute -left-6 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl shadow-md ${state === 'talking' ? 'animate-bounce' : 'mascot-bounce-slow'}`}
          style={{
            backgroundColor: '#FFF8F0',
            borderTop: '1px solid rgba(255,255,255,0.5)'
          }}
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{ background: 'linear-gradient(to bottom right, #FFF8F0, #F5EDE4)' }}
          ></div>
        </div>
        <div
          className={`absolute -right-6 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl shadow-md ${state === 'talking' ? 'animate-bounce' : 'mascot-bounce-slow'} [animation-delay:0.5s]`}
          style={{
            backgroundColor: '#FFF8F0',
            borderTop: '1px solid rgba(255,255,255,0.5)'
          }}
        >
          <div
            className="absolute inset-0 rounded-xl"
            style={{ background: 'linear-gradient(to bottom right, #FFF8F0, #F5EDE4)' }}
          ></div>
        </div>

        {/* The Body */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-12 z-10">
          <div
            className="w-full h-full rounded-b-[30px] rounded-t-[8px] shadow-lg relative overflow-hidden"
            style={{ background: 'linear-gradient(to bottom, #FFF8F0, #F5EDE4)' }}
          >
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: state === 'thinking' ? 'rgba(255,123,123,0.1)' : 'rgba(255,176,136,0.1)',
                border: state === 'thinking' ? '1px solid rgba(255,123,123,0.2)' : '1px solid rgba(255,176,136,0.2)'
              }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: state === 'thinking' ? '#FF7B7B' : '#FFB088' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes mascot-float-kf {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes mascot-thinking-kf {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-5px) rotate(2deg); }
          75% { transform: translateY(-5px) rotate(-2deg); }
        }
        @keyframes mascot-bounce-slow-kf {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        .mascot-float {
          animation: mascot-float-kf 4s ease-in-out infinite;
        }
        .mascot-thinking {
          animation: mascot-thinking-kf 2s ease-in-out infinite;
        }
        .mascot-bounce-slow {
          animation: mascot-bounce-slow-kf 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .mascot-float,
          .mascot-thinking,
          .mascot-bounce-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Mascot;