import clsx from "clsx";
import PropTypes from "prop-types";

import { Icon } from "@/components";

import css from "./Rating.module.css";

const Rating = ({ rating }) => {
  return (
    <div className={css["rating-scale"]}>
      {[...Array(5).keys()].map((indx) => {
        const fillColor = indx <= rating ? "is-rated" : "is-blanks";
        return (
          <Icon
            key={indx}
            iconName="icon-star"
            className={clsx(css["rating-icon"], css[fillColor])}
          />
        )
      })}
    </div>
  );
};

Rating.propTypes = {
  rating: PropTypes.number.isRequired
}

export default Rating;
