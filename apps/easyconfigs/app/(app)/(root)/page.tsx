import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import { Announcement } from "@/components/announcement"
import ReviewPage from "@/app/(app)/review/page"
import { ExamplesNav } from "@/components/examples-nav"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/page-header"
import { PageNav } from "@/components/page-nav"
import { ThemeSelector } from "@/components/theme-selector"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Badge } from "@/registry/new-york-v4/ui/badge"
import longBoi from '@/public/images/long_boi.jpg';
import orange_cat from '@/public/images/orange_cat.jpg';
import sheep from '@/public/images/sheep.jpg';
import black_cat from '@/public/images/102.png';
import frog from '@/public/images/frog.jpeg';
import sneaking_cat from '@/public/images/sneaking_cat.jpg';
import mie from '@/public/images/a.png';
import { siteConfig } from "@/lib/config"

import { 
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
} from "@/registry/new-york-v4/ui/carousel"
import { Car } from "lucide-react"

const title = siteConfig.name
const description = siteConfig.description

export const dynamic = "force-static"
export const revalidate = false

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      {
        url: `/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      },
    ],
  },
}

export default function IndexPage() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              🛠️ Trusted by 5,000+ developers & many teams worldwide
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Visual Configuration File Builder
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl lg:text-2xl max-w-3xl mx-auto">
              The ultimate web-based GUI tool for creating error-free configuration files. 
              Transform tedious manual config editing into a visual, drag-and-drop experience.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/dashboard">Try EasyConfigs Now →</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6">
                <Link href="/docs">Read the Docs</Link>
              </Button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground">
              Get started for free • 10,000+ configs generated monthly • Instant access
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              No more syntax errors, no more fighting indentation
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Perfect for developers, DevOps engineers, system administrators & anyone working with config files
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Visual Drag-and-Drop Builder</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create complex configuration structures with an intuitive drag-and-drop interface. Add blocks, move them around, and watch your config come to life.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Real-Time Multi-Format Preview</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Watch your configuration generate live in multiple formats as you build. Support for YAML, JSON, TOML, and more with instant validation.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2V4a2 2 0 012-2h4a2 2 0 012 2v4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Template System & Sharing</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Create reusable configuration templates with customizable parameters. Share them publicly or keep them private for your team.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Cross-Platform & Responsive</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Works seamlessly on desktop, tablet, and mobile devices. Export configurations in YAML, JSON, TOML and more formats.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Support for Multiple Configuration Formats
            </h2>
            <p className="text-lg text-muted-foreground">
              Export your configurations in various formats. From Docker Compose to CI/CD pipelines, 
              EasyConfigs handles the formats you need for modern development workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* YAML Configuration Builder */}
            <div className="group relative overflow-hidden rounded-2xl bg-background border shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-500 to-blue-600 relative overflow-hidden">
                <Image
                  src={longBoi}
                  alt="YAML Configuration Builder Example"
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-600/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  YAML Configuration Builder
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Perfect for Docker Compose, CI/CD pipelines, and Kubernetes configs. 
                  Generate clean, properly indented YAML files with validation and error prevention.
                </p>
                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <Link href="/generators/yaml">Get started</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/docs/yaml-builder">Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* JSON Configuration Builder */}
            <div className="group relative overflow-hidden rounded-2xl bg-background border shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
                <Image
                  src={orange_cat}
                  alt="JSON Configuration Builder Example"
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-orange-600/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  JSON Configuration Editor
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Visual JSON editor for APIs, web configs, and database configurations. 
                  Build complex nested structures without syntax errors or malformed JSON.
                </p>
                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <Link href="/generators/json">Get started</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/docs/json-editor">Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* TOML Configuration Builder */}
            <div className="group relative overflow-hidden rounded-2xl bg-background border shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="aspect-[4/3] bg-gradient-to-br from-green-500 to-green-600 relative overflow-hidden">
                <Image
                  src={sneaking_cat}
                  alt="TOML Configuration Builder Example"
                  fill
                  className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-green-600/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  TOML Configuration Builder
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  Ideal for Rust projects, Python tools, and static site generators. 
                  Create clean, readable TOML configurations with intuitive visual editing.
                </p>
                <div className="flex gap-3">
                  <Button asChild size="sm">
                    <Link href="/generators/toml">Get started</Link>
                  </Button>
                  <Button asChild size="sm" variant="ghost">
                    <Link href="/docs/toml-builder">Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Developers and teams growing with EasyConfigs
            </h2>
            <p className="text-lg text-muted-foreground">
              See how developers, DevOps engineers, and system administrators around the globe are using 
              EasyConfigs to eliminate configuration errors and accelerate their workflows.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="bg-background border rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">AS</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Alex DevOps</div>
                  <div className="text-sm text-muted-foreground">Senior DevOps Engineer, TechCorp</div>
                </div>
              </div>
              <blockquote className="text-foreground mb-4">
                "EasyConfigs eliminated our Docker Compose syntax errors completely. What used to take hours 
                of debugging YAML indentation now takes minutes with the visual builder."
              </blockquote>
            </div>
            
            <div className="bg-background border rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">MC</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Maya Chen</div>
                  <div className="text-sm text-muted-foreground">Full Stack Developer, StartupCo</div>
                </div>
              </div>
              <blockquote className="text-foreground mb-4">
                "The real-time preview feature is incredible. I can see my configs generate live in multiple 
                formats and catch errors before they break my deployments."
              </blockquote>
            </div>
            
            <div className="bg-background border rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary font-semibold">JD</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">Jake Rodriguez</div>
                  <div className="text-sm text-muted-foreground">System Administrator, Enterprise Corp</div>
                </div>
              </div>
              <blockquote className="text-foreground mb-4">
                "The template system is a game-changer. We've standardized all our infrastructure configs 
                and can deploy consistent environments across our entire organization."
              </blockquote>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/testimonials">See all customer stories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="py-24 sm:py-32 bg-muted/20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 bg-background rounded-2xl p-8 shadow-sm border">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0">
              <Image
                src={frog}
                alt="Mie profile picture"
                className="object-cover w-full h-full"
                width={128}
                height={128}
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold mb-4 text-foreground">Hi, I'm Mie 👋</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The software developer who created EasyConfigs. I built this tool to solve a universal developer 
                frustration, spending hours debugging configuration syntax instead of focusing on coding and building software. 
                What started as a small side project is now used by 5,000+ developers and teams worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start mb-6">
                <a href="mailto:emi.projects@outlook.com" 
                   className="text-muted-foreground hover:text-primary transition-colors">
                  emi.projects@outlook.com
                </a>
                <span className="hidden sm:block text-muted-foreground">•</span>
                <a href="https://github.com/em1e" target="_blank" 
                   className="text-muted-foreground hover:text-primary transition-colors">
                  github.com/em1e
                </a>
              </div>
              
              <Button asChild>
                <Link href="/about">Read more about the project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
            Get started for free
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join 5,000+ developers and teams who trust EasyConfigs for error-free configuration management. 
            Always free and open source.*
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/generators">Try EasyConfigs Now →</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            *Core functionality will always remain free. Premium features for advanced users may be added later.
          </p>
        </div>
      </section>
    </div>
  )
}
