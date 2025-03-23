import React from "react";
import { Field, useField, useFormikContext } from "formik";
import clsx from "clsx";
import { Icon } from "@/components";
import css from "./FilterItem.module.css";

const FilterItem = ({
  id,
  value: { group, label, queryName, iconName },
  single = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const name = group || id;
  const [field] = useField(name);

  const isChecked = Array.isArray(field.value) && field.value.includes(id);

  const handleClick = (e) => {
      if (isChecked) {
        setFieldValue(name, field.value.filter((item) => {
          // console.log(item);
          return item !== id;
        }));
      } else {
        if (field.value instanceof Array) {
          setFieldValue(name, [...(field.value || []), id]);
        } else {
          setFieldValue(name, []);
        }
      }
    e?.stopPropagation?.();
  };

  const inputProps = {
    id,
    name,
    value: id,
    "data-query": queryName,
    type: single ? "radio" : "checkbox",
  };

  // console.log("render FilterItem", id, "isChecked", isChecked, 'field.value', field.value, 'single', single);

  return (
    <div
      className={clsx(css.wrapper, "prevent-select")}
      tabIndex={0}
      role={single ? "radio" : "checkbox"}
      aria-checked={isChecked}
    >
      <Field
        {...inputProps}
        aria-labelledby={`${id}-label`}
        role={inputProps.type}
        className={css.field}
        onClick={handleClick}
      />
      <label
        id={`${id}-label`}
        htmlFor={id}
        className={clsx(
          css.card,
          single ? css["card-radio-btn"] : css["card-checkbox"],
          isChecked && css["is-checked"]
        )}
      >
        <Icon iconName={iconName} className={css.icon} />
        <span className={css.label}>{label}</span>
      </label>
    </div>
  );
};

export default React.memo(FilterItem);
