import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Button from 'material-ui/Button';

import SwitchWithLabel from '../common/form/SwitchwithLabel';
import TextFieldWithLabel from '../common/form/TextFieldWithLabel';
import ButtonLoading from '../common/form/ButtonLoading';

// validate the form before submitting it
const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }
  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 200) {
    errors.description = 'Must be 200 characters or less';
  }
  if (!values.quantity) {
    errors.quantity = 'Required';
  } else if (Number.isNaN(Number(values.quantity))) {
    errors.quantity = 'Must be a number';
  }
  if (!values.chances) {
    errors.chances = 'Required';
  } else if (Number.isNaN(Number(values.chances))) {
    errors.chances = 'Must be a number';
  }
  if (values.isActive === undefined) {
    errors.isActive = 'Required';
  }
  return errors;
};

const parseNum = value =>
  (value === undefined || Number.isNaN(Number(value))
    ? undefined
    : parseInt(value, 0));

const PrizeForm = (props) => {
  const {
    handleSubmit, pristine, reset, submitting,
  } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component={TextFieldWithLabel}
          label="Name"
          type="text"
        />
      </div>
      <div>
        <Field
          name="description"
          component={TextFieldWithLabel}
          label="Description"
          type="text"
        />
      </div>
      <div>
        <Field
          parse={parseNum}
          format={parseNum}
          name="quantity"
          component={TextFieldWithLabel}
          label="Quantity"
          type="number"
        />
      </div>
      <div>
        <Field
          parse={parseNum}
          format={parseNum}
          name="chances"
          component={TextFieldWithLabel}
          label="Chances"
          type="number"
        />
      </div>
      <div>
        <Field
          name="isActive"
          component={SwitchWithLabel}
          label="Is Active"
          type="checkbox"
        />
      </div>
      <div>
        <ButtonLoading
          type="submit"
          disabled={pristine}
          loading={submitting}
          color="primary"
          text={submitting ? 'Submitting' : 'Submit'}
        />{' '}
        <Button
          raised
          type="button"
          disabled={pristine || submitting}
          onClick={reset}
        >
          Reset
        </Button>
      </div>
    </form>
  );
};

PrizeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'PrizeForm', // a unique identifier for this form
  validate,
})(PrizeForm);
