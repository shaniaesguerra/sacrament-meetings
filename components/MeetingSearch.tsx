'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect, useRef } from 'react';

export function MeetingSearch() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', '1');

        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }

        const queryString = params.toString();
        replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 300);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div className="relative w-full">
            <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
            >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </svg>

            <input
                ref={inputRef}
                className="w-full rounded-lg border border-border bg-surface py-3 pl-10 pr-4 text-foreground placeholder:text-text-muted focus:outline-2 focus:outline-focus"
                type="search"
                placeholder="Search by speaker, leader, or meeting type..."
                defaultValue={searchParams.get("query") ?? ""}
                onChange={(event) => handleSearch(event.target.value)}
                aria-label="Search meetings"
            />
        </div>
    );
}