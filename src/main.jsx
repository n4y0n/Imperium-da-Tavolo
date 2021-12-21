import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { store } from './store/store'
import { Provider } from 'react-redux'
import App from './App'
import WIP from './components/WIP'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <WIP />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
