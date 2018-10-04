import { connect } from 'react-redux'
import { setLinks, setEdition, fetchEdition, fetchEditionIfNeeded } from '../actions'
import SettingsForm from '../components/forms/SettingsForm'

const mapStateToProps = state => ({ 
  links: state.links
})

const mapDispatchToProps = dispatch => ({
  //changeEdition: (values) => dispatch(setEdition(values)),
  onSubmit: (values) => dispatch(fetchEdition(values.edition))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsForm)