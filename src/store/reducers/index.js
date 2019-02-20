import { combineReducers } from 'redux'

import pagesReducer from './pages'
import modalsReducer from './modals'

export default combineReducers({
  pages: pagesReducer,
  modals: modalsReducer,
})
