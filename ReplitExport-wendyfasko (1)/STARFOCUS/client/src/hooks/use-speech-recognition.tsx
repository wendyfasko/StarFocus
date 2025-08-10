import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionOptions {
  continuous?: boolean;
  interimResults?: boolean;
  language?: string;
  onResult?: (transcript: string, isFinal: boolean) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
}

interface UseSpeechRecognitionReturn {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  finalTranscript: string;
  confidence: number;
  error: string | null;
  supported: boolean;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export function useSpeechRecognition(options: UseSpeechRecognitionOptions = {}): UseSpeechRecognitionReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [supported, setSupported] = useState(false);

  const recognitionRef = useRef<any>(null);
  const {
    continuous = true,
    interimResults = true,
    language = 'en-US',
    onResult,
    onError,
    onStart,
    onEnd
  } = options;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setSupported(true);
        
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;

        recognition.continuous = continuous;
        recognition.interimResults = interimResults;
        recognition.lang = language;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setError(null);
          onStart?.();
        };

        recognition.onresult = (event: any) => {
          let finalText = '';
          let interimText = '';
          let bestConfidence = 0;

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            const transcript = result[0].transcript;
            const confidence = result[0].confidence || 0;

            if (result.isFinal) {
              finalText += transcript;
              bestConfidence = Math.max(bestConfidence, confidence);
            } else {
              interimText += transcript;
            }
          }

          if (finalText) {
            setFinalTranscript(prev => prev + finalText);
            setTranscript(prev => prev + finalText);
            setConfidence(bestConfidence);
            onResult?.(finalText, true);
          }

          if (interimText) {
            setInterimTranscript(interimText);
            onResult?.(interimText, false);
          }
        };

        recognition.onerror = (event: any) => {
          setError(event.error);
          setIsListening(false);
          onError?.(event.error);
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
          onEnd?.();
        };

        return () => {
          if (recognition) {
            recognition.stop();
          }
        };
      }
    }
  }, [continuous, interimResults, language, onResult, onError, onStart, onEnd]);

  const start = useCallback(() => {
    if (!supported) {
      setError('Speech recognition not supported');
      return;
    }

    if (recognitionRef.current && !isListening) {
      setError(null);
      setTranscript('');
      setInterimTranscript('');
      setFinalTranscript('');
      setConfidence(0);
      
      try {
        recognitionRef.current.start();
      } catch (err) {
        setError('Failed to start speech recognition');
        onError?.('Failed to start speech recognition');
      }
    }
  }, [supported, isListening, onError]);

  const stop = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const abort = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
      setInterimTranscript('');
    }
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    finalTranscript,
    confidence,
    error,
    supported,
    start,
    stop,
    abort
  };
}
