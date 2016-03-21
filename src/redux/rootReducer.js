import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import settings from './modules/settings'
import game from './modules/game'

export default combineReducers({
  game,
  settings,
  router
})
