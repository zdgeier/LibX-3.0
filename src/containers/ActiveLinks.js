import { connect } from 'react-redux'
import LinksForm from '../components/forms/LinksForm'

const mapStateToProps = state => ({
  links: state.edition.links.url
})

export default connect(
  mapStateToProps
)(LinksForm)