import { connect } from 'react-redux'
import { fetchEdition } from '../actions'
import SettingsForm from '../components/forms/SettingsForm'

const mapStateToProps = state => ({ 
  links: state.links
})

const mapDispatchToProps = dispatch => ({
  onSubmit: (values) => dispatch(fetchEdition(values.edition))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)