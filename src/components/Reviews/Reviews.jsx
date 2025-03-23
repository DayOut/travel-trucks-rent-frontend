import { useOutletContext } from "react-router-dom";

import { Review } from "@/components/UI";

import css from "./Reviews.module.css";

const CamperReviews = () => {
  const reviews = useOutletContext();

  return (
    <div className={css.wrapper}>
      {reviews.length > 0 &&
        reviews.map((review, index) => (
          <Review
            key={index}
            name={review.reviewer_name}
            text={review.comment}
            rating={review.reviewer_rating}
          />
        ))}
    </div>
  );
};

export default CamperReviews;
