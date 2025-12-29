import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, Settings2, 
  ShieldCheck, UserCheck, Fingerprint, FileSearch, Code2, History,
  Key, Map, Scale, Bell, Radio, ReceiptText, UserPlus, Scan,
  Sun, Moon, Shield, Sparkles
} from 'lucide-react';
import { VeritrustTheme } from '../App';

interface SidebarProps {
  activeView: string;
  setActiveView: (id: string) => void;
  currentTheme: VeritrustTheme;
  onThemeChange: (theme: VeritrustTheme) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, currentTheme, onThemeChange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { id: 'dashboard', label: 'Threat Overview', icon: LayoutDashboard, category: 'Scanning' },
    { id: 'erp-architect', label: 'ERP Architect', icon: Code2, badge: 'NEW', category: 'Core' },
    { id: 'integrity-scan', label: 'BGV Logic Scrutiny', icon: FileSearch, badge: 'CORE', category: 'Scanning' },
    { id: 'forensic-lab', label: 'Forensic Lab', icon: Scan, badge: 'DNA', category: 'Scanning' },
    { id: 'proxy-guard', label: 'Proxy Guard', icon: UserCheck, badge: 'LIVE', category: 'Scanning' },
    { id: 'bgv-vault', label: 'BGV Vault', icon: ShieldCheck, category: 'Scanning' },
    { id: 'audit-history', label: 'Audit History', icon: History, category: 'Scanning' },
    
    // Growth & Business
    { id: 'client-acquisition', label: 'Lead Radar', icon: Radio, badge: 'GROWTH', category: 'Business' },
    { id: 'candidate-portal', label: 'Candidate Mesh', icon: UserPlus, badge: 'INTAKE', category: 'Business' },
    { id: 'licensing', label: 'Licensing Hub', icon: Key, category: 'Business' },
    { id: 'invoice-portal', label: 'Invoice Portal', icon: ReceiptText, badge: 'FINANCE', category: 'Business' },
    
    { id: 'vision-roadmap', label: 'Release Roadmap', icon: Map, category: 'Business' },
    { id: 'legal-hub', label: 'Legal & Privacy', icon: Scale, category: 'System' },
    { id: 'updates', label: 'Update Feed', icon: Bell, badge: 'NEW', category: 'System' },
  ];

  const filteredItems = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NavButton = ({ id, label, icon: Icon, badge }: any) => (
    <button
      onClick={() => setActiveView(id)}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
        activeView === id 
        ? `accent-bg text-white font-bold shadow-lg`
        : currentTheme === 'onyx' 
          ? 'text-zinc-500 hover:bg-white/5 hover:text-white' 
          : 'text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className={`text-[8px] px-1.5 py-0.5 rounded font-black whitespace-nowrap ${
          badge === 'INTAKE' ? 'bg-emerald-700 text-white' : 
          badge === 'GROWTH' ? 'bg-amber-600 text-white' :
          badge === 'FINANCE' ? 'bg-emerald-600 text-white' :
          badge === 'DNA' ? 'bg-rose-600 text-white' :
          'bg-emerald-50 text-emerald-600 border border-emerald-100'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );

  return (
    <aside className={`w-64 border-r h-screen flex flex-col fixed left-0 top-0 z-20 print:hidden shadow-sm transition-colors duration-500 ${currentTheme === 'onyx' ? 'bg-zinc-950 border-white/5 text-zinc-400' : 'bg-white border-emerald-50 text-zinc-600'}`}>
      <div className={`p-8 flex items-center gap-3 border-b ${currentTheme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
        <div className="w-10 h-10 accent-bg rounded-xl flex items-center justify-center shadow-lg text-white">
          <Fingerprint size={22} />
        </div>
        <div>
           <h1 className={`text-lg font-black tracking-tighter leading-none font-quantum ${currentTheme === 'onyx' ? 'text-white' : 'text-zinc-900'}`}>VeritrustX</h1>
           <p className="text-[10px] font-black accent-text uppercase tracking-widest mt-1">Identity Firewall</p>
        </div>
      </div>

      <div className={`px-4 py-4 border-b ${currentTheme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-none transition-all font-medium ${currentTheme === 'onyx' ? 'bg-white/5 border-white/5 text-white' : 'bg-emerald-50/30 border-emerald-50 text-zinc-600'}`}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {['Core', 'Scanning', 'Business', 'System'].map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          return (
            <div key={category}>
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-4 mb-3">{category}</div>
              <div className="space-y-1">
                {categoryItems.map(item => (
                  <NavButton key={item.id} {...item} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* Theme Spectrum Switcher */}
      <div className={`p-4 border-t ${currentTheme === 'onyx' ? 'border-white/5 bg-black/30' : 'border-emerald-50 bg-emerald-50/20'}`}>
        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Neural Spectrum</p>
        <div className={`flex p-1 rounded-xl gap-1 ${currentTheme === 'onyx' ? 'bg-zinc-900' : 'bg-white'}`}>
           <button 
             onClick={() => onThemeChange('emerald')}
             className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${currentTheme === 'emerald' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-400 hover:text-emerald-600'}`}
             title="Institutional Emerald"
           >
              <Shield size={14} />
           </button>
           <button 
             onClick={() => onThemeChange('indigo')}
             className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${currentTheme === 'indigo' ? 'bg-indigo-600 text-white shadow-md' : 'text-zinc-400 hover:text-indigo-600'}`}
             title="Strategic Indigo"
           >
              <Sparkles size={14} />
           </button>
           <button 
             onClick={() => onThemeChange('onyx')}
             className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${currentTheme === 'onyx' ? 'bg-zinc-700 text-white shadow-md' : 'text-zinc-400 hover:text-zinc-200'}`}
             title="Deep Scrutiny Onyx"
           >
              <Moon size={14} />
           </button>
        </div>
        <button 
          onClick={() => setActiveView('settings')}
          className={`w-full py-4 mt-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border flex items-center justify-center gap-2 shadow-sm ${currentTheme === 'onyx' ? 'bg-zinc-800 border-white/10 text-white hover:bg-zinc-700' : 'bg-white border-emerald-200 text-zinc-900 hover:bg-emerald-50'}`}
        >
          <Settings2 size={16} /> Forensic Config
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;