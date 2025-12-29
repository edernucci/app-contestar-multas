import React from 'react';
import { ChevronRight, Bell } from 'lucide-react';
import { AppRoute } from '../types';

interface HeaderProps {
    currentRoute?: AppRoute;
}

const Header: React.FC<HeaderProps> = ({ currentRoute }) => {
  const isMyContestations = currentRoute === AppRoute.MY_CONTESTATIONS;

  return (
    <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <nav className="flex items-center text-sm text-slate-500">
                <span className="hover:text-slate-800 cursor-pointer">Início</span>
                <ChevronRight size={14} className="mx-2" />
                <span className={`hover:text-slate-800 cursor-pointer ${isMyContestations ? 'font-semibold text-slate-800' : ''}`}>Contestações</span>
                {!isMyContestations && (
                    <>
                        <ChevronRight size={14} className="mx-2" />
                        <span className="font-semibold text-slate-800">Nova</span>
                    </>
                )}
            </nav>

            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
        </div>

        {!isMyContestations && (
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-800">Central de Recursos</h2>
                <div className="mt-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Abrir Nova Contestação</h1>
                    <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
                        Preencha o formulário com os dados da infração para gerar um novo ticket de atendimento e iniciar o processo de recurso.
                    </p>
                </div>
            </div>
        )}
    </header>
  );
};

export default Header;
