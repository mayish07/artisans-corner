import { motion } from 'framer-motion';
import { Heart, Sparkles, Users, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { value: '2,500+', label: 'Artisan Makers', icon: Users },
  { value: '15,000+', label: 'Unique Products', icon: Sparkles },
  { value: '45+', label: 'Countries Served', icon: Globe },
  { value: '98%', label: 'Happy Customers', icon: Heart },
];

const steps = [
  { num: '1', title: 'Discover', desc: 'Browse thousands of handcrafted items from talented artisans worldwide' },
  { num: '2', title: 'Connect', desc: 'Message sellers directly, ask questions, and request custom orders' },
  { num: '3', title: 'Purchase', desc: 'Secure checkout with Stripe, multiple payment options' },
  { num: '4', title: 'Receive', desc: 'Track your order and enjoy your unique handmade treasure' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative bg-gradient-to-b from-stone-900 to-stone-800 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-6xl text-white mb-6"
          >
            Crafting Connections
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-stone-300 max-w-2xl mx-auto"
          >
            Artisan's Corner is a curated marketplace connecting passionate makers with discerning buyers who appreciate the beauty of handmade goods.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <div className="font-serif text-3xl md:text-4xl text-stone-900 mb-1">{stat.value}</div>
              <div className="text-stone-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-stone-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl text-center text-stone-900 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500 text-white font-serif text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="font-serif text-xl text-stone-900 mb-2">{step.title}</h3>
                <p className="text-stone-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl text-stone-900 mb-6">Join Our Community</h2>
        <p className="text-lg text-stone-600 mb-8">
          Whether you're a maker looking to share your craft or a buyer seeking something unique, we'd love to have you join our community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="px-6 py-3 bg-amber-500 text-white rounded-button hover:bg-amber-600 transition flex items-center">
            Start Selling <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link to="/shop" className="px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-button hover:bg-amber-50 transition">
            Browse Products
          </Link>
        </div>
      </div>

      <div className="bg-stone-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-2xl text-white mb-4">The Artisan's Corner Team</h2>
          <p className="text-stone-400">
            Founded in 2024 with a mission to empower artisans and celebrate handmade craftsmanship.
          </p>
        </div>
      </div>
    </div>
  );
}