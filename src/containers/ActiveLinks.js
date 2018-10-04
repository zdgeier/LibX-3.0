import { connect } from 'react-redux'
import LinksForm from '../components/forms/links-form'

const mapStateToProps = state => ({
  links: state.links
  //edition: state.edition
})

export default connect(
  mapStateToProps
)(LinksForm)