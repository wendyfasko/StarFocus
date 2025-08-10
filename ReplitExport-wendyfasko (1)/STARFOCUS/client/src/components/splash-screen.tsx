import { GlassCard } from "@/components/ui/glass-card";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <section className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Cosmic logo */}
        <div className="w-32 h-32 mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink rounded-full animate-float opacity-80"></div>
          <div className="absolute inset-2 glass-card rounded-full flex items-center justify-center">
            <i className="fas fa-rocket text-4xl text-neon-gold animate-bounce"></i>
          </div>
        </div>
        
        <h1 className="font-dyslexic text-5xl md:text-7xl font-bold mb-6 glow-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-gold bg-clip-text text-transparent">
          Welcome to StarFocus
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 font-light">
          Your cosmic journey to better reading and communication starts here
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full font-semibold text-white btn-glow transition-all duration-300"
          >
            <i className="fas fa-play mr-2"></i>
            Start Your Journey
          </button>
          <button className="px-8 py-4 glass-card rounded-full font-semibold text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/10 transition-all">
            <i className="fas fa-info-circle mr-2"></i>
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}
