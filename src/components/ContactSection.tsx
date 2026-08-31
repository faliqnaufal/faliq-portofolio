import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Mail,
  MessageSquare,
  Linkedin,
  Instagram,
  MapPin,
  FileDown,
  Copy,
  Check,
  Send,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { PROFILE_DATA } from '../data/portfolioData';

interface ContactSectionProps {
  onOpenCVModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCVModal }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Digital Marketing & Shopee Ads',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Open WhatsApp with prefilled message in English
    const waText = encodeURIComponent(
      `Hello Faliq Naufal,\n\nName: ${formData.name}\nEmail: ${formData.email || '-'}\nTopic / Service: ${formData.service}\n\nMessage:\n${formData.message}`
    );
    window.open(`https://wa.me/6281312206619?text=${waText}`, '_blank');

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        service: 'Digital Marketing & Shopee Ads',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative bg-white border-t border-black/[0.04]">
      
      {/* Subtle background glow */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[350px] bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-left space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/20 text-xs font-semibold text-[#0071e3]">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Communication</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1d1d1f] tracking-tight">
            Let&apos;s Connect &amp; Build Something Meaningful
          </h2>
          <p className="text-sm sm:text-base text-[#6e6e73] max-w-xl">
            Whether you are seeking digital marketing management, brand strategy consultation, speaker engagements, or full-time strategic career roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-left">
          
          {/* Left: Contact Info Cards & Direct Channels (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp Card */}
            <div className="p-5 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:shadow-sm transition">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">WhatsApp Direct</div>
                  <div className="text-sm font-bold text-[#1d1d1f]">{PROFILE_DATA.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(PROFILE_DATA.phone.replace(/[^0-9]/g, ''), 'phone')}
                  className="p-2 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.04] text-[#6e6e73] hover:text-[#1d1d1f] transition cursor-pointer shadow-2xs"
                  title="Copy Phone Number"
                  aria-label="Copy phone number"
                >
                  {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={PROFILE_DATA.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs"
                  title="Open WhatsApp Chat"
                  aria-label="Open WhatsApp chat"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:shadow-sm transition">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-blue-100 flex items-center justify-center text-[#0071e3]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Direct Email</div>
                  <div className="text-sm font-bold text-[#1d1d1f] truncate max-w-[180px] sm:max-w-none">{PROFILE_DATA.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopy(PROFILE_DATA.email, 'email')}
                  className="p-2 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.04] text-[#6e6e73] hover:text-[#1d1d1f] transition cursor-pointer shadow-2xs"
                  title="Copy Email"
                  aria-label="Copy email address"
                >
                  {copiedField === 'email' ? <Check className="w-4 h-4 text-[#0071e3]" /> : <Copy className="w-4 h-4" />}
                </button>
                <a
                  href={`mailto:${PROFILE_DATA.email}`}
                  className="p-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white transition shadow-xs"
                  title="Send Direct Email"
                  aria-label="Send email"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="p-5 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:shadow-sm transition">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">Instagram Profile</div>
                  <div className="text-sm font-bold text-[#1d1d1f]">{PROFILE_DATA.instagramHandle}</div>
                </div>
              </div>

              <a
                href={PROFILE_DATA.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.04] text-pink-600 transition shadow-2xs"
                title="Open Instagram"
                aria-label="Open Instagram profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex items-center justify-between shadow-2xs hover:shadow-sm transition">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">LinkedIn Network</div>
                  <div className="text-sm font-bold text-[#1d1d1f]">linkedin.com/in/faliqnaufal</div>
                </div>
              </div>

              <a
                href={PROFILE_DATA.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-white border border-black/[0.06] hover:bg-black/[0.04] text-[#1d1d1f] transition shadow-2xs"
                title="Open LinkedIn"
                aria-label="Open LinkedIn profile"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Location & Ready status */}
            <div className="p-5 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <div className="font-bold text-[#1d1d1f]">{PROFILE_DATA.location}</div>
                <div className="text-[#6e6e73]">Open to Relocation &amp; Worldwide Remote Collaboration</div>
              </div>
            </div>

            {/* Download Resume / CV CTA */}
            <button
              id="contact-download-cv-btn"
              onClick={onOpenCVModal}
              className="w-full p-4 rounded-2xl bg-[#1d1d1f] hover:bg-black text-sm font-bold text-white flex items-center justify-center gap-2 transition cursor-pointer shadow-sm active:scale-98"
            >
              <FileDown className="w-4 h-4 text-white" />
              <span>Preview &amp; Download Resume / CV (PDF)</span>
            </button>

          </div>

          {/* Right: Interactive Message Dispatcher Form (Col 7) */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#f5f5f7] border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#1d1d1f] tracking-tight flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0071e3]" />
                  <span>Send a Direct Inquiry</span>
                </h3>
                <p className="text-xs text-[#6e6e73]">
                  Your message will be formatted and routed directly to WhatsApp for rapid response.
                </p>
              </div>

              {/* Name & Email inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f]">
                    Full Name <span className="text-[#0071e3]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe / Company Name"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-gray-400 text-xs focus:outline-none focus:border-[#0071e3] transition shadow-2xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-[#1d1d1f]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-gray-400 text-xs focus:outline-none focus:border-[#0071e3] transition shadow-2xs"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f]">
                  Topic / Engagement Type
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] text-xs focus:outline-none focus:border-[#0071e3] transition cursor-pointer shadow-2xs"
                >
                  <option value="Digital Marketing & Shopee Ads">Digital Marketing &amp; Shopee Ads Strategy</option>
                  <option value="Social Media & Viral Content">Social Media Management &amp; Viral Content</option>
                  <option value="Brand Identity & Editorial Layout">Brand Identity &amp; Editorial Book Layout</option>
                  <option value="Speaker / Workshop Session">Speaker / Workshop Session</option>
                  <option value="Full-Time / Career Opportunity">Career / Full-Time Employment Opportunity</option>
                  <option value="Other Consulting & Collaboration">Other Consulting &amp; Collaboration</option>
                </select>
              </div>

              {/* Message text area */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#1d1d1f]">
                  Message / Project Details <span className="text-[#0071e3]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your objectives, timeline, or collaboration scope..."
                  className="w-full px-4 py-3 rounded-xl bg-white border border-black/[0.08] text-[#1d1d1f] placeholder-gray-400 text-xs focus:outline-none focus:border-[#0071e3] transition resize-none shadow-2xs"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition hover:scale-[1.01] active:scale-[0.99] shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via WhatsApp</span>
              </button>

              {isSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs text-center font-medium">
                  Message formatted and opened in WhatsApp! Looking forward to connecting.
                </div>
              )}

            </form>

          </div>

        </div>

      </div>

    </section>
  );
};
