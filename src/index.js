import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import * as serviceWorker from './serviceWorker'

import store from './store'

import App from './components/App'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      {/* put in dynamic routes from pages and category pages */}
      <App />
    </Router>
  </Provider>
)

render(<Root store={store} />, document.getElementById('root'))

serviceWorker.unregister()
