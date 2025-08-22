import { useMemo, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import logo from "../assets/logo.png"; // 1. Import the logo image


export default function Navbar({ user, dark, onToggleDark, onGo, onShowMyBlogs }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const initials = useMemo(
    () => (user?.lastname?.[0] || user?.firstname?.[0] || "U").toUpperCase(),
    [user]
  );

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin"); 
  };;

  return (
    <header className="relative z-10 border-b border-slate-200/60 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 transition-colors duration-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="h-8 w-8 object-cover rounded-full" />
          <span className="text-base font-semibold tracking-wide">BlogSite</span>
        </div>

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

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleDark}
            className="rounded-full border border-slate-200/60 bg-white/70 px-3 py-1 text-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:bg-white/90 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          <div className="relative">
            <button onClick={() => setOpen((o) => !o)}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/80 to-indigo-500/80 text-white shadow-lg ring-1 ring-white/20 transition-transform hover:scale-105"
              title={`${user?.firstname} ${user?.lastname}`}>
              <span className="font-semibold">{initials}</span>
            </button>

             {open && (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-700 bg-slate-800 shadow-2xl animate-fadeIn"
                onMouseLeave={() => setOpen(false)}>
                <div className="mb-2 rounded-xl bg-slate-700/50 p-3 text-sm">
                  <p className="font-medium text-slate-200">{user.email}</p>
                  <p className="text-slate-400">{user.firstname} {user.lastname}</p>
                </div>

                <div className="space-y-1 text-sm">
                   <button onClick={onShowMyBlogs} className="w-full rounded-lg px-3 py-2 text-left text-slate-300 hover:bg-slate-700">
                    My blogs
                   </button>
                  <button className="w-full rounded-lg px-3 py-2 text-left text-slate-300 hover:bg-slate-700">
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2 text-left text-rose-400 hover:bg-rose-500/20 transition">
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
