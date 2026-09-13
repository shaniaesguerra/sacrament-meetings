export default function Loading() {
  return (
    <main className="mx-auto grid max-w-7xl gap-6 p-4 md:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-80 animate-pulse rounded-2xl bg-card/40"
        />
      ))}
    </main>
  );
}