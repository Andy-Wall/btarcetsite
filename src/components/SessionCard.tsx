import Link from 'next/link';
import { Session } from '../lib/sessions';

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <Link href={`/sessions/${session.id}`} className="block p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">{session.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        {new Date(session.startDateTime).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        })}
      </p>
      {session.summary && (
        <p className="text-gray-700 dark:text-gray-200 mb-4">{session.summary}</p>
      )}
      {session.speakers && session.speakers.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold">Speaker(s): </span>
          {session.speakers.map((speaker, index) => (
            <span key={`${speaker.name}-${index}`}>
              {speaker.name}
              {speaker.roleOrTitle && ` (${speaker.roleOrTitle})`}
              {index < session.speakers.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
