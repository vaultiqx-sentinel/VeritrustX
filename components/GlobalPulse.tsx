
import React, { useState } from 'react';
import { Search, Loader2, Database, Network, Target, Globe, CheckCircle, Link2, ExternalLink, Info } from 'lucide-react';
import { globalBackgroundSearch } from '../services/gemini';
import { VeritrustTheme } from '../types';

const GlobalPulse: React.FC<{ theme?: VeritrustTheme }> = ({ theme = 'emerald' }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{text: string | undefined, sources: any[]} | null>(null);

  const isDark = theme === 'onyx';

  const handleSearch = async () => {
    if (!query) return;
    setIsLoading(true);
    try {
      const data = await globalBackgroundSearch(query);
      setResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className={`p-10 rounded-[3rem] border shadow-sm relative overflow-hidden ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
        <div className="flex items-center gap-4 mb-10">
           <div className="p-4 accent-bg rounded-2xl text-white shadow-lg"><Network size={28} /></div>
           <div>
              <h3 className={`text-2xl font-black font-quantum ${isDark ? 'text-white' : 'text-zinc-900'}`}>Universal <span className="accent-text">Trust</span> Protocol</h3>
              <p className={`text-sm font-medium ${isDark ? 'text-zinc-400' : 'text-zinc-500'}`}>Global grounding against public & registry traces.</p>
           </div>
        </div>

        <div className="flex gap-4 mb-10">
           <div className="relative flex-1">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
              <input 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
                placeholder="e.g. 'Jane Doe Senior AI Engineer'" 
                className={`w-full pl-16 pr-6 py-5 border rounded-2xl focus:accent-border outline-none font-bold ${isDark ? 'bg-black border-white/10 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'}`} 
              />
           </div>
           <button onClick={handleSearch} disabled={isLoading || !query} className="px-8 accent-bg text-white font-black rounded-2xl flex items-center gap-2 disabled:opacity-50 shadow-lg">{isLoading ? <Loader2 className="animate-spin" /> : <Database size={18} />}{isLoading ? 'Grounding...' : 'Verify Trace'}</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <div className="lg:col-span-2 space-y-6">
              {isLoading ? (
                <div className={`h-80 flex flex-col items-center justify-center rounded-[3rem] border text-center ${isDark ? 'bg-zinc-800 border-white/5' : 'bg-zinc-50 border-zinc-100'}`}><Loader2 size={32} className="accent-text animate-spin" /><p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mt-4">Querying Universal Nodes...</p></div>
              ) : results ? (
                <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                   <div className="bg-zinc-950 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
                      <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest mb-6">
                         <CheckCircle size={14} /> Grounded Integrity Report
                      </div>
                      <p className="text-zinc-300 text-sm leading-relaxed font-medium italic">
                         {results.text || "No descriptive findings returned."}
                      </p>
                      <div className="mt-8 pt-8 border-t border-white/10 flex items-center gap-6">
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Public Record Sync</span>
                         </div>
                         <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Registry Validated</span>
                         </div>
                      </div>
                   </div>

                   {/* Source Mesh Visualization */}
                   <div className={`p-8 border rounded-[2.5rem] ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-zinc-50 border-zinc-100'}`}>
                      <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Network size={14} className="accent-text" /> Logic Entanglement Mesh
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         {['Domain Reg', 'EPFO Node', 'GST Check', 'Social Mesh'].map((n, i) => (
                           <div key={n} className={`p-4 rounded-2xl border text-center space-y-2 ${isDark ? 'bg-black border-white/10' : 'bg-white border-zinc-100'}`}>
                              <div className="w-2 h-2 bg-emerald-500 rounded-full mx-auto animate-pulse"></div>
                              <p className={`text-[9px] font-black uppercase truncate ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>{n}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              ) : (
                <div className={`h-80 border-2 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-zinc-300 space-y-4 ${isDark ? 'bg-zinc-900/50 border-white/10' : 'bg-zinc-50/50 border-zinc-100'}`}><Target size={48} /><p className="text-[10px] font-black uppercase tracking-widest">Enter Subject Metadata to Initiate Pulse Grounding</p></div>
              )}
           </div>

           <div className="space-y-6">
              <div className={`border p-8 rounded-[3rem] shadow-sm ${isDark ? 'bg-zinc-900 border-white/10' : 'bg-white border-zinc-100'}`}>
                 <h4 className={`text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2 font-quantum ${isDark ? 'text-white' : 'text-zinc-900'}`}>
                    <Link2 size={16} className="accent-text" /> Verified Sources
                 </h4>
                 <div className="space-y-4">
                    {results?.sources && results.sources.length > 0 ? (
                      results.sources.map((src: any, i: number) => (
                        <a 
                          key={i}
                          href={src.web?.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-between p-4 border rounded-xl hover:accent-border transition-all group ${isDark ? 'bg-black border-white/10' : 'bg-zinc-50 border-zinc-100'}`}
                        >
                           <div className="overflow-hidden">
                              <p className={`text-xs font-bold truncate ${isDark ? 'text-zinc-200' : 'text-zinc-900'}`}>{src.web?.title || 'External Proof Source'}</p>
                              <p className="text-[9px] text-zinc-400 truncate mt-0.5">{src.web?.uri}</p>
                           </div>
                           <ExternalLink size={14} className="text-zinc-300 group-hover:accent-text shrink-0 ml-3" />
                        </a>
                      ))
                    ) : (
                      <div className="text-center py-12 opacity-30 grayscale">
                         <Info size={32} className="mx-auto mb-2" />
                         <p className="text-[10px] font-black uppercase tracking-widest">No links found</p>
                      </div>
                    )}
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalPulse;
