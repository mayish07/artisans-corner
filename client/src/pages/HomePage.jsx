// client/src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts, getProducts, getCategories } from '../features/productSlice';
import ProductCard from '../components/ProductCard';
import { formatPrice } from '../utils/formatCurrency';

const heroImages = [
  'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600',
  'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
  'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
  'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600',
];

const categories = [
  { name: 'Pottery', slug: 'pottery', icon: '🏺', color: 'from-amber-500 to-orange-500' },
  { name: 'Jewelry', slug: 'jewelry', icon: '💍', color: 'from-purple-500 to-pink-500' },
  { name: 'Textiles', slug: 'textiles', icon: '🧵', color: 'from-blue-500 to-cyan-500' },
  { name: 'Woodwork', slug: 'woodwork', icon: '🪵', color: 'from-amber-700 to-yellow-600' },
  { name: 'Art', slug: 'art', icon: '🎨', color: 'from-rose-500 to-red-500' },
  { name: 'Candles', slug: 'candles', icon: '🕯️', color: 'from-yellow-400 to-orange-400' },
];

export default function HomePage() {
  const dispatch = useDispatch();
  const { featuredProducts, products, items, categories: categoriesData, isLoading } = useSelector((state) => state.products);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getCategories());
    dispatch(getProducts({ limit: 12 }));
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const allProducts = featuredProducts.length > 0 ? featuredProducts : items;

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      {/* Hero Section */}
      <section className="relative min-h-[600px] md:min-h-[700px] overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 pt-16 md:pt-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
                <span className="text-amber-700 dark:text-amber-400 font-medium text-sm">Supporting Local Artisans</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
                Discover Unique{' '}
                <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                  Handmade
                </span>{' '}
                Treasures
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Shop from thousands of talented artisans and find one-of-a-kind pieces crafted with love, skill, and passion.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/shop"
                  className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
                >
                  Shop Now
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/become-seller"
                  className="group bg-white dark:bg-stone-800 border-2 border-amber-500 text-amber-600 dark:text-amber-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 dark:hover:bg-stone-700 transition-all flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Become a Seller
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-stone-700">
                <div>
                  <p className="text-3xl font-bold text-amber-600">500+</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Artisans</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-600">10K+</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-amber-600">50K+</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Happy Customers</p>
                </div>
              </div>
            </div>

            {/* Right Images */}
            <div className="relative hidden lg:block">
              <div className="relative w-full h-[500px]">
                {heroImages.map((img, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-700 ${
                      idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}
                  >
                    <div className="grid grid-cols-2 gap-4 h-full">
                      <div className="space-y-4">
                        <img
                          src={img}
                          alt={`Handmade ${idx + 1}`}
                          className="w-full h-48 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                        <img
                          src={heroImages[(idx + 1) % heroImages.length]}
                          alt={`Handmade ${idx + 2}`}
                          className="w-full h-40 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-4 pt-8">
                        <img
                          src={heroImages[(idx + 2) % heroImages.length]}
                          alt={`Handmade ${idx + 3}`}
                          className="w-full h-40 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                        <img
                          src={heroImages[(idx + 3) % heroImages.length]}
                          alt={`Handmade ${idx + 4}`}
                          className="w-full h-48 object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -left-8 top-1/4 bg-white dark:bg-stone-800 rounded-2xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                    <p className="text-sm text-gray-500">100% Protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" className="dark:fill-stone-900"/>
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our carefully curated categories to find the perfect handmade piece for you
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-stone-800 aspect-square hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
                  <span className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{cat.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors">{cat.name}</h3>
                  <span className="mt-2 text-sm text-gray-500 group-hover:text-white/80 transition-colors">Shop Now →</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/categories" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-4 transition-all">
              View All Categories
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="py-8 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Free Shipping</p>
                <p className="text-sm text-white/80">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Secure Payment</p>
                <p className="text-sm text-white/100%">100% Protected</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Easy Returns</p>
                <p className="text-sm text-white/80">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-sm text-white/80">Dedicated support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-stone-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Handpicked favorites from our artisans</p>
            </div>
            <Link
              to="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-amber-700 transition-colors"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-stone-700 rounded-2xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Artisan's Corner?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We're committed to providing the best handmade shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Unique Creations</h3>
              <p className="text-gray-600 dark:text-gray-400">Every piece is one-of-a-kind, made with passion and creativity by skilled artisans</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Support Artisans</h3>
              <p className="text-gray-600 dark:text-gray-400">Your purchase directly supports local artisans and their families</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">Each item is crafted with the finest materials and attention to detail</p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
              <p className="text-gray-600 dark:text-gray-400">Quick and reliable shipping to get your treasures to you safely</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-800 dark:to-stone-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-600 dark:text-gray-400">Fresh creations from our talented artisans</p>
            </div>
            <Link
              to="/shop?sort=newest"
              className="mt-4 md:mt-0 text-amber-600 font-semibold hover:underline"
            >
              See All New →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-amber-600 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Artisan Community
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Are you a talented artisan? Start selling your handmade products today and reach millions of customers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/become-seller"
              className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Selling
            </Link>
            <Link
              to="/stores"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Browse Artisans
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-white dark:bg-stone-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and artisan stories
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 dark:border-stone-700 focus:border-amber-500 dark:bg-stone-800 dark:text-white outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}