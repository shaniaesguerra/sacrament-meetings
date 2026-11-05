import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/meetings", label: "Meetings" },
]

export default function NavLinks() {
    return (
        <nav>
            <ul className="flex items-center gap-6">
                {links.map((link) => (
                <li key={link.href}>
                    <Link
                    href={link.href}
                    className="text-sm font-medium text-text-secondary hover:text-primary"
                    >
                    {link.label}
                    </Link>
                </li>
                ))}
            </ul>
        </nav>
    );
}