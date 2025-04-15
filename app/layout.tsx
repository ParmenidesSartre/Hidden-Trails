import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardSidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/toaster"

export const metadata = {
  title: "Hidden Trails Dashboard",
  description: "Admin dashboard for managing travel data",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-muted/40">
        <ThemeProvider attribute="class" defaultTheme="light">
          <div className="flex min-h-screen">
            <DashboardSidebar />
            <div className="flex flex-1 flex-col">
              <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 w-full">
                <div className="flex-1" />
              </header>
              <main className="flex-1 w-full p-4 sm:p-6 md:p-8">{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'