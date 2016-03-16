/* @flow */
import React from 'react'
// components
import Navigation from 'containers/Navigation/Navigation'
import GameMain from 'containers/GameMain/GameMain'

export default class GameView extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <div className='container'>
          <GameMain />
        </div>
      </div>
    )
  }
}
