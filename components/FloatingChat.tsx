
import React, { useState, useRef, useEffect } from 'react';
import { getAssistantResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const FloatingChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "你好，我是 River Core。晓河的数字流域已就绪，今天想探索哪个模块？", timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    const currentInput = input.trim();
    if (!currentInput || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: currentInput, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAssistantResponse(
        messages.map(m => ({ role: m.role, content: m.content })), 
        currentInput
      );
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response || "信号在支流中迷失了，请重试。", 
        timestamp: Date.now() 
      }]);
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "流域连接中断，River Core 正在重连。", 
        timestamp: Date.now() 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isOpen ? (
        <div className="glass w-80 md:w-96 h-[500px] rounded-[2.5rem] flex flex-col shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="p-5 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="font-heading font-bold text-[11px] tracking-[0.2em] text-teal-300 uppercase">RIVER_CORE</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors p-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-teal-600/20 border border-teal-500/30 text-teal-50' : 'bg-white/5 text-gray-300 font-light'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-teal-400/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900/40 backdrop-blur-xl rounded-b-[2.5rem]">
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="在此汇入您的指令..."
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-teal-500/40 transition-all text-white placeholder-gray-600"
              />
              <button 
                type="submit"
                disabled={isTyping || !input.trim()}
                className="bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-lg shadow-teal-500/10 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-teal-600 hover:bg-teal-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-90 group relative"
        >
          <div className="absolute inset-0 rounded-full bg-teal-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </button>
      )}
    </div>
  );
};
