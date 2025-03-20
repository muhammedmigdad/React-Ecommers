import React, { useState } from 'react';
import axios from 'axios';

export default function ProductReview({ productId }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setRating(5);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-md shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label className="text-sm font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-2 rounded w-full mt-1"
            disabled={isSubmitting}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            required
            className="border p-2 rounded w-full mt-1 min-h-[100px]"
            disabled={isSubmitting}
          />
        </div>

        <button 
          type="submit" 
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
}