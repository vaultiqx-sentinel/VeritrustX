import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Download, Search, 
  Globe, Fingerprint, Database, Binary, ArrowUpDown, User, 
  ChevronUp, ChevronDown, XCircle, AlertCircle, MoreHorizontal, 
  RefreshCcw, Eye, Share2, FilterX, Loader2
} from 'lucide-react';
import { VaultRecord } from '../App';

// Define the interface to match App.tsx exactly
export interface BGVVaultProps {
  searchFilter?: string;
  records?: VaultRecord[];
  onShareRecord?: (record: VaultRecord) => void;
}

type SortKey = keyof VaultRecord;
type SortDirection = 'asc' | 'desc';
type StatusFilter = 'All' | 'Verified' | 'Flagged' | 'Failed';

const BGVVault: React.FC<BGVVaultProps> = ({ searchFilter = '', records = [], onShareRecord }) => {
  // --- STATE ---
  const [sortConfig, setSortConfig] = useState<{ key: SortKey, direction: SortDirection }>({ 
    key: 'created_at' as SortKey, 
    direction: 'desc' 
  });
  const [activeStatusFilter, setActiveStatusFilter] = useState<StatusFilter>('All');
  const [localSearch, setLocalSearch] = useState('');
  const [isResyncing, setIsResyncing] = useState(false);

  // --- 🟢 REAL CSV EXPORT ENGINE ---
  const handleExportCSV = () => {
    if (records.length === 0) {
      alert("Institutional Ledger is currently empty.");
      return;
    }

    const headers = ["Audit_ID", "Candidate_Name", "Designation", "Integrity_Status", "Trust_Score", "Entity_Grounded", "Bio_Verified", "Audit_Date"];
    
    const csvRows = sortedRecords.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`, 
      `"${r.role.replace(/"/g, '""')}"`,
      r.status,
      `${r.trustScore}%`,
      r.entity_verified ? 'YES' : 'NO',
      r.identity_verified ? 'YES' : 'NO',
      r.created_at
    ].join(','));

    const csvString = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `VeritrustX_Vault_Export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- 🔵 ACTIVE RESYNC LOGIC ---
  const handleResync = () => {
    setIsResyncing(true);
    // Sync with the backend mesh
    setTimeout(() => {
      window.location.reload(); 
    }, 1500);
  };

  // --- 🟣 METRICS CALCULATION ---
  const metrics = useMemo(() => ({
    total: records.length,
    verified: records.filter(r => r.status === 'Verified').length,
    flagged: records.filter(r => r.status === 'Flagged').length,
    failed: records.filter(r => r.status === 'Failed').length,
  }), [records]);

  // --- 🔍 DEEP FILTERING ---
  const filteredRecords = useMemo(() => {
    return (records || []).filter(r => {
      const searchStr = (searchFilter + ' ' + localSearch).toLowerCase().trim();
      const matchesSearch = 
        r.name?.toLowerCase().includes(searchStr) ||
        r.role?.toLowerCase().includes(searchStr) ||
        r.id?.toLowerCase().includes(searchStr);
      
      const matchesStatus = activeStatusFilter === 'All' || r.status === activeStatusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchFilter, localSearch, records, activeStatusFilter]);

  // --- 🔃 ADVANCED SORTING ---
  const sortedRecords = useMemo(() => {
    return [...filteredRecords].sort((a: any, b: any) => {
      const { key, direction } = sortConfig;
      if (a[key] === null || a[key] === undefined) return 1;
      if (b[key] === null || b[key] === undefined) return -1;
      
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig, filteredRecords]);

  const handleSort = (key: SortKey) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // --- UI HELPERS ---
  const SortIndicator = ({ column }: { column: SortKey }) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={12} className="opacity-30 ml-1" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={12} className="ml-1 text-emerald-600" /> : <ChevronDown size={12} className="ml-1 text-emerald-600" />;
  };

  const StatusBadge = ({ status }: { status: VaultRecord['status'] }) => {
    const configs = {
      Verified: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-600', icon: CheckCircle2 },
      Flagged: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-600', icon: AlertTriangle },
      Failed: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-600', icon: XCircle }
    };
    const config = configs[status] || configs.Verified;
    const Icon = config.icon;
    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${config.bg} ${config.border} ${config.text}`}>
        <Icon size={12} />
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* 📊 Institutional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricBox label="Total Archive" value={metrics.total} color="text-zinc-900" bg="bg-white" icon={Database} />
        <MetricBox label="Verified Identities" value={metrics.verified} color="text-emerald-600" bg="bg-emerald-50/50" icon={CheckCircle2} />
        <MetricBox label="Risks Flagged" value={metrics.flagged} color="text-amber-600" bg="bg-amber-50/50" icon={AlertTriangle} />
        <MetricBox label="Failed Audits" value={metrics.failed} color="text-rose-600" bg="bg-rose-50/50" icon={XCircle} />
      </div>

      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6">
        <div className="max-w-xl space-y-4">
           <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum uppercase">
            BGV <span className="text-emerald-600">Vault</span>
           </h2>
           <p className="text-zinc-500 font-medium leading-relaxed">
             The institutional ledger for identity integrity. Every record is anchored with Pixel-DNA evidence and neural logic timestamps.
           </p>
        </div>
        
        <div className="flex flex-wrap gap-3">
           <button 
             onClick={handleExportCSV}
             className="px-6 py-4 bg-white border border-zinc-200 rounded-2xl text-[10px] font-black uppercase text-zinc-500 tracking-widest hover:border-emerald-600 hover:text-emerald-600 transition-all flex items-center gap-2 shadow-sm"
           >
             <Download size={16} /> Export Ledger (CSV)
           </button>

           <button 
             onClick={handleResync}
             disabled={isResyncing}
             className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-70"
           >
             {isResyncing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
             {isResyncing ? 'Synchronizing...' : 'Resync Neural Ledger'}
           </button>
        </div>
      </div>

      {/* 🔍 Universal Filter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-3 border border-zinc-100 rounded-[2.5rem] shadow-sm">
         <div className="flex bg-zinc-50 p-1 rounded-2xl w-full lg:w-auto">
            {(['All', 'Verified', 'Flagged', 'Failed'] as StatusFilter[]).map(filter => (
               <button
                  key={filter}
                  onClick={() => setActiveStatusFilter(filter)}
                  className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                     activeStatusFilter === filter 
                     ? 'bg-zinc-900 text-white shadow-sm' 
                     : 'text-zinc-400 hover:text-zinc-600'
                  }`}
               >
                  {filter}
               </button>
            ))}
         </div>
         
         <div className="flex flex-1 items-center gap-3 px-4 w-full">
            <div className="relative flex-1">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-300" size={16} />
               <input 
                  type="text"
                  placeholder="Query identity, context or ID..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-zinc-50 border-none rounded-2xl text-xs font-bold outline-none text-zinc-900"
               />
            </div>
            { (localSearch || activeStatusFilter !== 'All') && (
               <button 
                  onClick={() => { setLocalSearch(''); setActiveStatusFilter('All'); }}
                  className="p-3 text-zinc-400 hover:text-rose-500 transition-colors"
               >
                  <FilterX size={18} />
               </button>
            )}
         </div>
      </div>

      {/* 📜 The Institutional Ledger Grid */}
      <div className="bg-white rounded-[3.5rem] border border-zinc-100 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-zinc-50 bg-zinc-50/30 grid grid-cols-12 gap-4 px-12">
           <div className="col-span-5 lg:col-span-4">
              <button onClick={() => handleSort('name')} className="text-[10px] font-black uppercase tracking-widest flex items-center text-zinc-400">
                Subject Identity <SortIndicator column="name" />
              </button>
           </div>
           <div className="hidden lg:block col-span-3">
              <button onClick={() => handleSort('role')} className="text-[10px] font-black uppercase tracking-widest flex items-center text-zinc-400">
                Context <SortIndicator column="role" />
              </button>
           </div>
           <div className="col-span-4 lg:col-span-2">
              <button onClick={() => handleSort('status')} className="text-[10px] font-black uppercase tracking-widest flex items-center text-zinc-400">
                Status <SortIndicator column="status" />
              </button>
           </div>
           <div className="col-span-3 lg:col-span-2 text-right">
              <button onClick={() => handleSort('trustScore')} className="text-[10px] font-black uppercase tracking-widest flex items-center justify-end text-zinc-400">
                Logic Score <SortIndicator column="trustScore" />
              </button>
           </div>
        </div>

        <div className="divide-y divide-zinc-50 p-6 space-y-4">
           {sortedRecords.length > 0 ? sortedRecords.map((record, i) => (
             <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-zinc-100 hover:border-emerald-200 transition-all group">
                <div className="grid grid-cols-12 gap-4 items-center relative z-10">
                   {/* Candidate Avatar & Name */}
                   <div className="col-span-5 lg:col-span-4 flex items-center gap-5">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center p-0.5 border-2 overflow-hidden transition-all duration-500 shadow-sm shrink-0 ${
                        record.status === 'Verified' ? 'border-emerald-500 shadow-emerald-500/10' : 'border-rose-500 shadow-rose-500/10'
                      }`}>
                         <img src={record.photoUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${record.name}`} className="w-full h-full object-cover rounded-xl" alt={record.name} />
                      </div>
                      <div className="overflow-hidden">
                         <h3 className="text-xl font-black text-zinc-900 truncate">{record.name}</h3>
                         <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mt-1">UUID: {record.id.slice(0, 12)}</p>
                      </div>
                   </div>

                   {/* Context & Date */}
                   <div className="hidden lg:block col-span-3">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-zinc-600 truncate">{record.role}</p>
                        
                        {/* ✅ LOGICAL ICONS FIX: Wrapped in span to avoid TypeScript Title error */}
                        {record.entity_verified && (
                            <span title="Entity Authenticity Verified">
                                <Globe size={14} className="text-emerald-500" />
                            </span>
                        )}
                        {record.identity_verified && (
                            <span title="Candidate Identity Grounded">
                                <Fingerprint size={14} className="text-indigo-500" />
                            </span>
                        )}
                      </div>
                      <p className="text-[10px] font-medium text-zinc-400 mt-1">{new Date(record.created_at).toLocaleDateString()}</p>
                   </div>

                   {/* Badge Status */}
                   <div className="col-span-4 lg:col-span-2">
                      <StatusBadge status={record.status} />
                   </div>

                   {/* Trust Score Percentage */}
                   <div className="col-span-3 lg:col-span-2 text-right">
                      <div className="flex flex-col items-end">
                        <p className={`text-2xl font-black tracking-tighter ${record.trustScore > 80 ? 'text-emerald-500' : record.trustScore > 40 ? 'text-amber-500' : 'text-rose-500'}`}>
                           {record.trustScore}%
                        </p>
                        <div className="w-16 h-1.5 bg-zinc-100 rounded-full mt-1.5 overflow-hidden">
                          <div className={`h-full transition-all duration-1000 ${record.trustScore > 80 ? 'bg-emerald-500' : record.trustScore > 40 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${record.trustScore}%` }}></div>
                        </div>
                      </div>
                   </div>

                   {/* Quick Action Buttons */}
                   <div className="col-span-12 xl:col-span-1 mt-4 xl:mt-0 flex xl:justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => onShareRecord?.(record)} className="p-3 bg-zinc-900 text-white rounded-xl hover:bg-emerald-600 transition-colors shadow-lg"><Eye size={16} /></button>
                      <button onClick={() => { window.location.hash = `#/proof/${record.id}`; }} className="p-3 bg-zinc-100 text-zinc-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all"><Share2 size={16} /></button>
                   </div>
                </div>
             </div>
           )) : (
             <div className="py-32 text-center space-y-6">
                <Search size={48} className="mx-auto text-zinc-100" />
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                  No matching records found in the institutional ledger.
                </p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// Sub-component for Metric Boxes
const MetricBox = ({ label, value, color, bg, icon: Icon }: any) => (
   <div className={`${bg} p-6 rounded-[2.5rem] border border-zinc-100 flex items-center justify-between group transition-all shadow-sm`}>
      <div>
         <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">{label}</p>
         <h4 className={`text-3xl font-black ${color}`}>{value}</h4>
      </div>
      <div className={`p-3 rounded-xl bg-white shadow-sm ${color} group-hover:scale-110 transition-transform`}>
         <Icon size={20} />
      </div>
   </div>
);

export default BGVVault;