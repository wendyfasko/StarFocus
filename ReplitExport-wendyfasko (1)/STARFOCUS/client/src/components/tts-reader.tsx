import { useState, useRef } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useSpeechSynthesis } from "@/hooks/use-speech-synthesis";
import { useAppContext } from "@/contexts/app-context";

const sampleText = `Once upon a time, in a galaxy far, far away, there lived a brave little robot named Lexi. Lexi loved to help children learn to read and communicate with confidence.

Every day, Lexi would guide young learners through exciting adventures in the cosmos of language. Together, they would explore new words, practice speaking clearly, and discover the magic hidden within every sentence.

"Reading opens up infinite worlds," Lexi would say, "and every word you learn is like discovering a new star in the universe of knowledge."`;

export default function TTSReader() {
  const { state } = useAppContext();
  const [text, setText] = useState(sampleText);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [voice, setVoice] = useState('');
  const [speed, setSpeed] = useState(1);
  const [overlay, setOverlay] = useState('blue');
  const [highlightWords, setHighlightWords] = useState(true);
  const [largeText, setLargeText] = useState(false);
  const [useDyslexicFont, setUseDyslexicFont] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);

  const { speak, speaking, stop, voices } = useSpeechSynthesis({
    onWordBoundary: (wordIndex) => {
      if (highlightWords) {
        setCurrentWordIndex(wordIndex);
      }
    },
    onEnd: () => {
      setCurrentWordIndex(-1);
    }
  });

  const handlePlay = () => {
    if (speaking) {
      stop();
    } else {
      speak(text, { voice, rate: speed });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const getOverlayClass = () => {
    switch (overlay) {
      case 'blue': return 'bg-blue-400/10';
      case 'purple': return 'bg-purple-400/10';
      case 'sepia': return 'bg-yellow-600/10';
      default: return '';
    }
  };

  const words = text.split(/\s+/);

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dyslexic text-4xl font-bold mb-4 glow-text text-neon-purple">
            <i className="fas fa-volume-up mr-3"></i>
            Cosmic Text Reader
          </h2>
          <p className="text-xl text-gray-300">Listen to any text with customizable voice and visual settings</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Controls Panel */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6">
              <h3 className="font-semibold mb-4">Voice Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Voice</label>
                  <select 
                    value={voice} 
                    onChange={(e) => setVoice(e.target.value)}
                    className="w-full glass-card rounded-lg p-3 text-white bg-cosmic-700 border border-cosmic-600 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 outline-none"
                  >
                    <option value="">Default Voice</option>
                    {voices.map((v, index) => (
                      <option key={index} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Speed: {speed}x</label>
                  <input 
                    type="range" 
                    min="0.5" 
                    max="2" 
                    step="0.1" 
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="w-full h-2 bg-cosmic-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>Slow</span>
                    <span>Normal</span>
                    <span>Fast</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Visual Overlay</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'blue', color: 'bg-blue-400/30', label: 'Blue' },
                      { id: 'purple', color: 'bg-purple-400/30', label: 'Purple' },
                      { id: 'sepia', color: 'bg-yellow-600/30', label: 'Sepia' },
                      { id: 'none', color: 'bg-transparent border border-gray-400', label: 'None' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setOverlay(option.id)}
                        className={`p-2 glass-card rounded-lg text-xs hover:bg-white/10 transition-all ${
                          overlay === option.id ? 'border-2 border-neon-blue/50 bg-neon-blue/10' : 'border border-transparent'
                        }`}
                      >
                        <div className={`w-full h-4 ${option.color} rounded mb-1`}></div>
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  {[
                    { id: 'highlight', label: 'Highlight words', state: highlightWords, setter: setHighlightWords },
                    { id: 'large', label: 'Large text', state: largeText, setter: setLargeText },
                    { id: 'dyslexic', label: 'OpenDyslexic font', state: useDyslexicFont, setter: setUseDyslexicFont }
                  ].map((option) => (
                    <label key={option.id} className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={option.state}
                        onChange={(e) => option.setter(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                        option.state ? 'bg-neon-blue border-neon-blue' : 'bg-transparent border-gray-400'
                      }`}>
                        {option.state && <i className="fas fa-check text-white text-xs"></i>}
                      </div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Text Reader Area */}
          <div className="lg:col-span-3">
            <GlassCard className="p-8">
              {/* Upload/Input Area */}
              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <label className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg border border-neon-blue/30 hover:bg-neon-blue/30 transition-all cursor-pointer">
                    <i className="fas fa-upload mr-2"></i>
                    Upload File
                    <input
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  <button 
                    onClick={() => setText('')}
                    className="px-4 py-2 glass-card rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <i className="fas fa-paste mr-2"></i>
                    Clear Text
                  </button>
                  <button 
                    onClick={() => setText(sampleText)}
                    className="px-4 py-2 glass-card rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <i className="fas fa-file-alt mr-2"></i>
                    Sample Text
                  </button>
                </div>
              </div>

              {/* Text Content */}
              <div className={`bg-cosmic-900/50 rounded-xl p-6 mb-6 min-h-[300px] relative overflow-hidden ${getOverlayClass()}`}>
                <div 
                  ref={textRef}
                  className={`relative z-10 leading-relaxed ${
                    useDyslexicFont ? 'font-dyslexic' : 'font-sans'
                  } ${largeText ? 'text-xl' : 'text-lg'}`}
                >
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-100"
                    placeholder="Paste your text here or upload a file..."
                    rows={12}
                  />
                  
                  {/* Word highlighting overlay */}
                  {highlightWords && speaking && (
                    <div className="absolute inset-0 pointer-events-none">
                      {words.map((word, index) => (
                        <span
                          key={index}
                          className={`${
                            index === currentWordIndex 
                              ? 'bg-neon-blue/30 px-1 rounded glow-text text-neon-blue' 
                              : ''
                          }`}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <i className="fas fa-step-backward"></i>
                </button>
                <button 
                  onClick={handlePlay}
                  className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white text-xl btn-glow"
                >
                  <i className={`fas ${speaking ? 'fa-pause' : 'fa-play'} ${speaking ? '' : 'ml-1'}`}></i>
                </button>
                <button className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <i className="fas fa-step-forward"></i>
                </button>
                <button 
                  onClick={stop}
                  className="w-12 h-12 glass-card rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <i className="fas fa-stop"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>Reading progress</span>
                  <span>{speaking ? 'Playing...' : 'Stopped'}</span>
                </div>
                <div className="w-full bg-cosmic-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: currentWordIndex >= 0 ? `${(currentWordIndex / words.length) * 100}%` : '0%' 
                    }}
                  ></div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
