import React from 'react'

export default class RightPanel extends React.Component {
  render () {
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
        </div>
      </div>
    )
  }
}
