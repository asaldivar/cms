export const savePage = () => ({ type: 'SAVE_PAGE' })

export const openModal = form => ({
  type: 'OPEN_MODAL',
  form,
})

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
})

export const addSection = section => {
  return {
    type: 'SECTION_ADDED',
    section,
  }
}

// export const saveComponent = (pageId, component) => dispatch => {
//   // API call to create component
//   return dispatch(addComponent(pageId, component))
// }
