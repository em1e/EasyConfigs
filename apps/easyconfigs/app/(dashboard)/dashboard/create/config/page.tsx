import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Label } from "@/registry/new-york-v4/ui/label"
import { Textarea } from "@/registry/new-york-v4/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york-v4/ui/select"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { 
  FileText, 
  Settings, 
  Code, 
  Database, 
  Globe, 
  Wrench,
  Plus,
  Sparkles
} from "lucide-react"

export default async function CreateNewConfigPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const configTypes = [
    {
      id: "web-config",
      name: "Web Configuration",
      description: "Frontend frameworks, build tools, and web development configs",
      icon: Globe,
      color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400",
      examples: ["package.json", "webpack.config.js", "next.config.js", "vite.config.ts"]
    },
    {
      id: "server-config",
      name: "Server Configuration", 
      description: "Backend services, APIs, and server-side configurations",
      icon: Settings,
      color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400",
      examples: ["nginx.conf", "apache.conf", "server.js", "app.yaml"]
    },
    {
      id: "database-config",
      name: "Database Configuration",
      description: "Database connections, schemas, and data management configs",
      icon: Database,
      color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400",
      examples: ["mysql.conf", "postgres.conf", "redis.conf", "mongo.conf"]
    },
    {
      id: "devops-config",
      name: "DevOps Configuration",
      description: "CI/CD, containerization, and deployment configurations",
      icon: Wrench,
      color: "bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400",
      examples: ["Dockerfile", "docker-compose.yml", ".github/workflows", "k8s.yaml"]
    },
    {
      id: "code-config",
      name: "Code Quality Configuration",
      description: "Linting, formatting, and code quality tool configurations",
      icon: Code,
      color: "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400",
      examples: [".eslintrc.js", ".prettierrc", "tsconfig.json", ".editorconfig"]
    },
    {
      id: "custom-config",
      name: "Custom Configuration",
      description: "Create a completely custom configuration file from scratch",
      icon: Sparkles,
      color: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400",
      examples: ["config.json", "settings.yaml", "custom.toml", "app.ini"]
    }
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Configuration</h1>
        <p className="text-muted-foreground">
          Build a configuration file from scratch with our guided setup process.
        </p>
      </div>

      {/* Quick Setup Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Quick Setup
          </CardTitle>
          <CardDescription>
            Fill in the basic details to get started with your new configuration file.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="config-name">Configuration Name</Label>
              <Input
                id="config-name"
                placeholder="e.g., my-app-config"
                />
            </div>
            <div className="space-y-2">
              <Label htmlFor="file-format">File Format</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="json">JSON (.json)</SelectItem>
                  <SelectItem value="yaml">YAML (.yaml)</SelectItem>
                  <SelectItem value="toml">TOML (.toml)</SelectItem>
                  <SelectItem value="ini">INI (.ini)</SelectItem>
                  <SelectItem value="js">JavaScript (.js)</SelectItem>
                  <SelectItem value="ts">TypeScript (.ts)</SelectItem>
                  <SelectItem value="xml">XML (.xml)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Describe what this configuration file will be used for..."
              className="min-h-[80px]"
              />
          </div>
        </CardContent>
      </Card>

      {/* Configuration Types */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose Configuration Type</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {configTypes.map((type) => {
            const IconComponent = type.icon
            return (
              <Card key={type.id} className="group hover:shadow-md transition-all cursor-pointer hover:border-primary/50">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{type.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {type.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-muted-foreground">Common examples:</div>
                    <div className="flex flex-wrap gap-1">
                      {type.examples.map((example) => (
                        <Badge key={example} variant="outline" className="text-xs">
                          {example}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full mt-3" size="sm" variant="outline">
                      Select This Type
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Advanced Options */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Advanced Options</CardTitle>
          <CardDescription>
            Additional settings for power users and specific use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="environment">Target Environment</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="staging">Staging</SelectItem>
                  <SelectItem value="production">Production</SelectItem>
                  <SelectItem value="testing">Testing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="framework">Framework/Tool</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nextjs">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue.js</SelectItem>
                  <SelectItem value="express">Express.js</SelectItem>
                  <SelectItem value="docker">Docker</SelectItem>
                  <SelectItem value="kubernetes">Kubernetes</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button size="lg" className="flex-1 sm:flex-none">
          Create Configuration
        </Button>
        <Button variant="outline" size="lg">
          Save as Draft
        </Button>
      </div>
    </div>
  )
}
