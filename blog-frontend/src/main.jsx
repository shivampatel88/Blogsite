import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignIn from './components/Signin';
import SignUp from './components/signup';
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog';
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/signin" element={<SignIn/>} />
    </Routes>
  </BrowserRouter>
);

