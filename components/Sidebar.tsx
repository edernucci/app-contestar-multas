import React from 'react';
import { LayoutDashboard, FileText, PlusCircle, Settings, HelpCircle, Shield, User } from 'lucide-react';
import { AppRoute } from '../types';

interface SidebarProps {
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate }) => {
  const NavItem = ({ route, icon: Icon, label }: { route: AppRoute; icon: any; label: string }) => {
    const isActive = currentRoute === route;
    return (
      <button
        onClick={() => onNavigate(route)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors rounded-r-full mr-4
          ${isActive 
            ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600' 
            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800 border-l-4 border-transparent'
          }`}
      >
        <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
        {label}
      </button>
    );
  };

  return (
    <aside className="w-64 bg-white h-screen flex flex-col border-r border-slate-200 fixed left-0 top-0 z-10 hidden md:flex">
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 mb-6">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <Shield size={24} fill="currentColor" />
        </div>
        <div>
          <h1 className="font-bold text-slate-800 leading-tight">Gestão de Multas</h1>
          <p className="text-xs text-slate-500">Portal do Condutor</p>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 space-y-1">
        <NavItem route={AppRoute.DASHBOARD} icon={LayoutDashboard} label="Visão Geral" />
        <NavItem route={AppRoute.MY_CONTESTATIONS} icon={FileText} label="Minhas Contestações" />
        
        <div className="px-4 py-2">
           <button
            onClick={() => onNavigate(AppRoute.NEW_CONTESTATION)}
            className={`w-full flex items-center gap-2 justify-center px-4 py-3 rounded-lg text-sm font-semibold shadow-sm transition-all
              ${currentRoute === AppRoute.NEW_CONTESTATION 
                ? 'bg-blue-100 text-blue-700 ring-2 ring-blue-500 ring-offset-1' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
          >
            <PlusCircle size={18} />
            Nova Contestação
          </button>
        </div>
      </nav>

      {/* Account */}
      <div className="mt-auto pt-6 pb-4">
        <div className="px-6 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Conta</div>
        <NavItem route={AppRoute.SETTINGS} icon={Settings} label="Configurações" />
        <NavItem route={AppRoute.HELP} icon={HelpCircle} label="Ajuda" />
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-400">
             <User size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Roberto Silva</p>
            <p className="text-xs text-slate-500 truncate">Condutor</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
