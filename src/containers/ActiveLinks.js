import { connect } from 'react-redux'
import { setLinks } from '../actions'
import LinksForm from '../components/forms/links-form'

const mapStateToProps = state => ({
  links: state.links
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setLinks(ownProps.links))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinksForm)