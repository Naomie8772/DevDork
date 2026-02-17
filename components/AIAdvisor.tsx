
import React, { useState, useRef, useEffect } from 'react';
import { getBakeryAdvice } from '../services/geminiService';

const AIAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hello darling! I am Rosie, your sweet consultant. Looking for something specific or need help designing a custom cake?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const advice = await getBakeryAdvice(userMessage);
      setMessages(prev => [...prev, { role: 'ai', text: advice || 'I lost my train of thought! Try asking again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-pink-100 flex flex-col h-[500px] overflow-hidden">
          <div className="bg-gradient-to-r from-pink-400 to-rose-400 p-4 text-white flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                🍰
              </div>
              <span className="font-serif font-bold">Ask Rosie</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-pink-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-pink-50/30">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm ${
                  m.role === 'user' 
                    ? 'bg-rose-500 text-white rounded-br-none' 
                    : 'bg-white text-gray-700 shadow-sm border border-pink-100 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl rounded-bl-none shadow-sm border border-pink-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-pink-100 bg-white">
            <div className="flex space-x-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your cravings..."
                className="flex-1 bg-pink-50 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all hover:scale-110 flex items-center space-x-2"
        >
          <span className="hidden sm:inline font-medium">Sweet Advice</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default AIAdvisor;
