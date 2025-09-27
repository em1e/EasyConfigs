"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/app/(app)/generators/sidebar-context"

export function GenSidebar() {
  const { isOpen } = useSidebar()
  const pathname = usePathname()
  if (!isOpen) return null

  const generators = [
    { name: "All Generators", href: "/generators" },
    { name: "Config Generator", href: "/generators/config" },
    { name: "Model Generator", href: "/generators/model" },
    { name: "GUI Generator", href: "/generators/gui" },
    { name: "Bedrock Generator", href: "/generators/bedrock" },
  ]

  return (
    <aside className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex w-64">
      <nav className="px-2 pb-12 pt-4 w-full">
        <div className="mb-4 px-2 text-muted-foreground font-medium text-sm uppercase tracking-wide">
          Generators
        </div>
        <ul className="flex flex-col gap-1">
          {generators.map((gen) => (
            <li key={gen.href}>
              <Link
                href={gen.href}
                className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === gen.href
                    ? "bg-accent border-accent text-primary"
                    : "hover:bg-accent hover:text-primary text-muted-foreground"
                }`}
              >
                {gen.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}