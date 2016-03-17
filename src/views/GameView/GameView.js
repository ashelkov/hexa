/* @flow */
import React from 'react'
// components
import Navigation from 'containers/Navigation/Navigation'
import GameBoard from 'containers/GameBoard/GameBoard'

export default class GameView extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <div className='container'>
          <GameBoard />
        </div>
      </div>
    )
  }
}
