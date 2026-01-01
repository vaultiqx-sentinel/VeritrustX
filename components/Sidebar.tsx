import React, { useState } from 'react';
import { 
  LayoutDashboard, Search, ShieldCheck, UserCheck, Fingerprint, 
  FileSearch, Code2, History, Key, Map, Scale, Bell, Radio, 
  ReceiptText, UserPlus, Scan, Shield, Sparkles, Moon, Globe, 
  MessageSquare, Activity, TrendingUp, ChevronRight,
  Rocket, Crown
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

  // EVERY logical endpoint of VeritrustX mapped here
  const navItems = [
    // --- FOUNDER AUTHORITY ---
    { id: 'ceo-command', label: 'CEO Command', icon: Crown, badge: 'FOUNDER', category: 'Founder' },

    // --- CORE LOGIC ---
    { id: 'home', label: 'Institutional Home', icon: Globe, category: 'Core' },
    { id: 'erp-architect', label: 'ERP Architect', icon: Code2, badge: 'NEW', category: 'Core' },
    
    // --- SCANNERS & ENGINES ---
    { id: 'dashboard', label: 'Threat Overview', icon: LayoutDashboard, category: 'Scanning' },
    { id: 'integrity-scan', label: 'BGV Logic Scrutiny', icon: FileSearch, badge: 'CORE', category: 'Scanning' },
    { id: 'forensic-lab', label: 'Forensic Lab', icon: Scan, badge: 'DNA', category: 'Scanning' },
    { id: 'proxy-guard', label: 'Proxy Guard', icon: UserCheck, badge: 'LIVE', category: 'Scanning' },
    { id: 'bgv-vault', label: 'BGV Vault', icon: ShieldCheck, category: 'Scanning' },
    { id: 'audit-history', label: 'Audit History', icon: History, category: 'Scanning' },
    
    // --- BUSINESS & GROWTH ---
    { id: 'client-acquisition', label: 'Lead Radar', icon: Radio, badge: 'GROWTH', category: 'Business' },
    { id: 'business-value', label: 'Organization ROI', icon: TrendingUp, category: 'Business' },
    { id: 'candidate-portal', label: 'Candidate Mesh', icon: UserPlus, badge: 'INTAKE', category: 'Business' },
    { id: 'licensing', label: 'Licensing Hub', icon: Key, category: 'Business' },
    { id: 'invoice-portal', label: 'Invoice Portal', icon: ReceiptText, badge: 'FINANCE', category: 'Business' },
    { id: 'vision-roadmap', label: 'Release Roadmap', icon: Map, category: 'Business' },
    
    // --- SYSTEM INFRASTRUCTURE ---
    { id: 'legal-hub', label: 'Legal & Privacy', icon: Scale, category: 'System' },
    { id: 'updates', label: 'Update Feed', icon: Bell, badge: 'NEW', category: 'System' },
    { id: 'contact-us', label: 'Forensic Support', icon: MessageSquare, badge: '24/7', category: 'System' },
    { id: 'strategic-blueprint', label: 'Future Blueprint', icon: Rocket, badge: 'VISION', category: 'System' },
  ];

  // Filter logic for the search bar
  const filteredItems = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside className={`w-64 border-r h-screen flex flex-col fixed left-0 top-0 z-20 print:hidden transition-all duration-500 ${currentTheme === 'onyx' ? 'bg-zinc-950 border-white/5' : 'bg-white border-emerald-50 shadow-sm'}`}>
      
      {/* 🛡️ BRAND SECTION - ACTIVE LOGO BUTTON */}
      <button 
        onClick={() => setActiveView('home')}
        className={`w-full p-8 flex items-center gap-3 border-b text-left transition-all group ${
          currentTheme === 'onyx' ? 'border-white/5 hover:bg-white/5' : 'border-emerald-50 hover:bg-emerald-50/50'
        }`}
      >
        <div className="w-10 h-10 accent-bg rounded-xl flex items-center justify-center shadow-lg text-white shrink-0 group-hover:scale-110 transition-transform">
          <Fingerprint size={22} />
        </div>
        <div>
           <h1 className={`text-lg font-black tracking-tighter leading-none font-quantum ${currentTheme === 'onyx' ? 'text-white' : 'text-zinc-900'}`}>VeritrustX</h1>
           <p className="text-[10px] font-black accent-text uppercase tracking-widest mt-1 italic">Identity Firewall</p>
        </div>
      </button>

      {/* 🔍 SEARCH TOOL */}
      <div className={`px-4 py-4 border-b ${currentTheme === 'onyx' ? 'border-white/5' : 'border-emerald-50'}`}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:accent-text transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search Protocol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-9 pr-3 py-2 border rounded-lg text-xs outline-none transition-all font-medium ${currentTheme === 'onyx' ? 'bg-white/5 border-white/5 text-white' : 'bg-zinc-50 border-zinc-100 text-zinc-600 focus:bg-white'}`}
          />
        </div>
      </div>

      {/* 🧭 NAVIGATION MESH (CATEGORIZED) */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        {['Founder', 'Core', 'Scanning', 'Business', 'System'].map(category => {
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
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                      activeView === item.id 
                      ? `accent-bg text-white font-bold shadow-lg scale-[1.02]`
                      : currentTheme === 'onyx' 
                        ? 'text-zinc-500 hover:bg-white/5 hover:text-white' 
                        : 'text-zinc-500 hover:bg-emerald-50 hover:text-emerald-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} className={activeView === item.id ? 'text-white' : 'opacity-70'} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className={`text-[8px] px-1.5 py-0.5 rounded font-black whitespace-nowrap ${
                        item.badge === 'FOUNDER' ? 'bg-amber-500 text-white shadow-sm' :
                        item.badge === 'LIVE' ? 'bg-rose-600 text-white' : 
                        item.badge === 'DNA' ? 'bg-orange-600 text-white' :
                        item.badge === 'GROWTH' ? 'bg-amber-500 text-white' :
                        'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      }`}>{item.badge}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </nav>

      {/* 🌈 NEURAL SPECTRUM & COPYRIGHT */}
      <div className={`p-4 border-t ${currentTheme === 'onyx' ? 'border-white/5 bg-black/30' : 'border-emerald-50 bg-zinc-50/50'}`}>
        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3 text-center">Neural Spectrum</p>
        <div className={`flex p-1 rounded-xl gap-1 mb-4 ${currentTheme === 'onyx' ? 'bg-zinc-900' : 'bg-white border border-zinc-200'}`}>
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

        <div className="mt-6 px-2 space-y-2">
           <div className="flex items-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[8px] font-black text-zinc-900 uppercase tracking-widest">Protocol Secured</span>
           </div>
           <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
              © 2026 VeriTrustX Protocol. <br /> 
              Global Integrity Standard. <br /> 
              All Rights Reserved.
           </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;