import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";

interface LexiAvatarProps {
  message?: string;
  mood?: 'happy' | 'encouraging' | 'thinking' | 'celebrating';
  showSpeechBubble?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const lexiMessages = {
  happy: "Hi there! I'm Lexi, your cosmic learning companion!",
  encouraging: "You're doing great! Keep up the excellent work!",
  thinking: "Hmm, let me think about that...",
  celebrating: "Fantastic! You earned another star! ⭐"
};

export default function LexiAvatar({ 
  message, 
  mood = 'happy', 
  showSpeechBubble = true,
  size = 'medium'
}: LexiAvatarProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message || lexiMessages[mood]);
  const { speak, speaking } = useSpeechSynthesis();

  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32'
  };

  const iconClasses = {
    small: 'text-xl',
    medium: 'text-3xl',
    large: 'text-4xl'
  };

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  }, [message]);

  const handleSpeak = () => {
    if (currentMessage) {
      speak(currentMessage);
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'happy': return 'from-neon-blue to-neon-purple';
      case 'encouraging': return 'from-neon-green to-neon-blue';
      case 'thinking': return 'from-neon-purple to-neon-pink';
      case 'celebrating': return 'from-neon-gold to-neon-pink';
      default: return 'from-neon-blue to-neon-purple';
    }
  };

  return (
    <div className="text-center">
      <div className={`${sizeClasses[size]} mx-auto mb-4 relative`}>
        <div className={`w-full h-full bg-gradient-to-br ${getMoodColor()} rounded-full flex items-center justify-center animate-float ${isAnimating ? 'animate-pulse' : ''}`}>
          <i className={`fas fa-robot ${iconClasses[size]} text-white`}></i>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-neon-gold rounded-full flex items-center justify-center animate-twinkle">
          <i className="fas fa-star text-cosmic-900 text-xs"></i>
        </div>
      </div>
      
      <h3 className="font-dyslexic text-xl font-bold text-neon-blue mb-2">Meet Lexi!</h3>
      
      {showSpeechBubble && currentMessage && (
        <GlassCard className="rounded-xl p-4 mb-4 speech-bubble max-w-xs mx-auto">
          <p className="text-sm text-gray-200">{currentMessage}</p>
        </GlassCard>
      )}

      <div className="flex justify-center space-x-2">
        <button 
          onClick={handleSpeak}
          disabled={speaking}
          className="px-4 py-2 bg-neon-green/20 text-neon-green rounded-full text-sm border border-neon-green/30 hover:bg-neon-green/30 transition-all disabled:opacity-50"
        >
          <i className={`fas ${speaking ? 'fa-volume-up animate-pulse' : 'fa-volume-up'} mr-1`}></i>
          {speaking ? 'Speaking...' : 'Hear Lexi'}
        </button>
      </div>
    </div>
  );
}
