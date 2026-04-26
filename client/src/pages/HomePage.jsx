// client/src/pages/HomePage.jsx
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Heart, Shield, Truck, RefreshCw, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800', alt: 'Handcrafted Pottery' },
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800', alt: 'Artisan Jewelry' },
  { src: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800', alt: 'Handwoven Textiles' },
];

const categories = [
  { name: 'Pottery', slug: 'pottery', icon: '🏺', color: 'from-amber-500 to-orange-500', desc: 'Hand-thrown & glazed' },
  { name: 'Jewelry', slug: 'jewelry', icon: '💍', color: 'from-purple-500 to-pink-500', desc: 'Silver, gold & gems' },
  { name: 'Textiles', slug: 'textiles', icon: '🧵', color: 'from-blue-500 to-cyan-500', desc: 'Woven & printed' },
  { name: 'Woodwork', slug: 'woodwork', icon: '🪵', color: 'from-amber-700 to-yellow-600', desc: 'Carved & crafted' },
  { name: 'Art', slug: 'art', icon: '🎨', color: 'from-rose-500 to-red-500', desc: 'Paintings & murals' },
  { name: 'Candles', slug: 'candles', icon: '🕯️', color: 'from-yellow-400 to-orange-400', desc: 'Scented & natural' },
];

const products = [
  { _id: '1', name: 'Handcrafted Ceramic Vase', price: 89, image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600', rating: 4.8, reviews: 24, store: 'Earth & Clay', badge: 'Trending' },
  { _id: '2', name: 'Silver Kundan Necklace', price: 450, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600', rating: 4.9, reviews: 56, store: 'Heritage Jewelry', badge: 'Bestseller' },
  { _id: '3', name: 'Handwoven Silk Saree', price: 1200, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600', rating: 4.7, reviews: 18, store: 'Silk Road', badge: 'New' },
  { _id: '4', name: 'Carved Wooden Box', price: 250, image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600', rating: 4.6, reviews: 32, store: 'Wood Wonders', badge: null },
  { _id: '5', name: 'Abstract Oil Painting', price: 1800, image: 'https://images.unsplash.com/photo-1578926288207-a90a5366759d?w=600', rating: 5.0, reviews: 8, store: 'Canvas Studio', badge: 'Premium' },
  { _id: '6', name: 'Scented Soy Candle Set', price: 65, image: 'https://images.unsplash.com/photo-1602607434848-c1d2e3c2a299?w=600', rating: 4.5, reviews: 67, store: 'Flame & Wick', badge: 'Bestseller' },
];

const testimonials = [
  { name: 'Priya Sharma', text: 'Found the most beautiful handcrafted vase for my living room. The quality exceeded my expectations!', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', location: 'Mumbai' },
  { name: 'Rahul Verma', text: 'Amazing platform for authentic Indian handicrafts. My grandmother loved the silk saree!', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', location: 'Delhi' },
  { name: 'Anjali Patel', text: 'Love the variety and quality. My go-to for unique gifting ideas. Fast delivery too!', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150', location: 'Bangalore' },
];

const trustBadges = [
  { icon: Shield, title: 'Secure Payment', desc: '100% protected transactions' },
  { icon: Truck, title: 'Free Shipping', desc: 'On orders above ₹999' },
  { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
  { icon: Award, title: 'Verified Artisans', desc: 'Quality assured products' },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product, index }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group relative"
    >
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-gray-800 dark:to-gray-900">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
            />
          </div>
          
          {product.badge && (
            <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold rounded-full ${
              product.badge === 'Bestseller' ? 'bg-amber-500 text-white' :
              product.badge === 'New' ? 'bg-green-500 text-white' :
              product.badge === 'Trending' ? 'bg-pink-500 text-white' :
              'bg-purple-500 text-white'
            }`}>
              {product.badge}
            </span>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full bg-white text-gray-900 py-3 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-colors">
              Quick View
            </button>
          </div>
          
          <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        
        <div className="pt-4 space-y-2">
          <p className="text-sm text-amber-600 font-medium">{product.store}</p>
          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price.toLocaleString()}</p>
            <span className="text-sm text-green-600 font-medium">In Stock</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="relative"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">"{testimonial.text}"</p>
        <div className="flex items-center gap-4">
          <img 
            src={testimonial.image} 
            alt={testimonial.name} 
            className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-500" 
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-stone-900" />
        
        <div className="relative max-w-7xl mx-auto px-4 pt-20 md:pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[70vh]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-amber-100 dark:bg-amber-900/30 px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span className="text-amber-700 dark:text-amber-400 font-medium text-sm">Supporting 500+ Local Artisans</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6"
              >
                Discover{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                    Unique
                  </span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-amber-500/20 rounded-full origin-left"
                  />
                </span>{' '}
                Handmade Treasures
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl"
              >
                Connect with talented artisans, explore unique creations, and bring home pieces that tell a story. Every purchase supports local craftsmanship.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/shop" className="group bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5">
                  Explore Shop <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/become-seller" className="group border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all inline-flex items-center justify-center gap-2">
                  Become a Seller <Sparkles className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[600px] w-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={heroImages[currentSlide].src} 
                      alt={heroImages[currentSlide].alt}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
                  </motion.div>
                </AnimatePresence>
                
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
                
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-white w-8' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute -bottom-10 left-0 right-0 h-20 bg-white dark:bg-gray-900" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-gray-800 dark:to-gray-800/50 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-4">
                  <badge.icon className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.desc}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Artisans' },
              { number: '10,000+', label: 'Products' },
              { number: '50,000+', label: 'Happy Customers' },
              { number: '4.9/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-white">
                <p className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-amber-200 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-stone-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Explore</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">Shop by Category</motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
              Discover handcrafted products across various categories, each made with love and expertise
            </motion.p>
          </AnimatedSection>
          
          <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeInUp} whileHover={{ y: -8 }}>
                <Link to={`/categories/${cat.slug}`} className="group relative block">
                  <div className="relative overflow-hidden rounded-2xl aspect-square">
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="absolute inset-0 bg-stone-200 dark:bg-gray-700 group-hover:opacity-0 transition-opacity duration-300" />
                    <div className="relative h-full flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-white transition-colors">{cat.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{cat.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <motion.span variants={fadeInUp} className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Handpicked for You</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4">Featured Products</motion.h2>
            </div>
            <motion.div variants={fadeInUp}>
              <Link to="/shop" className="group inline-flex items-center gap-2 text-amber-600 font-semibold hover:text-amber-700 transition-colors">
                View All Products <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </AnimatedSection>
          
          <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="pattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="white" />
            </pattern>
            <rect width="100" height="100" fill="url(#pattern)" />
          </svg>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Are You an Artisan?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join our community of talented makers and reach thousands of customers looking for unique handcrafted products.
          </p>
          <Link to="/become-seller" className="inline-flex items-center gap-2 bg-white text-amber-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-xl">
            Start Selling Today <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-stone-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <motion.span variants={fadeInUp} className="text-amber-600 font-semibold text-sm tracking-wider uppercase">Reviews</motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-4 mb-6">What Our Customers Say</motion.h2>
          </AnimatedSection>
          
          <AnimatedSection className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <TestimonialCard key={i} testimonial={testimonial} index={i} />
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">Subscribe to get exclusive offers and new arrivals</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500 focus:outline-none dark:bg-gray-800 dark:text-white"
              />
              <button type="submit" className="bg-amber-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}