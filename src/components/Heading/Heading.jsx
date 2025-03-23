import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

import { Icon, FavoriteButton } from "@/components";

import { formatPrice } from "@/helpers";

import css from "./Heading.module.css";

const Heading = ({
  id,
  title,
  price,
  rating,
  reviewsNumber,
  location,
  className,
}) => {
  const { pathname } = useLocation();

  const isCatalogPage = pathname === "/catalog";

  return (
    <div 
      className={clsx(
          isCatalogPage && css["card-heading"],
          css["heading-wrapper"],
          className
        )
      }
    >
      <div className={css["title-wrapper"]}>
        <h2 className={clsx(css.title, "truncate-text")}>{title}</h2>
        {isCatalogPage && (
          <PriceWithFavoriteButton
            id={id}
            price={price}
          />
        )}
      </div>
      <div className={css["details-wrapper"]}>
        <DetailsList
          id={id}
          rating={rating}
          reviewsNumber={reviewsNumber}
          location={location}
        />
        {!isCatalogPage && (
          <PriceWithFavoriteButton
            price={price}
          />
        )}
      </div>
    </div>
  );
};

const DetailsList = ({id, rating, reviewsNumber, location}) => {
  return (
    <ul className={css["details-list"]}>
      <li className={css["details-item"]}>
        <Icon
          iconName="icon-star"
          className={clsx(css["rating-icon"], css["details-icon"])}
        />
        <Link
          to={`/catalog/${id}/reviews`}
          className={css["rating-link"]}
        >
          <span>{`${rating}(${reviewsNumber} reviews)`}</span>
        </Link>
      </li>
      <li className={css["details-item"]}>
        <Icon
          iconName="icon-paper-map"
          className={css["details-icon"]}
        />
        {location}
      </li>
    </ul>
  );
};

const PriceWithFavoriteButton = ({ id, price }) => {
  if (id == null && price == null) return null;

  return (
    <div className={css["price-wrapper"]}>
      {price !== null && (
        <span className={css["price-text"]}>{formatPrice(price)}</span>
      )}
      {id && (
        <FavoriteButton id={id} />
      )}
    </div>
  );
};

Heading.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  reviewsNumber: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  onToggleFavorite: PropTypes.func,
  className: PropTypes.string,
}

DetailsList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rating: PropTypes.number.isRequired,
  reviewsNumber: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
}

PriceWithFavoriteButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  price: PropTypes.number,
};

export default Heading;
