// client/src/pages/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart } from 'lucide-react';

const heroImages = [
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
];

const categories = [
  { name: 'Pottery', slug: 'pottery', icon: '🏺', color: 'from-amber-500 to-orange-500' },
  { name: 'Jewelry', slug: 'jewelry', icon: '💍', color: 'from-purple-500 to-pink-500' },
  { name: 'Textiles', slug: 'textiles', icon: '🧵', color: 'from-blue-500 to-cyan-500' },
  { name: 'Woodwork', slug: 'woodwork', icon: '🪵', color: 'from-amber-700 to-yellow-600' },
  { name: 'Art', slug: 'art', icon: '🎨', color: 'from-rose-500 to-red-500' },
  { name: 'Candles', slug: 'candles', icon: '🕯️', color: 'from-yellow-400 to-orange-400' },
];

const products = [
  { _id: '1', name: 'Handcrafted Ceramic Vase', price: 89, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400', rating: 4.8, reviews: 24, store: 'Earth & Clay' },
  { _id: '2', name: 'Silver Kundan Necklace', price: 450, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400', rating: 4.9, reviews: 56, store: 'Heritage Jewelry' },
  { _id: '3', name: 'Handwoven Silk Saree', price: 1200, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400', rating: 4.7, reviews: 18, store: 'Silk Road' },
  { _id: '4', name: 'Carved Wooden Box', price: 250, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', rating: 4.6, reviews: 32, store: 'Wood Wonders' },
  { _id: '5', name: 'Abstract Oil Painting', price: 1800, image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=400', rating: 5.0, reviews: 8, store: 'Canvas Studio' },
  { _id: '6', name: 'Scented Soy Candle Set', price: 65, image: 'https://images.unsplash.com/photo-1602607434848-c1d2e3c2a299?w=400', rating: 4.5, reviews: 67, store: 'Flame & Wick' },
];

const testimonials = [
  { name: 'Priya Sharma', text: 'Found the most beautiful handcrafted vase!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { name: 'Rahul Verma', text: 'Great platform for authentic Indian handicrafts.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { name: 'Anjali Patel', text: 'Love the variety and quality. My go-to for gifting!', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[600px] overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-amber-700 font-medium text-sm">Supporting Local Artisans</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover Unique{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Handmade
                </span>{' '}
                Treasures
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Connect with talented artisans, explore unique creations, and bring home pieces that tell a story.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/shop" className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors inline-flex items-center justify-center gap-2">
                  Explore Shop <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/become-seller" className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-amber-50 transition-colors">
                  Become a Seller
                </Link>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={heroImages[0]} alt="Handmade" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                  <img src={heroImages[1]} alt="Pottery" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                </div>
                <div className="space-y-4 pt-8">
                  <img src={heroImages[2]} alt="Jewelry" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                  <img src={heroImages[1]} alt="Crafts" className="rounded-2xl shadow-lg w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl font-bold text-white">500+</p><p className="text-amber-200">Artisans</p></div>
            <div><p className="text-4xl font-bold text-white">10K+</p><p className="text-amber-200">Products</p></div>
            <div><p className="text-4xl font-bold text-white">50K+</p><p className="text-amber-200">Customers</p></div>
            <div><p className="text-4xl font-bold text-white">4.9</p><p className="text-amber-200">Rating</p></div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} to={`/categories/${cat.slug}`} className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-square hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <h3 className="font-bold text-gray-900 group-hover:text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/shop" className="text-amber-600 font-semibold hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-amber-50">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-amber-600" />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-amber-600 mb-1">{product.store}</p>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                  <p className="text-xl font-bold text-amber-600">₹{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-amber-600">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-white/90 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full" />
                  <p className="font-semibold">{t.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-gray-600 mb-8">Start your journey into the world of handmade treasures</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700">
              Browse Products
            </Link>
            <Link to="/stores" className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-amber-50">
              Meet Artisans
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
