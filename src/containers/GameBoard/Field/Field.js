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
  currentField: store.currentGame.field,
  palette: store.settings.palette
}), null)
export default class Field extends React.Component {
  static propTypes = {
    currentField: React.PropTypes.array,
    palette: React.PropTypes.array
  };

  render () {
    const { currentField, palette } = this.props
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
              palette={palette}
            />
          </Group>
        </Surface>
      </div>
    )
  }
}
