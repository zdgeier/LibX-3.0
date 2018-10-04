export const SET_LINKS = 'SET_LINKS'
export const SELECT_DRAWER_CONTENT = 'SELECT_DRAWER_CONTENT'

export const setLinks = links => ({
  type: 'SET_LINKS',
  links 
})

export const selectDrawerContent = selectedDrawerContent => ({
    type: 'SELECT_DRAWER_CONTENT',
    selectedDrawerContent
})