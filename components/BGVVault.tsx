import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, AlertTriangle, Download, Globe, Fingerprint, Database, 
  Search, RefreshCcw, Loader2, ChevronUp, ChevronDown, ArrowUpDown, Eye, Share2, XCircle
} from 'lucide-react';
import { VaultRecord } from '../App';

export interface BGVVaultProps {
  searchFilter?: string;
  records?: VaultRecord[];
  onShareRecord?: (record: VaultRecord) => void;
}

const BGVVault: React.FC<BGVVaultProps> = ({ searchFilter = '', records = [], onShareRecord }) => {
  const [sortConfig, setSortConfig] = useState<{ key: keyof VaultRecord, direction: 'asc' | 'desc' }>({ key: 'created_at' as any, direction: 'desc' });
  const [activeStatusFilter, setActiveStatusFilter] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [isResyncing, setIsResyncing] = useState(false);

  // --- 🟢 EXPORT CSV ---
  const handleExportCSV = () => {
    const headers = ["Audit_ID", "Candidate_Name", "Designation", "Status", "Trust_Score", "Date"];
    const csvRows = records.map(r => [r.id, r.name, r.role, r.status, `${r.trustScore}%`, r.created_at].join(','));
    const blob = new Blob([[headers.join(','), ...csvRows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VeritrustX_Vault_Export.csv`;
    link.click();
  };

  // --- 🟡 FILTERING LOGIC ---
  const filteredRecords = useMemo(() => {
    return (records || []).filter(r => {
      const searchStr = (searchFilter + ' ' + localSearch).toLowerCase();
      const matchesSearch = r.name?.toLowerCase().includes(searchStr) || r.id?.toLowerCase().includes(searchStr);
      const matchesStatus = activeStatusFilter === 'All' || r.status === activeStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchFilter, localSearch, records, activeStatusFilter]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig, filteredRecords]);

  const StatusBadge = ({ status }: { status: string }) => {
    const isVerified = status === 'Verified';
    const isFailed = status === 'Failed';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isVerified ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : isFailed ? 'bg-rose-50 border-rose-100 text-rose-600' : 'bg-amber-50 border-amber-100 text-amber-600'}`}>
        {isVerified ? <CheckCircle2 size={12}/> : isFailed ? <XCircle size={12}/> : <AlertTriangle size={12}/>}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header & Controls */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div className="max-w-xl space-y-4">
           <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum uppercase">BGV <span className="text-emerald-600">Vault</span></h2>
           <p className="text-zinc-500 font-medium leading-relaxed italic">The institutional ledger for identity integrity and company genuineness.</p>
        </div>
        <div className="flex gap-3">
           <button onClick={handleExportCSV} className="px-6 py-4 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2"><Download size={16} /> Export CSV</button>
           <button onClick={() => window.location.reload()} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase flex items-center gap-2 shadow-xl shadow-emerald-900/20"><RefreshCcw size={16} /> Resync Ledger</button>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="divide-y divide-zinc-50 p-6 space-y-4">
           {sortedRecords.map((record, i) => (
             <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 transition-all group">
                <div className="grid grid-cols-12 gap-4 items-center">
                   <div className="col-span-4 flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-zinc-50 border overflow-hidden">
                         <img src={record.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${record.name}`} className="w-full h-full object-cover" alt="avatar" />
                      </div>
                      <div>
                         <h3 className="text-lg font-black text-zinc-900">{record.name}</h3>
                         <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">UID: {record.id.slice(0,8)}</p>
                      </div>
                   </div>

                   <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-600 truncate max-w-[150px]">{record.role}</p>
                        
                        {/* ✅ FIXED: Icons wrapped in span to fix TypeScript 'title' error */}
                        {record.entity_verified && (
                            <span title="Company Genuineness Verified">
                                <Globe size={14} className="text-emerald-500" />
                            </span>
                        )}
                        {record.identity_verified && (
                            <span title="Candidate Identity Grounded">
                                <Fingerprint size={14} className="text-indigo-500" />
                            </span>
                        )}
                      </div>
                      <p className="text-[10px] font-medium text-zinc-400 mt-1">{record.created_at}</p>
                   </div>

                   <div className="col-span-2">
                      <StatusBadge status={record.status} />
                   </div>

                   <div className="col-span-2 text-right">
                      <p className={`text-2xl font-black ${record.trustScore > 80 ? 'text-emerald-500' : 'text-rose-500'}`}>{record.trustScore}%</p>
                   </div>

                   <div className="col-span-1 flex justify-end">
                      <button onClick={() => onShareRecord?.(record)} className="p-3 bg-zinc-900 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all"><Eye size={16} /></button>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default BGVVault;