import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2, UserCheck, ShieldCheck } from 'lucide-react';

const ContactUs: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-black text-zinc-900 tracking-tight font-quantum">Connect with <span className="accent-text">VeritrustX</span></h2>
        <p className="text-zinc-500 font-medium max-w-xl mx-auto italic text-lg">"Deploying truth to your organization starts with a conversation."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border-2 border-zinc-100 rounded-[3.5rem] p-12 shadow-sm">
          {!submitted ? (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Client Name</label>
                  <input required type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:accent-border transition-all" placeholder="Nexus Corp" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Institutional Email</label>
                  <input required type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:accent-border transition-all" placeholder="admin@nexus.io" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-1">Directive / Inquiry</label>
                <textarea required rows={4} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:accent-border transition-all resize-none" placeholder="We need to onboard 500 engineering candidates..."></textarea>
              </div>
              <button type="submit" className="w-full py-5 accent-bg text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-xl shadow-emerald-900/10">
                Submit Inquiry to Forensic Desk <Send size={18} />
              </button>
            </form>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-10">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border-2 border-emerald-100 animate-bounce">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-zinc-900">Uplink Successful</h3>
              <p className="text-zinc-500 font-medium max-w-xs">A VeritrustX auditor will contact your organization within 2 business hours.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 text-white p-10 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl"></div>
            <h4 className="text-sm font-black uppercase tracking-widest text-emerald-500">Global Hubs</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-zinc-500 shrink-0" size={20} />
                <p className="text-sm font-medium">Cyber Gateway 01,<br />Bengaluru, KA - 560001</p>
              </div>
              <div className="flex gap-4">
                <Phone className="text-zinc-500 shrink-0" size={20} />
                <p className="text-sm font-medium">+91 (80) 4421-VX09</p>
              </div>
              <div className="flex gap-4">
                <Mail className="text-zinc-500 shrink-0" size={20} />
                <p className="text-sm font-medium">protocol@veritrustx.io</p>
              </div>
            </div>
          </div>
          <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[2.5rem] flex items-center gap-4">
            <ShieldCheck className="text-emerald-600" size={32} />
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-700">All communication is E2E encrypted via Veritrust Nodes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;