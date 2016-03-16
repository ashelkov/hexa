/* @flow */
import React from 'react'

export default class Field extends React.Component {
  render () {
    return (
      <div>
        <p>Field component</p>
        <canvas id='field' width='720' height='400'>Refresh your browser</canvas>
      </div>
    )
  }
}
