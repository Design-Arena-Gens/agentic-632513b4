'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

interface Word {
  emoji: string;
  english: string;
  pronunciation: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  emoji: string;
}

const agents: Agent[] = [
  {
    id: 'vocabulary',
    name: 'Vocabulary Teacher',
    icon: '📚',
    description: 'Learn new English words with fun pictures and sounds!',
    color: '#667eea'
  },
  {
    id: 'grammar',
    name: 'Grammar Guide',
    icon: '✏️',
    description: 'Master English grammar rules through interactive exercises!',
    color: '#f093fb'
  },
  {
    id: 'pronunciation',
    name: 'Pronunciation Coach',
    icon: '🎤',
    description: 'Practice speaking English with correct pronunciation!',
    color: '#4facfe'
  },
  {
    id: 'story',
    name: 'Story Teller',
    icon: '📖',
    description: 'Listen to exciting English stories and improve comprehension!',
    color: '#43e97b'
  },
  {
    id: 'quiz',
    name: 'Quiz Master',
    icon: '🎯',
    description: 'Test your English knowledge with fun quizzes and games!',
    color: '#fa709a'
  },
  {
    id: 'conversation',
    name: 'Chat Buddy',
    icon: '💬',
    description: 'Practice English conversations in a friendly environment!',
    color: '#fee140'
  }
];

const vocabularyWords: Word[] = [
  { emoji: '🐱', english: 'Cat', pronunciation: '/kæt/' },
  { emoji: '🐶', english: 'Dog', pronunciation: '/dɒɡ/' },
  { emoji: '🍎', english: 'Apple', pronunciation: '/ˈæp.əl/' },
  { emoji: '🌞', english: 'Sun', pronunciation: '/sʌn/' },
  { emoji: '🌙', english: 'Moon', pronunciation: '/muːn/' },
  { emoji: '⭐', english: 'Star', pronunciation: '/stɑːr/' },
  { emoji: '🌈', english: 'Rainbow', pronunciation: '/ˈreɪn.boʊ/' },
  { emoji: '🌸', english: 'Flower', pronunciation: '/ˈflaʊ.ɚ/' }
];

const quizQuestions: QuizQuestion[] = [
  {
    question: 'What is this?',
    emoji: '🐱',
    options: ['Dog', 'Cat', 'Bird', 'Fish'],
    correct: 1
  },
  {
    question: 'Which one is a fruit?',
    emoji: '🍎',
    options: ['Car', 'Apple', 'Book', 'Chair'],
    correct: 1
  },
  {
    question: 'What do you see in the sky during the day?',
    emoji: '🌞',
    options: ['Moon', 'Stars', 'Sun', 'Rainbow'],
    correct: 2
  },
  {
    question: 'What appears after rain?',
    emoji: '🌈',
    options: ['Snow', 'Rainbow', 'Lightning', 'Wind'],
    correct: 1
  }
];

const stories = [
  {
    title: 'The Happy Cat',
    content: 'Once upon a time, there was a happy cat named Whiskers. Whiskers loved to play in the sun. Every morning, Whiskers would wake up and say "Meow! What a beautiful day!" Whiskers had many friends: a dog named Buddy, a bird named Chirpy, and a rabbit named Fluffy. They would play together in the garden, under the big apple tree. One day, they found a rainbow after the rain. "Look!" said Whiskers, "The rainbow has so many colors!" They counted together: red, orange, yellow, green, blue, and purple. It was the best day ever!'
  },
  {
    title: 'The Little Star',
    content: 'High up in the night sky, there lived a little star. The star loved to shine bright and make children smile. Every night, the moon would tell the star stories about the world below. "Little star," said the moon, "you make the night beautiful." The star would twinkle happily. Children would look up and make wishes on the little star. The star felt very special and important.'
  }
];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [currentStory, setCurrentStory] = useState(0);

  const handleAgentClick = (agentId: string) => {
    setSelectedAgent(agentId);
    setCurrentQuiz(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
  };

  const handleQuizAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
    if (index === quizQuestions[currentQuiz].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuiz = () => {
    if (currentQuiz < quizQuestions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      alert(`Great job! You scored ${score + (selectedAnswer === quizQuestions[currentQuiz].correct ? 1 : 0)} out of ${quizQuestions.length}!`);
      setSelectedAgent(null);
    }
  };

  const speakWord = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const renderAgentContent = () => {
    switch (selectedAgent) {
      case 'vocabulary':
        return (
          <div className="lesson-area">
            <div className="lesson-content">
              <h3>Learn New Words!</h3>
              <p>Click on any word to hear how to say it:</p>
              <div className="word-list">
                {vocabularyWords.map((word, index) => (
                  <div
                    key={index}
                    className="word-card"
                    onClick={() => speakWord(word.english)}
                  >
                    <div className="word-emoji">{word.emoji}</div>
                    <div className="word-text">{word.english}</div>
                    <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                      {word.pronunciation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'quiz':
        const question = quizQuestions[currentQuiz];
        return (
          <div className="quiz-area">
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.3rem', fontWeight: 'bold' }}>
              Question {currentQuiz + 1} of {quizQuestions.length} | Score: {score}
            </div>
            <div className="quiz-question">
              <div style={{ textAlign: 'center', fontSize: '5rem', marginBottom: '20px' }}>
                {question.emoji}
              </div>
              <h4>{question.question}</h4>
              <div className="quiz-options">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`quiz-option ${
                      showFeedback
                        ? index === question.correct
                          ? 'correct'
                          : index === selectedAnswer
                          ? 'incorrect'
                          : ''
                        : ''
                    }`}
                    onClick={() => !showFeedback && handleQuizAnswer(index)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            {showFeedback && (
              <>
                <div className={`feedback ${selectedAnswer === question.correct ? 'correct' : 'incorrect'}`}>
                  {selectedAnswer === question.correct
                    ? '🎉 Excellent! That\'s correct!'
                    : `❌ Oops! The correct answer is: ${question.options[question.correct]}`}
                </div>
                <button className="next-button" onClick={handleNextQuiz}>
                  {currentQuiz < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </>
            )}
          </div>
        );

      case 'story':
        const story = stories[currentStory];
        return (
          <div className="story-area">
            <h3 style={{ color: '#667eea', marginBottom: '20px', textAlign: 'center', fontSize: '2rem' }}>
              📖 {story.title}
            </h3>
            <div className="story-text">{story.content}</div>
            <div className="story-audio">
              <button className="play-button" onClick={() => speakWord(story.content)}>
                🔊 Listen to Story
              </button>
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                className="next-button"
                onClick={() => setCurrentStory((currentStory + 1) % stories.length)}
              >
                Next Story →
              </button>
            </div>
          </div>
        );

      case 'grammar':
        return (
          <div className="lesson-area">
            <div className="lesson-content">
              <h3>Grammar Lesson: Simple Present Tense</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '15px' }}>
                We use the Simple Present tense to talk about habits and facts!
              </p>
              <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '15px' }}>
                <h4 style={{ color: '#667eea', marginBottom: '15px' }}>Examples:</h4>
                <ul style={{ fontSize: '1.1rem', lineHeight: '2', paddingLeft: '30px' }}>
                  <li>I <strong>play</strong> with my friends. 🎮</li>
                  <li>She <strong>reads</strong> books every day. 📚</li>
                  <li>The sun <strong>rises</strong> in the morning. 🌅</li>
                  <li>Cats <strong>like</strong> milk. 🥛</li>
                  <li>We <strong>go</strong> to school. 🏫</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'pronunciation':
        return (
          <div className="lesson-area">
            <div className="lesson-content">
              <h3>Pronunciation Practice</h3>
              <p>Click on each phrase to hear and practice:</p>
              <div style={{ marginTop: '20px' }}>
                {[
                  { text: 'Hello, how are you?', emoji: '👋' },
                  { text: 'Good morning!', emoji: '🌅' },
                  { text: 'Thank you very much!', emoji: '🙏' },
                  { text: 'I love learning English!', emoji: '❤️' },
                  { text: 'Have a nice day!', emoji: '😊' }
                ].map((phrase, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      marginBottom: '15px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px',
                      fontSize: '1.2rem'
                    }}
                    onClick={() => speakWord(phrase.text)}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <span style={{ fontSize: '2rem' }}>{phrase.emoji}</span>
                    <span>{phrase.text}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '1.5rem' }}>🔊</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'conversation':
        return (
          <div className="lesson-area">
            <div className="lesson-content">
              <h3>Daily Conversations</h3>
              <p>Practice these common conversations:</p>
              <div style={{ marginTop: '20px' }}>
                {[
                  {
                    title: 'Meeting Someone New',
                    lines: [
                      '👦 Hello! My name is Tom. What\'s your name?',
                      '👧 Hi Tom! I\'m Lisa. Nice to meet you!',
                      '👦 Nice to meet you too, Lisa!'
                    ]
                  },
                  {
                    title: 'Asking for Help',
                    lines: [
                      '👧 Excuse me, can you help me?',
                      '👨 Of course! What do you need?',
                      '👧 Where is the library?',
                      '👨 It\'s over there, next to the park.'
                    ]
                  }
                ].map((conversation, index) => (
                  <div
                    key={index}
                    style={{
                      background: 'white',
                      padding: '20px',
                      borderRadius: '10px',
                      marginBottom: '20px'
                    }}
                  >
                    <h4 style={{ color: '#667eea', marginBottom: '15px' }}>{conversation.title}</h4>
                    {conversation.lines.map((line, i) => (
                      <div
                        key={i}
                        style={{
                          padding: '10px',
                          marginBottom: '10px',
                          background: '#f8f9fa',
                          borderRadius: '8px',
                          fontSize: '1.1rem',
                          cursor: 'pointer'
                        }}
                        onClick={() => speakWord(line.substring(3))}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const currentAgent = agents.find(a => a.id === selectedAgent);

  return (
    <div className="container">
      <div className="header">
        <h1>🌟 Kids English Learning Agents 🌟</h1>
        <p>Choose your learning adventure!</p>
      </div>

      <div className="agents-grid">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="agent-card"
            style={{ borderTop: `5px solid ${agent.color}` }}
          >
            <div className="agent-icon">{agent.icon}</div>
            <h2>{agent.name}</h2>
            <p>{agent.description}</p>
            <button
              className="agent-button"
              onClick={() => handleAgentClick(agent.id)}
              style={{ background: agent.color }}
            >
              Start Learning!
            </button>
          </div>
        ))}
      </div>

      {selectedAgent && (
        <div className="modal" onClick={() => setSelectedAgent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setSelectedAgent(null)}>
              ×
            </button>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>{currentAgent?.icon}</div>
              <h2 style={{ color: currentAgent?.color, fontSize: '2rem' }}>
                {currentAgent?.name}
              </h2>
            </div>
            {renderAgentContent()}
          </div>
        </div>
      )}
    </div>
  );
}
