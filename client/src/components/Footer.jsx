// client/src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🧵</span>
              <span className="font-bold text-xl text-white">Artisan's Corner</span>
            </div>
            <p className="text-sm text-gray-400">
              Discover unique handmade treasures from talented artisans around the world.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-amber-500">All Products</Link></li>
              <li><Link to="/categories/jewelry" className="hover:text-amber-500">Jewelry</Link></li>
              <li><Link to="/categories/pottery" className="hover:text-amber-500">Pottery</Link></li>
              <li><Link to="/categories/textiles" className="hover:text-amber-500">Textiles</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Sell</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/become-seller" className="hover:text-amber-500">Become a Seller</Link></li>
              <li><Link to="/dashboard/seller" className="hover:text-amber-500">Seller Dashboard</Link></li>
              <li><Link to="/seller-resources" className="hover:text-amber-500">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Help</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-amber-500">Help Center</Link></li>
              <li><Link to="/contact" className="hover:text-amber-500">Contact Us</Link></li>
              <li><Link to="/shipping" className="hover:text-amber-500">Shipping Info</Link></li>
              <li><Link to="/returns" className="hover:text-amber-500">Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Artisan's Corner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
