import React from 'react'
import { SidebarProvider } from '@/app/(app)/generators/sidebar-context'
import { GenSidebar } from '@/app/(app)/generators/sidebar'

export default function GeneratorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <GenSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}