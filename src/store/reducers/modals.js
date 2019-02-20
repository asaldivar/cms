const initialState = {
  isOpen: false,
  form: {
    type: '',
    handleSave: () => {},
  },
}

function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        isOpen: true,
        form: action.form,
      }
    case 'CLOSE_MODAL':
      return initialState
    default:
      return state
  }
}

export default modalsReducer
