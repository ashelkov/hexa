import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setDebugMode } from 'redux/modules/settings'
import classnames from 'classnames'

@connect((store) => ({
  debugMode: store.settings.debugMode
}), {setDebugMode})
export default class RightPanel extends React.Component {
  static propTypes = {
    debugMode: PropTypes.bool.isRequired,
    setDebugMode: PropTypes.func.isRequired
  };

  debugOnClick = () => {
    const { debugMode, setDebugMode } = this.props
    setDebugMode(!debugMode)
  }

  render () {
    const { debugMode } = this.props
    const style = {
      display: 'inline-block',
      width: '375px',
      verticalAlign: 'top',
      marginLeft: '30px'
    }
    return (
      <div className='panel panel-default' style={style}>
        <div className='panel-body'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque aut autem cumque deserunt
            dolorem ea eaque eos error fugiat magnam molestiae molestias obcaecati placeat provident quaerat,
            quia quis quisquam.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias atque aut autem cumque deserunt
            dolorem ea eaque eos error fugiat magnam molestiae molestias obcaecati placeat provident quaerat,
            quia quis quisquam.
          </p>
          <hr/>
          <div className={classnames('btn btn-primary btn-sm', {'active': debugMode})}
            onClick={this.debugOnClick}>
            Debug Mode
          </div>
        </div>
      </div>
    )
  }
}
