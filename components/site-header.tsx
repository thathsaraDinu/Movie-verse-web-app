import Link from "next/link"

export function SiteHeader() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="text-2xl font-bold">MovieVerse</span>
    </Link>
  )
}