"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/meetings",
    label: "Meetings",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex items-center gap-6">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.href !== "/" &&
              pathname.startsWith(link.href));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-primary font-semibold"
                    : "text-text-secondary hover:text-primary"
                } justify-center px-3 py-2 font-medium`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}