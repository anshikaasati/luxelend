const ReviewList = ({ reviews }) => {
  if (!reviews?.length) {
    return <p className="text-sm text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => (
        <div key={review._id} className="bg-gray-100 rounded-md p-3">
          <div className="flex items-center justify-between">
            <p className="font-semibold">{review.reviewerId?.name || 'Anonymous'}</p>
            <span className="text-brand font-semibold">{'⭐'.repeat(review.rating)}</span>
          </div>
          <p className="text-sm text-gray-600">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;


