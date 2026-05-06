import Card from "./ui/Card";

const ProductReviews = ({ reviews }) => {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review, index) => (
        <Card key={index} className="p-4">
          <p className="text-sm font-semibold text-foreground">
            {review.user.name}
          </p>
          <p className="mt-2 text-xs text-subtle">{review.comment}</p>
          <div className="mt-3 text-sm text-accent">
            {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductReviews;
