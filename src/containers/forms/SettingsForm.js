import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, FastField as Field } from 'formik';
import Button from '@material-ui/core/Button';
import MaterialInput from '../../components/MaterialInput';
import { handleFetchEdition } from '../../actions';
import { connect } from 'react-redux';
import AutosuggestSearch from '../../components/AutosuggestSearch';

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
  defaultMargin: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200
  }
});

const SettingsForm = ({ onSubmit, classes }) => {
  return (
    <div>
      <Formik
      displayName="SettingsForm"
      onSubmit={onSubmit}
      initialValues={initialSettingsValues}
      render={() => (
        <Form>
          <Field name="edition-auto" label="Edition" className={classes.defaultMargin} component={AutosuggestSearch} onSubmit={onSubmit}/>
          <Field name="edition" label="Edition" className={classes.defaultMargin} component={MaterialInput} />
          <Button
            type="submit"
            className={classes.defaultMargin}>Submit</Button>
        </Form>
      )}
      />
      <Button
        type="clear"
        className={classes.defaultMargin} onClick={clearStorage}>Clear Storage</Button>
    </div>
  );
}

SettingsForm.propTypes = {
  onSubmit: PropTypes.func,
  classes: PropTypes.object
}

const clearStorage = () => {
  browser.storage.local.clear();
  window.close();
}

const initialSettingsValues = {
  edition: ""
}

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => {
    console.dir(values)
    dispatch(handleFetchEdition(values.edition));
  }
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(SettingsForm))