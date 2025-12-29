import React from 'react';
import { 
  FileText, Download, Printer, CheckCircle2, 
  Key, Users, ShieldCheck, Mail, Globe, 
  ChevronRight, ArrowRight, Zap
} from 'lucide-react';

const LicenseGuide: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tight mb-2">License <span className="text-indigo-500">Protocol</span></h2>
          <p className="text-slate-400 font-medium italic">Standard Operating Procedure (SOP) for license distribution.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="px-8 py-4 bg-white text-slate-950 font-black rounded-2xl flex items-center gap-3 hover:bg-indigo-600 hover:text-white transition-all shadow-2xl"
        >
          <Printer size={18} /> Generate PDF Guide
        </button>
      </div>

      {/* Printable Document Container */}
      <div className="bg-white text-slate-900 p-12 md:p-20 rounded-[3rem] shadow-2xl space-y-12 max-w-4xl mx-auto print:rounded-none print:shadow-none print:p-0">
        
        {/* Document Header */}
        <div className="flex justify-between items-start border-b-4 border-slate-900 pb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase font-quantum">VeritrustX</h1>
            <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500">License Deployment SOP v1.0</p>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-black uppercase text-slate-500">Reference No.</p>
             <p className="text-sm font-mono font-bold">VX-LEG-2024-001</p>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="space-y-6">
           <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <Zap size={20} className="text-indigo-600" /> Executive Summary
           </h3>
           <p className="text-sm leading-relaxed text-slate-600 font-medium">
             This protocol outlines the mandatory steps for initializing and sharing professional licenses with third-party clients. VeritrustX utilizes a "Signed Mesh" system to ensure that every license is cryptographically tied to the client's identity and fiscal footprint.
           </p>
        </div>

        {/* The 5-Step Logic */}
        <div className="space-y-10">
           <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
              <FileText size={20} className="text-indigo-600" /> Distribution Steps
           </h3>
           
           <div className="space-y-8">
              <Step 
                num="01" 
                title="Initialize Fiscal Anchor" 
                desc="Navigate to the 'Licensing Hub'. Select the appropriate tier (Subscription vs Whitelabel). This creates the revenue record in the global ledger."
              />
              <Step 
                num="02" 
                title="Generate Unique Token" 
                desc="Generate the License UID. This token is unique to the client organization and is used to decrypt their specific 'Truth Findings'."
              />
              <Step 
                num="03" 
                title="Configure Node Access" 
                desc="Define which modules the client has access to (e.g., Forensic Lab, Proxy Guard, or Global Pulse). Permissions are baked into the token."
              />
              <Step 
                num="04" 
                title="Secure Dispatch" 
                desc="Utilize the 'Broadcast Mesh' to send an encrypted activation link. Do NOT share raw keys via plain-text email."
              />
              <Step 
                num="05" 
                title="Onboarding & Handshake" 
                desc="Client activates the link and performs the 'Trust Handshake' (onboarding documentation). The license status moves from 'Pending' to 'Active'."
              />
           </div>
        </div>

        {/* Footer/Sign-off */}
        <div className="pt-12 border-t border-slate-200 mt-20 flex justify-between items-end">
           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-slate-400">Authorized By</p>
              <div className="w-48 h-12 bg-slate-50 border-b-2 border-slate-900"></div>
              <p className="text-xs font-bold">Chief Revenue Officer</p>
           </div>
           <div className="text-right space-y-1">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Digital Signature</p>
              <div className="w-32 h-32 bg-slate-900 flex items-center justify-center p-4">
                 <ShieldCheck size={48} className="text-white" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const Step = ({ num, title, desc }: any) => (
  <div className="flex gap-8 group">
    <div className="text-3xl font-black text-slate-200 group-hover:text-indigo-600 transition-colors shrink-0">{num}</div>
    <div className="space-y-2">
       <h4 className="text-md font-black uppercase tracking-tight">{title}</h4>
       <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default LicenseGuide;