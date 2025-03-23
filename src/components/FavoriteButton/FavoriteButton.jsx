import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import clsx from "clsx";

import { selectIsFavorite } from "@/store/favorites/selectors";
import { toggleFavorite } from "@/store/favorites/slice";

import { Icon } from "@/components";

import css from "./FavoriteButton.module.css";

const FavoriteButton = ({ id }) => {
  const dispatch = useDispatch();

  const isFavorite = useSelector((state) => selectIsFavorite(state, id));

  // Handle favorite toggle action (add to / remove from favorites)
  const handleToggleFavorite = useCallback(() => {
    dispatch(toggleFavorite(id));
  }, [dispatch, id]);


  return (
    <button
      type="button"
      className={css["favorite-btn"]}
      onClick={handleToggleFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {id && (
        <Icon
          className={clsx(isFavorite && css["is-favorite"], css["favorite-icon"])}
          iconName="icon-heart"
        />
      )}
    </button>
  );
};

FavoriteButton.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default React.memo(FavoriteButton);