export default function FavoriteTemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Favorite Templates</h1>
        <p className="text-muted-foreground">
          Your starred and most-used configuration templates.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Template Item */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Next.js TypeScript Starter</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Complete Next.js setup with TypeScript, Tailwind CSS, ESLint, and Prettier
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Created 2 days ago</span>
                  <span>•</span>
                  <span>Used 8 times</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Favorited
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Next.js
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    TypeScript
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    Tailwind
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm font-medium text-primary hover:underline">
                Use Template
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Another Template */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Docker Compose Full Stack</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Multi-service Docker setup with database, backend, and frontend services
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Created 1 week ago</span>
                  <span>•</span>
                  <span>Used 5 times</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Favorited
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Docker
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                    Redis
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    PostgreSQL
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm font-medium text-primary hover:underline">
                Use Template
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Third Template */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">CI/CD GitHub Actions</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Complete GitHub Actions workflow for testing, building, and deploying
                </p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Created 3 days ago</span>
                  <span>•</span>
                  <span>Used 12 times</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    Favorited
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                    GitHub Actions
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Node.js
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Vercel
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-sm font-medium text-primary hover:underline">
                Use Template
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
