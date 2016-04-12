/* @flow */
import React from 'react'
import { connect } from 'react-redux'
// components
import { Surface, Group } from 'react-art'
import Grid from './Grid/Grid'
// constants
import { BOARD_SIZE } from 'redux/constants/const'
// stylization
import classes from './Field.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect((store) => ({
  currentField: store.currentGame.field.current,
  players: store.currentGame.players,
  palette: store.settings.palette,
  debugMode: store.settings.debugMode
}), null)
export default class Field extends React.Component {
  static propTypes = {
    currentField: React.PropTypes.array,
    palette: React.PropTypes.array,
    players: React.PropTypes.array,
    debugMode: React.PropTypes.bool
  };

  render () {
    const { currentField, players, palette, debugMode } = this.props
    const width = 735
    const height = 450
    return (
      <div className={cx('field-wrapper')}>
        <Surface width={width} height={height}>
          <Group>
            <Grid
              width={width}
              height={height}
              hexCountHorizontal={BOARD_SIZE.horizontal}
              hexCountVertical={BOARD_SIZE.vertical}
              currentField={currentField}
              players={players}
              palette={palette}
              debugMode={debugMode}
            />
          </Group>
        </Surface>
      </div>
    )
  }
}
