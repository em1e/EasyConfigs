"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/registry/new-york-v4/ui/scroll-area"

const examples = [
  {
    name: "Config",
    href: "/review/config",
    code: "@/app/(app)/reviews/config",
    hidden: false,
  },
  {
    name: "GUI",
    href: "/review/gui",
    code: "@/app/(app)/reviews/gui",
    hidden: false,
  },
  {
    name: "Bedorck pack",
    href: "/review/bedrock",
    code: "@/app/(app)/reviews/bedrock",
    hidden: false,
  },
  {
    name: "Model",
    href: "/review/model",
    code: "@/app/(app)/reviews/model",
    hidden: false,
  },
]

export function ExamplesNav({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const pathname = usePathname()

  return (
    <div className={cn("flex items-center", className)} {...props}>
      <ScrollArea className="max-w-[96%] md:max-w-[600px] lg:max-w-none">
        <div className="flex items-center">
          <ExampleLink
            example={{ name: "All Reviews", href: "/review/all", code: "@/app/(app)/reviews/all", hidden: false }}
            isActive={pathname === "/"}
          />
          {examples.map((example) => (
            <ExampleLink
              key={example.href}
              example={example}
              isActive={pathname?.startsWith(example.href) ?? false}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}

function ExampleLink({
  example,
  isActive,
}: {
  example: (typeof examples)[number]
  isActive: boolean
}) {
  if (example.hidden) {
    return null
  }

  return (
    <Link
      href={example.href}
      key={example.href}
      className="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium transition-colors"
      data-active={isActive}
    >
      {example.name}
    </Link>
  )
}
