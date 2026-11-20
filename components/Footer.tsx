const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm text-text-secondary">
          Copyright &copy; {CURRENT_YEAR} Sacrament Meeting Planner. Shania Esguerra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}