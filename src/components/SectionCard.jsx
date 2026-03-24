import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function SectionCard({ section, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className="rounded-[28px] bg-white/90 p-6 shadow-glow backdrop-blur"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-vault-50 px-3 py-1 text-sm font-semibold text-vault-700">
            <Sparkles className="h-4 w-4" />
            {section.emphasis}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-vault-900">{section.title}</h3>
        </div>
        <div className="rounded-full bg-signal-100 p-3 text-signal-700">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>
      <p className="text-base leading-relaxed text-slate-700">{section.summary}</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-base leading-relaxed text-slate-600">
        {section.body}
      </div>
    </motion.article>
  );
}
