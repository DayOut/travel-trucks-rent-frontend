import { Oval } from "react-loader-spinner";
import PropTypes from "prop-types";
import clsx from "clsx";

import css from "./Loader.module.css";

const Loader = ({style = "secondary", className}) => {
  return (
    <Oval
      visible={true}
      ariaLabel="oval-loading"
      wrapperClass={clsx(css[style],css["loader-wrapper"], className)}
    />
  );
};

Loader.propTypes = {
  style: PropTypes.oneOf(["primary", "secondary", "current"]),
  className: PropTypes.string,
}

export default Loader;