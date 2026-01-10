import Link from 'next/link';
import { withBasePath } from '../lib/config';

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-12 lg:p-24">
      <div className="container-responsive">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-center mb-8">
            404 - Page Not Found
          </h1>
          
          <div className="p-8 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <p className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300">
              Sorry, we couldn&apos;t find the page you&apos;re looking for.
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Here are some helpful links to get you back on track:
              </p>
              
              <nav aria-label="Navigation links" className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href={withBasePath('/')}
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  Go to Home
                </Link>
                
                <Link
                  href={withBasePath('/sessions')}
                  className="inline-block px-6 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  View Sessions
                </Link>
                
                <Link
                  href={withBasePath('/about')}
                  className="inline-block px-6 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  About Us
                </Link>
                
                <Link
                  href={withBasePath('/faq')}
                  className="inline-block px-6 py-3 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-slate-700 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                >
                  FAQ
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
