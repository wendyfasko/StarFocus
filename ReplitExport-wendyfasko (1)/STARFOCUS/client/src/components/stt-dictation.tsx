import { useState, useCallback } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useSpeechRecognition } from "@/hooks/use-speech-recognition";
import { useAppContext } from "@/contexts/app-context";

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  connections: string[];
  color: string;
}

const wordPredictions = [
  "the universe", "planets", "galaxies", "space exploration", "astronauts", 
  "solar system", "black holes", "nebulae", "constellations", "cosmic rays"
];

export default function STTDictation() {
  const { state, dispatch } = useAppContext();
  const [transcription, setTranscription] = useState("Today I want to write about space exploration. The stars are fascinating and I think astronauts are very brave. Space missions help us learn about ");
  const [predictions, setPredictions] = useState(wordPredictions.slice(0, 3));
  const [recordingTime, setRecordingTime] = useState(0);
  const [mindMapNodes, setMindMapNodes] = useState<MindMapNode[]>([
    {
      id: "center",
      text: "Space Exploration",
      x: 50,
      y: 50,
      connections: ["node1", "node2", "node3"],
      color: "from-neon-blue to-neon-purple"
    },
    {
      id: "node1",
      text: "Astronauts",
      x: 20,
      y: 20,
      connections: ["center"],
      color: "from-neon-gold to-neon-pink"
    },
    {
      id: "node2",
      text: "Universe",
      x: 80,
      y: 80,
      connections: ["center"],
      color: "from-neon-green to-neon-blue"
    },
    {
      id: "node3",
      text: "Missions",
      x: 80,
      y: 20,
      connections: ["center"],
      color: "from-neon-purple to-neon-pink"
    }
  ]);

  const {
    isListening,
    transcript,
    confidence,
    start,
    stop,
    supported
  } = useSpeechRecognition({
    onResult: useCallback((text: string) => {
      setTranscription(prev => prev + " " + text);
    }, []),
    onError: useCallback((error: string) => {
      console.error('Speech recognition error:', error);
    }, [])
  });

  const handleToggleRecording = () => {
    if (isListening) {
      stop();
      dispatch({ type: 'TOGGLE_RECORDING' });
    } else {
      start();
      dispatch({ type: 'TOGGLE_RECORDING' });
    }
  };

  const addPrediction = (prediction: string) => {
    setTranscription(prev => prev + prediction + " ");
    // Refresh predictions
    setPredictions(wordPredictions.filter(p => p !== prediction).slice(0, 3));
  };

  const saveTranscription = () => {
    // In a real app, this would save to backend
    console.log('Saving transcription:', transcription);
  };

  const addMindMapNode = () => {
    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      text: "New Idea",
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      connections: ["center"],
      color: "from-neon-purple to-neon-blue"
    };
    setMindMapNodes(prev => [...prev, newNode]);
  };

  if (!supported) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-8">
            <i className="fas fa-exclamation-triangle text-4xl text-neon-gold mb-4"></i>
            <h2 className="text-2xl font-bold mb-4">Speech Recognition Not Supported</h2>
            <p className="text-gray-300">
              Your browser doesn't support speech recognition. Please try using Chrome, Edge, or Safari.
            </p>
          </GlassCard>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-cosmic-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dyslexic text-4xl font-bold mb-4 glow-text text-neon-green">
            <i className="fas fa-microphone mr-3"></i>
            Cosmic Voice Recorder
          </h2>
          <p className="text-xl text-gray-300">Speak your thoughts and watch them transform into organized ideas</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recording Controls */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 text-center">
              <div className="mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  <div className={`absolute inset-0 bg-gradient-to-br from-neon-green to-neon-blue rounded-full ${isListening ? 'animate-pulse' : ''}`}></div>
                  <div className="absolute inset-4 glass-card rounded-full flex items-center justify-center">
                    <i className={`fas fa-microphone text-4xl text-neon-green ${isListening ? 'animate-glow' : ''}`}></i>
                  </div>
                  {/* Audio wave indicators */}
                  {isListening && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-1 bg-neon-green rounded animate-pulse"
                          style={{
                            height: `${Math.random() * 20 + 16}px`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {isListening ? 'Recording...' : 'Ready to Record'}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {isListening ? 'Listening for your voice' : 'Click to start recording'}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleToggleRecording}
                  className={`w-full px-6 py-3 rounded-full font-semibold text-white btn-glow transition-all ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-500 to-red-600' 
                      : 'bg-gradient-to-r from-neon-green to-neon-blue'
                  }`}
                >
                  <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'} mr-2`}></i>
                  {isListening ? 'Stop Recording' : 'Start Recording'}
                </button>
                
                {isListening && (
                  <button className="w-full px-6 py-3 glass-card rounded-full text-neon-gold border border-neon-gold/30 hover:bg-neon-gold/10 transition-all">
                    <i className="fas fa-pause mr-2"></i>
                    Pause
                  </button>
                )}
              </div>

              {confidence > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <div className="text-center mb-2">
                    <span className="text-sm text-gray-400">Confidence</span>
                  </div>
                  <div className="text-2xl font-bold text-neon-green">
                    {Math.round(confidence * 100)}%
                  </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Transcription & Organization */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Transcription */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <i className="fas fa-closed-captioning text-neon-blue mr-2"></i>
                Live Transcription
              </h3>
              
              <div className="bg-cosmic-900/50 rounded-xl p-4 min-h-[120px] mb-4">
                <textarea
                  value={transcription + (transcript ? " " + transcript : "")}
                  onChange={(e) => setTranscription(e.target.value)}
                  className="w-full h-32 bg-transparent border-none outline-none resize-none font-dyslexic text-lg leading-relaxed text-gray-100"
                  placeholder="Your transcribed text will appear here..."
                />
                {isListening && (
                  <span className="text-neon-blue animate-pulse">|</span>
                )}
              </div>

              {/* Word Predictions */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Word Suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {predictions.map((prediction, index) => (
                    <button
                      key={index}
                      onClick={() => addPrediction(prediction)}
                      className="px-3 py-1 glass-card rounded-full text-sm text-neon-blue border border-neon-blue/30 hover:bg-neon-blue/10 transition-all"
                    >
                      {prediction}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button className="px-4 py-2 glass-card rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                  <i className="fas fa-undo mr-2"></i>
                  Undo
                </button>
                <button 
                  onClick={saveTranscription}
                  className="px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg border border-neon-blue/30 hover:bg-neon-blue/30 transition-all"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save
                </button>
              </div>
            </GlassCard>

            {/* Mind Map Organizer */}
            <GlassCard className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <i className="fas fa-project-diagram text-neon-purple mr-2"></i>
                Idea Organizer
              </h3>
              
              <div className="bg-cosmic-900/50 rounded-xl p-6 min-h-[200px] relative overflow-hidden">
                {mindMapNodes.map((node) => (
                  <div
                    key={node.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  >
                    <div className={`bg-gradient-to-br ${node.color} p-3 rounded-lg text-center min-w-[100px] ${
                      node.id === 'center' ? 'text-white font-semibold' : 'text-white text-sm'
                    }`}>
                      {node.text}
                    </div>
                  </div>
                ))}
                
                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {mindMapNodes.map((node) =>
                    node.connections.map((connectionId) => {
                      const connectedNode = mindMapNodes.find(n => n.id === connectionId);
                      if (!connectedNode) return null;
                      
                      return (
                        <line
                          key={`${node.id}-${connectionId}`}
                          x1={`${node.x}%`}
                          y1={`${node.y}%`}
                          x2={`${connectedNode.x}%`}
                          y2={`${connectedNode.y}%`}
                          stroke="rgba(0, 217, 255, 0.3)"
                          strokeWidth="2"
                        />
                      );
                    })
                  )}
                </svg>
              </div>

              <div className="flex justify-center mt-4">
                <button 
                  onClick={addMindMapNode}
                  className="px-6 py-2 glass-card rounded-lg text-neon-purple border border-neon-purple/30 hover:bg-neon-purple/10 transition-all"
                >
                  <i className="fas fa-plus mr-2"></i>
                  Add Idea
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
