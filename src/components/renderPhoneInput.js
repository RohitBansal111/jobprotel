import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { PropTypes } from "prop-types";

export const RenderPhoneInput = ({
  input,
  label,
  onChange,
  name,
  children,
  placeholder,
  value,
  defaultValue,
  type,
  meta: { touched, error }
}) => {
  const inputProps = {
    ...input,
    onChange: (e) => {
      input.onChange(e);
      onChange && onChange(e);
    },
  };
  return (
    <div className="field-render-main">
      <label htmlFor={`label${label}`}>{label}</label>
      <div className="field-inner-group">
        <PhoneInput
          {...inputProps}
          placeholder={placeholder}
          id={`label${label}`}
          className="form-control"
        />
        {children}
        {touched && error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};
