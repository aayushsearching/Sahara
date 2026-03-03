const colors = {
  pending: 'bg-amber-500/20 text-amber-400',
  active: 'bg-amber-500/20 text-amber-400',
  in_progress: 'bg-blue-500/20 text-blue-400',
  in_negotiation: 'bg-blue-500/20 text-blue-400',
  negotiation: 'bg-blue-500/20 text-blue-400',
  matched: 'bg-purple-500/20 text-purple-400',
  agreement: 'bg-purple-500/20 text-purple-400',
  deal_closed: 'bg-green-500/20 text-green-400',
  sold: 'bg-green-500/20 text-green-400',
  closed: 'bg-green-500/20 text-green-400',
  completed: 'bg-green-500/20 text-green-400',
  payment_pending: 'bg-yellow-500/20 text-yellow-400',
  cancelled: 'bg-red-500/20 text-red-400',
  delisted: 'bg-red-500/20 text-red-400',
  refunded: 'bg-red-500/20 text-red-400',
  initiated: 'bg-cyan-500/20 text-cyan-400',
};

const StatusBadge = ({ status }) => {
  const cls = colors[status] || 'bg-zinc-500/20 text-zinc-400';
  const label = status?.replace(/_/g, ' ') || 'unknown';

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${cls}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
