import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";

import css from "./Button.module.css";
import Loader from "../Loader/Loader";

const Button = (
  {
    type = "submit",
    to,
    onClick,
    style = "primary",
    isLoading,
    className,
    children
  }
) => {
  switch (type) {
    case "button": return (
        <button
          type="button"
          onClick={onClick}
        className={
          clsx(
            className,
            css[style],
            css["btn"],
            css["btn-text"],
            "prevent-select"
          )}
        >
          {isLoading ? <Loader style={style} /> : children}
        </button>
      );
    case "link": return (
        <Link
          to={to}
          className={clsx(className, css[style], css["btn"], css["btn-text"])}
        >
          {children}
        </Link>
      );
    default: return (
        <button
          type="submit"
          className={clsx(className, css[style], css["btn"], css["btn-text"])}
        >
          {isLoading ? <Loader style={style} /> : children}
        </button>
      );
  };
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "link"]),
  onClick:
    function (props, propName, componentName) {
      if (props["type"] === "button"
        && (props[propName] == undefined || typeof (props[propName]) != "function")) {
        const msg =
          `Please provide an '${propName}' handler function as a prop ` +
          `for the '${componentName}' component ` +
          `when its type is set to '${props["type"]}'!`
        return new Error(msg);
      }
    },
  to:
    function (props, propName, componentName) {
      if (props["type"] === "link" && !props[propName]) {
        const msg =
          `Please provide a valid '${propName}' prop ` +
          `for the '${componentName}' component ` +
          `when its type is set to '${props["type"]}'!`
        return new Error(msg);
      }
    },
  style: PropTypes.oneOf(["primary", "secondary"]),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
}

export default Button;