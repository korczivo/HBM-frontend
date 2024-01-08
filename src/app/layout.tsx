'use client';

import '@/styles/global.css';

import { useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en" data-theme="night">
      <body>
        <div className="flex min-h-screen bg-gray-100">
          <aside
            className={`${
              isSidebarOpen ? 'w-64' : 'w-16'
            } relative min-h-screen bg-base-100 p-4 text-white transition-all`}
          >
            {isSidebarOpen && (
              <div className="mt-10">
                <a href="/">Home</a>
                <a href="/add-expense">Add expenses</a>
              </div>
            )}
            <button
              type="button"
              className={`${
                isSidebarOpen ? 'right-2 top-2' : 'top-2'
              } absolute h-8 w-8 rounded-full bg-neutral text-white transition-all`}
              onClick={toggleSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="m-auto h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isSidebarOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </aside>
          <main className="flex-1 p-4">
            <div className="rounded bg-white p-4 shadow">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
