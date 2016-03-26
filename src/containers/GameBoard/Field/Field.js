/* @flow */
import React from 'react'
import { connect } from 'react-redux'
// components
import { Surface, Group } from 'react-art'
import Grid from './Grid/Grid'
// stylization
import classes from './Field.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)

@connect((store) => ({
  field: store.game.field,
  palette: store.settings.palette
}), null)
export default class Field extends React.Component {
  static propTypes = {
    field: React.PropTypes.array,
    palette: React.PropTypes.array
  };

  render () {
    const { field, palette } = this.props
    const width = 735
    const height = 450
    return (
      <div className={cx('field-wrapper')}>
        <Surface width={width} height={height}>
          <Group>
            <Grid
              width={width}
              height={height}
              hexCountHorizontal={50}
              hexCountVertical={35}
              field={field}
              palette={palette}
            />
          </Group>
        </Surface>
      </div>
    )
  }
}
