import React from 'react';
import { useNavigate } from 'react-router-dom';
import {EyeIcon,HeartIcon,CloseIcon} from '../components/icons'


const Header = ({ onSignUpClick }) => {
    return (
        <header className="absolute top-0 left-0 right-0 z-10 p-4 sm:p-6">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Inkwell</h1>
                <div>
                    <button onClick={onSignUpClick} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    const heroBgUrl = 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?q=80&w=2070&auto=format&fit=crop';
    
    return (
        <section 
            className="min-h-screen flex items-center justify-center text-center p-4 bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroBgUrl}')` }}>
            <div className="max-w-3xl text-white">
                <h2 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">Discover Stories That Inspire.</h2>
                <p className="text-lg md:text-xl p-7 text-gray-300 mb-8">Dive into a world of creativity, knowledge, and passion. Find your next favorite read from our community of talented writers.</p>
                <a href="#featured-blogs" className="bg-blue-400 text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-full text-lg transition duration-300">
                    Explore Popular Blogs
                </a>
            </div>
        </section>
    );
};

const BlogCard = ({ blog, onCardClick }) => {
    return (
        <div 
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
            onClick={onCardClick}>
            <div className="relative">
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute top-4 left-4 text-white font-semibold">
                    <p>{blog.author}</p>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <span className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm text-white">
                        <HeartIcon />
                        {blog.likes}
                    </span>
                    <span className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm text-white">
                        <EyeIcon />
                        {blog.views}
                    </span>
                </div>
            </div>
            <div className="p-6">
                <h4 className="text-xl font-bold text-white">{blog.title}</h4>
            </div>
        </div>
    );
};

const FeaturedBlogs = ({ onCardClick }) => {
    const blogs = [
        { id: 1, title: 'The Art of Minimalist Web Design', author: 'Alex Johnson', likes: '1.2k', views: '25k', imageUrl: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop' },
        { id: 2, title: "A Freelancer's Guide to Productivity", author: 'Samantha Bee', likes: '3.4k', views: '42k', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, title: 'Unlocking the Power of AI in Writing', author: 'David Chen', likes: '980', views: '18k', imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop' },
    ];

    return (
        <section id="featured-blogs" className="py-20 sm:py-24 bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white">Most Popular Reads</h3>
                    <p className="text-gray-400 mt-2">Handpicked stories that our community is loving right now.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map(blog => (
                        <BlogCard key={blog.id} blog={blog} onCardClick={onCardClick} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-8">
            <div className="container mx-auto text-center text-gray-400">
                <p>&copy; {new Date().getFullYear()} Inkwell. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:text-white transition duration-300">Twitter</a>
                    <a href="#" className="hover:text-white transition duration-300">Instagram</a>
                    <a href="#" className="hover:text-white transition duration-300">LinkedIn</a>
                </div>
            </div>
        </footer>
    );
};



export default function App() {
     const navigate = useNavigate();

    const handleSignUpClick = () => {
    navigate("/signup");
    };

    return (
        <div className="bg-gray-900">
            <Header onSignUpClick={handleSignUpClick} />
            <main>
                <Hero />
                <FeaturedBlogs onCardClick={handleSignUpClick} />
            </main>
            <Footer />
        </div>
    );
}
