import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertCircle, Bot, GitBranch, ShieldCheck, TerminalSquare } from 'lucide-react';
import SectionCard from './components/SectionCard';
import StatPill from './components/StatPill';

export default function App() {
  const [sections, setSections] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const stats = useMemo(() => {
    return [
      { label: 'Core themes', value: sections.length || 4, accent: 'vault' },
      { label: 'Validation gates', value: '6 hard checks', accent: 'signal' },
      { label: 'Default backend', value: 'Express :3001', accent: 'ember' },
    ];
  }, [sections.length]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError('');
      const [sectionsResponse, metaResponse] = await Promise.all([
        axios.get('/api/prompt-sections'),
        axios.get('/api/prompt-meta'),
      ]);
      setSections(sectionsResponse.data);
      setMeta(metaResponse.data);
    } catch (err) {
      setError('Could not load the prompt atlas right now. Try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 text-slate-900 sm:px-5">
      <div className="mx-auto max-w-6xl space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[32px] bg-gradient-to-br from-vault-700 via-signal-700 to-vault-900 px-5 py-8 text-white shadow-glow sm:px-8 sm:py-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <div className="space-y-5">
              <div className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-vault-50 backdrop-blur">
                <Bot className="h-4 w-4" />
                System prompt explorer
              </div>
              <div className="space-y-3">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {meta?.title || 'Via Prompt Atlas'}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-vault-50 sm:text-lg">
                  {meta?.subtitle || 'A readable map of the system instructions shaping Via’s coding behavior.'}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {stats.map((stat) => (
                  <StatPill key={stat.label} {...stat} />
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-white/10 p-5 backdrop-blur">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-vault-100">What it pushes for</p>
              <div className="space-y-3 text-base text-vault-50">
                {(meta?.highlights || [
                  'Autonomous repo-aware coding agent',
                  'Strict validation and smoke testing',
                  'Opinionated React + Express + Prisma stack',
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { icon: TerminalSquare, title: 'Execution over explanation', text: 'The prompt tells Via to act like a hands-on coding agent, not a passive advisor.' },
            { icon: ShieldCheck, title: 'Validation is mandatory', text: 'Builds, smoke tests, and preview checks are required before shipping.' },
            { icon: GitBranch, title: 'Structured delivery', text: 'The workflow ends with git hygiene, a PR, and a concise summary.' },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 + index * 0.08 }}
              className="rounded-[28px] bg-white/85 p-5 shadow-sm backdrop-blur"
            >
              <item.icon className="mb-4 h-8 w-8 text-ember-500" />
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{item.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal-700">Prompt breakdown</p>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">The main instructions at a glance</h2>
            </div>
            <button
              onClick={loadData}
              className="min-h-[44px] rounded-full bg-vault-600 px-5 py-3 text-base font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-56 animate-pulse rounded-[28px] bg-white/70 shadow-sm" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-[28px] bg-white p-6 shadow-sm">
              <div className="flex items-start gap-3 text-ember-700">
                <AlertCircle className="mt-0.5 h-6 w-6" />
                <div>
                  <h3 className="text-lg font-bold">Unable to load data</h3>
                  <p className="mt-1 text-base text-slate-600">{error}</p>
                  <button
                    onClick={loadData}
                    className="mt-4 min-h-[44px] rounded-full bg-ember-500 px-5 py-3 text-base font-semibold text-white transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {sections.map((section, index) => (
                <SectionCard key={section.id} section={section} index={index} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
