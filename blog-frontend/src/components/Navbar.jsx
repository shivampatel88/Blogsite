// Navbar.jsx
import { useMemo, useState } from "react";

export default function Navbar({ user, dark, onToggleDark, onGo }) {
  const [open, setOpen] = useState(false);
  const initials = useMemo(
    () => (user?.lastname?.[0] || user?.firstname?.[0] || "U").toUpperCase(),
    [user]
  );

  const handleLogout = () => {
    localStorage.removeItem("token"); // ✅ Clear JWT
    onGo?.("/login"); // Redirect to login page
  };

  return (
    <header className="relative z-10 border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 transition-colors duration-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/70 to-cyan-400/70 text-white shadow-md ring-1 ring-white/20 transition-all">
            <span className="text-lg font-bold">B</span>
          </div>
          <span className="text-base font-semibold tracking-wide">BlogSite</span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <button onClick={() => onGo?.("/home")} className="opacity-80 hover:opacity-100 transition">
            Home
          </button>
          <button onClick={() => onGo?.("/about")} className="opacity-80 hover:opacity-100 transition">
            About us
          </button>
          <button onClick={() => onGo?.("/contact")} className="opacity-80 hover:opacity-100 transition">
            Contact us
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Dark toggle */}
          <button
            onClick={onToggleDark}
            className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/80 to-indigo-500/80 text-white shadow-lg ring-1 ring-white/20 transition-transform hover:scale-105"
              title={`${user?.firstname} ${user?.lastname}`}>
              <span className="font-semibold">{initials}</span>
            </button>

            {open && (
              <div
                className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200/10 bg-white/60 p-3 shadow-2xl backdrop-blur-lg animate-fadeIn dark:border-white/10 dark:bg-white/10"
                onMouseLeave={() => setOpen(false)}
              >
                <div className="mb-2 rounded-xl bg-slate-100/60 p-3 text-sm dark:bg-white/10">
                  <p className="font-medium">@{user.email}</p>
                  <p className="opacity-70">{user.firstname} {user.lastname}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100/80 dark:hover:bg-white/10">
                    My blogs
                  </button>
                  <button className="w-full rounded-lg px-3 py-2 text-left hover:bg-slate-100/80 dark:hover:bg-white/10">
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-500/10 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
