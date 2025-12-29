import React, { useMemo } from 'react';
import { History, Download, Calendar, User, Clock, FileText, ArrowRight } from 'lucide-react';
import { VaultRecord } from '../App';

export interface AuditHistoryProps {
  searchFilter?: string;
  records: VaultRecord[];
  onViewRecord?: (record: VaultRecord) => void;
}

const AuditHistory: React.FC<AuditHistoryProps> = ({ searchFilter = '', records, onViewRecord }) => {
  const filteredHistory = useMemo(() => {
    return (records || []).filter(item => 
      item.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.role?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, records]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2 font-quantum">Audit <span className="accent-text">History</span></h2>
          <p className="text-zinc-500 font-medium italic">Live transactional record of all identity scrutinies processed via Neural Logic.</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white border border-zinc-100 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm">
             <Clock size={16} className="accent-text" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Ledger Status: <span className="text-emerald-500">SYNCED</span></span>
          </div>
          <button className="p-3 bg-white border border-zinc-100 rounded-2xl text-zinc-400 hover:accent-text transition-all shadow-sm">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Audit UID</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Identity Subject</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Verification Context</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Audit Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Trust Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Logic Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-10 py-6 text-xs font-mono font-bold accent-text">{item.id}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl overflow-hidden border-2 flex items-center justify-center p-0.5 ${item.status === 'Verified' ? 'border-emerald-500 shadow-emerald-500/10' : 'border-rose-500 shadow-rose-500/10'}`}>
                        {item.photo ? (
                          <img src={item.photo} className="w-full h-full object-cover rounded-lg" alt={item.name} />
                        ) : (
                          <User size={16} className="text-zinc-300" />
                        )}
                      </div>
                      <span className="text-sm font-black text-zinc-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <p className="text-sm font-bold text-zinc-600">{item.role}</p>
                    <p className="text-[9px] text-zinc-400 uppercase font-black tracking-widest mt-0.5">Verification Complete</p>
                  </td>
                  <td className="px-10 py-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="opacity-50" /> {item.date}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                      item.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      item.status === 'Flagged' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                      'bg-rose-50 text-rose-600 border-rose-100'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex flex-col items-end">
                      <span className={`text-lg font-black tracking-tighter ${item.trustScore > 80 ? 'text-emerald-500' : item.trustScore > 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                        {item.trustScore}%
                      </span>
                      <button 
                        onClick={() => onViewRecord?.(item)}
                        className="text-[9px] font-black text-zinc-300 uppercase group-hover:accent-text transition-colors flex items-center gap-1"
                      >
                         View Dossier <ArrowRight size={10} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredHistory.length === 0 && (
          <div className="p-32 text-center space-y-6">
             <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mx-auto border border-zinc-100">
                <History size={32} className="text-zinc-200" />
             </div>
             <div className="max-w-xs mx-auto space-y-2">
                <p className="text-zinc-900 font-black text-xl font-quantum">Archive Empty</p>
                <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">No matching audit events found in the ledger.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditHistory;