import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send, Sparkles, Bot, Clock, MapPin, Heart, Flame } from 'lucide-react';
import nandijiImg from '../../assets/nandiji.png';

export default function AskNandiChatbot() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'nandi',
      text: currentLang === 'hi' 
        ? 'हर हर महादेव! 🙏 मैं नंदी महाराज हूँ, बैकुंठनाथ धाम का पवित्र दूत। आज मैं आपकी क्या सहायता कर सकता हूँ?' 
        : 'Har Har Mahadev! 🙏 I am Nandi, the sacred messenger of Lord Gaurishankar Baikunthnath Dham. How may I guide your pilgrimage today?',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    {
      key: 'timings',
      label: currentLang === 'hi' ? '🛕 दर्शन व आरती समय' : '🛕 Temple Aarti Timings',
      answer: currentLang === 'hi'
        ? 'मन्दिर दर्शन समय: प्रातः 05:00 से रात्रि 09:00 बजे तक।\n• प्रातः आरती: 05:30 AM\n• राजभोग आरती: 12:00 PM\n• सांध्य गंगा आरती: 06:30 PM\n• शयन आरती: 08:30 PM'
        : 'Temple Darshan Hours: 05:00 AM to 09:00 PM daily.\n• Mangal Aarti: 05:30 AM\n• Rajbhog Aarti: 12:00 PM\n• Sandhya Ganga Aarti: 06:30 PM\n• Shayan Aarti: 08:30 PM'
    },
    {
      key: 'pooja',
      label: currentLang === 'hi' ? '🌸 रुद्राभिषेक व पूजन दर' : '🌸 Rudrabhishek & Pooja Fees',
      answer: currentLang === 'hi'
        ? 'बैकुंठनाथ धाम आधिकारिक पूजन शुल्क:\n• रुद्राभिषेक: ₹ 500\n• मुंडन संस्कार: ₹ 75 (प्रति बच्चा)\n• सत्यनारायण कथा: ₹ 250\n• जनेऊ संस्कार: ₹ 500'
        : 'Official Temple Pooja Fees:\n• Rudrabhishek: ₹ 500\n• Mundan Sanskar: ₹ 75 per child\n• Satyanarayan Katha: ₹ 250\n• Janeu Thread Ceremony: ₹ 500'
    },
    {
      key: 'vehicle',
      label: currentLang === 'hi' ? '🚗 वाहन पूजा दर' : '🚗 Vehicle Worship Fees',
      answer: currentLang === 'hi'
        ? 'वाहन पूजन शुल्क (न्याय समिति स्वीकृत):\n• २ चक्का (बाइक/स्कूटर): ₹ 100\n• ३ चक्का (ऑटो): ₹ 200\n• ४ चक्का (कार/जीप): ₹ 250\n• ६ चक्का (ट्रक/बस): ₹ 300'
        : 'Vehicle Blessing Rates:\n• 2-Wheeler (Bike/Scooter): ₹ 100\n• 3-Wheeler (Auto): ₹ 200\n• 4-Wheeler (Car/SUV): ₹ 250\n• 6-Wheeler (Heavy Commercial): ₹ 300'
    },
    {
      key: 'rooms',
      label: currentLang === 'hi' ? '🏨 धर्मशाला कमरा बुकिंग' : '🏨 Yatri Niwas Stay',
      answer: currentLang === 'hi'
        ? 'यात्री निवास व्यवस्था:\n• एसी डीलक्स डबल रूम: ₹ 1,200/रात\n• नॉन-एसी रूम: ₹ 700/रात\n• एसी फैमिली सुइट (4 बेड): ₹ 2,200/रात\n• डॉर्मिटरी हॉल: ₹ 150/बेड'
        : 'Yatri Niwas Dharamshala Rates:\n• AC Deluxe Room: ₹ 1,200/night\n• Non-AC Room: ₹ 700/night\n• Family Suite: ₹ 2,200/night\n• Dormitory Bed: ₹ 150/night'
    },
    {
      key: 'location',
      label: currentLang === 'hi' ? '📍 मंदिर का पता व मार्ग' : '📍 Temple Address & Route',
      answer: currentLang === 'hi'
        ? 'बैकुंठनाथ धाम पता: बैकतपुर (खुसरूपुर), पटना, बिहार - 803202। पटना जंक्शन से 30 किमी पूर्व गंगा तट पर स्थित।'
        : 'Baikunthnath Dham Address: Baikatpur (Khusrupur), Patna, Bihar - 803202. Located 30 km east of Patna Junction on the Ganga banks.'
    }
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputMsg('');

    // Generate response
    setTimeout(() => {
      let replyText = '';
      const lower = text.toLowerCase();

      if (lower.includes('aarti') || lower.includes('time') || lower.includes('समय') || lower.includes('दर्शन')) {
        replyText = quickQuestions[0].answer;
      } else if (lower.includes('pooja') || lower.includes('पूजा') || lower.includes('rudrabhishek') || lower.includes('रुद्राभिषेक')) {
        replyText = quickQuestions[1].answer;
      } else if (lower.includes('vehicle') || lower.includes('गाड़ी') || lower.includes('वाहन') || lower.includes('car')) {
        replyText = quickQuestions[2].answer;
      } else if (lower.includes('room') || lower.includes('stay') || lower.includes('कमरा') || lower.includes('धर्मशाला')) {
        replyText = quickQuestions[3].answer;
      } else if (lower.includes('where') || lower.includes('address') || lower.includes('पता') || lower.includes('location')) {
        replyText = quickQuestions[4].answer;
      } else {
        replyText = currentLang === 'hi'
          ? 'हर हर महादेव! 🙏 आपके प्रश्न का उत्तर देने हेतु धन्यवाद। आप आरती समय, पूजन शुल्क, कमरा बुकिंग या मंदिर मार्ग से संबंधित कोई भी जानकारी पूछ सकते हैं।'
          : 'Har Har Mahadev! 🙏 Thank you for reaching out. You can ask about Aarti timings, Pooja rates, Yatri Niwas stay, or Temple location.';
      }

      const nandiReply = {
        id: Date.now() + 1,
        sender: 'nandi',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, nandiReply]);
    }, 600);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      
      {/* 1. Floating Trigger Button (Matching Reference UI: Nandi image on top, white pill button below) */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center cursor-pointer group select-none transition-transform duration-300 transform hover:scale-105"
        >
          {/* Nandi Ji Image Mascot Sitting on Top */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative -mb-2.5 z-10 drop-shadow-2xl">
            <img 
              src={nandijiImg} 
              alt="Ask Nandi" 
              className="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300" 
            />
          </div>

          {/* White Rounded Pill Button Below */}
          <div className="bg-white text-stone-900 font-extrabold text-sm sm:text-base px-5 py-1.5 rounded-full shadow-2xl border border-stone-200 tracking-wide font-sans flex items-center justify-center gap-1">
            <span>Ask Nandi!</span>
          </div>
        </div>
      )}

      {/* 2. Floating Chatbot Window Drawer */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] h-[520px] bg-white rounded-3xl shadow-2xl border-2 border-[#c28227] flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-250 relative">
          
          {/* Chatbot Header */}
          <div className="bg-gradient-to-r from-[#2a080d] via-[#38060d] to-[#2a080d] text-white p-4 flex items-center justify-between border-b border-amber-500/30 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400 bg-amber-100 shrink-0">
                  <img src={nandijiImg} alt="Nandi Ji" className="w-full h-full object-cover object-top scale-110" />
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
              </div>

              <div>
                <div className="flex items-center gap-1 text-[#ffd700] font-bold text-base font-hindi">
                  <span>Ask Nandi</span>
                  <span className="text-xs text-amber-300 font-sans">(नंदी जी)</span>
                </div>
                <p className="text-[10px] text-amber-100/90 font-hindi">
                  {currentLang === 'hi' ? 'बैकुंठनाथ धाम दिव्य सहायक' : 'Divine Temple Assistant'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#f5eee6] text-xs leading-relaxed">
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'nandi' && (
                  <div className="w-7 h-7 rounded-full overflow-hidden border border-amber-400 shrink-0 mt-1 shadow-sm bg-amber-100">
                    <img src={nandijiImg} alt="Nandi" className="w-full h-full object-cover" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 shadow-sm whitespace-pre-line font-hindi ${
                    msg.sender === 'user'
                      ? 'bg-[#c28227] text-white rounded-br-none font-semibold'
                      : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`text-[9px] block text-right mt-1 opacity-70 ${msg.sender === 'user' ? 'text-amber-100' : 'text-stone-400'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Preset Quick Question Chips */}
          <div className="p-2 bg-stone-100 border-t border-stone-200/70 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickQuestions.map((q) => (
              <button
                key={q.key}
                onClick={() => handleSendMessage(q.answer)}
                className="bg-white text-stone-800 text-[11px] font-medium font-hindi px-2.5 py-1 rounded-full border border-stone-300 hover:border-[#c28227] hover:bg-amber-50 hover:text-[#c28227] shrink-0 transition-colors cursor-pointer shadow-2xs"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder={currentLang === 'hi' ? 'नंदी जी से पूछें...' : 'Ask Nandi Ji...'}
              className="flex-1 bg-stone-100 text-stone-900 text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-[#c28227] focus:bg-white transition-all font-hindi"
            />
            <button
              type="submit"
              className="bg-[#c28227] hover:bg-[#a86e1e] text-white p-2 rounded-xl transition-colors cursor-pointer shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
}
