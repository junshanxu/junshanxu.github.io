'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import FeishuContact from './FeishuContact';
import GitHubCloneCount from './GitHubCloneCount';
import LanguageToggle from './LanguageToggle';
import OpenSourceProjects from './OpenSourceProjects';
import RepositoryActivity from './RepositoryActivity';
import ScrollProgress from './ScrollProgress';
import WeChatContact from './WeChatContact';
import { fetchRepo } from '@/lib/github';
import { useResumeLanguage } from './language';
import { PERSON_SCHEMA, SITE_LAST_UPDATED } from './site';
import VisitorBadge from './VisitorBadge';

type IconProps = { className?: string };

type TechItem = {
  name: string;
  icon: string;
  invertDark?: boolean;
};

type TechGroup = {
  title: string;
  items: TechItem[];
  featured?: boolean;
};

const INLINE_TECH: Record<string, TechItem> = {
  LangGraph: { name: 'LangGraph', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
  Node: { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  PostgreSQL: { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  SQLite: { name: 'sqlite-vec', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
  Go: { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
  Python: { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  RAGAS: { name: 'RAGAS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
  React: { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  Vue: { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  Express: { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
  Render: { name: 'Render', icon: '/tech/render.svg' },
  Supabase: { name: 'Supabase', icon: '/tech/supabase.svg' },
  Cloudflare: { name: 'Cloudflare', icon: '/tech/cloudflare.svg' },
  OKX: { name: 'OKX', icon: '/tech/okx.svg', invertDark: true },
  Spring: { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  Feishu: { name: 'Feishu', icon: '/feishu-icon.png' },
  WeChat: { name: 'WeChat Mini Program', icon: 'https://cdn.simpleicons.org/wechat/07C160' },
  CloudBase: { name: 'Tencent CloudBase', icon: '/tech/cloudbase.svg' },
  ByteDance: { name: 'ByteDance', icon: 'https://cdn.simpleicons.org/bytedance/3C8CFF' },
  OceanBase: { name: 'OceanBase', icon: '/oceanbase-icon.png' },
  MySQL: { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  Redis: { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  RabbitMQ: { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg' },
  Vercel: { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invertDark: true },
  GitHub: { name: 'GitHub', icon: 'https://cdn.simpleicons.org/github/181717', invertDark: true },
  Linux: { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
  Nginx: { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg' },
};

const HDU_REPOSITORY = 'yuaiccc/HDU-xiaoyuananquantong';
const HDU_CACHED_STAR_COUNT = 32;

const useGitHubStarCount = (repository: string) => {
  const [starCount, setStarCount] = useState<number | null>(HDU_CACHED_STAR_COUNT);

  useEffect(() => {
    const controller = new AbortController();

    fetchRepo(repository, controller.signal).then((data) => {
      if (data?.stargazers_count) {
        setStarCount(data.stargazers_count);
      }
    });

    return () => controller.abort();
  }, [repository]);

  return starCount;
};

const TECH_GROUPS: TechGroup[] = [
  {
    title: 'Core Languages',
    featured: true,
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    ],
  },
  {
    title: 'AI & CS',
    items: [
      { name: 'Hugging Face', icon: '/tech/huggingface.svg' },
      { name: 'LangChain / LangGraph', icon: 'https://cdn.simpleicons.org/langchain/1C3C3C', invertDark: true },
      { name: 'Claude Code', icon: '/tech/claude.svg' },
      { name: 'OpenAI Codex', icon: '/tech/openai.svg', invertDark: true },
      { name: 'Dify', icon: 'https://cdn.simpleicons.org/dify/000000', invertDark: true },
    ],
  },
  {
    title: 'Engineering',
    items: [
      { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg', invertDark: true },
      { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
      { name: '微信小程序', icon: 'https://7463-tcb-advanced-a656fc-1257967285.tcb.qcloud.la/assets/wechat-devtools-logo.png?v=2' },
    ],
  },
  {
    title: 'Backend & Data',
    items: [
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invertDark: true },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
      { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rabbitmq/rabbitmq-original.svg' },
    ],
  },
  {
    title: 'DevOps & Tools',
    items: [
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg', invertDark: true },
    ],
  },
];

const TechBadge = ({ name, icon, invertDark }: TechItem) => (
  <li className="group/list-item">
    <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 transition-colors duration-200 hover:border-blue-200 hover:bg-slate-50 dark:border-neutral-700 dark:bg-[#1b1b1a] dark:hover:border-blue-800 dark:hover:bg-[#242423]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={icon}
        alt={name}
        width={20}
        height={20}
        loading="lazy"
        decoding="async"
        className={`h-5 w-5 ${invertDark ? 'dark:invert' : ''}`}
      />
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{name}</span>
    </span>
  </li>
);

const InlineTech = ({ tech, label }: { tech: keyof typeof INLINE_TECH; label?: string }) => {
  const item = INLINE_TECH[tech];
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap font-semibold text-slate-900 dark:text-slate-200">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.icon}
        alt=""
        width={14}
        height={14}
        loading="lazy"
        decoding="async"
        className={`inline-block h-3.5 w-3.5 object-contain ${item.invertDark ? 'dark:invert' : ''}`}
        aria-hidden="true"
      />
      <span>{label || item.name}</span>
    </span>
  );
};

const MailIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
    <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.5" />
    <path d="M4 7.5L12 13.25L20 7.5" />
  </svg>
);

const GithubIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.6 2 12.26c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1.01.08 1.55 1.07 1.55 1.07.9 1.6 2.36 1.13 2.93.86.09-.67.35-1.13.64-1.39-2.22-.26-4.56-1.15-4.56-5.13 0-1.13.39-2.06 1.03-2.78-.11-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.06A9.2 9.2 0 0 1 12 7.25c.83 0 1.67.12 2.45.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.42.22 2.47.11 2.73.64.72 1.03 1.65 1.03 2.78 0 3.99-2.34 4.86-4.57 5.12.36.32.69.95.69 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.6.69.49A10.28 10.28 0 0 0 22 12.26C22 6.6 17.52 2 12 2Z" />
  </svg>
);

const ModelScopeIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  // ModelScope's favicon is served by its official domain/CDN.
  // eslint-disable-next-line @next/next/no-img-element
  <img src="https://modelscope.cn/favicon.ico" alt="" className={`${className} object-contain`} aria-hidden="true" />
);

const StarIcon = ({ className = 'h-3.5 w-3.5' }: IconProps) => (
  <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden="true">
    <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.194a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.77-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.528-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.097-.45a.75.75 0 0 1-.564-.41L8 2.694Z" />
  </svg>
);

const ProjectIcon = ({ className = 'h-4 w-4' }: IconProps) => (
  <svg className={`${className} flex-shrink-0 text-gray-500`} fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
    />
  </svg>
);

const XIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

const LanguageSummary = ({ language }: { language: 'en' | 'zh' }) => {
  const zh = language === 'zh';
  return (
  <div className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">
    <span>{zh ? '工作语言：中文（母语）、英语（日常交流、技术交流）、日语（基础交流）' : 'Working languages: Mandarin (native), English (daily and technical communication), Japanese (basic communication)'}</span>
  </div>
  );
};

const EducationSection = ({ zh }: { zh: boolean }) => (
  <section className="animate-fade-in-up delay-400">
    <h2 className="mb-4 border-l-[3px] border-blue-500 pl-3 text-xl font-bold text-slate-800 dark:text-slate-100">{zh ? '教育经历' : 'Education'}</h2>
    <div className="divide-y divide-slate-200 dark:divide-slate-700">
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-4 shadow-sm dark:border-neutral-800 dark:bg-[#141413] sm:px-5">
        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-12 w-12 shrink-0 items-center overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/ncwu-logo.png" alt="NCWU logo" className="h-12 max-w-none w-auto" />
            </span>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-slate-100">
              {zh ? '华北水利水电大学' : 'North China University of Water Resources and Electric Power'}
              <span className="mt-0.5 block text-xs font-medium text-slate-500 sm:text-sm dark:text-slate-400">{zh ? 'North China University of Water Resources and Electric Power（NCWU）' : '华北水利水电大学（NCWU）'}</span>
            </h3>
          </div>
        </div>
        <div className="mb-2 flex flex-wrap items-center gap-2 text-gray-700 dark:text-gray-300">
          <span>{zh ? '2022-2026 人工智能 工学学士' : '2022–2026 B.Eng. in Artificial Intelligence'} / <span className="font-medium text-blue-500">{zh ? '专业前 30%' : 'Top 30% in major'}</span></span>
          <span className="inline-block rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {zh ? '学业优秀奖学金' : 'Academic Excellence Scholarship'}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">{zh ? '核心课程：' : 'Core coursework:'}</span> {zh ? '深度学习、计算机操作系统、数据结构、线性代数、自然语言处理、计算机网络、软件工程' : 'Deep Learning, Computer Operating Systems, Data Structures, Linear Algebra, Natural Language Processing, Computer Networks, and Software Engineering'}
        </p>
      </div>
    </div>
  </section>
);

export default function Resume() {
  const language = useResumeLanguage();
  const zh = language === 'zh';
  const hduStarCount = useGitHubStarCount(HDU_REPOSITORY);
  const [footerExpanded, setFooterExpanded] = useState(false);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <ScrollProgress />
      <div className="min-h-screen bg-slate-50 px-3 py-4 font-sans text-gray-800 transition-colors duration-300 dark:bg-[#141413] dark:text-gray-100 sm:px-6 sm:py-8 lg:px-8">
        <div
          lang={language === 'en' ? 'en' : 'zh-CN'}
          className="resume-card relative mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-slate-200 transition-colors duration-300 dark:bg-[#141413] dark:ring-neutral-800"
        >
          {/* === 头部信息 === */}
          <header className="border-b border-slate-100 bg-white p-5 text-slate-900 transition-colors duration-300 dark:border-neutral-800 dark:bg-[#141413] dark:text-white sm:p-6 md:p-8">
            <div className="flex flex-col items-center gap-5 md:flex-row">
              <div className="flex flex-col items-center gap-5 md:flex-row">
                <div
                  className="relative aspect-[1290/1733] w-20 flex-shrink-0 select-none overflow-hidden rounded-lg shadow-sm ring-1 ring-slate-200 dark:ring-white/10 sm:w-24"
                  onContextMenu={(event) => event.preventDefault()}
                >
                  <Image
                    src="/profile.jpg"
                    alt="Xu Junshan"
                    fill
                    sizes="(max-width: 768px) 80px, 96px"
                    className="object-cover object-top"
                    priority
                    draggable={false}
                  />
                </div>
                <div className="text-center md:text-left">
                  <h1
                    title="许君山"
                    className="cursor-help text-4xl font-semibold text-slate-950 dark:text-white"
                  >
                    {zh ? '许君山' : 'Xu Junshan'}
                  </h1>
                  <LanguageSummary language={language} />
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 md:justify-start">
                    <LanguageToggle />
                    <span className="basis-full text-xs font-semibold tracking-wide text-blue-700 dark:text-blue-300 sm:basis-auto">{zh ? '如何联系我？' : 'How to reach me?'}</span>
                    <nav className="flex items-center gap-1" aria-label={zh ? '联系方式' : 'Contact links'}>
                      <a
                        href="mailto:yuaiccc@aliyun.com"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                        aria-label={zh ? '发送邮件至 yuaiccc@aliyun.com' : 'Email yuaiccc@aliyun.com'}
                        title={zh ? '发送邮件至 yuaiccc@aliyun.com' : 'Email yuaiccc@aliyun.com'}
                      >
                        <MailIcon className="h-5 w-5" />
                      </a>
                      <a
                        href="https://github.com/yuaiccc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                        aria-label={zh ? '打开我的 GitHub 主页' : 'Open my GitHub profile'}
                        title={zh ? '打开我的 GitHub 主页' : 'Open my GitHub profile'}
                      >
                        <GithubIcon className="h-5 w-5" />
                      </a>
                      <a
                        href="https://x.com/Hakikeioak"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                        aria-label={zh ? '打开我的 X 主页' : 'Open my X profile'}
                        title={zh ? '打开我的 X 主页' : 'Open my X profile'}
                      >
                        <XIcon className="h-5 w-5" />
                      </a>
                      <WeChatContact />
                      <FeishuContact />
                      <a
                        href="https://modelscope.cn/profile/yuaiccc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-neutral-900 dark:hover:text-white"
                        aria-label={zh ? '打开我的 ModelScope 主页' : 'Open my ModelScope profile'}
                        title={zh ? '打开我的 ModelScope 主页' : 'Open my ModelScope profile'}
                      >
                        <ModelScopeIcon className="h-5 w-5 text-[#1677ff]" />
                      </a>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-8 p-5 sm:p-8 md:p-10">
            <EducationSection zh={zh} />

            <section className="animate-fade-in-up delay-100">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">Pinned</h2>

              <OpenSourceProjects />
              <div className="flex flex-col">
              <div className="order-4 group mb-4 rounded-lg border border-slate-200 bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-sm dark:border-neutral-800 dark:bg-[#141413] dark:hover:border-neutral-700 sm:p-5">
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h3 className="flex min-w-0 items-center gap-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-500 dark:text-slate-100 sm:flex-1">
                    <ProjectIcon />
                    <span className="min-w-0 break-words">{zh ? '飞书叶 — 本地优先的飞书 AI Agent' : 'Feishuye — Local-First Feishu AI Agent'}</span>
                  </h3>
                  <div className="flex w-full max-w-full flex-wrap items-center gap-2 sm:ml-auto sm:w-auto sm:justify-end">
                    <a
                      href="https://github.com/yuaiccc/feishu-companion-bot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-blue-500 dark:text-slate-400 dark:hover:text-blue-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-0.5 rounded-md transition-colors"
                      aria-label={zh ? '在 GitHub 查看飞书叶' : 'View Feishuye on GitHub'}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">yuaiccc/feishu-companion-bot</span>
                    </a>
                    <RepositoryActivity repository="yuaiccc/feishu-companion-bot" zh={zh} />
                  </div>
                </div>
                <p className="text-sm text-blue-500 font-medium mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <InlineTech tech="ByteDance" label={zh ? '字节跳动-飞书' : 'Bytedance-Feishu'} />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="Go" />
                </p>
                <ul className="list-disc list-outside ml-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">智能体运行时：</span>负责设计并实现基于飞书 WebSocket 长连接和 CardKit 流式 API 的 <span className="font-semibold text-slate-900 dark:text-slate-200">Go</span> 服务；用 Redis Streams 承载飞书入站消息队列，由消费者异步处理并支持失败重试与死信，Redis 不可用时回退本地工作池；按请求复杂度分流，编排记忆、文档、GitHub、搜索和本机工具。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Agent runtime:</span> Built a <span className="font-semibold text-slate-900 dark:text-slate-200">Go</span> service over Feishu&apos;s persistent WebSocket channel and CardKit streaming API; used Redis Streams as a durable inbound message queue with consumer retries and dead-letter handling, falling back to a local worker pool when Redis is unavailable; routed requests by complexity and orchestrated memory, documents, GitHub, search, and local tools.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">分层记忆与 RAG：</span>设计并搭建短期会话、本地 JSON 长期事实、聊天与图片归档的分层记忆；接入 LightRAG 构建独立的文档图谱/向量检索链路，优化上下文预算控制与隐私脱敏。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Layered memory and RAG:</span> Separated short-term session state, local JSON long-term facts, and chat/image archives; integrated LightRAG for an independent document graph and vector-retrieval path with context-budget controls and privacy redaction.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">图片处理与可见性：</span>构建跨平台 OCR 与视觉理解链路，按环境调用 Apple Vision 或飞书 OCR，并由 Qwen3-VL 兜底图片语义理解；图片按 SHA-256 内容哈希归档，支持媒体检索与 Agent 阶段可见。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Image processing and observability:</span> Built a cross-platform OCR and vision pipeline using Apple Vision or Feishu OCR as available, with Qwen3-VL as a fallback for image understanding; archived images by SHA-256 content hash for media retrieval and visible Agent stages.</>}</li>
                </ul>
              </div>

              <div className="order-2 group mb-4 rounded-lg border border-slate-200 bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-slate-300 hover:shadow-sm dark:border-neutral-800 dark:bg-[#141413] dark:hover:border-neutral-700 sm:p-5">
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h3 className="flex min-w-0 flex-1 flex-wrap items-center gap-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-500 dark:text-slate-100">
                    <ProjectIcon />
                    <span>{zh ? 'Sparse — 日常分享小程序' : 'Sparse — Daily Sharing Mini Program'}</span>
                  </h3>
                  <div className="flex max-w-full flex-wrap items-center gap-2">
                    <a
                      href="https://github.com/yuaiccc/couple-space-miniprogram"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-200 hover:text-blue-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                      aria-label={zh ? '在 GitHub 查看 Sparse' : 'View Sparse on GitHub'}
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">yuaiccc/couple-space-miniprogram</span>
                    </a>
                    <Image
                      src="/sparse-qr.jpg"
                      alt={zh ? 'Sparse 微信小程序二维码' : 'Sparse WeChat mini-program QR code'}
                      width={72}
                      height={72}
                      className="h-14 w-14 rounded-full border border-slate-200 bg-white p-1 dark:border-slate-600"
                    />
                    <RepositoryActivity repository="yuaiccc/couple-space-miniprogram" zh={zh} />
                  </div>
                </div>
                <p className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-blue-500">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  <InlineTech tech="WeChat" label={zh ? '微信小程序' : 'WeChat Mini Program'} />
                  <span aria-hidden="true">+</span>
                  <InlineTech tech="CloudBase" label={zh ? '腾讯云 CloudBase' : 'Tencent CloudBase'} />
                </p>
                <ul className="ml-5 list-disc list-outside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">云函数架构：</span>围绕 CloudBase 云函数设计 action 路由与服务边界，单个入口承载 <span className="font-bold text-blue-600 dark:text-blue-400">67 个业务动作</span>，读写 <span className="font-bold text-blue-600 dark:text-blue-400">14 个文档型集合</span>，覆盖 15 个页面与功能模块。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Cloud function architecture:</span> Designed the CloudBase function boundary and action router; one entry point handles <span className="font-bold text-blue-600 dark:text-blue-400">67 business actions</span> across <span className="font-bold text-blue-600 dark:text-blue-400">14 document collections</span>, covering 15 pages and feature modules.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">并发控制：</span>用 OPENID 在云函数侧重建成员身份与角色；以 <code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">spaceVersion</code> 乐观锁保护空间配置，用事务与条件更新处理宠物经验、清单状态等读改写，降低 lost update 风险。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Concurrency control:</span> Reconstructed member identity and roles from OPENID in the cloud function; used <code className="rounded bg-slate-100 px-1 text-xs dark:bg-slate-800">spaceVersion</code> optimistic locking plus transactions and conditional updates for read-modify-write paths such as pet XP and todo state.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">查询与冷启动：</span>拆分首页聚合查询和 30 秒轮询接口；按地点集合复用 30 分钟天气缓存、按 fileID 复用约 90 分钟临时 URL 缓存，并将 264KB 地理数据与二维码库移出冷启动路径。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Query path &amp; cold start:</span> Split the home aggregator from the 30-second polling path; reused 30-minute weather caches by location set and ~90-minute temp-URL caches by fileID, and moved 264KB of geo data plus the QR library off the cold-start path.</>}</li>
                  <li>{zh ? <><span className="font-bold text-slate-800 dark:text-slate-100">安全边界：</span>邀请码采用短时 TTL 与唯一性校验，按 OPENID/IP 做进程级限流；小程序直连 CloudBase 云函数，不开放 HTTP 网关，并在写入文本和图片前执行服务端内容安全检查。</> : <><span className="font-bold text-slate-800 dark:text-slate-100">Security boundaries:</span> Added short-lived invite TTLs, uniqueness checks, and per-OPENID/IP process-level rate limits; kept the Mini Program on direct CloudBase function calls without an HTTP gateway, with server-side content checks before persisting text and images.</>}</li>
                </ul>
              </div>

              <div className="order-3 group mb-4 rounded-lg border border-slate-200 bg-white p-4 transition-[border-color,box-shadow] duration-200 hover:border-neutral-700 hover:shadow-sm dark:border-neutral-800 dark:bg-[#141413] dark:hover:border-neutral-700 sm:p-5">
                <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <h3 className="flex min-w-0 flex-1 items-center gap-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-500 dark:text-slate-100">
                    <ProjectIcon />
                    <span className="min-w-0 break-words">{zh ? '网页答题自动化脚本' : 'Browser Answer Automation Script'}</span>
                  </h3>
                  <div className="flex max-w-full flex-wrap items-center gap-2">
                    <a
                      href={`https://github.com/${HDU_REPOSITORY}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-200 hover:text-blue-500 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-blue-400"
                      aria-label={zh ? '在 GitHub 查看网页答题自动化脚本源码' : 'View the browser answer automation source on GitHub'}
                    >
                      <GithubIcon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{zh ? '查看源码' : 'View source'}</span>
                    </a>
                    <a
                      href={`https://github.com/${HDU_REPOSITORY}/stargazers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-[#fff8c5] px-2 py-1 text-xs font-medium text-[#9a6700] ring-1 ring-[#d4a72c]/20 transition-colors hover:bg-[#fdf1a9] dark:bg-[#4d3b00]/50 dark:text-[#eac54f] dark:ring-[#eac54f]/20 dark:hover:bg-[#5f4a00]/60"
                      aria-label={zh ? `网页答题自动化脚本 ${hduStarCount ?? '—'} 个 Star` : `Browser answer automation script has ${hduStarCount ?? '—'} GitHub stars`}
                    >
                      <StarIcon />
                      <span>{hduStarCount === null ? '—' : `${hduStarCount.toLocaleString(zh ? 'zh-CN' : 'en-US')} Star`}</span>
                    </a>
                    <GitHubCloneCount repository={HDU_REPOSITORY} zh={zh} />
                    <RepositoryActivity repository={HDU_REPOSITORY} zh={zh} />
                  </div>
                </div>
                <p className="mb-3 flex flex-wrap items-center gap-2 text-sm font-medium text-blue-500">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  {zh ? '辅助工具' : 'Supporting Tool'} | <InlineTech tech="Python" />
                </p>
                <ul className="ml-5 list-disc list-outside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li>{zh ? <>将费时费力的安全教育答题流程整理成可直接运行的脚本；粘贴课程链接后自动续做未完成内容、跳过已完成部分，结束后直接展示证书，减少重复操作。</> : <>Turned the time-consuming safety-education workflow into a runnable script; it resumes unfinished content, skips completed work, and shows the certificate after the link is pasted.</>}</li>
                  <li>{zh ? <>提供 Windows、macOS、Linux 一键安装和本地运行方式；网页中展示处理进度、异常和结果，不要求使用者理解脚本细节，拿到链接即可开始。</> : <>Packaged one-step local setup for Windows, macOS, and Linux; the web UI shows progress, errors, and results so users can start from a link without understanding the script internals.</>}</li>
                </ul>
              </div>

              </div>
            </section>

            <section className="animate-fade-in-up delay-300">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-l-[3px] border-blue-500 pl-3 mb-4">{zh ? '技术栈' : 'Tech Stack'}</h2>
              <div className="space-y-4 rounded-lg border border-gray-200 bg-slate-50 p-5 dark:border-neutral-800 dark:bg-[#141413]">
                {TECH_GROUPS.map((group) => (
                  <div
                    key={group.title}
                    className={`space-y-3 rounded-lg p-3 ${group.featured ? 'border border-blue-200 bg-blue-50/70 dark:border-blue-900/70 dark:bg-[#141413]' : ''}`}
                  >
                    <h3 className={`text-xs uppercase tracking-[0.14em] font-mono ${group.featured ? 'font-bold text-blue-600 dark:text-blue-300' : 'font-semibold text-gray-500 dark:text-gray-400'}`}>
                      {zh ? ({ 'Core Languages': '主要语言', 'AI & CS': 'AI 与计算机科学', Engineering: '工程开发', 'Backend & Data': '后端与数据', 'DevOps & Tools': 'DevOps 与工具' }[group.title] ?? group.title) : group.title}
                    </h3>
                    <ul className="flex flex-wrap gap-3" aria-label={group.title}>
                      {group.items.map((item) => (
                        <TechBadge key={item.name} {...item} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <footer className="mt-8 border-t border-gray-200 pt-4 pb-2 text-sm text-gray-400 dark:border-neutral-800">
              {!footerExpanded ? (
                <button
                  type="button"
                  onClick={() => setFooterExpanded(true)}
                  className="mt-3 flex h-7 w-full items-center justify-center gap-1 rounded-md px-2 text-xs text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-neutral-900 dark:hover:text-slate-300"
                  aria-expanded="false"
                >
                  <span aria-hidden="true">⌄</span>
                  <span>{zh ? '展开页脚信息' : 'Show footer details'}</span>
                </button>
              ) : (
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span>© 2026 Xu Junshan (许君山)</span>
                <span aria-hidden="true">|</span>
                <span>{zh ? `最后更新：${SITE_LAST_UPDATED}` : `Last updated: ${SITE_LAST_UPDATED}.`}</span>
                <span aria-hidden="true">|</span>
                <VisitorBadge className="w-full sm:w-auto" initiallyExpanded />
                <span aria-hidden="true">|</span>
                <a
                  href="https://visitor-badge.laobi.icu/badge?page_id=xj3.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label="Visit count"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://visitor-badge.laobi.icu/badge?page_id=xj3.tech" alt="Visit counter" className="h-5 w-auto" />
                </a>
                <button
                  type="button"
                  onClick={() => setFooterExpanded(false)}
                  className="text-xs text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-300"
                  aria-label={zh ? '收起页脚信息' : 'Hide footer details'}
                >
                  ⌃
                </button>
              </div>
              )}
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
