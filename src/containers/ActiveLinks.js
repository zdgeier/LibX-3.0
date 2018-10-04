import { connect } from 'react-redux'
import LinksForm from '../components/forms/LinksForm'

const mapStateToProps = state => ({
  links: state.links
  //edition: state.edition
})

export default connect(
  mapStateToProps
)(LinksForm)