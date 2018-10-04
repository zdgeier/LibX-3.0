import { connect } from 'react-redux'
import LinksForm from '../components/forms/LinksForm'

const mapStateToProps = state => ({
  links: state.links
})

export default connect(
  mapStateToProps
)(LinksForm)