import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignIn from './components/Signin';
import SignUp from './components/signup';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';
import './index.css';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>}>
        <Route index element={<SignUp />} />
        {/* <Route path="home" element={<Home />} /> */}
        <Route path = "signin" element={<SignIn/>} />
        <Route path="signup" element={<SignUp />} />
        {/* <Route path="about" element={<About />} /> */}
        {/* <Route path="contact" element={<Contact />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
);
