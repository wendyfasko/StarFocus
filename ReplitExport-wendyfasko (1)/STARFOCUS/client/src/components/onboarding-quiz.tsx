import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { useAppContext } from "@/contexts/app-context";

interface OnboardingQuizProps {
  onComplete: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
  }>;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What's your primary learning goal?",
    options: [
      {
        id: "reading",
        title: "Improve Reading Skills",
        description: "Focus on phonics and word recognition",
        icon: "fas fa-book-open",
        color: "from-neon-blue to-neon-purple"
      },
      {
        id: "speech",
        title: "Speech & Communication",
        description: "Practice speaking and listening",
        icon: "fas fa-microphone",
        color: "from-neon-gold to-neon-pink"
      },
      {
        id: "focus",
        title: "Focus & Organization",
        description: "Build attention and planning skills",
        icon: "fas fa-brain",
        color: "from-neon-purple to-neon-blue"
      }
    ]
  },
  {
    id: 2,
    question: "Which reading challenges do you face?",
    options: [
      {
        id: "dyslexia",
        title: "Dyslexia Support",
        description: "Letter reversal and reading difficulties",
        icon: "fas fa-eye",
        color: "from-neon-green to-neon-blue"
      },
      {
        id: "attention",
        title: "Attention Challenges",
        description: "Difficulty focusing on text",
        icon: "fas fa-focus",
        color: "from-neon-purple to-neon-pink"
      },
      {
        id: "processing",
        title: "Processing Speed",
        description: "Need more time to understand",
        icon: "fas fa-clock",
        color: "from-neon-blue to-neon-gold"
      }
    ]
  },
  {
    id: 3,
    question: "What's your preferred font style?",
    options: [
      {
        id: "dyslexic",
        title: "OpenDyslexic Font",
        description: "Specially designed for dyslexia",
        icon: "fas fa-font",
        color: "from-neon-blue to-neon-purple"
      },
      {
        id: "standard",
        title: "Standard Font",
        description: "Regular sans-serif text",
        icon: "fas fa-text-height",
        color: "from-neon-gold to-neon-green"
      }
    ]
  },
  {
    id: 4,
    question: "How do you prefer to learn?",
    options: [
      {
        id: "visual",
        title: "Visual Learning",
        description: "Learn better with images and colors",
        icon: "fas fa-palette",
        color: "from-neon-purple to-neon-pink"
      },
      {
        id: "auditory",
        title: "Auditory Learning",
        description: "Learn better by listening",
        icon: "fas fa-headphones",
        color: "from-neon-green to-neon-blue"
      },
      {
        id: "kinesthetic",
        title: "Hands-on Learning",
        description: "Learn better through interaction",
        icon: "fas fa-hand-paper",
        color: "from-neon-gold to-neon-purple"
      }
    ]
  },
  {
    id: 5,
    question: "What level of assistance do you want?",
    options: [
      {
        id: "full",
        title: "Full Assistance",
        description: "Maximum guidance and support",
        icon: "fas fa-user-friends",
        color: "from-neon-blue to-neon-green"
      },
      {
        id: "moderate",
        title: "Moderate Help",
        description: "Some guidance when needed",
        icon: "fas fa-hand-holding-heart",
        color: "from-neon-purple to-neon-gold"
      },
      {
        id: "minimal",
        title: "Independent Learning",
        description: "Minimal assistance, more freedom",
        icon: "fas fa-rocket",
        color: "from-neon-gold to-neon-pink"
      }
    ]
  }
];

export default function OnboardingQuiz({ onComplete }: OnboardingQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { dispatch } = useAppContext();

  const handleOptionSelect = (optionId: string) => {
    const newAnswers = { ...answers, [currentQuestion]: optionId };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 500);
    } else {
      // Quiz complete, process answers and update preferences
      setTimeout(() => {
        dispatch({ type: 'COMPLETE_ONBOARDING' });
        onComplete();
      }, 1000);
    }
  };

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <section className="py-16 px-4" id="onboarding">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-dyslexic text-4xl font-bold mb-4 glow-text text-neon-gold">
            <i className="fas fa-user-astronaut mr-3"></i>
            Personalize Your Experience
          </h2>
          <p className="text-xl text-gray-300">Answer a few questions to customize StarFocus for your needs</p>
        </div>

        <GlassCard className="p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neon-blue">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-cosmic-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-neon-blue to-neon-purple h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <h3 className="font-dyslexic text-2xl font-semibold mb-8 text-center">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className="w-full glass-card p-4 rounded-xl text-left hover:bg-white/10 border-2 border-transparent hover:border-neon-blue/50 transition-all group"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mr-4 group-hover:animate-glow`}>
                    <i className={`${option.icon} text-white`}></i>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{option.title}</h4>
                    <p className="text-gray-400 text-sm">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button 
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              className="px-6 py-2 glass-card rounded-full text-gray-400 hover:text-white transition-colors"
              disabled={currentQuestion === 0}
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Previous
            </button>
            <div className="text-sm text-gray-400 flex items-center">
              {Object.keys(answers).length} of {quizQuestions.length} completed
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
