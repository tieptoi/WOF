import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';

const TextFieldWithLabel = ({
  input,
  label,
  type,
  meta: { touched, error },
}) => (
  <TextField
    label={label}
    helperText={touched && error}
    type={type}
    error={touched && error && error.length > 0}
    {...input}
  />
);

TextFieldWithLabel.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default TextFieldWithLabel;
