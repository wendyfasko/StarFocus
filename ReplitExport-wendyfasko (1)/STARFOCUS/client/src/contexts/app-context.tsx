import { createContext, useContext, useReducer, useEffect } from "react";
import { type User, type UserProgress, type UserPreferences } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";

interface AppState {
  currentUser: User | null;
  userProgress: UserProgress | null;
  isOnboardingComplete: boolean;
  currentGameLevel: number;
  isRecording: boolean;
  isPlaying: boolean;
  preferences: UserPreferences | null;
}

type AppAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_PROGRESS'; payload: UserProgress }
  | { type: 'SET_PREFERENCES'; payload: UserPreferences }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'SET_GAME_LEVEL'; payload: number }
  | { type: 'TOGGLE_RECORDING' }
  | { type: 'TOGGLE_PLAYING' }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<UserProgress> };

const initialState: AppState = {
  currentUser: null,
  userProgress: null,
  isOnboardingComplete: false,
  currentGameLevel: 1,
  isRecording: false,
  isPlaying: false,
  preferences: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_PROGRESS':
      return { ...state, userProgress: action.payload };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, isOnboardingComplete: true };
    case 'SET_GAME_LEVEL':
      return { ...state, currentGameLevel: action.payload };
    case 'TOGGLE_RECORDING':
      return { ...state, isRecording: !state.isRecording };
    case 'TOGGLE_PLAYING':
      return { ...state, isPlaying: !state.isPlaying };
    case 'UPDATE_PROGRESS':
      return { 
        ...state, 
        userProgress: state.userProgress ? { ...state.userProgress, ...action.payload } : null 
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load default user for demo
  const { data: defaultUser } = useQuery({
    queryKey: ['/api/default-user'],
    refetchOnWindowFocus: false,
  });

  const { data: userProgress } = useQuery({
    queryKey: ['/api/user', defaultUser?.id, 'progress'],
    enabled: !!defaultUser?.id,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (defaultUser) {
      dispatch({ type: 'SET_USER', payload: defaultUser });
      if (defaultUser.preferences) {
        dispatch({ type: 'SET_PREFERENCES', payload: defaultUser.preferences });
      }
    }
  }, [defaultUser]);

  useEffect(() => {
    if (userProgress) {
      dispatch({ type: 'SET_PROGRESS', payload: userProgress });
    }
  }, [userProgress]);

  // Apply accessibility preferences
  useEffect(() => {
    if (state.preferences) {
      const root = document.documentElement;
      root.style.fontSize = `${state.preferences.fontSize}px`;
      
      if (state.preferences.fontFamily === 'dyslexic') {
        document.body.classList.add('font-dyslexic');
      } else {
        document.body.classList.remove('font-dyslexic');
      }

      if (state.preferences.reduceAnimations) {
        root.style.setProperty('--animation-duration', '0s');
      } else {
        root.style.setProperty('--animation-duration', '');
      }
    }
  }, [state.preferences]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
