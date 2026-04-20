require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artisans-corner';

const categories = ['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art', 'Candles', 'Leather', 'Other'];

const productData = [
  { title: 'Handcrafted Silver Moon Ring', category: 'Jewelry', price: 89.99, description: 'A beautiful handcrafted silver ring featuring a crescent moon design. Perfect for everyday wear or special occasions. Made with hypoallergenic sterling silver.', tags: ['silver', 'ring', 'moon', 'handmade'], materials: ['Sterling Silver', 'Moonstone'] },
  { title: 'Ceramic Pour-Over Coffee Set', category: 'Pottery', price: 64.99, description: 'Artisan-made ceramic pour-over coffee dripper with matching mug. Each piece is unique with beautiful glaze variations. Dishwasher and microwave safe.', tags: ['coffee', 'ceramic', 'kitchen', 'handmade'], materials: ['Stoneware Clay', 'Food-safe Glaze'] },
  { title: 'Handwoven Wool Throw Blanket', category: 'Textiles', price: 149.99, description: 'Luxuriously soft handwoven wool throw blanket in natural earth tones. Perfect for cozy evenings. Each blanket takes approximately 8 hours to complete.', tags: ['wool', 'blanket', 'woven', 'home'], materials: ['Merino Wool', 'Cotton Warp'] },
  { title: 'Carved Walnut Cutting Board', category: 'Woodwork', price: 78.99, description: 'Solid walnut cutting board with natural edges. Hand-carved and finished with food-safe mineral oil. Includes a convenient hanging hole.', tags: ['walnut', 'cutting board', 'kitchen', 'wood'], materials: ['Black Walnut', 'Mineral Oil'] },
  { title: 'Abstract Fluid Art Print', category: 'Art', price: 125.00, description: 'Vibrant abstract fluid art print on premium archival paper. Each print is signed and numbered by the artist. Available in multiple sizes.', tags: ['abstract', 'art', 'print', 'wall decor'], materials: ['Archival Paper', 'Acrylic Paint'] },
  { title: 'Lavender Soy Candle Set', category: 'Candles', price: 34.99, description: 'Set of 3 hand-poured soy candles infused with pure lavender essential oil. Clean-burning and long-lasting. 45+ hours burn time each.', tags: ['candle', 'lavender', 'soy', 'scented'], materials: ['Soy Wax', 'Lavender Essential Oil', 'Cotton Wick'] },
  { title: 'Leather Messenger Bag', category: 'Leather', price: 189.99, description: 'Hand-stitched full-grain leather messenger bag. Features adjustable strap, multiple pockets, and brass hardware. Ages beautifully over time.', tags: ['leather', 'bag', 'messenger', 'handmade'], materials: ['Full-grain Leather', 'Brass Hardware'] },
  { title: 'Macrame Plant Hanger', category: 'Other', price: 28.99, description: 'Bohemian-style macrame plant hanger made from natural cotton cord. Fits pots up to 8 inches in diameter. Perfect for indoor plants.', tags: ['macrame', 'plant hanger', 'boho', 'home decor'], materials: ['Natural Cotton Cord', 'Wooden Beads'] },
  { title: 'Gold Plated Hoop Earrings', category: 'Jewelry', price: 45.99, description: 'Classic gold-plated hoop earrings with a modern twist. Lightweight and comfortable for all-day wear. Hypoallergenic posts.', tags: ['gold', 'hoops', 'earrings', 'jewelry'], materials: ['Gold Plated Brass', 'Sterling Silver Posts'] },
  { title: 'Speckled Stoneware Vase', category: 'Pottery', price: 55.99, description: 'Minimalist speckled stoneware vase with a matte finish. Perfect for single stems or small arrangements. Watertight seal for fresh flowers.', tags: ['vase', 'stoneware', 'pottery', 'home'], materials: ['Stoneware Clay', 'Matte Glaze'] },
  { title: 'Hand-Dyed Silk Scarf', category: 'Textiles', price: 89.99, description: 'Luxurious hand-dyed silk scarf using traditional shibori techniques. Each piece is one-of-a-kind. Measures 14" x 72".', tags: ['silk', 'scarf', 'shibori', 'hand-dyed'], materials: ['Pure Silk', 'Natural Dyes'] },
  { title: 'Oak Desk Organizer', category: 'Woodwork', price: 68.99, description: 'Minimalist desk organizer carved from white oak. Features compartments for pens, cards, and small items. Wall-mounted or freestanding.', tags: ['oak', 'desk organizer', 'woodwork', 'office'], materials: ['White Oak', 'Danish Oil'] },
  { title: 'Watercolor Landscape Print', category: 'Art', price: 45.99, description: 'Original watercolor landscape print depicting a serene mountain scene. Printed on 300gsm cotton paper. Signed by artist.', tags: ['watercolor', 'landscape', 'print', 'nature'], materials: ['Cotton Paper', 'Watercolor Pigments'] },
  { title: 'Beeswax Taper Candles', category: 'Candles', price: 24.99, description: 'Set of 4 hand-rolled pure beeswax taper candles. Natural honey scent. Burns cleanly for 6+ hours each. Includes brass holders.', tags: ['beeswax', 'taper', 'candles', 'natural'], materials: ['Pure Beeswax', 'Cotton Wick'] },
  { title: 'Leather Passport Cover', category: 'Leather', price: 42.99, description: 'Full-grain leather passport holder with card slots. Embossed monogram option available. Develops a beautiful patina over time.', tags: ['leather', 'passport', 'travel', 'wallet'], materials: ['Vegetable-tanned Leather'] },
  { title: 'Embroidered Pillow Cover', category: 'Other', price: 38.99, description: 'Hand-embroidered linen pillow cover with floral design. Concealed zipper closure. Fits standard 18" pillow insert (not included).', tags: ['embroidery', 'pillow', 'linen', 'handmade'], materials: ['Linen', 'Cotton Embroidery Thread'] },
  { title: 'Turquoise Inlay Pendant', category: 'Jewelry', price: 125.00, description: 'Stunning turquoise stone pendant set in hand-forged sterling silver. Each stone is unique. Comes with 20" silver chain.', tags: ['turquoise', 'pendant', 'silver', 'jewelry'], materials: ['Turquoise', 'Sterling Silver'] },
  { title: 'Rustic Ceramic Planter', category: 'Pottery', price: 38.99, description: 'Rustic ceramic planter with drainage hole and matching saucer. Perfect for succulents and small plants. Weather-resistant for indoor/outdoor use.', tags: ['planter', 'ceramic', 'rustic', 'garden'], materials: ['Clay', 'Weatherproof Glaze'] },
  { title: 'Block Printed Table Runner', category: 'Textiles', price: 54.99, description: 'Hand block-printed cotton table runner using traditional Indian techniques. Machine washable. Measures 14" x 72".', tags: ['block print', 'table runner', 'cotton', 'Indian'], materials: ['Organic Cotton', 'Natural Dyes'] },
  { title: 'Cherry Wood Serving Board', category: 'Woodwork', price: 52.99, description: 'Beautiful cherry wood serving board with live edge. Perfect for charcuterie or bread. Food-safe finish. Each board is unique.', tags: ['cherry', 'serving board', 'wood', 'kitchen'], materials: ['Cherry Wood', 'Food-safe Mineral Oil'] },
];

const storeNames = [
  { name: 'Luna Clay Studio', category: 'Pottery', description: 'Handcrafted pottery inspired by nature and the seasons. Each piece is wheel-thrown and hand-finished in our Portland studio.' },
  { name: 'Silver Moon Designs', category: 'Jewelry', description: 'Modern jewelry with an artisan soul. We create pieces that celebrate individuality and craftsmanship.' },
  { name: 'The Woven Nest', category: 'Textiles', description: 'Fiber arts studio specializing in handwoven textiles and natural dye techniques. Every piece tells a story.' },
  { name: 'Timber & Grain', category: 'Woodwork', description: 'Small-batch woodworking studio creating functional art for everyday living. Based in Vermont.' },
  { name: 'Brush & Hue', category: 'Art', description: 'Original art prints and paintings from emerging contemporary artists. We believe art should be accessible.' },
  { name: 'Ember & Wick', category: 'Candles', description: 'Hand-poured soy candles made with pure essential oils. Small batches, big scents.' },
  { name: 'Heritage Leather Co', category: 'Leather', description: 'Traditional leather goods made to last generations. We use time-honored techniques and the finest materials.' },
  { name: 'Knot & Bloom', category: 'Other', description: 'Modern macrame and fiber art studio. We bring bohemian charm to your living spaces.' },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const User = require('./models/User');
    const Product = require('./models/Product');
    const Store = require('./models/Store');
    const Order = require('./models/Order');

    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Store.deleteMany({});
    await Order.deleteMany({});

    console.log('Creating demo users...');
    
    const buyer = new User({
      name: 'Sarah Johnson',
      email: 'buyer@artisanscorner.com',
      password: 'Buyer@123',
      role: 'buyer',
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    });
    await buyer.save();

    const vendor = new User({
      name: 'Michael Chen',
      email: 'vendor@artisanscorner.com',
      password: 'Vendor@123',
      role: 'vendor',
      isActive: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    });
    await vendor.save();

    const admin = new User({
      name: 'Admin User',
      email: 'admin@artisanscorner.com',
      password: 'Admin@123',
      role: 'admin',
      isActive: true,
    });
    await admin.save();

    console.log('Creating stores...');
    const stores = [];
    for (let i = 0; i < storeNames.length; i++) {
      const storeName = storeNames[i];
      const store = new Store({
        owner: i === 0 ? vendor._id : new mongoose.Types.ObjectId(),
        name: storeName.name,
        description: storeName.description,
        category: storeName.category,
        logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(storeName.name)}&background=amber&color=fff&size=128`,
        banner: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop',
        rating: (3.5 + Math.random() * 1.5).toFixed(1),
        isVerified: Math.random() > 0.5,
        totalOrders: Math.floor(Math.random() * 100),
        socialLinks: {
          instagram: 'https://instagram.com',
          website: 'https://example.com',
        },
      });
      await store.save();
      stores.push(store);
    }

    console.log('Creating products...');
    const products = [];
    for (let i = 0; i < productData.length; i++) {
      const pData = productData[i];
      const storeIndex = i % stores.length;
      const product = new Product({
        title: pData.title,
        vendorId: stores[storeIndex].owner,
        storeId: stores[storeIndex]._id,
        description: pData.description,
        price: pData.price,
        images: [
          `https://picsum.photos/seed/${pData.title.replace(/\s/g, '')}/600/600`,
          `https://picsum.photos/seed/${pData.title.replace(/\s/g, '')}2/600/600`,
        ],
        category: pData.category,
        stock: Math.floor(Math.random() * 50) + 5,
        tags: pData.tags,
        materials: pData.materials,
        processingTime: '3-5 business days',
        avgRating: (3.5 + Math.random() * 1.5).toFixed(1),
        totalReviews: Math.floor(Math.random() * 20),
        isFeatured: i < 8,
        isActive: true,
      });
      await product.save();
      products.push(product);
    }

    console.log('Creating sample orders...');
    const orderSubtotal = products.slice(0, 3).reduce((sum, p) => sum + p.price, 0);
    const order = new Order({
      orderNumber: 'ART-' + Date.now().toString().slice(-10) + '-DEMO',
      buyerId: buyer._id,
      items: products.slice(0, 3).map((p) => ({
        productId: p._id,
        vendorId: p.vendorId,
        title: p.title,
        image: p.images[0],
        price: p.price,
        quantity: 1,
        total: p.price,
      })),
      shippingAddress: {
        fullName: 'Sarah Johnson',
        phone: '555-123-4567',
        line1: '123 Main Street',
        line2: 'Apt 4B',
        city: 'Portland',
        state: 'OR',
        zip: '97201',
        country: 'United States',
      },
      subtotal: orderSubtotal,
      shippingCost: 0,
      tax: orderSubtotal * 0.08,
      totalAmount: orderSubtotal * 1.08,
      commission: orderSubtotal * 0.05,
      vendorEarnings: orderSubtotal * 0.95,
      paymentStatus: 'paid',
      orderStatus: 'delivered',
      stripePaymentIntentId: 'pi_demo_' + Math.random().toString(36).substring(7),
    });
    await order.save();

    console.log('\n=== Seed Complete! ===\n');
    console.log('Demo Accounts:');
    console.log('----------------');
    console.log('Buyer:  buyer@artisanscorner.com  /  Buyer@123');
    console.log('Vendor: vendor@artisanscorner.com /  Vendor@123');
    console.log('Admin:  admin@artisanscorner.com  /  Admin@123');
    console.log('\nCreated:');
    console.log('- 3 users');
    console.log(`- ${stores.length} stores`);
    console.log(`- ${products.length} products`);
    console.log('- 1 sample order');

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seed();
