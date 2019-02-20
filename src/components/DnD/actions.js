export const updatePageSections = sections => ({
  type: 'UPDATE_PAGE_SECTIONS',
  sections,
})

const removeSection = id => ({
  type: 'SECTION_REMOVED',
  id,
})

export const deleteSection = id => async dispatch => {
  // API call to update page
  dispatch(removeSection(id))
}
