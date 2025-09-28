import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { Input } from "@/registry/new-york-v4/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Search, Star, Download, Eye } from "lucide-react"

export default async function CreateFromTemplatePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  // Mock template data - replace with actual data from your backend
  const templates = [
    {
      id: 1,
      name: "React Component Template",
      description: "Modern React component with TypeScript, hooks, and proper styling",
      category: "React",
      downloads: 1204,
      rating: 4.8,
      tags: ["React", "TypeScript", "Components"],
      author: "EasyConfigs Team",
      preview: "/templates/react-component-preview.png"
    },
    {
      id: 2,
      name: "Docker Configuration",
      description: "Complete Docker setup with docker-compose and environment configs",
      category: "DevOps",
      downloads: 856,
      rating: 4.6,
      tags: ["Docker", "DevOps", "Configuration"],
      author: "DevOps Team",
      preview: "/templates/docker-preview.png"
    },
    {
      id: 3,
      name: "API Schema Template",
      description: "OpenAPI 3.0 schema template with authentication and validation",
      category: "API",
      downloads: 642,
      rating: 4.7,
      tags: ["API", "OpenAPI", "Schema"],
      author: "API Team",
      preview: "/templates/api-schema-preview.png"
    },
    {
      id: 4,
      name: "Next.js App Router",
      description: "Complete Next.js 14 app with routing, auth, and database setup",
      category: "Next.js",
      downloads: 1580,
      rating: 4.9,
      tags: ["Next.js", "App Router", "Full Stack"],
      author: "Web Team",
      preview: "/templates/nextjs-preview.png"
    },
    {
      id: 5,
      name: "Tailwind Config",
      description: "Comprehensive Tailwind CSS configuration with custom themes",
      category: "CSS",
      downloads: 923,
      rating: 4.5,
      tags: ["Tailwind", "CSS", "Theming"],
      author: "Design Team",
      preview: "/templates/tailwind-preview.png"
    },
    {
      id: 6,
      name: "ESLint + Prettier Setup",
      description: "Professional linting and formatting configuration for JavaScript/TypeScript",
      category: "Tools",
      downloads: 1123,
      rating: 4.6,
      tags: ["ESLint", "Prettier", "Code Quality"],
      author: "Quality Team",
      preview: "/templates/eslint-preview.png"
    }
  ]

  const categories = ["All", "React", "Next.js", "DevOps", "API", "CSS", "Tools"]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create from Template</h1>
        <p className="text-muted-foreground">
          Choose from our collection of pre-built templates to quickly create your configuration files.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Templates Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Star className="h-5 w-5 text-yellow-500" />
          Popular Templates
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {template.description}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary" className="ml-2">
                    {template.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {template.downloads.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {template.rating}
                    </span>
                  </div>
                  <span className="text-xs">by {template.author}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1" size="sm">
                    Use Template
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Browse All Templates */}
      <div className="text-center pt-6">
        <Button variant="outline" size="lg">
          Browse All Templates
        </Button>
      </div>
    </div>
  )
}
