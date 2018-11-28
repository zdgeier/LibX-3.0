import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, FastField as Field } from 'formik';
import Button from '@material-ui/core/Button';
import MaterialInput from '../../components/MaterialInput';
import { handleFetchEdition } from '../../actions'
import { connect } from 'react-redux'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

const SettingsForm = ({ onSubmit }) => {
  return (
    <div className="SettingsForm">
      <Formik
      displayName="SettingsForm"
      onSubmit={onSubmit}
      initialValues={initialSettingsValues}
      render={({ errors, dirty, isSubmitting }) => (
        <Form>
          <Field name="edition" label="Edition" component={MaterialInput} />
          <Button
            type="submit"
            className="btn btn-default">Submit</Button>
        </Form>
      )}
      />
      
      <Button
        type="clear"
        className="btn btn-default" onClick={clearStorage}>Clear Storage</Button>
    </div>
  );
}

SettingsForm.propTypes = {
  onSubmit: PropTypes.func
}

const clearStorage = () => {
  browser.storage.local.clear();
}

const initialSettingsValues = {
  edition: ""
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    dispatch(handleFetchEdition(values.edition));
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SettingsForm))