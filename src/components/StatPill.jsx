import clsx from 'clsx';

export default function StatPill({ label, value, accent = 'vault' }) {
  return (
    <div
      className={clsx(
        'min-h-[44px] rounded-full px-4 py-3 text-sm font-semibold shadow-sm',
        accent === 'ember' && 'bg-ember-50 text-ember-700',
        accent === 'signal' && 'bg-signal-50 text-signal-700',
        accent === 'vault' && 'bg-vault-50 text-vault-700'
      )}
    >
      <span className="mr-2 opacity-70">{label}</span>
      <span>{value}</span>
    </div>
  );
}
