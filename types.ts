export interface InfractionData {
  plate: string;
  date: string;
  concessionaire: string;
  tollPlaza?: string;
  time?: string;
  description?: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'support' | 'system';
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'event';
  fileName?: string;
  fileSize?: string;
}

export interface Ticket {
  id: string;
  number: string;
  title: string;
  status: 'Aberto' | 'Em Análise' | 'Respondido' | 'Deferido' | 'Indeferido' | 'Fechado' | 'Aguardando';
  date: string; // Display string like "14 Out" or "Ontem"
  fullDate?: string;
  plate: string;
  descriptionPreview: string;
  messages: Message[];
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  MY_CONTESTATIONS = 'my_contestations',
  NEW_CONTESTATION = 'new_contestation',
  SETTINGS = 'settings',
  HELP = 'help'
}
