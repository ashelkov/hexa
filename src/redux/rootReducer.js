import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import settings from './modules/settings'

export default combineReducers({
  counter,
  settings,
  router
})
