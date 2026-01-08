import { getNextSession } from '../lib/sessions';

export default function Home() {
  const nextSession = getNextSession();

  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="z-10 max-w-5xl mx-auto">
          <h1 className="text-center mb-4">
            BTARCET Architecture Team Site
          </h1>
          <p className="text-center text-lg sm:text-xl mb-8">
            Welcome to the Bosch Building Technologies Architecture Engineering Team site
          </p>
          
          {nextSession ? (
            <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <h2 className="text-2xl mb-4">Next Upcoming Session</h2>
              <h3 className="text-xl font-semibold mb-2">{nextSession.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {new Date(nextSession.startDateTime).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}
              </p>
              {nextSession.summary && (
                <p className="text-gray-700 dark:text-gray-200 mb-4">{nextSession.summary}</p>
              )}
              {nextSession.speakers && nextSession.speakers.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold">Speaker(s): </span>
                  {nextSession.speakers.map((speaker, index) => (
                    <span key={index}>
                      {speaker.name}
                      {speaker.roleOrTitle && ` (${speaker.roleOrTitle})`}
                      {index < nextSession.speakers.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <p className="text-center text-gray-600 dark:text-gray-300">
                No upcoming sessions scheduled at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
