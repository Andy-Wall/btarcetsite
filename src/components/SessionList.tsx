import { Session } from '../lib/sessions';
import SessionCard from './SessionCard';

interface SessionListProps {
  sessions: Session[];
  emptyMessage?: string;
  className?: string;
}

export default function SessionList({ 
  sessions, 
  emptyMessage = 'No sessions available.',
  className = ''
}: SessionListProps) {
  if (sessions.length === 0) {
    return (
      <div className={`p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md text-center ${className}`}>
        <p className="text-gray-600 dark:text-gray-300">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <ul className={`space-y-4 list-none ${className}`}>
      {sessions.map((session) => (
        <li key={session.id}>
          <SessionCard session={session} />
        </li>
      ))}
    </ul>
  );
}
