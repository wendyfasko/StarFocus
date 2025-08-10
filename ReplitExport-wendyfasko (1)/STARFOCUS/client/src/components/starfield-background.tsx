import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const starfieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createStars = () => {
      if (!starfieldRef.current) return;
      
      const starfield = starfieldRef.current;
      const starCount = 100;
      
      // Clear existing stars
      starfield.innerHTML = '';
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        const size = Math.random();
        
        if (size < 0.6) {
          star.className = 'star star-small animate-twinkle';
        } else if (size < 0.9) {
          star.className = 'star star-medium animate-twinkle';
        } else {
          star.className = 'star star-large animate-twinkle';
        }
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        starfield.appendChild(star);
      }
    };

    createStars();
    
    // Recreate stars on window resize
    const handleResize = () => createStars();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="starfield fixed inset-0 z-0">
      {/* Cosmic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-900 via-cosmic-800 to-cosmic-700" />
      
      {/* Animated stars */}
      <div ref={starfieldRef} className="absolute inset-0" />
      
      {/* Nebula effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/5 to-transparent opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent opacity-30" />
    </div>
  );
}
