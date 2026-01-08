import { Session } from '../lib/sessions';

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-2">{session.title}</h3>
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
            <span key={index}>
              {speaker.name}
              {speaker.roleOrTitle && ` (${speaker.roleOrTitle})`}
              {index < session.speakers.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
