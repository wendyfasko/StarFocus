import StarfieldBackground from "@/components/starfield-background";
import SplashScreen from "@/components/splash-screen";
import OnboardingQuiz from "@/components/onboarding-quiz";
import PhonologicalGame from "@/components/phonological-game";
import TTSReader from "@/components/tts-reader";
import STTDictation from "@/components/stt-dictation";
import SettingsProfile from "@/components/settings-profile";
import { useAppContext } from "@/contexts/app-context";
import { useState } from "react";

export default function Home() {
  const { state } = useAppContext();
  const [currentSection, setCurrentSection] = useState<string>('splash');

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'splash':
        return <SplashScreen onStart={() => setCurrentSection('onboarding')} />;
      case 'onboarding':
        return <OnboardingQuiz onComplete={() => setCurrentSection('game')} />;
      case 'game':
        return <PhonologicalGame />;
      case 'tts':
        return <TTSReader />;
      case 'stt':
        return <STTDictation />;
      case 'settings':
        return <SettingsProfile />;
      default:
        return <SplashScreen onStart={() => setCurrentSection('onboarding')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <StarfieldBackground />
      
      {/* Navigation */}
      <nav className="relative z-10 p-4 glass-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center animate-glow">
              <i className="fas fa-star text-white text-lg"></i>
            </div>
            <h1 className="font-dyslexic text-2xl font-bold glow-text text-neon-blue">StarFocus</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentSection('game')}
              className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Phonological Game"
            >
              <i className="fas fa-puzzle-piece text-neon-gold"></i>
            </button>
            <button 
              onClick={() => setCurrentSection('tts')}
              className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Text-to-Speech Reader"
            >
              <i className="fas fa-volume-up text-neon-purple"></i>
            </button>
            <button 
              onClick={() => setCurrentSection('stt')}
              className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Speech-to-Text Dictation"
            >
              <i className="fas fa-microphone text-neon-green"></i>
            </button>
            <button 
              onClick={() => setCurrentSection('settings')}
              className="glass-card p-2 rounded-lg hover:bg-white/10 transition-all"
              aria-label="Settings"
            >
              <i className="fas fa-cog text-neon-gold"></i>
            </button>
            <div className="glass-card p-2 rounded-lg">
              <i className="fas fa-user-circle text-neon-blue text-xl"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10">
        {renderCurrentSection()}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-4 border-t border-gray-700">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <i className="fas fa-star text-white"></i>
              </div>
              <h3 className="font-dyslexic text-xl font-bold text-neon-blue">StarFocus</h3>
            </div>
            <p className="text-gray-400 mb-6">Empowering communication through cosmic learning adventures</p>
            
            <div className="flex justify-center space-x-6 mb-8">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-colors">
                <i className="fas fa-question-circle"></i>
                <span className="ml-2">Help</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-purple transition-colors">
                <i className="fas fa-shield-alt"></i>
                <span className="ml-2">Privacy</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-gold transition-colors">
                <i className="fas fa-envelope"></i>
                <span className="ml-2">Contact</span>
              </a>
            </div>
            
            <p className="text-sm text-gray-500">© 2024 StarFocus. Made with cosmic love for learners everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
