import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Download, Search, Globe, Fingerprint, Database, 
  ArrowUpDown, ChevronUp, ChevronDown, XCircle, RefreshCcw, Eye, Share2, FilterX, Loader2
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

  const metrics = useMemo(() => ({
    total: records.length,
    verified: records.filter(r => r.status === 'Verified').length,
    flagged: records.filter(r => r.status === 'Flagged').length,
    failed: records.filter(r => r.status === 'Failed').length,
  }), [records]);

  const filteredRecords = useMemo(() => {
    return (records || []).filter(r => {
      const searchStr = (searchFilter + ' ' + localSearch).toLowerCase();
      return (r.name?.toLowerCase().includes(searchStr) || r.id?.toLowerCase().includes(searchStr)) && 
             (activeStatusFilter === 'All' || r.status === activeStatusFilter);
    });
  }, [searchFilter, localSearch, records, activeStatusFilter]);

  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig, filteredRecords]);

  const handleSort = (key: keyof VaultRecord) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Name", "Role", "Status", "Trust_Score", "Date"];
    const rows = sortedRecords.map(r => [r.id, `"${r.name}"`, `"${r.role}"`, r.status, `${r.trustScore}%`, r.created_at].join(','));
    const blob = new Blob([[headers.join(','), ...rows].join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `VeritrustX_Vault_Export.csv`;
    link.click();
  };

  const StatusBadge = ({ status }: { status: string }) => {
    const isV = status === 'Verified';
    const isF = status === 'Failed';
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${isV ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : isF ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
        {isV ? <CheckCircle2 size={12}/> : isF ? <XCircle size={12}/> : <AlertTriangle size={12}/>} {status}
      </span>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricBox label="Total Archive" value={metrics.total} color="text-zinc-900" bg="bg-white" icon={Database} />
        <MetricBox label="Verified" value={metrics.verified} color="text-emerald-600" bg="bg-emerald-50/50" icon={CheckCircle2} />
        <MetricBox label="Flagged" value={metrics.flagged} color="text-amber-600" bg="bg-amber-50/50" icon={AlertTriangle} />
        <MetricBox label="Failed" value={metrics.failed} color="text-rose-600" bg="bg-rose-50/50" icon={XCircle} />
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div><h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum uppercase">BGV <span className="text-emerald-600">Vault</span></h2><p className="text-zinc-500 font-medium italic mt-2">The institutional ledger for identity integrity and company genuineness.</p></div>
        <div className="flex gap-3">
           <button onClick={handleExportCSV} className="px-6 py-4 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase flex items-center gap-2"><Download size={16} /> Export CSV</button>
           <button onClick={() => window.location.reload()} className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 flex items-center gap-2 transition-all hover:bg-emerald-700"><RefreshCcw size={16} /> Resync Ledger</button>
        </div>
      </div>

      <div className="bg-white rounded-[3.5rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="divide-y divide-zinc-50 p-6 space-y-4">
           {sortedRecords.length > 0 ? sortedRecords.map((record, i) => (
             <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 transition-all group">
                <div className="grid grid-cols-12 gap-4 items-center">
                   <div className="col-span-4 flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 p-0.5 ${record.status === 'Verified' ? 'border-emerald-500' : 'border-rose-500'}`}>
                         <img src={record.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${record.name}`} className="w-full h-full object-cover rounded-xl" alt="" />
                      </div>
                      <div><h3 className="text-lg font-black text-zinc-900">{record.name}</h3><p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest truncate">UID: {record.id}</p></div>
                   </div>

                   <div className="col-span-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-600 truncate">{record.role}</p>
                        {record.entity_verified && <span title="Entity Verified"><Globe size={14} className="text-emerald-500" /></span>}
                        {record.identity_verified && <span title="Identity Verified"><Fingerprint size={14} className="text-indigo-500" /></span>}
                      </div>
                      <p className="text-[10px] text-zinc-400">{record.created_at}</p>
                   </div>

                   <div className="col-span-2"><StatusBadge status={record.status} /></div>
                   <div className="col-span-2 text-right"><p className={`text-2xl font-black ${record.trustScore > 80 ? 'text-emerald-500' : 'text-rose-500'}`}>{record.trustScore}%</p></div>
                   <div className="col-span-1 flex justify-end">
                      <button onClick={() => onShareRecord?.(record)} className="p-3 bg-zinc-900 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-all shadow-lg"><Eye size={16} /></button>
                   </div>
                </div>
             </div>
           )) : <div className="py-20 text-center"><p className="text-zinc-400 font-black uppercase text-xs">No Records in Ledger</p></div>}
        </div>
      </div>
    </div>
  );
};

const MetricBox = ({ label, value, color, bg, icon: Icon }: any) => (
   <div className={`${bg} p-6 rounded-[2.5rem] border border-zinc-100 flex items-center justify-between shadow-sm group hover:border-emerald-200 transition-all`}>
      <div><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p><h4 className={`text-3xl font-black ${color}`}>{value}</h4></div>
      <div className={`p-3 rounded-xl bg-white shadow-sm ${color} group-hover:scale-110 transition-transform`}><Icon size={20} /></div>
   </div>
);

export default BGVVault;