import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
// import { getInstance } from '../redux/actions/axiosFactory';
import { rest } from 'lodash';
import axios from 'axios'
// const axiosInstance = getInstance();


export const renderField = ({ input, label, onChange, name, values, type, meta: { touched, error } }) => {

  const inputProps = {
    ...input,
    onChange: e => {
      input.onChange(e);
      onChange && onChange(e);
    }
  }
  return (<div className="field-render-main" >
    <label htmlFor={`label${label}`}>{label}</label>
    <div className="field-inner-group">
      <input name={name} {...inputProps} placeholder={`Enter ${label}`} id={`label${label}`} className="form-control" />
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div >);
}

export const renderSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  onError, onChange
}) => {

  const inputProps = {
    ...input,
    onClick: e => {
      input.onChange(e);
      onChange && onChange(e);
    }
  }
  return (
    <div
      className={
        'field-render-main ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
      }
    >
      <label>{label}</label>
      <div className="field-inner-group">
        <select {...inputProps} className="form-control">
          {children}
        </select>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  )
};

renderSelect.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.any,
  meta: PropTypes.object,
};

export const renderMultiSelect = ({
  input,
  label,
  meta: { touched, error },
  children,
  onError
}) => (
  <div
    className={
      'field-render-main ' + (touched ? (error ? 'is-danger' : 'is-success') : '')
    }
  >
    <label>{label}</label>
    <div className="field-inner-group">
      <select multiple {...input} className="form-control">
        {children}
      </select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

renderMultiSelect.propTypes = {
  input: PropTypes.any,
  label: PropTypes.string,
  children: PropTypes.any,
  meta: PropTypes.object,
};


export const renderRadioButtonField = ({
  input,
  label,
  type,
  checked,
  children,
  meta: { touched, error, warning },
  onChange,
  onError
}) => {
  const inputProps = {

    ...input,

    onChange: e => {

      input.onChange(e);

      onChange && onChange(e);

    }

  };
  return (
    <div className="field-render-main">
      {/* <label className="cursor-pointer">
        {touched && error ? (onError ? onError(true) : null) : null}
        {touched && !error ? (onError ? onError(false) : null) : null}
        &nbsp;  {label}
      </label> */}
      <div className="radio-group">
        {children}
      </div>
    </div>
  );
};
export const rendercheckbox = ({
  input,
  label,
  name,
  type,
  checked,
  meta: { touched, error, warning },
  onError
}) => {
  return (
    <div className="field-render-main">
      <label className="cursor-pointer">
        <input type="checkbox" {...input} name={name} className="checkboxInput" />
        {touched && error ? (onError ? onError(true) : null) : null}
        {touched && !error ? (onError ? onError(false) : null) : null}
        &nbsp;  {label}
      </label>
    </div>
  );
};

export const renderTextareaField = ({ input, label, name, values, type, meta: { touched, error } }) => (
  <div className='field-render-main'>
    <label>{label}</label>
    <div className="field-inner-group">
      <textarea name={label} {...input} placeholder={`Enter ${label}`} type={type} className="form-control"></textarea>
      {touched && error && <span className="error">{error}</span>}
    </div>
  </div>
)


