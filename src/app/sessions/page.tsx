import { getPartitionedSessions } from '../../lib/sessions';
import SessionCard from '../../components/SessionCard';

export default function SessionsPage() {
  const { upcoming, history } = getPartitionedSessions();

  return (
    <main id="main-content" className="flex min-h-screen flex-col p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-center mb-8">
            Sessions
          </h1>

          {/* Upcoming Sessions Section */}
          <section className="mb-12" aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="mb-6">Upcoming</h2>
            {upcoming.length > 0 ? (
              <ul className="space-y-6 list-none">
                {upcoming.map((session) => (
                  <li key={session.id}>
                    <SessionCard session={session} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No upcoming sessions scheduled at this time.
                </p>
              </div>
            )}
          </section>

          {/* History Sessions Section */}
          <section aria-labelledby="history-heading">
            <h2 id="history-heading" className="mb-6">History</h2>
            {history.length > 0 ? (
              <ul className="space-y-6 list-none">
                {history.map((session) => (
                  <li key={session.id}>
                    <SessionCard session={session} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                <p className="text-center text-gray-600 dark:text-gray-300">
                  No past sessions yet.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
