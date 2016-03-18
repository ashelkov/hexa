/* @flow */
import React from 'react'
import { Surface, Group } from 'react-art'
import Grid from './Grid/Grid'
// stylization
import classes from './Field.scss'
import classnames from 'classnames/bind'

let cx = classnames.bind(classes)
export default class Field extends React.Component {
  render () {
    const width = 735
    const height = 450
    return (
      <div className={cx('field-wrapper')}>
        <Surface width={width} height={height}>
          <Group>
            <Grid width={width} height={height} hexCountHorizontal={50} hexCountVertical={35} />
          </Group>
        </Surface>
      </div>
    )
  }
}
