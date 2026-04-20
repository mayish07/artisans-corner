import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFeaturedProducts, getProducts, getCategories } from '../features/productSlice';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() {
  const dispatch = useDispatch();
  const { featuredProducts, categories, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getFeaturedProducts());
    dispatch(getCategories());
    dispatch(getProducts({ limit: 8 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-50 to-orange-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Discover Unique <span className="text-amber-600">Handmade</span> Treasures
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Shop from thousands of talented artisans and find one-of-a-kind pieces 
                crafted with love and skill.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 font-semibold"
                >
                  Shop Now
                </Link>
                <Link
                  to="/become-seller"
                  className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg hover:bg-amber-50 font-semibold"
                >
                  Become a Seller
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400"
                  alt="Handmade jewelry"
                  className="rounded-lg shadow-xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400"
                  alt="Handmade pottery"
                  className="rounded-lg shadow-xl mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.name}
                to={`/products?category=${category.name}`}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <span className="text-4xl mb-2 block">
                  {category.name === 'Jewelry' && '💎'}
                  {category.name === 'Pottery' && '🏺'}
                  {category.name === 'Textiles' && '🧶'}
                  {category.name === 'Woodwork' && '🪵'}
                  {category.name === 'Art' && '🎨'}
                  {!['Jewelry', 'Pottery', 'Textiles', 'Woodwork', 'Art'].includes(category.name) && '🎁'}
                </span>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-semibold">
              View All →
            </Link>
          </div>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Shop With Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Unique Items</h3>
              <p className="text-gray-600">
                Every item is handcrafted and one-of-a-kind. No mass-produced products here.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Support Artisans</h3>
              <p className="text-gray-600">
                Your purchase directly supports independent artisans and their families.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shipping</h3>
              <p className="text-gray-600">
                All items are carefully packaged and shipped with tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Are You an Artisan?</h2>
          <p className="text-xl mb-8 text-amber-100">
            Join our community of talented creators and start selling your handmade goods today.
          </p>
          <Link
            to="/become-seller"
            className="bg-white text-amber-600 px-8 py-4 rounded-lg font-bold hover:bg-amber-50 inline-block"
          >
            Start Selling
          </Link>
        </div>
      </section>
    </div>
  );
}
