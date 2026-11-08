import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { Suspense } from "react";

export default function Header() { 
    return (
        <header className="border-b border-border bg-surface">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                
                <Link
                href="/"
                className="flex items-center gap-3"
                >
                    <div className="h-8 w-8 rounded-lg bg-primary">
                        <Image
                            src="/images/icon.jpeg"
                            alt="Sacrament Meeting Planner Logo"
                            width={40}
                            height={40}
                            className="rounded-md object-cover"
                            />
                    </div>
                    <div>
                        <p className="font-semibold text-foreground">
                        Sacrament Meeting Planner
                        </p>
                    </div>
                </Link>

                <Suspense fallback ={null}>
                    <NavLinks />
                </Suspense>

                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        SE
                    </div>

                    <span className="hidden text-sm text-text-secondary md:block">
                        Shania Esguerra
                    </span>
                </div>
            </div>
        </header>
    );
}
