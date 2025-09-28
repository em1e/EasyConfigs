export default function CreateNewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Configuration</h1>
        <p className="text-muted-foreground">
          Choose a builder to create your configuration files and templates.
        </p>
      </div>

      {/* Quick Start Section */}
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <p className="font-medium">React Component</p>
              <p className="text-sm text-muted-foreground">Create components fast</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Docker Setup</p>
              <p className="text-sm text-muted-foreground">Quick containerization</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 rounded-lg border hover:bg-accent hover:text-accent-foreground transition-colors text-left">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-medium">API Schema</p>
              <p className="text-sm text-muted-foreground">REST API setup</p>
            </div>
          </button>
        </div>
      </div>

      {/* All Builders */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">All Builders</h2>
        
        {/* Frontend Builders */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-muted-foreground">Frontend & UI</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">React Builder</h4>
                  <p className="text-sm text-muted-foreground">Components, hooks, and more</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate React components with TypeScript, styled-components, and testing setup.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Vue Builder</h4>
                  <p className="text-sm text-muted-foreground">Vue 3 components and composables</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create Vue 3 components with Composition API, TypeScript, and Pinia store setup.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>

        {/* Backend Builders */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-muted-foreground">Backend & APIs</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">API Builder</h4>
                  <p className="text-sm text-muted-foreground">REST & GraphQL APIs</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate OpenAPI specs, route handlers, middleware, and documentation.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Database Builder</h4>
                  <p className="text-sm text-muted-foreground">Schemas and migrations</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create database schemas, migrations, and ORM configurations for various databases.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>

        {/* DevOps Builders */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-muted-foreground">DevOps & Infrastructure</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">Docker Builder</h4>
                  <p className="text-sm text-muted-foreground">Containerization configs</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Generate Dockerfiles, docker-compose files, and Kubernetes manifests.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold">CI/CD Builder</h4>
                  <p className="text-sm text-muted-foreground">Pipeline configurations</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Create GitHub Actions, GitLab CI, Jenkins pipelines, and deployment workflows.
              </p>
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md text-sm font-medium transition-colors">
                Start Building
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
