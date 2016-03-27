/* @flow */
import React from 'react'
// components
import Navigation from 'containers/Navigation/Navigation'
import GameBoard from 'containers/GameBoard/GameBoard'
import RightPanel from 'containers/RightPanel/RightPanel'

export default class GameView extends React.Component {
  render () {
    return (
      <div>
        <Navigation />
        <div className='container' style={{minWidth: '1170px'}}>
          <GameBoard />
          <RightPanel />
        </div>
      </div>
    )
  }
}
