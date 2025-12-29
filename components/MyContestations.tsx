import React from 'react';
import TicketList from './TicketList';
import TicketChat from './TicketChat';
import { Ticket } from '../types';

interface MyContestationsProps {
    tickets: Ticket[];
    selectedTicketId: string | null;
    onSelectTicket: (id: string) => void;
    onNewTicket: () => void;
    onSendMessage: (ticketId: string, message: string) => void;
}

const MyContestations: React.FC<MyContestationsProps> = ({ tickets, selectedTicketId, onSelectTicket, onNewTicket, onSendMessage }) => {
  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[calc(100vh-8rem)]">
        <div className="grid grid-cols-12 h-full">
            {/* Left Sidebar List - 4 cols */}
            <div className="col-span-4 h-full">
                <TicketList 
                    tickets={tickets} 
                    selectedTicketId={selectedTicket?.id || null} 
                    onSelectTicket={onSelectTicket}
                    onNewTicket={onNewTicket}
                />
            </div>
            
            {/* Right Chat Area - 8 cols */}
            <div className="col-span-8 bg-[#F8FAFC] h-full border-l border-slate-200">
                {selectedTicket ? (
                    <TicketChat ticket={selectedTicket} onSendMessage={onSendMessage} />
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400">
                        Selecione uma contestação para ver os detalhes
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MyContestations;