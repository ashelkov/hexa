import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
// components
import { Provider } from 'react-redux'
import { Router } from 'react-router'
// actions
import { windowResize } from 'redux/modules/settings'
// utils
import _ from 'lodash'

@connect(null, {windowResize})
export default class Root extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
    windowResize: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)
    window.addEventListener('resize', _.debounce(() => props.windowResize({
      width: window.innerWidth,
      height: window.innerHeight
    }), 200))
  }

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!window.devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          window.devToolsExtension.open()
        }
      } else if (!window.devToolsExtension) {
        const DevTools = require('containers/DevTools').default
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
