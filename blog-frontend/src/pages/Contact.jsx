import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const CURRENT_USER = JSON.parse(localStorage.getItem("user")) || null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., send an email or save to a database)
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar user={CURRENT_USER} dark={true} onGo={(path) => navigate(path)} />

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-300 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
            Have a question, a suggestion, or just want to say hello? We'd love to hear from you.
          </p>
        </motion.section>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-gray-800/50 p-8 rounded-2xl border border-white/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckCircle2 className="text-green-400 h-16 w-16 mb-4" />
                <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                <p className="text-gray-300 mt-2">Your message has been sent. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Send us a Message</h3>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input type="text" id="name" required className="w-full bg-gray-700/50 rounded-lg border-white/10 px-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                  <input type="email" id="email" required className="w-full bg-gray-700/50 rounded-lg border-white/10 px-4 py-2 focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea id="message" rows="5" required className="w-full bg-gray-700/50 rounded-lg border-white/10 px-4 py-2 focus:ring-2 focus:ring-indigo-500"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-transform hover:scale-105"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <Mail className="text-indigo-300 h-8 w-8 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-white">Email Us</h4>
                <p className="text-gray-400">For support or any inquiries.</p>
                <a href="mailto:support@blogsite.com" className="text-indigo-400 hover:underline">support@blogsite.com</a>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <Phone className="text-indigo-300 h-8 w-8 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-white">Call Us</h4>
                <p className="text-gray-400">Mon-Fri from 9am to 5pm.</p>
                <a href="tel:+1234567890" className="text-indigo-400 hover:underline">(+91) 987-654-3210</a>
              </div>
            </div>
             <div className="bg-gray-800/50 p-6 rounded-2xl border border-white/10 flex items-start gap-4">
              <MapPin className="text-indigo-300 h-8 w-8 mt-1" />
              <div>
                <h4 className="text-xl font-bold text-white">Our Office</h4>
                <p className="text-gray-400">123 Tech Avenue, Silicon Valley</p>
                <p className="text-indigo-400">Vadodara, Gujarat, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
