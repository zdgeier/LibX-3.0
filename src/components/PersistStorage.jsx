import * as React from 'react';
import { FormikProps, connect } from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';


class PersistImpl extends React.Component {
  static defaultProps = {
    debounce: 100,
  };

  saveForm = debounce((data) => {
    browser.storage.local.set({[this.props.name]: JSON.stringify(data)});
  }, this.props.debounce);

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.formik, this.context.formik)) {
      this.saveForm(prevProps.formik);
    }
  }

  componentDidMount() {
    browser.storage.local.get([this.props.name]).then((result) => {
      if (result && result !== null) {
        var values = JSON.parse(result[this.props.name]);
        this.props.formik.setFormikState(values);
      }
    })
  }

  render() {
    return null;
  }
}

export const Persist = connect(PersistImpl);