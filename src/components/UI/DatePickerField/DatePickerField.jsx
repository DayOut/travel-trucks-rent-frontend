import React, { useEffect, useRef } from "react";
import { useField, useFormikContext } from "formik";
import DatePicker from "react-datepicker";
import css from "./DatePickerField.module.css";
import clsx from "clsx";
import FieldWrapper from "../FieldWrapper/FieldWrapper";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";
import { startOfWeek, getDay } from 'date-fns';
import { enGB } from 'date-fns/locale';

const DatePickerField = ({
  id,
  name,
  label,
  className,
  appendIcon,
  required,
  clearable = true,
  hideErrors,
  placeholder = "",
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const fieldRef = useRef();

  useEffect(() => {
    fieldRef.current.input.placeholder = placeholder;
  }, [fieldRef, placeholder]);

  return (
    <FieldWrapper
      clearable={clearable}
      appendIcon={appendIcon}
      error={meta.error}
      touched={meta.touched}
      hideErrors={hideErrors}
      value={field.value}
      onClear={() => setFieldValue(name, "")}
      className={css.group}
    >
      <DatePicker
        ref={fieldRef}
        id={id}
        name={name}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          setFieldValue(field.name, val);
        }}
        dateFormat="dd.MM.yyyy"
        locale={enGB}
      s  calendarStartDay={1}
        calendarClassName={css.calendar}
        popperClassName={css.datepicker}
        useWeekdaysShort={true}
        customInput={
          <input className={clsx(css.input, appendIcon && css.hasAppendIcon)} />
        }
      />
    </FieldWrapper>
  );
};

export default DatePickerField;
