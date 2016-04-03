import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import currentGame from './modules/currentGame/currentGame'
import fieldGenerator from './modules/fieldGenerator'
import settings from './modules/settings'

export default combineReducers({
  currentGame,
  fieldGenerator,
  settings,
  router
})
