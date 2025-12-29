import React from 'react';
import { Search, Plus } from 'lucide-react';
import { Ticket } from '../types';

interface TicketListProps {
  tickets: Ticket[];
  selectedTicketId: string | null;
  onSelectTicket: (id: string) => void;
  onNewTicket: () => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, selectedTicketId, onSelectTicket, onNewTicket }) => {
  const [filter, setFilter] = React.useState<'Todos' | 'Abertos' | 'Em Análise' | 'Finalizados'>('Todos');

  const filteredTickets = tickets.filter(t => {
      if (filter === 'Todos') return true;
      if (filter === 'Abertos') return t.status === 'Aberto';
      if (filter === 'Em Análise') return t.status === 'Em Análise';
      if (filter === 'Finalizados') return ['Fechado', 'Deferido', 'Indeferido', 'Respondido'].includes(t.status);
      return true;
  });

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
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-l-xl border-r border-slate-200">
      <div className="p-4 border-b border-slate-100">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-slate-800">Contestações</h2>
            <button 
                onClick={onNewTicket}
                className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:bg-blue-50 px-2 py-1 rounded"
            >
                <Plus size={16} /> Nova
            </button>
        </div>
        
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="Buscar por ID ou placa..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search size={16} className="absolute left-3 top-2.5 text-slate-400" />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {['Todos', 'Abertos', 'Em Análise', 'Finalizados'].map((f) => (
                <button
                    key={f}
                    onClick={() => setFilter(f as any)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                        ${filter === f ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}
                    `}
                >
                    {f}
                </button>
            ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredTickets.map(ticket => (
            <div 
                key={ticket.id}
                onClick={() => onSelectTicket(ticket.id)}
                className={`p-4 border-b border-slate-50 cursor-pointer hover:bg-slate-50 transition-colors
                    ${selectedTicketId === ticket.id ? 'bg-blue-50/50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}
                `}
            >
                <div className="flex justify-between items-start mb-1">
                    <span className={`text-sm font-bold ${selectedTicketId === ticket.id ? 'text-blue-600' : 'text-slate-700'}`}>
                        {ticket.number}
                    </span>
                    <span className="text-xs text-slate-400">{ticket.date}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-800 text-sm truncate pr-2">{ticket.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase whitespace-nowrap ${getStatusBadge(ticket.status)}`}>
                        {ticket.status}
                    </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                    {ticket.descriptionPreview}
                </p>
            </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
