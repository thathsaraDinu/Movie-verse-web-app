import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="">
        <Image
          alt="logo"
          src="/movieverse-high-resolution-logo-transparent.svg"
          width={220}
          className="hidden md:block"
          height={42}
        />
        <Image
          alt="logo"
          src="/monogram-hq.png"
          width={50}
          className="block md:hidden"
          height={31}
        />
      </span>
    </Link>
  );
}