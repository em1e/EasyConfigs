export default function FavoriteBuildersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Favorite Builders</h1>
        <p className="text-muted-foreground">
          Your most-used and favorited configuration builders.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Docker Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Docker Builder</h3>
              <p className="text-sm text-muted-foreground">Container configurations</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate Dockerfiles, docker-compose configurations, and container deployment scripts.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 15 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>

        {/* React Component Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">React Builder</h3>
              <p className="text-sm text-muted-foreground">Component templates</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create React components, hooks, and TypeScript interfaces with best practices.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 23 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>

        {/* API Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">API Builder</h3>
              <p className="text-sm text-muted-foreground">REST API schemas</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate OpenAPI specs, route handlers, and API documentation templates.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 8 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>

        {/* Database Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Database Builder</h3>
              <p className="text-sm text-muted-foreground">Schema & migrations</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create database schemas, migrations, and ORM configurations for various databases.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 12 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>

        {/* Configuration Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">Config Builder</h3>
              <p className="text-sm text-muted-foreground">App configurations</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Generate configuration files for various tools like webpack, eslint, prettier, and more.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 19 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>

        {/* CI/CD Builder */}
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold">CI/CD Builder</h3>
              <p className="text-sm text-muted-foreground">Pipeline configurations</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Create GitHub Actions, GitLab CI, Jenkins pipelines, and deployment workflows.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Used 6 times</span>
            <button className="text-sm font-medium text-primary hover:underline">
              Use Builder
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
