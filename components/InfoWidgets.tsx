import React from 'react';
import { Info, CheckCircle2 } from 'lucide-react';
import { RECENT_TICKETS } from '../constants';

const InfoWidgets: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* How it works Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blue-100 p-2 rounded-full text-blue-600">
            <Info size={20} />
          </div>
          <h3 className="font-semibold text-slate-800">Como funciona?</h3>
        </div>
        
        <p className="text-slate-600 text-sm mb-4 leading-relaxed">
          Ao abrir uma contestação, um número de protocolo (Ticket) é gerado automaticamente. 
          Nossa equipe analisará os dados fornecidos junto à concessionária.
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-600">Prazo de resposta: até 5 dias úteis.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-slate-600">Acompanhamento em tempo real.</span>
          </div>
        </div>
      </div>

      {/* Recent Tickets Card */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800">Últimos Tickets</h3>
          <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Ver todos</button>
        </div>

        <div className="space-y-4">
          {RECENT_TICKETS.map((ticket) => {
            let statusColor = "";
            let statusBg = "";
            let iconLetter = "";

            if (ticket.status === 'Em Análise') {
                statusBg = "bg-orange-100 text-orange-700";
                statusColor = "text-orange-600";
                iconLetter = "TK";
            } else if (ticket.status === 'Deferido') {
                statusBg = "bg-green-100 text-green-700";
                statusColor = "text-green-600";
                iconLetter = "TK";
            } else {
                statusBg = "bg-red-100 text-red-700";
                statusColor = "text-red-600";
                iconLetter = "TK";
            }

            return (
              <div key={ticket.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${statusBg.replace('text-', 'bg-opacity-20 ')}`}>
                   <span className={statusColor.replace('text-', '') === 'orange-600' ? 'text-orange-600' : 'text-green-600'}>{iconLetter}</span>
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800 text-sm">{ticket.number}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${statusBg}`}>{ticket.status}</span>
                    </div>
                    <span className="text-xs text-slate-400">{ticket.date}</span>
                 </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Map Card */}
      <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group h-48">
        <img 
            src="https://picsum.photos/seed/map/400/300" 
            alt="Mapa de cobertura" 
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-4">
             <div className="text-white">
                <p className="text-xs text-slate-300 font-medium mb-0.5">Cobertura Nacional</p>
                <h4 className="font-bold text-sm">Monitoramento de Rodovias</h4>
             </div>
        </div>
      </div>

    </div>
  );
};

export default InfoWidgets;
