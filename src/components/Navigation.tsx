'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { withBasePath } from '../lib/config';

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: withBasePath('/'), label: 'Home' },
    { href: withBasePath('/sessions'), label: 'Sessions' },
    { href: withBasePath('/about'), label: 'About' },
    { href: withBasePath('/faq'), label: 'FAQ' },
  ];

  return (
    <nav aria-label="Main navigation" className="bg-white dark:bg-slate-800 shadow-md">
      <div className="container-responsive">
        <ul className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 py-4 list-none">
          {navLinks.map((link) => {
            // For home page, use exact match. For other pages, match if pathname starts with the href followed by / or is exact
            // pathname from usePathname() should include basePath when basePath is configured
            const isActive = link.href === withBasePath('/') 
              ? pathname === withBasePath('/') || pathname === '/'
              : pathname === link.href || pathname?.startsWith(link.href + '/');
            
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`
                    inline-block px-4 py-2 rounded-md text-base font-medium transition-colors
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    dark:focus:ring-offset-slate-800
                    ${
                      isActive
                        ? 'bg-blue-600 text-white dark:bg-blue-500'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-700'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
