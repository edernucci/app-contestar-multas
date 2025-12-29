import React, { useEffect, useRef, useState } from 'react';
import { Send, Paperclip, Smile, Info, FileText } from 'lucide-react';
import { Ticket, Message } from '../types';

interface TicketChatProps {
  ticket: Ticket;
  onSendMessage: (ticketId: string, message: string) => void;
}

const MessageBubble = ({ message }: { message: Message }) => {
    if (message.type === 'event') {
        return (
            <div className="flex justify-center my-6">
                <div className="bg-orange-50 text-orange-800 text-xs px-4 py-2 rounded-full flex items-center gap-2 border border-orange-100">
                    {message.content.includes("Ticket criado") && (
                      <Info size={14} className="text-orange-600" />
                    )}
                    {message.content.includes("Status") && (
                      <div className="w-4 h-4 rounded-full border-2 border-orange-400 border-t-transparent animate-spin"></div>
                    )}
                    {message.content}
                </div>
            </div>
        );
    }

    const isUser = message.sender === 'user';
    
    return (
        <div className={`flex gap-3 mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && (
                 <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Juliana" alt="Support" className="w-8 h-8 rounded-full" />
                 </div>
            )}
            
            <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
                 {!isUser && <span className="text-xs font-bold text-slate-800 mb-1">Juliana Silva (Suporte) <span className="text-slate-400 font-normal ml-1">{message.timestamp}</span></span>}
                 {isUser && <span className="text-xs font-bold text-slate-800 mb-1">Você <span className="text-slate-400 font-normal ml-1">{message.timestamp}</span></span>}
                 
                 <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed relative group
                     ${isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'}
                 `}>
                     {message.content}
                 </div>
                 
                 {/* File Attachment Render */}
                 {message.type === 'file' || message.fileName ? (
                     <div className={`mt-2 p-3 rounded-lg border flex items-center gap-3 w-64
                          ${isUser ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200'}
                     `}>
                         <div className="bg-red-100 p-2 rounded text-red-600">
                             <FileText size={20} />
                         </div>
                         <div className="flex-1 min-w-0">
                             <p className="text-sm font-medium text-slate-800 truncate">{message.fileName}</p>
                             <p className="text-xs text-slate-500">{message.fileSize}</p>
                         </div>
                     </div>
                 ) : null}
            </div>

            {isUser && (
                 <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-8 h-8 rounded-full" />
                 </div>
            )}
        </div>
    );
}

const TicketChat: React.FC<TicketChatProps> = ({ ticket, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [ticket.id, ticket.messages]);

  const handleSend = () => {
      if (!inputValue.trim()) return;
      onSendMessage(ticket.id, inputValue);
      setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          handleSend();
      }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
        case 'Em Análise': return 'bg-orange-100 text-orange-700';
        case 'Respondido': return 'bg-green-100 text-green-700';
        case 'Deferido': return 'bg-green-100 text-green-700';
        case 'Fechado': return 'bg-slate-100 text-slate-600';
        case 'Aberto': return 'bg-blue-100 text-blue-700';
        default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-[#F8FAFC] rounded-r-xl">
      {/* Header */}
      <div className="bg-white px-6 py-4 border-b border-slate-200 flex justify-between items-center rounded-tr-xl">
        <div>
            <div className="flex items-center gap-2 mb-1 text-xs text-slate-500">
                <span>Tickets</span>
                <span>&rsaquo;</span>
                <span>{ticket.number}</span>
            </div>
            <div className="flex items-center gap-3">
                <h1 className="text-lg font-bold text-slate-900">{ticket.title}</h1>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${getStatusBadge(ticket.status)}`}>
                    {ticket.status}
                </span>
            </div>
            <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                <div className="flex items-center gap-1">
                    <span className="font-medium">14 Out, 2023</span>
                </div>
                <div className="flex items-center gap-1">
                    <span className="font-medium">{ticket.plate}</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3">
             <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
                 <Info size={20} />
             </button>
             <button className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
                 Ações
             </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 scroll-smooth" ref={scrollRef}>
           <div className="flex justify-center mb-8">
               <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full">14 de Outubro, 2023</span>
           </div>
           
           {ticket.messages.map(msg => (
               <MessageBubble key={msg.id} message={msg} />
           ))}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-slate-200 rounded-br-xl">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2 flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Paperclip size={20} />
              </button>
              <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <Smile size={20} />
              </button>
              <button 
                  onClick={handleSend}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                  <Send size={18} />
              </button>
          </div>
          <div className="text-right mt-2">
             <span className="text-[10px] text-slate-400">Pressione Enter para enviar • Suporte disponível Seg-Sex, 9h-18h</span>
          </div>
      </div>
    </div>
  );
};

export default TicketChat;