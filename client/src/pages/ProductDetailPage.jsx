// client/src/pages/ProductDetailPage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';

const product = {
  _id: '1',
  name: 'Handcrafted Ceramic Vase',
  price: 89,
  originalPrice: 120,
  image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
  images: [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600',
  ],
  description: 'Beautiful handcrafted ceramic vase made by local artisans. Perfect for home decoration or as a gift. Each piece is unique and made with love.',
  features: ['Handmade by local artisans', 'Premium quality clay', 'Microwave safe', 'Easy to clean'],
  vendor: { name: 'Earth & Clay', slug: 'earth-clay', rating: 4.8 },
  rating: 4.8,
  reviewCount: 24,
  category: 'Pottery',
  inStock: true,
  stockCount: 15,
};

export default function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const decreaseQty = () => setQuantity(q => Math.max(1, q - 1));
  const increaseQty = () => setQuantity(q => Math.min(product.stockCount, q + 1));

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4 text-sm text-gray-500">
          <Link to="/" className="hover:text-amber-600">Home</Link> / 
          <Link to="/shop" className="hover:text-amber-600"> Shop</Link> / 
          <span className="text-amber-600">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden mb-4">
              <img src={product.images[selectedImage]} alt={product.name} className="w-full h-96 object-cover" />
            </div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${selectedImage === i ? 'border-amber-600' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-amber-600 font-medium mb-2">{product.vendor.name}</p>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-gray-600">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-amber-600">₹{product.price}</span>
              <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm font-medium">25% off</span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="font-medium mb-3">Features:</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={decreaseQty} className="px-4 py-3 hover:bg-gray-100">
                  <Minus className="w-5 h-5" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button onClick={increaseQty} className="px-4 py-3 hover:bg-gray-100">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-500">{product.stockCount} in stock</span>
            </div>

            <div className="flex gap-4 mb-8">
              <button className="flex-1 bg-amber-600 text-white py-4 rounded-full font-semibold hover:bg-amber-700 transition-colors">
                Add to Cart
              </button>
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-4 rounded-full border-2 ${isWishlisted ? 'border-amber-600 bg-amber-50' : 'border-gray-300'}`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'text-amber-600 fill-amber-600' : 'text-gray-400'}`} />
              </button>
              <button className="p-4 rounded-full border-2 border-gray-300">
                <Share2 className="w-6 h-6 text-gray-400" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 border-t pt-6">
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}