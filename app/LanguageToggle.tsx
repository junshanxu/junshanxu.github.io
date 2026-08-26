'use client';

import { setResumeLanguage, useResumeLanguage } from './language';

export default function LanguageToggle() {
  const language = useResumeLanguage();

  return (
    <div
      className="inline-flex h-10 items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 text-xs font-semibold shadow-sm dark:border-neutral-700 dark:bg-[#141413]"
      role="group"
      aria-label={language === 'en' ? 'Switch resume language' : '切换简历语言'}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-4 w-4 text-slate-500 dark:text-slate-400" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.2 2.45 3.3 5.45 3.3 9S14.2 18.55 12 21c-2.2-2.45-3.3-5.45-3.3-9S9.8 5.45 12 3Z" />
      </svg>
      {(['en', 'zh'] as const).map((option) => {
        const active = language === option;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setResumeLanguage(option)}
            className={`h-8 rounded-lg px-2.5 transition-colors ${
              active
                ? 'bg-slate-100 text-blue-600 dark:bg-neutral-800 dark:text-blue-300'
                : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
            aria-pressed={active}
            title={option === 'en' ? 'English' : '简体中文'}
          >
            {option === 'en' ? 'EN' : '简'}
          </button>
        );
      })}
    </div>
  );
}
