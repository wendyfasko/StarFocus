import { useState, useEffect, useCallback, useRef } from 'react';

interface SpeechSynthesisOptions {
  voice?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

interface UseSpeechSynthesisOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (error: string) => void;
  onWordBoundary?: (wordIndex: number) => void;
}

interface UseSpeechSynthesisReturn {
  speak: (text: string, options?: SpeechSynthesisOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  speaking: boolean;
  paused: boolean;
  supported: boolean;
  voices: SpeechSynthesisVoice[];
}

export function useSpeechSynthesis(options: UseSpeechSynthesisOptions = {}): UseSpeechSynthesisReturn {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [supported, setSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const wordIndexRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSupported(true);
      
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
      };

      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, []);

  const speak = useCallback((text: string, speechOptions: SpeechSynthesisOptions = {}) => {
    if (!supported) {
      options.onError?.('Speech synthesis not supported');
      return;
    }

    // Stop any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    wordIndexRef.current = 0;

    // Set voice if specified
    if (speechOptions.voice && voices.length > 0) {
      const selectedVoice = voices.find(voice => voice.name === speechOptions.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    // Set speech parameters
    utterance.rate = speechOptions.rate ?? 1;
    utterance.pitch = speechOptions.pitch ?? 1;
    utterance.volume = speechOptions.volume ?? 1;

    // Event handlers
    utterance.onstart = () => {
      setSpeaking(true);
      setPaused(false);
      options.onStart?.();
    };

    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
      options.onEnd?.();
    };

    utterance.onerror = (event) => {
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
      options.onError?.(event.error);
    };

    utterance.onpause = () => {
      setPaused(true);
    };

    utterance.onresume = () => {
      setPaused(false);
    };

    // Word boundary event for highlighting
    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        wordIndexRef.current++;
        options.onWordBoundary?.(wordIndexRef.current);
      }
    };

    try {
      speechSynthesis.speak(utterance);
    } catch (error) {
      options.onError?.(`Failed to start speech: ${error}`);
    }
  }, [supported, voices, options]);

  const stop = useCallback(() => {
    if (supported) {
      speechSynthesis.cancel();
      setSpeaking(false);
      setPaused(false);
      utteranceRef.current = null;
    }
  }, [supported]);

  const pause = useCallback(() => {
    if (supported && speaking) {
      speechSynthesis.pause();
      setPaused(true);
    }
  }, [supported, speaking]);

  const resume = useCallback(() => {
    if (supported && paused) {
      speechSynthesis.resume();
      setPaused(false);
    }
  }, [supported, paused]);

  return {
    speak,
    stop,
    pause,
    resume,
    speaking,
    paused,
    supported,
    voices
  };
}
