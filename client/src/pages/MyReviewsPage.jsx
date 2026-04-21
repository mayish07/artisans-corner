import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageSquare, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';

export default function MyReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/user/reviews')
      .then(res => setReviews(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-900 mb-8">My Reviews</h1>

        {loading ? (
          <div className="space-y-4">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-product p-6 animate-pulse">
                <div className="h-4 bg-stone-200 rounded w-1/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-stone-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-product">
            <Star className="w-16 h-16 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-stone-600 mb-2">No reviews yet</h3>
            <p className="text-stone-500 mb-4">Your product reviews will appear here</p>
            <Link to="/shop" className="text-amber-600 hover:underline">Start Shopping</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-product p-6 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <Link to={`/product/${review.product?.slug}`}>
                    {review.product?.images?.[0] ? (
                      <img
                        src={review.product.images[0].url}
                        alt={review.product.title}
                        className="w-20 h-20 object-cover rounded-product"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-stone-100 rounded-product flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-stone-300" />
                      </div>
                    )}
                  </Link>
                  <div className="flex-1">
                    <Link to={`/product/${review.product?.slug}`}>
                      <h3 className="font-serif text-lg hover:text-amber-600">{review.product?.title}</h3>
                    </Link>
                    <div className="flex items-center gap-1 my-1">
                      {[1,2,3,4,5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${star <= review.rating ? 'text-amber-500 fill-current' : 'text-stone-300'}`}
                        />
                      ))}
                      <span className="text-stone-500 text-sm ml-2">{review.title}</span>
                    </div>
                    <p className="text-stone-600 text-sm">{review.body}</p>
                    {review.images?.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {review.images.map((img, i) => (
                          <img key={i} src={img} alt="" className="w-12 h-12 object-cover rounded" />
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm text-stone-500">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {review.helpfulVotes || 0} helpful
                      </span>
                      {review.sellerReply && (
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          Seller replied
                        </span>
                      )}
                      <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}