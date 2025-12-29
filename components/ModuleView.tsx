import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Download, Share2, Globe, Lock, X } from 'lucide-react';
import { ModuleSchema, ModuleEntry } from '../types';

interface ModuleViewProps {
  module: ModuleSchema;
  entries: ModuleEntry[];
  onAddEntry: (data: Record<string, any>) => void;
  onDeleteEntry: (id: string) => void;
}

const ModuleView: React.FC<ModuleViewProps> = ({ module, entries, onAddEntry, onDeleteEntry }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEntry(formData);
    setFormData({});
    setShowAddForm(false);
  };

  const filteredEntries = entries.filter(entry => 
    Object.values(entry.data).some(val => 
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{module.name}</h2>
            {isPublished ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-200">
                <Globe size={10} /> Live Protocol
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-200">
                <Lock size={10} /> Internal Draft
              </span>
            )}
          </div>
          <p className="text-slate-500 mt-1 font-medium">{module.description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => setIsPublished(!isPublished)}
            className={`px-6 py-3 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all border ${
              isPublished 
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50' 
              : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100'
            }`}
          >
            <Share2 size={16} />
            {isPublished ? 'Revoke Access' : 'Publish Protocol'}
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            <Plus size={16} />
            Create Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/30">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder={`Search ${module.name.toLowerCase()}...`} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl transition-all text-xs font-black uppercase tracking-widest">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-xl transition-all text-xs font-black uppercase tracking-widest">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                {module.fields.map(field => (
                  <th key={field.id} className="px-8 py-5">{field.label}</th>
                ))}
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={module.fields.length + 1} className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <Search className="text-slate-200" size={32} />
                      </div>
                      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">No verification records found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredEntries.map(entry => (
                  <tr key={entry.id} className="hover:bg-slate-50 transition-colors group">
                    {module.fields.map(field => (
                      <td key={field.id} className="px-8 py-6 whitespace-nowrap text-slate-700 font-bold">
                        {field.type === 'boolean' ? (
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${entry.data[field.name] ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                            {entry.data[field.name] ? 'Verified' : 'Pending'}
                          </span>
                        ) : field.type === 'currency' ? (
                          <span className="text-slate-900">₹{Number(entry.data[field.name] || 0).toLocaleString()}</span>
                        ) : (
                          entry.data[field.name] || '—'
                        )}
                      </td>
                    ))}
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                        <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all shadow-sm">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => onDeleteEntry(entry.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-900">New Data Input</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">{module.name}</p>
              </div>
              <button 
                onClick={() => setShowAddForm(false)} 
                className="w-10 h-10 flex items-center justify-center bg-white text-slate-400 hover:text-slate-600 rounded-xl transition-all shadow-sm border border-slate-100"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
              {module.fields.map(field => (
                <div key={field.id} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    {field.label} {field.required && <span className="text-orange-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      required={field.required}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all"
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    >
                      <option value="">Select Option</option>
                      {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  ) : field.type === 'boolean' ? (
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        id={`check-${field.id}`}
                        className="w-5 h-5 text-orange-600 rounded-lg border-slate-300 focus:ring-orange-500"
                        onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.checked }))}
                      />
                      <label htmlFor={`check-${field.id}`} className="text-sm font-bold text-slate-600 cursor-pointer select-none">Verify Field Authenticity</label>
                    </div>
                  ) : (
                    <input
                      type={field.type === 'currency' ? 'number' : field.type === 'email' ? 'email' : field.type === 'date' ? 'date' : 'text'}
                      required={field.required}
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all placeholder:text-slate-300 placeholder:font-medium"
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                    />
                  )}
                </div>
              ))}
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-slate-900 text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-slate-200"
                >
                  Commit Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleView;