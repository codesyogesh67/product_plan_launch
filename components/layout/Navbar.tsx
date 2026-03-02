// components/layout/Navbar.tsx
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-14 items-center justify-between">
          {/* Left: Brand */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-sky-500 text-white text-sm font-bold">
              LP
            </div>
            <span className="text-sm font-semibold text-zinc-900">
              Launch Planner
            </span>
          </Link>

          {/* Right: Navigation */}
          <div className="flex items-center gap-2 text-sm">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/">Plans</NavLink>
            {/* future */}
            <NavLink href="/today">Today</NavLink>
            {/* <NavLink href="/dashboard">Dashboard</NavLink> */}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-lg px-3 py-1.5 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition"
    >
      {children}
    </Link>
  );
}
