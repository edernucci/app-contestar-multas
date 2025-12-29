import React, { useState } from 'react';
import { Calendar, Clock, MapPin, FileText, ChevronDown } from 'lucide-react';
import { CONCESSIONAIRES, MOCK_TOLL_PLAZAS } from '../constants';
import { InfractionData } from '../types';

interface NewContestationFormProps {
    onSubmit: (data: InfractionData) => void;
}

const NewContestationForm: React.FC<NewContestationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<InfractionData>({
    plate: '',
    date: '',
    concessionaire: '',
    tollPlaza: '',
    time: '',
    description: ''
  });

  const [formError, setFormError] = useState<string | null>(null);

  const handleInputChange = (field: keyof InfractionData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setFormError(null);
  };

  const handleSubmit = () => {
      if (!formData.plate || !formData.date || !formData.concessionaire) {
          setFormError("Por favor, preencha os campos obrigatórios.");
          return;
      }
      onSubmit(formData);
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header of the Card */}
      <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
             <FileText className="text-white" size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Dados da Infração</h2>
        </div>
      </div>

      <div className="p-8">
        {formError && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {formError}
            </div>
        )}

        <form className="space-y-8">
          
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                Placa do Veículo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                </div>
                <input 
                  type="text" 
                  value={formData.plate}
                  onChange={(e) => handleInputChange('plate', e.target.value)}
                  placeholder="ABC-1234"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 text-slate-700 font-medium"
                />
              </div>
              <p className="text-xs text-slate-400">Formato: ABC-1234 ou ABC1D23</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                Data da Ocorrência <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Calendar size={18} />
                </div>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
              Concessionária Responsável <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                 <FileText size={18} />
              </div>
              <select 
                value={formData.concessionaire}
                onChange={(e) => handleInputChange('concessionaire', e.target.value)}
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-slate-700 font-medium"
              >
                <option value="">Selecione a concessionária...</option>
                {CONCESSIONAIRES.map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          <div className="relative py-4">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
             </div>
             <div className="relative flex justify-start">
                <span className="bg-white pr-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Informações Opcionais</span>
             </div>
          </div>

          {/* Row 3 - Optional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-700">Praça de Pedágio</label>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Opcional</span>
              </div>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                   <MapPin size={18} />
                 </div>
                 <select 
                    value={formData.tollPlaza}
                    onChange={(e) => handleInputChange('tollPlaza', e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none text-slate-700"
                 >
                    <option value="">Selecione a praça...</option>
                    {MOCK_TOLL_PLAZAS.map(p => (
                        <option key={p} value={p}>{p}</option>
                    ))}
                 </select>
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown size={18} />
                 </div>
              </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between">
                <label className="text-sm font-semibold text-slate-700">Horário da Ocorrência</label>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded">Opcional</span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Clock size={18} />
                </div>
                <input 
                  type="time" 
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex gap-4">
            <button type="button" className="px-6 py-3 rounded-lg border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 transition-colors w-1/3">
                Cancelar
            </button>
            <button 
                type="button" 
                onClick={handleSubmit}
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex-1 flex items-center justify-center gap-2 group"
            >
                Gerar Ticket de Contestação
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewContestationForm;