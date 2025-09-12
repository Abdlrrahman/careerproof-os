'use client';

import React, { useState } from 'react';
import { db } from '@/lib/db/data-store';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AskPortfolioModal } from '@/components/ai/AskPortfolioModal';
import { Locale } from '@/types';
import { 
  Mail, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '@/components/icons/SocialIcons';

export default function ArabicContactPage() {
  const locale: Locale = 'ar';
  const profile = db.getProfile();
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);

  const [recruiterName, setRecruiterName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [roleTitle, setRoleTitle] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans">
      <Navbar locale={locale} onOpenAskAi={() => setIsAskAiOpen(true)} />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-cyan-400">
            قنوات التواصل المباشر وجدولة المقابلات
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            جدولة مقابلة / التواصل المباشر
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            متاح للفرص القيادية والهندسية المتقدمة عن بُعد. حجز فوري للمقابلات مع مرونة تامة في التوافق الزمني.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                قنوات الجدولة والتواصل
              </h2>

              <div className="space-y-3 pt-2">
                <a
                  href={profile.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-between shadow-md btn-tactile"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5" />
                    <div className="text-right">
                      <div className="font-bold">حجز مكالمة تعارف تقنية (30 دقيقة)</div>
                      <div className="text-[11px] text-blue-100 font-normal">جدولة فورية عبر Calendly</div>
                    </div>
                  </div>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-md">حجز فوري</span>
                </a>

                <a
                  href="https://linkedin.com/in/abdlrrahman-shibani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs flex items-center gap-3 transition-colors"
                >
                  <LinkedinIcon className="w-5 h-5 text-blue-600" />
                  <div className="text-right">
                    <div className="font-bold">التواصل عبر LinkedIn</div>
                    <div className="text-[11px] text-slate-400">linkedin.com/in/abdlrrahman-shibani</div>
                  </div>
                </a>

                <a
                  href="https://github.com/abdlrrahman-shibani"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs flex items-center gap-3 transition-colors"
                >
                  <GithubIcon className="w-5 h-5 text-slate-800 dark:text-slate-200" />
                  <div className="text-right">
                    <div className="font-bold">معاينة الشيفرات على GitHub</div>
                    <div className="text-[11px] text-slate-400">github.com/abdlrrahman-shibani</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>متوسط زمن الرد على استفسارات التوظيف: أقل من 12 ساعة</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              إرسال استفسار توظيف مباشر
            </h2>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  تم إرسال الرسالة بنجاح
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  شكراً لك {recruiterName}، سيتم الرد عليك في أقرب وقت.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">الاسم *</label>
                    <input
                      type="text"
                      required
                      value={recruiterName}
                      onChange={(e) => setRecruiterName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">الشركة / المنظمة *</label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">البريد الإلكتروني للعمل *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">المسمى الوظيفي المستهدف</label>
                    <input
                      type="text"
                      value={roleTitle}
                      onChange={(e) => setRoleTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">تفاصيل الفرصة أو الرسالة</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm btn-tactile"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال الاستفسار</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer locale={locale} />
      <AskPortfolioModal isOpen={isAskAiOpen} onClose={() => setIsAskAiOpen(false)} locale={locale} />
    </div>
  );
}
