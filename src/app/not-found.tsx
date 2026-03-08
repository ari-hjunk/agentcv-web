import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-6 text-white">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-240px] h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      <section className="text-center">
        <h1 className="text-7xl font-bold tracking-tight md:text-8xl">404</h1>
        <p className="mt-4 text-lg text-white/70 md:text-xl">Page not found</p>
        <Link
          href="/"
          className="mt-8 inline-flex h-11 items-center rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-medium transition-colors hover:bg-white/10"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
