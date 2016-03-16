/* @flow */
import React from 'react'
// components
import Field from './Field/Field'
import Controls from './Controls/Controls'
// stylization
import classes from './GameMain.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

export default class GameMain extends React.Component {
  render () {
    return (
      <div className={cx('game-container')}>
        <Field/>
        <Controls/>
      </div>
    )
  }
}
