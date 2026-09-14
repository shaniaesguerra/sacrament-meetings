'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();
    
    return (
        <nav aria-label="Primary" className="flex flex-wrap justify-center gap-x-5 gap-y-2 sm:gap-x-8">
            <Link
                href="/"
                className={`rounded-full px-4 py-2 transition-colors font-semibold font-mono ${
                    pathname === "/"
                    ? "bg-brand text-background hover:bg-brand/10 hover:text-brand"
                    : "text-foreground hover:bg-brand/10 hover:text-brand"
                }`}
                aria-current={pathname === '/' ? 'page' : undefined}
            >
                Home
            </Link>
            <Link
                href="/meetings"
                className={`rounded-full px-4 py-2 transition-colors font-semibold font-mono ${
                    pathname === "/meetings"
                    ? "bg-brand text-background hover:bg-brand/10 hover:text-brand"
                    : "text-foreground hover:bg-brand/10 hover:text-brand"
                }`}
                aria-current={pathname === '/meetings' ? 'page' : undefined}
            >
                Meetings
            </Link>
        </nav>
    );
}