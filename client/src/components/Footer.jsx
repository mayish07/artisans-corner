// client/src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  shop: [
    { name: 'All Products', to: '/shop' },
    { name: 'Categories', to: '/categories' },
    { name: 'Featured', to: '/shop?featured=true' },
    { name: 'New Arrivals', to: '/shop?new=true' },
    { name: 'Best Sellers', to: '/shop?bestseller=true' },
  ],
  sell: [
    { name: 'Become a Seller', to: '/become-seller' },
    { name: 'Seller Dashboard', to: '/dashboard/seller' },
    { name: 'Seller Guidelines', to: '/seller-guidelines' },
    { name: 'Commission Rates', to: '/commissions' },
    { name: 'Success Stories', to: '/success-stories' },
  ],
  support: [
    { name: 'Contact Us', to: '/contact' },
    { name: 'FAQs', to: '/faq' },
    { name: 'Shipping Info', to: '/shipping' },
    { name: 'Returns & Refunds', to: '/returns' },
    { name: 'Track Order', to: '/track' },
  ],
  company: [
    { name: 'About Us', to: '/about' },
    { name: 'Our Story', to: '/about#story' },
    { name: 'Careers', to: '/careers' },
    { name: 'Press', to: '/press' },
    { name: 'Blog', to: '/blog' },
  ],
};

const socialLinks = [
  { icon: 'facebook', href: '#', label: 'Facebook' },
  { icon: 'twitter', href: '#', label: 'Twitter' },
  { icon: 'instagram', href: '#', label: 'Instagram' },
  { icon: 'youtube', href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-stone-900 dark:bg-black text-stone-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Stay in the Loop</h3>
              <p className="text-amber-100">Get exclusive offers, new arrivals, and artisan stories delivered to your inbox</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto gap-3">
              <div className="relative flex-1 md:w-80">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  required
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-stone-900 text-white px-6 py-4 rounded-full font-semibold hover:bg-stone-800 transition-colors whitespace-nowrap"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🧵</span>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-white">Artisan's Corner</span>
                <p className="text-xs text-stone-500">Handmade with Love</p>
              </div>
            </Link>
            <p className="text-sm text-stone-400 mb-6 leading-relaxed">
              Connecting artisans with lovers of handmade crafts. Every purchase supports local craftsmanship and sustainable livelihoods.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -2 }}
                  className="p-2 bg-stone-800 rounded-full hover:bg-amber-600 transition-colors"
                >
                  <SocialIcon name={icon} className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-amber-500 transition-colors flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Sell</h4>
            <ul className="space-y-3">
              {footerLinks.sell.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-amber-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-amber-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-amber-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-stone-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Secure Shopping', desc: '256-bit SSL encryption' },
              { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹999' },
              { icon: RotateCcw, title: 'Easy Returns', desc: '30-day return policy' },
              { icon: Headphones, title: '24/7 Support', desc: 'Always here to help' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-white">{title}</p>
                  <p className="text-xs text-stone-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-stone-500">
            &copy; {new Date().getFullYear()} Artisan's Corner. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-stone-500">
            <Link to="/privacy" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-amber-500 transition-colors">Cookie Policy</Link>
          </div>
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <span>Made with</span>
            <span className="text-red-500">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Shield(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function Truck(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-4" />
      <path d="M15 18H9" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function RotateCcw(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}

function Headphones(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function SocialIcon({ name, className }) {
  const icons = {
    facebook: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    twitter: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
    instagram: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    youtube: (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="none" stroke="currentColor" strokeWidth="2" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
      </svg>
    ),
  };
  return icons[name] || null;
}