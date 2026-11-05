import Link from "next/link";
import NavLinks from "./NavLinks";

export default function Header() { 
    return (
        <header className="border-b border-border bg-surface">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                
                <Link
                href="/"
                className="flex items-center gap-3"
                >
                    <div className="h-8 w-8 rounded-lg bg-primary">
                        
                    </div>

                    <div>
                        <p className="font-semibold text-foreground">
                        Sacrament Meeting Planner
                        </p>
                    </div>
                </Link>

                    <NavLinks />

                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                        JS
                    </div>

                    <span className="hidden text-sm text-text-secondary md:block">
                        John Smith
                    </span>
                </div>
            </div>
        </header>
    );
}
