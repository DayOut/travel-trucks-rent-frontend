import clsx from "clsx";
import { Field, useFormikContext, useField } from "formik";

import { FieldWrapper } from "@/components/UI";

import css from "./TextField.module.css";
import {Separator} from "@/components/index.js";

const TextField = ({
  name,
  appendIcon,
  className,
  clearable,
  hideErrors,
  label,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <div className={css["filter-group-wrapper"]}>
      {label.length > 0 && <p className={css.title}>{label}</p>}
      <Separator />
      <FieldWrapper
        value={field.value}
        clearable={clearable}
        appendIcon={appendIcon}
        error={meta.error}
        touched={meta.touched}
        hideErrors={hideErrors}
        onClear={() => setFieldValue(name, "")}
        >
      <Field
        className={clsx(
          css.input,
          props.required && css.required,
          appendIcon && css.hasAppendIcon,
          className
        )}
        {...props}
        {...field}
      />
    </FieldWrapper>
    </div>


  );
};

export default TextField;
