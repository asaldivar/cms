export const openModal = form => ({
  type: 'OPEN_MODAL',
  form,
})

export const closeModal = () => ({
  type: 'CLOSE_MODAL',
})

export const selectPage = name => ({
  type: 'SELECTED_PAGE',
  name,
})

export const selectCategory = category => ({
  type: 'SELECTED_CATEGORY',
  category,
})

const deletePage = pageId => ({
  type: 'DELETE_PAGE',
  pageId,
})
export const removePage = pageId => async dispatch => {
  // API call to delete page
  dispatch(deletePage(pageId))
}

const addVersion = version => ({ type: 'ADD_VERSION', version })

export const createVersion = version => async dispatch => {
  // API call to add version/pages
  console.log(version)
  dispatch(addVersion(version))
}

const addCategory = category => ({
  type: 'ADDED_CATEGORY',
  category,
})

export const saveCategory = category => async dispatch => {
  // API call to save category
  dispatch(addCategory(category))
}

const removeCategroy = (version, page, category) => ({
  type: 'REMOVED_CATEGORY',
  payload: { version, page, category },
})

export const deleteCategory = (version, page, category) => async dispatch => {
  // API call to save category
  dispatch(removeCategroy(version, page, category))
}
