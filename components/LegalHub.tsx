
import React, { useState } from 'react';
import { 
  Scale, ShieldCheck, Lock, FileText, 
  AlertCircle, ChevronRight, Download, 
  ExternalLink, CheckCircle2, Gavel, 
  ShieldAlert, BookOpen, Info, ShieldPlus, AlertTriangle,
  Coins
} from 'lucide-react';

export default function LegalHub() {
  const [activeTab, setActiveTab] = useState<'tos' | 'privacy' | 'compliance'>('tos');

  const tosSections = [
    {
      title: "1. Neural Liability Waiver",
      content: "VeritrustX utilizes advanced neural reasoning models to generate forensic insights. While our accuracy rate is approximately 98.4%, all 'Verdicts' provided by the system are advisory. Clients agree that final hiring decisions remain a human responsibility. VeritrustX is not liable for indirect damages resulting from AI-generated logical inferences."
    },
    {
      title: "2. Forensic Consent Requirements",
      content: "Clients must ensure that they have obtained explicit, written consent from candidates before initiating a 'Forensic DNA Audit' or 'Proxy Guard' surveillance. You represent and warrant that your use of the platform complies with all local employment and privacy laws."
    },
    {
      title: "3. Brand Protection & Intellectual Property",
      content: "The name 'VeritrustX', its logo, and proprietary forensic protocols are protected intellectual property. Any unauthorized use of our brand name for commercial gain, impersonation, or deceptive practices will result in: (a) Immediate and permanent revocation of system access, (b) Administrative fines starting at ₹10,00,000 per violation, (c) Legal injunctions and pursuit of maximum statutory damages, and (d) Public disclosure of the infringing entity as a 'High-Risk Actor' within our global trust mesh."
    },
    {
      title: "4. Service Level Agreement (SLA)",
      content: "We guarantee 99.9% uptime for the Neural Core. 'Zero-Lag' audits are defined as processing times under 240 seconds for standard document bundles. High-density forensic scans may require additional processing cycles depending on grid load."
    }
  ];

  const privacySections = [
    {
      title: "Data Sovereignty",
      content: "All candidate PII (Personally Identifiable Information) is encrypted at rest using AES-256 and in transit via TLS 1.3. We do not sell candidate data. Documents uploaded to the Forensic Lab are purged from memory caches within 7 days of audit completion unless explicitly archived in the BGV Vault."
    },
    {
      title: "GDPR & DPDP Compliance",
      content: "We adhere to the 'Right to be Forgotten.' Candidates can request permanent deletion of their Trust Fingerprint via the public Proof Portal at any time."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full mb-4">
             <Scale size={14} className="text-slate-500" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compliance & Sovereignty</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight">
            Legal <span className="text-indigo-600">Infrastructure</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed mt-2">
            The foundation of trust: Detailed Terms, Privacy Protocols, and Regulatory Frameworks.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        
        {/* Sidebar Tabs */}
        <div className="xl:col-span-1 space-y-4">
           <button 
             onClick={() => setActiveTab('tos')}
             className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
               activeTab === 'tos' ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-900/20' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900'
             }`}
           >
              <div className="flex items-center gap-3">
                 <Gavel size={20} />
                 <span className="text-sm font-black uppercase tracking-widest">Terms of Service</span>
              </div>
              <ChevronRight size={16} className={activeTab === 'tos' ? 'opacity-100' : 'opacity-20'} />
           </button>

           <button 
             onClick={() => setActiveTab('privacy')}
             className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
               activeTab === 'privacy' ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-900/20' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900'
             }`}
           >
              <div className="flex items-center gap-3">
                 <Lock size={20} />
                 <span className="text-sm font-black uppercase tracking-widest">Privacy Policy</span>
              </div>
              <ChevronRight size={16} className={activeTab === 'privacy' ? 'opacity-100' : 'opacity-20'} />
           </button>

           <button 
             onClick={() => setActiveTab('compliance')}
             className={`w-full flex items-center justify-between p-6 rounded-[2rem] border transition-all ${
               activeTab === 'compliance' ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-900/20' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900'
             }`}
           >
              <div className="flex items-center gap-3">
                 <ShieldCheck size={20} />
                 <span className="text-sm font-black uppercase tracking-widest">Compliance Registry</span>
              </div>
              <ChevronRight size={16} className={activeTab === 'compliance' ? 'opacity-100' : 'opacity-20'} />
           </button>

           <div className="p-8 bg-red-50 border border-red-100 rounded-[2.5rem] mt-10 space-y-4">
              <h4 className="text-[10px] font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
                 <ShieldPlus size={14} /> Brand Safeguard
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                Unauthorized use of "VeritrustX" triggers an automated intellectual property enforcement protocol.
              </p>
              <div className="pt-4 border-t border-red-200 flex items-center gap-3">
                 <Coins size={16} className="text-red-600" />
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fine Schedule</p>
                    <p className="text-xs font-black text-red-600">₹10L+ Minimum</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Content Area */}
        <div className="xl:col-span-3 space-y-8">
           <div className="bg-white border border-slate-100 rounded-[3rem] p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 blur-[120px] pointer-events-none opacity-50"></div>
              
              {activeTab === 'tos' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                         <Gavel className="text-indigo-600" /> Protocol Terms of Service
                      </h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-all">
                         <Download size={14} /> PDF Contract
                      </button>
                   </div>
                   
                   {tosSections.map((section, idx) => (
                     <div key={idx} className={`space-y-4 p-6 rounded-2xl transition-all ${section.title.includes('Brand') ? 'bg-red-50/50 border border-red-100' : 'bg-slate-50/50 border border-slate-100'}`}>
                        <div className="flex items-center gap-3">
                           <h4 className="text-lg font-black text-slate-900">{section.title}</h4>
                           {section.title.includes('Brand') && <AlertTriangle size={16} className="text-red-500" />}
                        </div>
                        <p className="text-slate-600 text-sm leading-relaxed font-medium">
                          {section.content}
                        </p>
                     </div>
                   ))}

                   <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex items-center gap-6">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 border border-emerald-200 shadow-sm">
                         <CheckCircle2 size={24} />
                      </div>
                      <div>
                         <p className="text-sm font-black text-slate-900">Acceptance Logged</p>
                         <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mt-1">Agreement Fingerprint: #TX-9021-LA</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                         <Lock className="text-indigo-600" /> Data Privacy Protocol
                      </h3>
                      <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-indigo-600 transition-all">
                         <BookOpen size={14} /> Privacy Summary
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {privacySections.map((section, idx) => (
                        <div key={idx} className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-4">
                           <h4 className="text-md font-black text-indigo-600 uppercase tracking-widest">{section.title}</h4>
                           <p className="text-sm text-slate-600 leading-relaxed font-medium">{section.content}</p>
                        </div>
                      ))}
                   </div>

                   <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] text-center space-y-4">
                      <ShieldAlert className="mx-auto text-indigo-600" size={32} />
                      <h4 className="text-xl font-black text-slate-900">Zero-Knowledge Vetting</h4>
                      <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed font-medium">
                        We aim to facilitate trust without exposing raw PII. Our system generates "Trust Indicators" while keeping original documents isolated in secure forensic cells.
                      </p>
                   </div>
                </div>
              )}

              {activeTab === 'compliance' && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-8">
                      <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                         <ShieldCheck className="text-indigo-600" /> Compliance Registry
                      </h3>
                   </div>

                   <div className="space-y-4">
                      <ComplianceRow label="GDPR Right-to-Erasure" status="ACTIVE" date="2024-05-20" />
                      <ComplianceRow label="SOC2 Type II Logic Audit" status="CERTIFIED" date="2024-05-15" />
                      <ComplianceRow label="DPDP 2023 Compliance" status="ACTIVE" date="2024-05-10" />
                      <ComplianceRow label="ISO 27001 Data Encryption" status="ACTIVE" date="2024-05-01" />
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}

function ComplianceRow({ label, status, date }: { label: string, status: string, date: string }) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-md transition-all">
       <div className="flex items-center gap-4">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg">
             <FileText size={18} className="text-indigo-600" />
          </div>
          <div>
             <p className="text-sm font-black text-slate-900">{label}</p>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">Verified on {date}</p>
          </div>
       </div>
       <span className="text-[9px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg uppercase tracking-widest">{status}</span>
    </div>
  );
}
