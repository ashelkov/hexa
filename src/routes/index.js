import React from 'react'
import { Route, IndexRoute } from 'react-router'
// views, layouts
import CoreLayout from 'layouts/CoreLayout/CoreLayout'
import GameView from 'views/GameView/GameView'

export default (store) => (
  <Route path='/'component={CoreLayout}>
    <IndexRoute component={GameView} />
  </Route>
)
