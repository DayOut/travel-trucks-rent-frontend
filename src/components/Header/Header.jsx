import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import Icon from "../Icon/Icon";

import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css["page-header"]}>
      <div className={clsx(css["header-container"],"container")}>
        <Link to='/' className={css["logo-link"]}>
          <Icon iconName="icon-logo" className={css.logo} aria-label="logotype" />
        </Link>
        <nav className={css["nav-menu"]}>
          <NavLink to="/" className={css["nav-menu-item"]}>Home</NavLink>
          <NavLink to="/catalog" end className={css["nav-menu-item"]}>Catalog</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;