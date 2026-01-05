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
    title: "Multa por Evasão", 
    status: "Em Análise", 
    date: "10:42", 
    plate: "ABC-1234",
    descriptionPreview: "Olá, segue o extrato da Tag comprovando que o pagamento foi realizado...",
    messages: [
       { id: "m1", sender: "system", type: "event", content: "Ticket criado automaticamente via app.", timestamp: "14 de Outubro, 2023" },
       { id: "m2", sender: "support", type: "text", content: "Olá! Recebemos sua contestação sobre a Multa por Evasão de Pedágio (#8921). O sistema da concessionária indica que não houve leitura da Tag. Você possui o extrato do dispositivo para este dia?", timestamp: "10:15" },
       { id: "m3", sender: "user", type: "text", content: "Bom dia. Sim, a cancela não abriu mas o aparelho apitou. Segue em anexo o extrato do Sem Parar comprovando o débito na mesma hora da infração.", timestamp: "10:22" },
       { id: "m4", sender: "user", type: "file", content: "Extrato_Tag_Outubro.pdf", fileName: "Extrato_Tag_Outubro.pdf", fileSize: "150 KB", timestamp: "10:22" },
       { id: "m5", sender: "support", type: "text", content: "Recebido. Com esse comprovante de débito automático, vamos solicitar o cancelamento da infração de evasão junto à concessionária. O prazo é de até 48 horas.", timestamp: "10:30" },
       { id: "m6", sender: "system", type: "event", content: "Status atualizado para: Em Análise por Juliana Silva", timestamp: "10:30" }
    ]
  },
  { 
    id: "4890", 
    number: "#4890", 
    title: "Passagem não Reconhecida", 
    status: "Respondido", 
    date: "Ontem", 
    plate: "ABC-1234",
    descriptionPreview: "Sua contestação foi deferida. O valor da passagem foi estornado pois o GPS confirmou outra rota.",
    messages: []
  },
  { 
    id: "4852", 
    number: "#4852", 
    title: "Período Incorreto de Estadia", 
    status: "Fechado", 
    date: "12 Out", 
    plate: "ABC-1234",
    descriptionPreview: "Caso encerrado. Ajustamos a cobrança para 2 horas conforme ticket de entrada.",
    messages: []
  },
  { 
    id: "4811", 
    number: "#4811", 
    title: "Estadia não Realizada", 
    status: "Aberto", 
    date: "08 Out", 
    plate: "ABC-1234",
    descriptionPreview: "Aguardando análise da equipe de pátio sobre cobrança indevida sem acesso ao local.",
    messages: []
  },
];
export const RECENT_TICKETS = INITIAL_TICKETS.slice(0, 3);