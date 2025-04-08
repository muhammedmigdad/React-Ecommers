import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const formVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut', delayChildren: 0.2 } },
};

const inputVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants = {
  hover: { backgroundColor: '#64748b', color: 'white', scale: 1.03, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
  tap: { scale: 0.98 },
};

const starContainerVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1 } },
};

const starVariantsAnimated = {
  initial: { color: '#d1d5db', scale: 1 },
  hovered: { color: '#facc15', scale: 1.2 },
  clicked: { color: '#facc15', scale: 1.1 },
};

export default function ProductReview({ productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeRating, setActiveRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Please log in to submit a review");
      }

      await axios.post(
        `/product_review/${productId}/`,
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess("Review submitted successfully!");
      setComment("");
      setRating(0);
      setActiveRating(0);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div className="bg-gray-100 p-8 rounded-lg shadow-md text-gray-800" variants={containerVariants} initial="hidden" animate="visible">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 border-b pb-2">Leave a Review</h3>
      {error && <motion.p className="text-red-500 mb-4" layout>{error}</motion.p>}
      {success && <motion.p className="text-green-500 mb-4" layout>{success}</motion.p>}

      <motion.form onSubmit={handleSubmit} className="flex flex-col gap-6" variants={formVariants}>
        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium mb-3 text-gray-700">Your Rating:</label>
          <motion.div className="flex items-center" variants={starContainerVariants} initial="hidden" animate="visible">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.div
                key={num}
                className="cursor-pointer"
                onMouseEnter={() => setActiveRating(num)}
                onMouseLeave={() => setActiveRating(rating)}
                onClick={() => setRating(num)}
                variants={starVariantsAnimated}
                initial="initial"
                animate={num <= activeRating ? "hovered" : "initial"}
                whileTap="clicked"
              >
                <FaStar size={28} className="mr-2" />
              </motion.div>
            ))}
          </motion.div>
          <p className="text-sm text-gray-500 mt-1">Tap to rate</p>
        </motion.div>

        <motion.div variants={inputVariants}>
          <label className="block text-sm font-medium mb-3 text-gray-700">Your Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product."
            required
            className="shadow-sm border rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 min-h-[120px]"
            disabled={isSubmitting}
          />
        </motion.div>

        <motion.button
          type="submit"
          className="bg-gray-700 text-white py-3 px-6 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed self-start"
          disabled={isSubmitting}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}