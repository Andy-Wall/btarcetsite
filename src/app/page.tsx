import Link from 'next/link';
import { getNextSession } from '../lib/sessions';
import SessionCard from '../components/SessionCard';

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
            <div className="mt-8">
              <h2 className="mb-4">Next Upcoming Session</h2>
              <SessionCard session={nextSession} />
            </div>
          ) : (
            <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
              <p className="text-center text-gray-600 dark:text-gray-300 mb-4">
                No upcoming sessions scheduled at this time.
              </p>
              <p className="text-center">
                <Link 
                  href="/sessions" 
                  className="text-blue-600 dark:text-blue-400 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 rounded px-1"
                >
                  View session history
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
