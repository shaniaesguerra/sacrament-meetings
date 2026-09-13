export default function Footer() {
  return (
    <footer className="px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-2xl bg-card/10 p-4 shadow-lg">
        <p className="text-center text-foreground font-mono">
          Copyright &copy; {new Date().getFullYear()} | Shania Esguerra |
          All rights reserved
        </p>
      </div>
    </footer>
  );
}