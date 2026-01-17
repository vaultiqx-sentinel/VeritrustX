import React, { useMemo } from 'react';
import { History, Download, Clock, User, ArrowRight, Calendar } from 'lucide-react';
import { VaultRecord } from '../types';

export interface AuditHistoryProps {
  searchFilter?: string;
  records: VaultRecord[];
  onViewRecord?: (record: VaultRecord) => void;
}

const AuditHistory: React.FC<AuditHistoryProps> = ({ searchFilter = '', records, onViewRecord }) => {
  const filteredHistory = useMemo(() => {
    return (records || []).filter(item => 
      item.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.role?.toLowerCase().includes(searchFilter.toLowerCase())
    );
  }, [searchFilter, records]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-zinc-900 tracking-tight mb-2 font-quantum uppercase">Audit <span className="text-indigo-600">History</span></h2>
          <p className="text-zinc-500 font-medium italic">Live transactional record of all identity scrutinies.</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-zinc-50/50 border-b border-zinc-100">
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">ID</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Subject</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Context</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Date</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</th>
                <th className="px-10 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-widest text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50 transition-colors group cursor-pointer" onClick={() => onViewRecord?.(item)}>
                  <td className="px-10 py-6 text-xs font-mono font-bold text-indigo-600">{item.id}</td>
                  <td className="px-10 py-6 text-sm font-black text-zinc-900">{item.name}</td>
                  <td className="px-10 py-6 text-sm font-bold text-zinc-600">{item.role}</td>
                  <td className="px-10 py-6 text-xs font-bold text-zinc-400 uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${item.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>{item.status}</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <span className={`text-lg font-black tracking-tighter ${item.trustScore > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{item.trustScore}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditHistory;