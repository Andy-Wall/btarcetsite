import { loadAllSessions, getSessionById } from '../../../lib/sessions';

/**
 * Generate static params for all session pages at build time
 * This enables static export of all session detail pages
 */
export function generateStaticParams() {
  const sessions = loadAllSessions();
  
  return sessions.map((session) => ({
    id: session.id,
  }));
}

interface SessionDetailPageProps {
  params: {
    id: string;
  };
}

export default function SessionDetailPage({ params }: SessionDetailPageProps) {
  const session = getSessionById(params.id);

  if (!session) {
    return (
      <main id="main-content" className="flex min-h-screen flex-col p-6 sm:p-12 lg:p-24">
        <div className="container-responsive">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-center mb-8">Session Not Found</h1>
            <p className="text-center text-gray-600 dark:text-gray-300">
              The requested session could not be found.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main id="main-content" className="flex min-h-screen flex-col p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="max-w-3xl mx-auto">
          {/* Session Title */}
          <h1 className="mb-6">{session.title}</h1>

          {/* Date and Time */}
          <div className="mb-6 text-lg text-gray-700 dark:text-gray-200">
            <time dateTime={session.startDateTime}>
              {new Date(session.startDateTime).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZoneName: 'short'
              })}
            </time>
            {session.durationMinutes && (
              <span className="ml-4">({session.durationMinutes} minutes)</span>
            )}
          </div>

          {/* Summary */}
          {session.summary && (
            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {session.summary}
              </p>
            </div>
          )}

          {/* Description */}
          {session.description && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Description</h2>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                {session.description}
              </p>
            </section>
          )}

          {/* Speakers */}
          {session.speakers && session.speakers.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                Speaker{session.speakers.length > 1 ? 's' : ''}
              </h2>
              <div className="space-y-4">
                {session.speakers.map((speaker, index) => (
                  <div
                    key={`${speaker.name}-${index}`}
                    className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow-md"
                  >
                    <p className="font-semibold text-lg">{speaker.name}</p>
                    {speaker.roleOrTitle && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {speaker.roleOrTitle}
                      </p>
                    )}
                    {speaker.organization && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {speaker.organization}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Resources */}
          {session.resources && session.resources.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Resources</h2>
              <ul className="space-y-2">
                {session.resources.map((resource, index) => (
                  <li key={`${resource.url}-${index}`}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Tags */}
          {session.tags && session.tags.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {session.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
