import clsx from "clsx";
import PropTypes from 'prop-types';
import css from "./Separator.module.css";

const Separator = ({ className }) => {
  return <hr className={clsx(className, css.separator)} />;
};

Separator.propTypes = {
  className: PropTypes.string,
};

export default Separator;
