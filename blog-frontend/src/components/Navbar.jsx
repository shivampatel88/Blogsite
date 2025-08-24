import { useMemo, useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext"; 
import { Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/logo.png";


export default function Navbar({ user, onGo, onShowMyBlogs }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { dark, toggleTheme } = useTheme(); 


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
          <button onClick={() => onGo?.("/home")} className="opacity-80 hover:opacity-100 transition">Home</button>
          <button onClick={() => onGo?.("/about")} className="opacity-80 hover:opacity-100 transition">About us</button>
          <button onClick={() => onGo?.("/contact")} className="opacity-80 hover:opacity-100 transition">Contact us</button>
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={toggleTheme}
            className="relative h-8 w-14 rounded-full flex items-center justify-center border border-slate-200/60 dark:border-white/10 bg-slate-200/50 dark:bg-slate-800/50 transition-colors duration-500">
            <AnimatePresence>
              {dark ? (
                <motion.div key="moon" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                  <Moon size={16} className="text-yellow-300" />
                </motion.div>
              ) : (
                <motion.div key="sun" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}>
                  <Sun size={16} className="text-orange-500" />
                </motion.div>
              )}
            </AnimatePresence>
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
