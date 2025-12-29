import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import NewContestationForm from './components/NewContestationForm';
import InfoWidgets from './components/InfoWidgets';
import MyContestations from './components/MyContestations';
import { AppRoute, Ticket, InfractionData } from './types';
import { INITIAL_TICKETS } from './constants';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.NEW_CONTESTATION);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(INITIAL_TICKETS[0].id);

  const handleNavigate = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  const handleCreateTicket = (data: InfractionData) => {
      const newTicketId = Math.floor(Math.random() * 10000).toString();
      const newTicket: Ticket = {
          id: newTicketId,
          number: `#${newTicketId}`,
          title: `${data.concessionaire} - ${data.plate}`,
          status: 'Aberto',
          date: 'Hoje',
          plate: data.plate,
          descriptionPreview: data.description || "Contestação iniciada via formulário.",
          messages: [
              {
                  id: `msg-${Date.now()}`,
                  sender: 'system',
                  type: 'event',
                  content: 'Ticket criado automaticamente via app.',
                  timestamp: new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
              }
          ]
      };

      setTickets(prev => [newTicket, ...prev]);
      setSelectedTicketId(newTicketId);
      setCurrentRoute(AppRoute.MY_CONTESTATIONS);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="font-bold text-slate-800">Gestão de Multas</div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-600">
          <Menu />
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile Drawer */}
      <div className={`
        fixed inset-0 z-30 transition-transform duration-300 md:translate-x-0 md:static md:inset-auto
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
         {/* Overlay for mobile */}
         <div 
            className={`absolute inset-0 bg-black/50 md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
            onClick={() => setMobileMenuOpen(false)}
         ></div>
         
         <Sidebar currentRoute={currentRoute} onNavigate={handleNavigate} />
      </div>

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-8 min-h-screen transition-all">
        <div className="max-w-[1600px] mx-auto">
            {/* Header Area */}
            <Header currentRoute={currentRoute} onNavigate={handleNavigate} />

            {/* Content Area */}
            {currentRoute === AppRoute.NEW_CONTESTATION ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Form (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                  <NewContestationForm onSubmit={handleCreateTicket} />
                </div>

                {/* Right Column: Widgets (4 cols) */}
                <div className="lg:col-span-4 space-y-6 sticky top-8">
                  <InfoWidgets />
                </div>

              </div>
            ) : currentRoute === AppRoute.MY_CONTESTATIONS ? (
                <div className="h-full">
                    <MyContestations 
                        tickets={tickets}
                        selectedTicketId={selectedTicketId}
                        onSelectTicket={setSelectedTicketId}
                        onNewTicket={() => handleNavigate(AppRoute.NEW_CONTESTATION)}
                    />
                </div>
            ) : (
              // Placeholder for other routes
              <div className="flex flex-col items-center justify-center h-96 text-slate-400 bg-white rounded-xl border border-slate-200 border-dashed">
                <div className="text-xl font-medium">Página em construção</div>
                <p className="text-sm">Você está em: {currentRoute}</p>
                <button 
                    onClick={() => handleNavigate(AppRoute.NEW_CONTESTATION)}
                    className="mt-4 text-blue-600 hover:underline"
                >
                    Voltar para Nova Contestação
                </button>
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;