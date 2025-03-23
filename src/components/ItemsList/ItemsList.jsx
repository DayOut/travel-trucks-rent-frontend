import PropTypes from "prop-types";
import css from "./ItemsList.module.css";
import clsx from "clsx";

const ItemsList = (
  {
    of: ItemComponent,
    items,
    onClick,
    onKeyDown,
    tabIndex,
    className,
  }
) => {
  const handleItemClick = (item) => {
    if (!onClick) {
      return;
    }
    onClick(item);
  };

  const handleItemKeyDown = (e, item) => {
    // console.log("enter");
    if (onKeyDown && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onKeyDown(item);
    }
  };

  return (
    <ul className={clsx(css["items-list"], className)} tabIndex={tabIndex} >
      {items.map((item, index) => (
        <li
          key={`${index}list-item`}
          className={clsx(!!onClick && css.pointer, css["list-item"])}
          onKeyDown={(e) => handleItemKeyDown(e, item)}
        >
          <ItemComponent
            key={`${index}-list-item-component`}
            {...item}
            onClick={() => { handleItemClick(item) }}
          />
        </li>
      ))}
    </ul>
  );
};

ItemsList.propTypes = {
  of: PropTypes.elementType.isRequired,
  items: PropTypes.array.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.number
}

export default ItemsList;
