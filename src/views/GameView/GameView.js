/* @flow */
import React from 'react'
import Navigation from 'containers/Navigation/Navigation'

export default class GameView extends React.Component {
  render () {
    return (
      <div className='wrapper'>
        <Navigation />

        <div className='container'>
          <h2>Welcome to Hexa!</h2>
          <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Alias asperiores, consequuntur eos eum eveniet explicabo ipsa labore mollitia nesciunt quia
            repellat sit? Dolores doloribus ducimus laudantium quas, quibusdam rem tenetur?
          </p>
          <br/>
          <div className='btn btn-primary'>Play Now!</div>
        </div>
      </div>
    )
  }
}
