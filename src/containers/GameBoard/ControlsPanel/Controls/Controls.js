/* @flow */
import React, { PropTypes } from 'react'
// stylization
import classes from './Controls.scss'
import classnames from '../../../../../node_modules/classnames/bind'

let cx = classnames.bind(classes)
export default class Controls extends React.Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    style: PropTypes.object
  };

  render () {
    const { palette, style } = this.props
    return (
      <div className={cx('container')} style={style}>
        {palette.map((color, index) =>
          <div key={index} className={cx('selection')}>
            <div className={cx('color')} style={{backgroundColor: color}}></div>
          </div>
        )}
      </div>
    )
  }
}
