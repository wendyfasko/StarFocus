import { useState, useCallback, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import LexiAvatar from "@/components/lexi-avatar";
import { useAppContext } from "@/contexts/app-context";
import { useDragDrop } from "@/hooks/use-drag-drop";
import { 
  wordDatabase, 
  getWordsByLanguage, 
  getWordsByDifficulty, 
  getWordsByCategory,
  getAllCategories,
  getRandomWords,
  type GameWord,
  type LanguageWordSet 
} from "@shared/word-database";

export default function PhonologicalGame() {
  const { state, dispatch } = useAppContext();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [gameWords, setGameWords] = useState<GameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [wordSlots, setWordSlots] = useState<(string | null)[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [lexiMessage, setLexiMessage] = useState("Let's build some words together! Drag the letters to spell the word.");
  const [showHint, setShowHint] = useState(false);
  const [starsEarned, setStarsEarned] = useState(0);

  // Load game words based on selected language and filters
  useEffect(() => {
    let words: GameWord[];
    
    if (selectedCategory === 'all') {
      words = getWordsByDifficulty(selectedLanguage, selectedDifficulty);
    } else {
      words = getWordsByCategory(selectedLanguage, selectedCategory)
        .filter(word => word.difficulty === selectedDifficulty);
    }
    
    if (words.length === 0) {
      words = getRandomWords(selectedLanguage, 10);
    }
    
    setGameWords(words);
    setCurrentWordIndex(0);
  }, [selectedLanguage, selectedDifficulty, selectedCategory]);

  const currentWord = gameWords[currentWordIndex];

  // Initialize game when current word changes
  useEffect(() => {
    if (currentWord) {
      setWordSlots(new Array(currentWord.letters.length).fill(null));
      // Shuffle available letters with some extra ones for different languages
      const extraLetters = selectedLanguage === 'ja' ? ["あ", "き", "ら", "め", "ぷ"] :
                          selectedLanguage === 'zh' ? ["大", "小", "中", "好", "人"] :
                          selectedLanguage === 'ar' ? ["ب", "ت", "ث", "ج", "ح"] :
                          selectedLanguage === 'ru' ? ["Р", "Е", "Д", "М", "П"] :
                          ["R", "E", "D", "M", "P"];
      const allLetters = [...currentWord.letters, ...extraLetters].sort(() => Math.random() - 0.5);
      setAvailableLetters(allLetters);
    }
  }, [currentWord, selectedLanguage]);

  const { dragHandlers, dropHandlers } = useDragDrop({
    onDrop: useCallback((draggedData: string, dropIndex: number) => {
      // Move letter from available to slot
      const newWordSlots = [...wordSlots];
      newWordSlots[dropIndex] = draggedData;
      setWordSlots(newWordSlots);
      
      // Remove from available letters
      setAvailableLetters(prev => prev.filter((letter, index) => 
        !(letter === draggedData && index === prev.indexOf(draggedData))
      ));
    }, [wordSlots]),
    
    onRemove: useCallback((slotIndex: number) => {
      // Move letter back to available
      const letter = wordSlots[slotIndex];
      if (letter) {
        setAvailableLetters(prev => [...prev, letter]);
        const newWordSlots = [...wordSlots];
        newWordSlots[slotIndex] = null;
        setWordSlots(newWordSlots);
      }
    }, [wordSlots])
  });

  const checkWord = () => {
    const formedWord = wordSlots.join('');
    const isCorrect = formedWord === currentWord.word;
    
    if (isCorrect) {
      setStarsEarned(prev => prev + 1);
      setLexiMessage(`Excellent! "${currentWord.word}" is correct! You earned a star! ⭐`);
      
      // Update progress
      if (state.userProgress) {
        dispatch({ 
          type: 'UPDATE_PROGRESS', 
          payload: { 
            wordsCompleted: state.userProgress.wordsCompleted + 1,
            totalStars: state.userProgress.totalStars + 1
          }
        });
      }
      
      // Move to next word after delay
      setTimeout(() => {
        if (currentWordIndex < gameWords.length - 1) {
          setCurrentWordIndex(prev => prev + 1);
          resetGame();
        } else {
          setLexiMessage("Congratulations! You've completed all the words! 🎉");
        }
      }, 2000);
    } else {
      setLexiMessage("Not quite right. Try again! You can do it!");
    }
  };

  const resetGame = () => {
    const newWord = gameWords[currentWordIndex + 1] || currentWord;
    if (!newWord) return;
    
    setWordSlots(new Array(newWord.letters.length).fill(null));
    const extraLetters = selectedLanguage === 'ja' ? ["あ", "き", "ら", "め", "ぷ"] :
                        selectedLanguage === 'zh' ? ["大", "小", "中", "好", "人"] :
                        selectedLanguage === 'ar' ? ["ب", "ت", "ث", "ج", "ح"] :
                        selectedLanguage === 'ru' ? ["Р", "Е", "Д", "М", "П"] :
                        ["R", "E", "D", "M", "P"];
    const allLetters = [...newWord.letters, ...extraLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(allLetters);
    setShowHint(false);
    setLexiMessage("Great! Let's try the next word!");
  };

  const resetCurrentWord = () => {
    if (!currentWord) return;
    
    setWordSlots(new Array(currentWord.letters.length).fill(null));
    const extraLetters = selectedLanguage === 'ja' ? ["あ", "き", "ら", "め", "ぷ"] :
                        selectedLanguage === 'zh' ? ["大", "小", "中", "好", "人"] :
                        selectedLanguage === 'ar' ? ["ب", "ت", "ث", "ج", "ح"] :
                        selectedLanguage === 'ru' ? ["Р", "Е", "Д", "М", "П"] :
                        ["R", "E", "D", "M", "P"];
    const allLetters = [...currentWord.letters, ...extraLetters].sort(() => Math.random() - 0.5);
    setAvailableLetters(allLetters);
    setShowHint(false);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-transparent to-cosmic-900/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dyslexic text-4xl font-bold mb-4 glow-text text-neon-gold">
            <i className="fas fa-puzzle-piece mr-3"></i>
            Word Building Galaxy
          </h2>
          <p className="text-xl text-gray-300">Drag letters to form words and earn cosmic rewards!</p>
        </div>

        {/* Language & Difficulty Selection */}
        <GlassCard className="p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Language</label>
              <select 
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full p-3 rounded-lg bg-cosmic-800 border border-cosmic-600 text-white focus:border-neon-blue focus:outline-none"
              >
                {wordDatabase.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.language}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                className="w-full p-3 rounded-lg bg-cosmic-800 border border-cosmic-600 text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="easy">Easy (3-4 letters)</option>
                <option value="medium">Medium (4-6 letters)</option>
                <option value="hard">Hard (6+ letters)</option>
              </select>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 rounded-lg bg-cosmic-800 border border-cosmic-600 text-white focus:border-neon-blue focus:outline-none"
              >
                <option value="all">All Categories</option>
                {getAllCategories(selectedLanguage).map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <span className="text-sm text-gray-400">
              Playing with {gameWords.length} words in {selectedLanguage === 'en' ? 'English' : 
                selectedLanguage === 'es' ? 'Spanish' : 
                selectedLanguage === 'fr' ? 'French' :
                selectedLanguage === 'de' ? 'German' :
                selectedLanguage === 'it' ? 'Italian' :
                selectedLanguage === 'pt' ? 'Portuguese' :
                selectedLanguage === 'ja' ? 'Japanese' :
                selectedLanguage === 'zh' ? 'Chinese' :
                selectedLanguage === 'ru' ? 'Russian' :
                selectedLanguage === 'ar' ? 'Arabic' : 'Unknown'}
            </span>
          </div>
        </GlassCard>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lexi Avatar & Progress */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6">
              <LexiAvatar 
                message={lexiMessage}
                mood={wordSlots.filter(slot => slot !== null).length === currentWord.letters.length ? 'celebrating' : 'encouraging'}
              />
            </GlassCard>

            {/* Progress & Rewards */}
            <GlassCard className="p-6 mt-4">
              <h4 className="font-semibold mb-4 text-center">Today's Progress</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Words Completed</span>
                  <div className="flex items-center">
                    <span className="text-neon-gold font-bold mr-2">
                      {state.userProgress?.wordsCompleted || 0}
                    </span>
                    <i className="fas fa-star text-neon-gold"></i>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Stars Earned</span>
                  <div className="flex items-center">
                    <span className="text-neon-blue font-bold mr-2">
                      {state.userProgress?.totalStars || 0}
                    </span>
                    <i className="fas fa-certificate text-neon-blue"></i>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Current Level</span>
                  <div className="flex items-center">
                    <span className="text-neon-purple font-bold mr-2">
                      {state.currentGameLevel}
                    </span>
                    <i className="fas fa-trophy text-neon-purple"></i>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2">
            <GlassCard className="p-8">
              {!currentWord ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔄</div>
                  <p className="text-gray-300">Loading words...</p>
                </div>
              ) : (
                <>
                  {/* Word Formation Area */}
              <div className="mb-8">
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4">{currentWord.image}</div>
                  <p className="text-gray-300 text-lg">Spell this word:</p>
                  {showHint && (
                    <p className="text-neon-gold text-sm mt-2 italic">
                      Hint: {currentWord.hint}
                    </p>
                  )}
                </div>

                {/* Drop Zones */}
                <div className="flex justify-center space-x-4 mb-8">
                  {wordSlots.map((letter, index) => (
                    <div
                      key={index}
                      {...dropHandlers(index)}
                      onClick={() => letter && dropHandlers(index).onRemove?.(index)}
                      className={`w-16 h-16 drag-zone rounded-xl flex items-center justify-center text-2xl font-bold cursor-pointer transition-all ${
                        letter ? 'text-neon-blue bg-neon-blue/20 border-neon-blue' : 'text-gray-400 bg-cosmic-700/30'
                      }`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Letters */}
              <div>
                <h4 className="font-semibold mb-4 text-center">Available Letters</h4>
                <div className="flex justify-center space-x-4 flex-wrap gap-4">
                  {availableLetters.map((letter, index) => (
                    <div
                      key={`${letter}-${index}`}
                      {...dragHandlers(letter)}
                      className="w-16 h-16 letter-tile glass-card rounded-xl flex items-center justify-center text-2xl font-bold text-neon-gold border border-neon-gold/30 hover:border-neon-gold hover:bg-neon-gold/10"
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 mt-8">
                <button 
                  onClick={resetCurrentWord}
                  className="px-6 py-3 glass-card rounded-full text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 transition-all"
                >
                  <i className="fas fa-undo mr-2"></i>
                  Reset
                </button>
                <button 
                  onClick={checkWord}
                  disabled={wordSlots.includes(null)}
                  className="px-8 py-3 bg-gradient-to-r from-neon-green to-neon-blue rounded-full font-semibold text-white btn-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="fas fa-check mr-2"></i>
                  Check Word
                </button>
                <button 
                  onClick={() => setShowHint(!showHint)}
                  className="px-6 py-3 glass-card rounded-full text-neon-gold border border-neon-gold/30 hover:bg-neon-gold/10 transition-all"
                >
                  <i className="fas fa-lightbulb mr-2"></i>
                  Hint
                </button>
              </div>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
