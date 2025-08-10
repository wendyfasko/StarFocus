import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useAppContext } from "@/contexts/app-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { UserPreferences } from "@shared/schema";

export default function SettingsProfile() {
  const { state, dispatch } = useAppContext();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [localPreferences, setLocalPreferences] = useState<UserPreferences | null>(state.preferences);

  const updatePreferencesMutation = useMutation({
    mutationFn: async (preferences: UserPreferences) => {
      if (!state.currentUser?.id) throw new Error("No user found");
      
      const response = await apiRequest(
        "PATCH",
        `/api/user/${state.currentUser.id}/preferences`,
        { preferences }
      );
      return response.json();
    },
    onSuccess: (updatedUser) => {
      dispatch({ type: 'SET_USER', payload: updatedUser });
      dispatch({ type: 'SET_PREFERENCES', payload: updatedUser.preferences });
      toast({
        title: "Settings Updated",
        description: "Your preferences have been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/user', state.currentUser?.id] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handlePreferenceChange = <K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    if (!localPreferences) return;
    
    const updatedPreferences = { ...localPreferences, [key]: value };
    setLocalPreferences(updatedPreferences);
    updatePreferencesMutation.mutate(updatedPreferences);
  };

  const handleFontSizeChange = (size: number) => {
    handlePreferenceChange('fontSize', size);
  };

  const handleColorOverlayChange = (overlay: 'none' | 'blue' | 'purple' | 'sepia') => {
    handlePreferenceChange('colorOverlay', overlay);
  };

  if (!localPreferences || !state.currentUser || !state.userProgress) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <GlassCard className="p-8">
            <i className="fas fa-spinner fa-spin text-4xl text-neon-blue mb-4"></i>
            <p className="text-xl text-gray-300">Loading your profile...</p>
          </GlassCard>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dyslexic text-4xl font-bold mb-4 glow-text text-neon-blue">
            <i className="fas fa-user-cog mr-3"></i>
            Mission Control Center
          </h2>
          <p className="text-xl text-gray-300">Customize your StarFocus experience for optimal learning</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Accessibility Settings */}
          <GlassCard className="p-6">
            <h3 className="font-semibold text-xl mb-6 flex items-center text-neon-green">
              <i className="fas fa-universal-access mr-2"></i>
              Accessibility
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Font Size: {localPreferences.fontSize}px</label>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleFontSizeChange(Math.max(12, localPreferences.fontSize - 2))}
                    className="px-3 py-1 glass-card rounded text-sm hover:bg-white/10 transition-all"
                  >
                    A
                  </button>
                  <input 
                    type="range" 
                    min="12" 
                    max="24" 
                    value={localPreferences.fontSize}
                    onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-cosmic-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <button 
                    onClick={() => handleFontSizeChange(Math.min(24, localPreferences.fontSize + 2))}
                    className="px-3 py-1 glass-card rounded text-lg hover:bg-white/10 transition-all"
                  >
                    A
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Font Style</label>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="font" 
                      checked={localPreferences.fontFamily === 'dyslexic'}
                      onChange={() => handlePreferenceChange('fontFamily', 'dyslexic')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                      localPreferences.fontFamily === 'dyslexic' ? 'bg-neon-blue border-neon-blue' : 'bg-transparent border-gray-400'
                    }`}>
                      {localPreferences.fontFamily === 'dyslexic' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-dyslexic">OpenDyslexic (Recommended)</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="font" 
                      checked={localPreferences.fontFamily === 'standard'}
                      onChange={() => handlePreferenceChange('fontFamily', 'standard')}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                      localPreferences.fontFamily === 'standard' ? 'bg-neon-blue border-neon-blue' : 'bg-transparent border-gray-400'
                    }`}>
                      {localPreferences.fontFamily === 'standard' && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="font-inter">Standard Sans-Serif</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Color Overlays</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'blue', color: 'bg-blue-400/30', label: 'Blue' },
                    { id: 'purple', color: 'bg-purple-400/30', label: 'Purple' },
                    { id: 'sepia', color: 'bg-yellow-600/30', label: 'Sepia' }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleColorOverlayChange(option.id as any)}
                      className={`p-3 glass-card rounded-lg hover:bg-white/10 transition-all ${
                        localPreferences.colorOverlay === option.id ? 'border-2 border-blue-400/50 bg-blue-400/10' : 'border border-transparent'
                      }`}
                    >
                      <div className={`w-full h-6 ${option.color} rounded mb-2`}></div>
                      <span className="text-xs">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'highContrast', label: 'High contrast mode' },
                  { key: 'reduceAnimations', label: 'Reduce animations' },
                  { key: 'soundEffects', label: 'Sound effects' }
                ].map((option) => (
                  <label key={option.key} className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={localPreferences[option.key as keyof UserPreferences] as boolean}
                      onChange={(e) => handlePreferenceChange(option.key as keyof UserPreferences, e.target.checked as any)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 rounded border-2 mr-3 flex-shrink-0 flex items-center justify-center ${
                      localPreferences[option.key as keyof UserPreferences] ? 'bg-neon-green border-neon-green' : 'bg-transparent border-gray-400'
                    }`}>
                      {localPreferences[option.key as keyof UserPreferences] && (
                        <i className="fas fa-check text-white text-xs"></i>
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* App Preferences */}
          <GlassCard className="p-6">
            <h3 className="font-semibold text-xl mb-6 flex items-center text-neon-gold">
              <i className="fas fa-sliders-h mr-2"></i>
              Preferences
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">Theme</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handlePreferenceChange('theme', 'dark')}
                    className={`p-4 glass-card rounded-lg transition-all ${
                      localPreferences.theme === 'dark' ? 'border-2 border-neon-blue/50 bg-neon-blue/10' : 'border border-transparent hover:border-gray-400/50 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cosmic-900 to-cosmic-700 rounded-full mr-2"></div>
                      <i className="fas fa-star text-neon-blue"></i>
                    </div>
                    <span className="text-sm font-medium">Dark Cosmos</span>
                  </button>
                  <button 
                    onClick={() => handlePreferenceChange('theme', 'light')}
                    className={`p-4 glass-card rounded-lg transition-all ${
                      localPreferences.theme === 'light' ? 'border-2 border-neon-blue/50 bg-neon-blue/10' : 'border border-transparent hover:border-gray-400/50 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mr-2"></div>
                      <i className="fas fa-sun text-yellow-400"></i>
                    </div>
                    <span className="text-sm font-medium">Light Stars</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'starRewards', label: 'Star Rewards' },
                  { key: 'soundEffects', label: 'Sound Effects' },
                  { key: 'lexiAssistant', label: 'Lexi Assistant' },
                  { key: 'autoSave', label: 'Auto-save Progress' }
                ].map((option) => (
                  <label key={option.key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">{option.label}</span>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        checked={localPreferences[option.key as keyof UserPreferences] as boolean}
                        onChange={(e) => handlePreferenceChange(option.key as keyof UserPreferences, e.target.checked as any)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-6 rounded-full shadow-inner flex items-center transition-all ${
                        localPreferences[option.key as keyof UserPreferences] ? 'bg-neon-blue' : 'bg-gray-600'
                      }`}>
                        <div className={`w-4 h-4 bg-white rounded-full shadow ml-1 transition-transform ${
                          localPreferences[option.key as keyof UserPreferences] ? 'transform translate-x-4' : ''
                        }`}></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Default TTS Speed: {localPreferences.ttsSpeed}x</label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="2" 
                  step="0.1" 
                  value={localPreferences.ttsSpeed}
                  onChange={(e) => handlePreferenceChange('ttsSpeed', parseFloat(e.target.value))}
                  className="w-full h-2 bg-cosmic-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0.5x</span>
                  <span>1.0x</span>
                  <span>2.0x</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Profile Section */}
        <GlassCard className="p-8 mt-8">
          <h3 className="font-semibold text-xl mb-6 flex items-center text-neon-purple">
            <i className="fas fa-user-astronaut mr-2"></i>
            Learning Profile
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-medal text-2xl text-white"></i>
              </div>
              <h4 className="font-semibold mb-2">Learning Streak</h4>
              <p className="text-3xl font-bold text-neon-blue">{state.userProgress.learningStreak} days</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-neon-gold to-neon-pink rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-star text-2xl text-white"></i>
              </div>
              <h4 className="font-semibold mb-2">Total Stars</h4>
              <p className="text-3xl font-bold text-neon-gold">{state.userProgress.totalStars}</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-neon-green to-neon-blue rounded-full mx-auto mb-4 flex items-center justify-center">
                <i className="fas fa-trophy text-2xl text-white"></i>
              </div>
              <h4 className="font-semibold mb-2">Achievements</h4>
              <p className="text-3xl font-bold text-neon-green">{state.userProgress.achievementsUnlocked}</p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-600">
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => {
                  // Export progress functionality
                  const progressData = {
                    user: state.currentUser,
                    progress: state.userProgress,
                    preferences: localPreferences
                  };
                  const dataStr = JSON.stringify(progressData, null, 2);
                  const dataBlob = new Blob([dataStr], { type: 'application/json' });
                  const url = URL.createObjectURL(dataBlob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `starfocus-progress-${new Date().toISOString().split('T')[0]}.json`;
                  link.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-6 py-3 glass-card rounded-full text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 transition-all"
              >
                <i className="fas fa-download mr-2"></i>
                Export Progress
              </button>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'StarFocus Achievement',
                      text: `I've earned ${state.userProgress.totalStars} stars and maintained a ${state.userProgress.learningStreak}-day learning streak on StarFocus!`,
                      url: window.location.href
                    });
                  } else {
                    toast({
                      title: "Achievement Copied!",
                      description: "Your achievement has been copied to clipboard.",
                    });
                    navigator.clipboard.writeText(`I've earned ${state.userProgress.totalStars} stars and maintained a ${state.userProgress.learningStreak}-day learning streak on StarFocus!`);
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink rounded-full font-semibold text-white btn-glow"
              >
                <i className="fas fa-share-alt mr-2"></i>
                Share Achievement
              </button>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
