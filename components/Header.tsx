import NavLinks from "./NavLinks";
import Image from "next/image";

export default function Header() {
  return (
    <header className="px-4 py-4">
        <nav className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl bg-card/10 px-4 py-4 shadow-lg backdrop-blur sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
            <Image
            src="/icon.svg"
            alt="Sacrament Meeting Planner logo"
            width={48}
            height={48}
            className="rounded-full object-cover"
            />

            <div
            id="header-title"
            className="text-lg font-bold uppercase tracking-wide text-foreground sm:text-lg"
            >
                Sacrament Meeting Planner
            </div>
                    
        </div>
              
        <div className="font-mono justify self-center">
            Wildrose Ward    
        </div>

        <div className="w-full rounded-full bg-card/40 px-4 py-2 sm:px-5 md:w-auto">
            <NavLinks />
        </div>
    </nav>
    </header>
  );
}