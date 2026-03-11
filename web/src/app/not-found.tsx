import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white px-4 py-16 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
          404
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900 md:text-6xl">
          Page Not Found
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            Go To Home
          </Link>

          <Link
            href="/products"
            className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  )
}