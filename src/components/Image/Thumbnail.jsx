import { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Loader } from "@/components";

import noImage from "@/assets/images/no-image.svg"
import css from "./Thumbnail.module.css";

const Thumbnail = ({ src, alt, className, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  const [imgAlt, setImgAlt] = useState(alt);

  const handleImageLoadCompleted = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImgSrc(noImage);
    setImgAlt("No image available");
  };

  return (
    <div
      className={className}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {isLoading && <Loader style="current" className={css["image-loader"]} />}
      <img
        loading="lazy"
        className={clsx(
          css["thumbnail-image"],
          "prevent-select",
          !!onClick && css["zoom-in-pointer"]
        )}
        src={imgSrc}
        alt={imgAlt}
        onLoad={handleImageLoadCompleted}
        onError={handleImageError}
        onClick={onClick}
      />
    </div>
  );
};

Thumbnail.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
}

export default Thumbnail;
