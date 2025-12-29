import { Ticket } from "./types";

export const CONCESSIONAIRES = [
  "CCR NovaDutra",
  "Ecovias",
  "AutoBann",
  "ViaOeste",
  "RodoAnel",
  "Arteris Fernão Dias"
];

export const MOCK_TOLL_PLAZAS = [
  "Praça 1 - km 30",
  "Praça 2 - km 55",
  "Praça 3 - km 102 (Sul)",
  "Praça 4 - km 102 (Norte)"
];

export const INITIAL_TICKETS: Ticket[] = [
  { 
    id: "4921", 
    number: "#4921", 
    title: "Excesso de Velocidade", 
    status: "Em Análise", 
    date: "10:42", 
    plate: "ABC-1234",
    descriptionPreview: "Olá, enviei a documentação solicitada referente à multa da Av. Paulista...",
    messages: [
       { id: "m1", sender: "system", type: "event", content: "Ticket criado automaticamente via app.", timestamp: "14 de Outubro, 2023" },
       { id: "m2", sender: "support", type: "text", content: "Olá! Recebemos sua solicitação de contestação para a multa #8921. Para prosseguirmos com a análise, você poderia nos enviar uma foto legível da notificação de autuação?", timestamp: "10:15" },
       { id: "m3", sender: "user", type: "text", content: "Oi Juliana, bom dia. Claro, segue em anexo a foto da notificação que recebi pelo correio.", timestamp: "10:22" },
       { id: "m4", sender: "user", type: "file", content: "Notificacao_Multa.pdf", fileName: "Notificacao_Multa.pdf", fileSize: "245 KB", timestamp: "10:22" },
       { id: "m5", sender: "support", type: "text", content: "Perfeito, recebi o arquivo. Vou encaminhar para a equipe jurídica analisar os argumentos de defesa baseados no Art. 218 do CTB. O prazo médio de resposta é de 48 horas úteis.", timestamp: "10:30" },
       { id: "m6", sender: "system", type: "event", content: "Status atualizado para: Em Análise por Juliana Silva", timestamp: "10:30" }
    ]
  },
  { 
    id: "4890", 
    number: "#4890", 
    title: "Estacionamento Proibido", 
    status: "Respondido", 
    date: "Ontem", 
    plate: "ABC-1234",
    descriptionPreview: "Sua contestação foi deferida. O processo foi arquivado e a pontuação não será computada.",
    messages: []
  },
  { 
    id: "4852", 
    number: "#4852", 
    title: "Rodízio Municipal", 
    status: "Fechado", 
    date: "12 Out", 
    plate: "ABC-1234",
    descriptionPreview: "Caso encerrado por falta de documentos no prazo estipulado.",
    messages: []
  },
  { 
    id: "4811", 
    number: "#4811", 
    title: "Conversão Proibida", 
    status: "Aberto", 
    date: "08 Out", 
    plate: "ABC-1234",
    descriptionPreview: "Aguardando atribuição de um especialista para analisar seu caso.",
    messages: []
  },
];
export const RECENT_TICKETS = INITIAL_TICKETS.slice(0, 3);
