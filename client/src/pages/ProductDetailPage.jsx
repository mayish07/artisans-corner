// client/src/pages/ProductDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, clearCurrentProduct, addToWishlist, removeFromWishlist } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { addToRecentlyViewed } from '../features/uiSlice';
import { useCompare } from '../context/CompareContext';
import reviewService from '../services/reviewService';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatPrice } from '../utils/formatCurrency';

const shareProduct = (platform) => {
  const url = window.location.href;
  const title = document.title;
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  };
  if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  }
};

export default function ProductDetailPage() {
  const { idOrSlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const { currentProduct, relatedProducts, wishlist } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const isInWishlist = currentProduct && wishlist.includes(currentProduct._id);

  useEffect(() => {
    dispatch(getProduct(idOrSlug));
    return () => dispatch(clearCurrentProduct());
  }, [dispatch, idOrSlug]);

  useEffect(() => {
    if (currentProduct) {
      dispatch(addToRecentlyViewed(currentProduct));
      fetchReviews(1);
    }
  }, [currentProduct]);

  const fetchReviews = async (page) => {
    if (!currentProduct) return;
    setIsLoadingReviews(true);
    try {
      const response = await reviewService.getProductReviews(currentProduct._id, { page, limit: 5 });
      setReviews(page === 1 ? response.data.reviews : [...reviews, ...response.data.reviews]);
      setReviewPage(page);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
    setIsLoadingReviews(false);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart({ productId: currentProduct._id, quantity }));
  };

  const handleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (isInWishlist) {
      dispatch(removeFromWishlist(currentProduct._id));
    } else {
      dispatch(addToWishlist(currentProduct._id));
    }
  };

  const handleCompare = () => {
    if (isInCompare(currentProduct._id)) {
      removeFromCompare(currentProduct._id);
    } else {
      addToCompare(currentProduct);
    }
  };

  const isInCompareList = currentProduct && isInCompare(currentProduct._id);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await reviewService.createReview({ productId: currentProduct._id, ...newReview });
      setNewReview({ rating: 5, comment: '' });
      fetchReviews(1);
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  if (!currentProduct) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><a href="/" className="hover:text-amber-600">Home</a></li>
            <li>/</li>
            <li><a href="/products" className="hover:text-amber-600">Products</a></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white">{currentProduct.title}</li>
          </ol>
        </nav>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img
                src={currentProduct.images?.[selectedImage] || '/placeholder.jpg'}
                alt={currentProduct.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {currentProduct.images?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {currentProduct.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`border-2 rounded-lg overflow-hidden ${selectedImage === i ? 'border-amber-600' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-amber-600 font-medium mb-2">{currentProduct.category}</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{currentProduct.title}</h1>

            {/* Rating */}
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-5 h-5 ${i < Math.round(currentProduct.avgRating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 ml-2">({currentProduct.totalReviews || 0} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {formatPrice(currentProduct.price)}
              </span>
              {currentProduct.comparePrice && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(currentProduct.comparePrice)}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6">
              {currentProduct.stock > 5 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : currentProduct.stock > 0 ? (
                <span className="text-amber-600 font-medium">Only {currentProduct.stock} left</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Description</h3>
              <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{currentProduct.description}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-gray-600 dark:text-gray-300">-</button>
                <span className="px-4 py-2 text-gray-900 dark:text-white">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(currentProduct.stock, quantity + 1))} className="px-4 py-2 text-gray-600 dark:text-gray-300">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={currentProduct.stock < 1}
                className="flex-1 bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 disabled:bg-gray-300 font-semibold"
              >
                {currentProduct.stock < 1 ? 'Out of Stock' : 'Add to Cart'}
              </button>
              <button onClick={handleWishlist} className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                <svg className={`w-6 h-6 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400'}`} fill={isInWishlist ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Vendor */}
            {currentProduct.vendorId && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-sm text-gray-500 mb-2">Sold by</p>
                <a href={`/store/${currentProduct.vendorId.storeProfile?.storeSlug}`} className="font-semibold text-amber-600 hover:text-amber-700">
                  {currentProduct.vendorId.storeProfile?.storeName || currentProduct.vendorId.name}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Reviews</h2>
          
          {isAuthenticated && (
            <form onSubmit={handleSubmitReview} className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Write a Review</h3>
              <div className="flex items-center mb-4">
                <span className="mr-4 text-gray-600 dark:text-gray-300">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })}>
                    <svg className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white mb-4"
                rows={4}
                required
              />
              <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700">
                Submit Review
              </button>
            </form>
          )}

          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review._id} className="bg-white dark:bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-2">
                  <img src={review.buyerId?.avatar || `https://ui-avatars.com/api/?name=${review.buyerId?.name}`} alt="" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{review.buyerId?.name}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                {review.vendorReply && (
                  <div className="mt-4 ml-4 pl-4 border-l-2 border-amber-600">
                    <p className="text-sm font-semibold text-amber-600">Seller Response:</p>
                    <p className="text-gray-600 dark:text-gray-300">{review.vendorReply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
