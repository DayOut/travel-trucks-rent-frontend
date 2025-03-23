import { useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import {
  selectPossibleVehicleEquipmentList as possibleEquipmentList, selectVehicleValidationList,
} from "@/store/campers/selectors";

import { Heading, ItemsList, Thumbnail, Badge, Button } from "@/components";

import {
  filterAvailableEquipment,
} from "@/helpers";

import css from "./VehicleCard.module.css";

const VehicleCard = ({ ...vehicleData }) => {
  const {
    id,
    gallery,
    name: title,
    price,
    rating,
    reviews,
    location,
    description,
  } = vehicleData;

  const headingProps = {
    id,
    title,
    price,
    rating,
    reviewsNumber: reviews.length,
    location,
  };

  const availableEquipment = useMemo(
    () => filterAvailableEquipment(selectVehicleValidationList, vehicleData),
    [vehicleData]
  );

  return (
    <div className={css["card-wrapper"]}>
      <Thumbnail
        className={css.thumbnail}
        src={gallery?.[0].thumb}
        alt={title}
      />
      <div className={css.content}>
        <Heading {...headingProps} />
        <p className={clsx("truncate-text", css["description-text"])}>{description}</p>
        <ItemsList
          of={Badge}
          items={availableEquipment}
          className={css["badges-list"]}
          tabIndex={0}
        />
        <Button type="link" to={`/catalog/${id}`}>Show more</Button>
      </div>
    </div>
  );
};

const galleryShape = PropTypes.shape({
  thumb: PropTypes.string.isRequired,
  original: PropTypes.string.isRequired,
});

const reviewShape = PropTypes.shape({
  reviewer_name: PropTypes.string.isRequired,
  reviewer_rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
});

VehicleCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  length: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  tank: PropTypes.string.isRequired,
  consumption: PropTypes.string.isRequired,
  transmission: PropTypes.string.isRequired,
  engine: PropTypes.string.isRequired,
  AC: PropTypes.bool.isRequired,
  bathroom: PropTypes.bool.isRequired,
  kitchen: PropTypes.bool.isRequired,
  TV: PropTypes.bool.isRequired,
  radio: PropTypes.bool.isRequired,
  refrigerator: PropTypes.bool.isRequired,
  microwave: PropTypes.bool.isRequired,
  gas: PropTypes.bool.isRequired,
  water: PropTypes.bool.isRequired,
  gallery: PropTypes.arrayOf(galleryShape).isRequired,
  reviews: PropTypes.arrayOf(reviewShape).isRequired,
};

export default VehicleCard;
