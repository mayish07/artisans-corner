// client/src/pages/WelcomePage.jsx
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Star, Heart, Sparkles, BookOpen } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: "The Art of Handcrafted Pottery: A Timeless Tradition",
    excerpt: "Discover the ancient techniques that modern artisans are keeping alive...",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600",
    category: "Craftsmanship",
    date: "April 25, 2026",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Meet Our Top Artisans: Stories of Passion & creativity",
    excerpt: "Five incredible creators share their journey in the handmade world...",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600",
    category: "Artist Spotlight",
    date: "April 24, 2026",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "Sustainable Crafting: eco-Friendly Materials in Modern Design",
    excerpt: "How artisans are embracing sustainability without compromising quality...",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600",
    category: "Sustainability",
    date: "April 23, 2026",
    readTime: "6 min read"
  },
  {
    id: 4,
    title: "The Rise of Handmade Jewelry: Trends for 2026",
    excerpt: "From minimalism to bold statement pieces, discover what's trending...",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600",
    category: "Trends",
    date: "April 22, 2026",
    readTime: "4 min read"
  }
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Found the most beautiful handcrafted vase for my home. The quality is amazing!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    name: "Rahul Verma",
    location: "Delhi",
    text: "Great platform to discover authentic Indian handicrafts. Highly recommended!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    name: "Anjali Patel",
    location: "Bangalore",
    text: "Love the variety and quality. My go-to for gifting handmade treasures.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
  }
];

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-lg border-b border-amber-100 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">🧵</span>
              <span className="font-serif text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Artisan's Corner
              </span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link to="/login" className="px-4 py-2 text-stone-700 dark:text-stone-200 font-medium hover:text-amber-600 transition-colors">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 transition-all hover:scale-105">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-700 dark:text-amber-400 font-medium text-sm">Your Gateway to Handmade Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Discover the Beauty of{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Handmade Crafts
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
              Connect with talented artisans, explore unique creations, and bring home pieces that tell a story.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                Explore Shop
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/become-seller"
                className="bg-white dark:bg-stone-800 border-2 border-amber-500 text-amber-600 dark:text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-all"
              >
                Become a Seller
              </Link>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20">
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1400"
              alt="Handmade crafts"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <p className="text-sm opacity-90 mb-1">Featured Collection</p>
              <h3 className="text-2xl md:text-3xl font-bold">Summer Handmade Collection 2026</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-white dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-amber-600">500+</p>
              <p className="text-gray-600 dark:text-gray-400">Artisans</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-600">10K+</p>
              <p className="text-gray-600 dark:text-gray-400">Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-600">50K+</p>
              <p className="text-gray-600 dark:text-gray-400">Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-amber-600">4.9</p>
              <p className="text-gray-600 dark:text-gray-400">Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles / News */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-semibold">Latest Stories</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                News & Articles
              </h2>
            </div>
            <Link to="/about" className="hidden md:flex items-center gap-2 text-amber-600 font-semibold hover:gap-4 transition-all">
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <article key={article.id} className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="relative overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-white/90 dark:bg-stone-900/90 px-3 py-1 rounded-full text-xs font-semibold text-amber-600">
                    {article.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <Link to={`/article/${article.id}`} className="inline-flex items-center gap-1 text-amber-600 font-semibold text-sm hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="md:hidden mt-8 text-center">
            <Link to="/about" className="inline-flex items-center gap-2 text-amber-600 font-semibold">
              View All Articles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Join thousands of happy customers who love our handmade products
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex gap-4 mb-4">
                  <Quote className="w-10 h-10 text-white/30 flex-shrink-0" />
                  <p className="text-white/90 italic">{testimonial.text}</p>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-white/30"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-white/70">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Categories
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Find the perfect handmade piece for you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Pottery', icon: '🏺', color: 'from-amber-500 to-orange-500' },
              { name: 'Jewelry', icon: '💎', color: 'from-purple-500 to-pink-500' },
              { name: 'Textiles', icon: '🧵', color: 'from-blue-500 to-cyan-500' },
              { name: 'Woodwork', icon: '🪵', color: 'from-amber-700 to-yellow-600' },
              { name: 'Art', icon: '🎨', color: 'from-rose-500 to-red-500' },
              { name: 'Candles', icon: '🕯️', color: 'from-yellow-400 to-orange-400' },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/categories/${cat.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-stone-800 aspect-square hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-4xl mb-2">{cat.icon}</span>
                  <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-stone-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-amber-500 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Explore?
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Start your journey into the world of handmade treasures
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-amber-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-600 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              to="/stores"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Meet Artisans
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-stone-900 py-12 border-t border-gray-200 dark:border-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧵</span>
              <span className="font-serif text-lg font-bold text-stone-900 dark:text-white">
                Artisan's Corner
              </span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link to="/about" className="hover:text-amber-600">About</Link>
              <Link to="/contact" className="hover:text-amber-600">Contact</Link>
              <Link to="/shop" className="hover:text-amber-600">Shop</Link>
              <Link to="/become-seller" className="hover:text-amber-600">Sell</Link>
            </div>
            <p className="text-sm text-gray-500">© 2026 Artisan's Corner. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}