import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import Link from "next/link"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/new-york-v4/ui/card"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import { FileText, ArrowRight, Sparkles, Copy, Star, Users } from "lucide-react"

export default async function CreateNewPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Configuration</h1>
        <p className="text-muted-foreground">
          Choose how you'd like to create your configuration files - start from a template or build from scratch.
        </p>
      </div>

      {/* Main Options */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Create file from Template */}
        <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Copy className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Create file from Template</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-base">
              Start with a pre-built template and customize it to your needs. Perfect for common configurations and best practices.
            </CardDescription>
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">What you get:</div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Pre-configured best practices
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Ready-to-use templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                  Community-tested configurations
                </li>
              </ul>
              </div>

              <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                <Link href="/dashboard/create/template">
                  Browse Templates
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

        {/* Create file from Scratch */}
        <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Create file from Scratch</CardTitle>
                <Badge variant="outline" className="mt-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Custom
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-base">
              Build your configuration file from the ground up with our guided builder. Full control and customization.
            </CardDescription>
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">What you get:</div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Complete customization
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Guided setup process
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Multiple file formats
                </li>
              </ul>
            </div>

            <Button variant="outline" asChild className="w-full group-hover:bg-accent transition-colors">
              <Link href="/dashboard/create/config">
                Start Building
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Create Template */}
        <Card className="group hover:shadow-lg transition-all duration-200 hover:border-primary/20">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Create Template</CardTitle>
                <Badge variant="outline" className="mt-1">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Share
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-base">
              Create reusable templates for the community. Share your expertise and help others get started faster.
            </CardDescription>
            
            <div className="space-y-3">
              <div className="text-sm font-medium text-muted-foreground">What you get:</div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Sharing to users or community possible
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Template builder tools
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                  Version control & licensing
                </li>
              </ul>
            </div>

            <Button variant="outline" asChild className="w-full group-hover:bg-accent transition-colors">
              <Link href="/dashboard/create/template-builder">
                Create Template
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-primary">250+</div>
          <div className="text-sm text-muted-foreground">Available Templates</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-primary">15+</div>
          <div className="text-sm text-muted-foreground">File Formats</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-primary">5min</div>
          <div className="text-sm text-muted-foreground">Average Setup Time</div>
        </div>
        <div className="text-center p-4">
          <div className="text-2xl font-bold text-primary">1.2k+</div>
          <div className="text-sm text-muted-foreground">Community Templates</div>
        </div>
      </div>
    </div>
  )
}
