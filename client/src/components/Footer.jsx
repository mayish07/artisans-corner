import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧵</span>
              <span className="font-serif text-xl text-white">Artisan's Corner</span>
            </div>
            <p className="text-sm text-stone-400">
              Discover unique handmade treasures from talented artisans around the world.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="mailto:support@artisanscorner.com" className="p-2 hover:text-amber-500"><Mail className="w-5 h-5" /></a>
              <a href="tel:+1234567890" className="p-2 hover:text-amber-500"><Phone className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-amber-500">All Products</Link></li>
              <li><Link to="/categories" className="hover:text-amber-500">Categories</Link></li>
              <li><Link to="/stores" className="hover:text-amber-500">Our Artisans</Link></li>
              <li><Link to="/search?q=" className="hover:text-amber-500">Search</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-white mb-4">Sell</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/become-seller" className="hover:text-amber-500">Become a Seller</Link></li>
              <li><Link to="/dashboard/seller" className="hover:text-amber-500">Seller Dashboard</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-white mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="hover:text-amber-500">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">Shipping Info</Link></li>
              <li><Link to="/about" className="hover:text-amber-500">Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Artisan's Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}