import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'material-ui/Switch';
import { FormControlLabel } from 'material-ui/Form';

const SwitchWithLabel = ({ input: { value, onChange, name }, label }) => (
  <FormControlLabel
    control={<Switch checked={value} onChange={onChange} name={name} />}
    label={label}
  />
);

SwitchWithLabel.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

export default SwitchWithLabel;
