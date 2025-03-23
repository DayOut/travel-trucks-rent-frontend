import PropTypes from "prop-types";

import { Icon } from "@/components";

import css from "./Badge.module.css";

const Badge = ({ iconName, label }) => {
  return (
    <div className={css.badge}>
      {!!iconName && <Icon iconName={iconName} className={css.icon} />}
      <span className={css.label}>{label}</span>
    </div>
  );
};

Badge.propTypes = {
  iconName: PropTypes.string,
  label: PropTypes.string.isRequired,
}

export default Badge;
