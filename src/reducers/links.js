const links = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return action.links
    default:
      return state
  }
}

export default links
