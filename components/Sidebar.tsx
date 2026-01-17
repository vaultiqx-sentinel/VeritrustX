import React, { useState } from 'react';
import { 
  ShieldCheck, Search, Fingerprint, ReceiptText, Key, Bell, 
  MessageSquare, Activity, Globe, Rocket, Crown, Cpu, Network, Scan, 
  UserCheck, Map, Target, X
} from 'lucide-react';
import { VeritrustTheme } from '../types';

interface SidebarProps {
  activeView: string;
  setActiveView: (id: string) => void;
  currentTheme: VeritrustTheme;
  onThemeChange: (theme: VeritrustTheme) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeView, 
  setActiveView, 
  currentTheme, 
  onThemeChange,
  isOpen,
  onClose 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // 🛡️ CTO-READY NAVIGATION MESH
  const navItems = [
    // --- FOUNDER LEVEL ---
    { id: 'ceo-command', label: 'CEO Command', icon: Crown, badge: 'FOUNDER', category: 'Founder' },

    // --- CORE MESH ---
    { id: 'home', label: 'Neural Mesh Home', icon: Globe, category: 'Core' },
    { id: 'truth-engine', label: 'Truth Engine', icon: Cpu, badge: 'CORE', category: 'Core' },
    { id: 'universal-trust', label: 'Universal Trust', icon: Network, category: 'Core' },
    
    // --- SIMULATION & LABS ---
    { id: 'vetting-simulator', label: 'Vetting Simulator', icon: Activity, badge: 'DEMO', category: 'Labs' },
    { id: 'forensic-lab', label: 'Forensic Lab', icon: Scan, badge: 'DNA', category: 'Labs' },
    { id: 'proxy-guard', label: 'Proxy Guard', icon: UserCheck, badge: 'LIVE', category: 'Labs' },
    
    // --- STRATEGY & VISION ---
    { id: 'strategic-blueprint', label: 'Strategic Blueprint', icon: Map, category: 'Strategy' },
    { id: 'strategy-hub', label: 'Strategy Hub', icon: Target, badge: 'INTEL', category: 'Strategy' },
    { id: 'vision-roadmap', label: 'Vision Roadmap', icon: Rocket, category: 'Strategy' },
    
    // --- BUSINESS OPERATIONS ---
    { id: 'bgv-vault', label: 'BGV Vault', icon: ShieldCheck, category: 'Ops' },
    { id: 'licensing', label: 'Licensing Hub', icon: Key, category: 'Ops' },
    { id: 'invoice-portal', label: 'Invoice Portal', icon: ReceiptText, category: 'Ops' },
    
    // --- SYSTEM ---
    { id: 'updates', label: 'Protocol Updates', icon: Bell, badge: 'NEW', category: 'System' },
    { id: 'contact-us', label: 'Forensic Uplink', icon: MessageSquare, category: 'System' },
  ];

  const filteredItems = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const NavButton = ({ id, label, icon: Icon, badge }: any) => (
    <button
      onClick={() => {
        setActiveView(id);
        if (onClose) onClose();
      }}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
        activeView === id 
        ? `accent-bg text-white font-bold shadow-lg scale-[1.02]`
        : currentTheme === 'onyx' 
          ? 'text-zinc-500 hover:bg-white/5 hover:text-white' 
          : 'text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} className={activeView === id ? 'text-white' : 'opacity-70'} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className={`text-[8px] px-1.5 py-0.5 rounded font-black whitespace-nowrap ${
          badge === 'FOUNDER' ? 'bg-amber-500 text-white shadow-sm' :
          badge === 'INTEL' ? 'bg-indigo-500 text-white' :
          badge === 'LIVE' ? 'bg-rose-600 text-white' : 
          badge === 'DNA' ? 'bg-orange-600 text-white' :
          badge === 'DEMO' ? 'bg-emerald-500 text-white' :
          badge === 'CORE' ? 'bg-blue-600 text-white' :
          'bg-emerald-100 text-emerald-700 border border-emerald-200'
        }`}>{badge}</span>
      )}
    </button>
  );

  return (
    <aside className={`w-64 h-full border-r flex flex-col transition-all duration-500 shadow-2xl lg:shadow-none overflow-y-auto custom-scrollbar ${currentTheme === 'onyx' ? 'bg-zinc-950 border-white/5' : 'bg-white border-emerald-50'}`}>
      <div className={`relative flex items-center justify-between border-b ${currentTheme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
        <button 
          onClick={() => {
            setActiveView('home');
            if (onClose) onClose();
          }}
          className={`flex-1 p-8 flex items-center gap-3 text-left transition-all group`}
        >
          <div className="w-10 h-10 accent-bg rounded-xl flex items-center justify-center shadow-lg text-white shrink-0 group-hover:scale-110 transition-transform">
            <ShieldCheck size={22} />
          </div>
          <div>
             <h1 className={`text-lg font-black tracking-tighter leading-none font-quantum ${currentTheme === 'onyx' ? 'text-white' : 'text-zinc-900'}`}>VeritrustX</h1>
             <p className="text-[10px] font-black accent-text uppercase tracking-widest mt-1 italic">Neural Mesh</p>
          </div>
        </button>
        <button onClick={onClose} className="lg:hidden p-4 mr-2 text-zinc-400 hover:text-zinc-900 transition-colors"><X size={20} /></button>
      </div>

      <div className={`px-4 py-4 border-b ${currentTheme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Query Protocol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-none transition-all font-medium ${currentTheme === 'onyx' ? 'bg-white/5 border-white/5 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-600 focus:bg-white'}`}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {['Founder', 'Core', 'Labs', 'Strategy', 'Ops', 'System'].map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;
          return (
            <div key={category}>
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] px-4 mb-3 flex items-center justify-between">
                {category}
                <div className="w-8 h-px bg-zinc-100 opacity-20"></div>
              </div>
              <div className="space-y-1">
                {categoryItems.map(item => (
                  <NavButton key={item.id} {...item} />
                ))}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;