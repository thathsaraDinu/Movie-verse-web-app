import { ThemeToggle } from "@/components/theme-toggle"
import { SiteHeader } from "@/components/site-header"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <SiteHeader />
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}