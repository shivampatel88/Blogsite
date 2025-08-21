import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PenTool, Zap, Users, ShieldCheck, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar'; // Assuming a shared Navbar
import logo from '../assets/logo.png';

const FeatureCard = ({ icon, title, children }) => (
  <motion.div
    className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 shadow-lg"
    whileHover={{ y: -5, boxShadow: '0px 10px 20px rgba(0,0,0,0.2)' }}
  >
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-indigo-500/20 mb-4 border border-indigo-400/30">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{children}</p>
  </motion.div>
);

export default function AboutPage() {
  const navigate = useNavigate();
  const CURRENT_USER = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={CURRENT_USER} dark={true} onGo={(path) => navigate(path)} />

      <main className="container mx-auto px-4 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img src={logo} alt="BlogSite Logo" className="mx-auto h-24 w-24 mb-4" />
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            Our Mission: Your Voice
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-300">
            At BlogSite, we believe that every idea, story, and perspective deserves a platform. We're dedicated to providing a simple, elegant, and powerful space for writers and readers to connect, share, and grow.
          </p>
        </motion.section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Writers Love BlogSite</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon={<PenTool className="text-indigo-300" />}>
              Beautiful Editor
              {/* This <p> tag is the nested child, which is invalid. Change it to a <span> or <div> */}
              <span className="block mt-1">Focus on your writing with a clean, intuitive, and powerful editor that gets out of your way.</span>
            </FeatureCard>
            <FeatureCard icon={<Zap className="text-indigo-300" />}>
              Instant Publishing
              <span className="block mt-1">Go from draft to live in seconds. Share your thoughts with the world without any friction.</span>
            </FeatureCard>
            <FeatureCard icon={<Users className="text-indigo-300" />}>
              Community Engagement
              <span className="block mt-1">Connect with your readers through likes and comments. Build a loyal following around your passion.</span>
            </FeatureCard>
            <FeatureCard icon={<ShieldCheck className="text-indigo-300" />}>
              Secure & Private
              <span className="block mt-1">You own your content. With secure authentication, your account and your blogs are always safe.</span>
            </FeatureCard>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          className="bg-gradient-to-r from-indigo-500/30 to-purple-500/30 rounded-3xl p-8 sm:p-12 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-white">Ready to Share Your Story?</h2>
          <p className="mt-2 text-gray-300 max-w-xl mx-auto">
            Join thousands of writers who have found their home on BlogSite. It's free and only takes a minute to get started.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="mt-6 inline-flex items-center gap-2 bg-white text-gray-900 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-transform hover:scale-105"
          >
            Start Writing Now <ArrowRight size={20} />
          </button>
        </motion.section>
      </main>

      <footer className="text-center py-8 border-t border-white/10">
        <p className="text-gray-500">&copy; {new Date().getFullYear()} BlogSite. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
