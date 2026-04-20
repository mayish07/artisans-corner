import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';

const faqs = [
  { q: 'How do I become a seller?', a: 'Click "Become a Seller" in your account, fill out the form, and start listing products instantly.' },
  { q: 'How are artisans verified?', a: 'We verify all sellers by email and ID before allowing them to list products. Each store is manually reviewed.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards, PayPal, and Apple Pay through Stripe.' },
  { q: 'How do returns work?', a: 'Each seller sets their own return policy. Check the store policies before purchasing.' },
  { q: 'How long does shipping take?', a: 'Shipping times vary by seller. Most items ship within 3-7 business days.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-stone-900 to-stone-800 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">Contact Us</h1>
          <p className="text-stone-300 text-lg">We'd love to hear from you</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-6 bg-white rounded-product shadow-card"
          >
            <Mail className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg mb-1">Email</h3>
            <p className="text-stone-600">support@artisanscorner.com</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-6 bg-white rounded-product shadow-card"
          >
            <Phone className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg mb-1">Phone</h3>
            <p className="text-stone-600">+1 (555) 123-4567</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-6 bg-white rounded-product shadow-card"
          >
            <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
            <h3 className="font-serif text-lg mb-1">Hours</h3>
            <p className="text-stone-600">Mon-Fri 9am-6pm EST</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-serif text-2xl text-stone-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
                />
              </div>
              <select
                value={form.subject}
                onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none"
              >
                <option value="">Select Subject</option>
                <option value="order">Order Issue</option>
                <option value="seller">Become a Seller</option>
                <option value="support">Technical Support</option>
                <option value="other">Other</option>
              </select>
              <textarea
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                className="w-full px-4 py-3 rounded-button border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full px-6 py-3 bg-amber-500 text-white rounded-button hover:bg-amber-600 transition flex items-center justify-center disabled:opacity-50"
              >
                {submitting ? 'Sending...' : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-serif text-2xl text-stone-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-stone-200 rounded-button overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-4 py-3 flex items-center justify-between text-left bg-white hover:bg-stone-50"
                  >
                    <span className="font-medium text-stone-900">{faq.q}</span>
                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-stone-500" /> : <ChevronDown className="w-5 h-5 text-stone-500" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 py-3 bg-stone-50 text-stone-600 text-sm">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}