import { Outlet, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <nav className="p-4 bg-black text-white flex justify-between">
        <h1 className="text-xl font-bold">BlogSite</h1>
        <div className="space-x-4">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default App;
