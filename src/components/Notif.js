import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import Radium from 'radium'

/**
 * A single notification component
 */
@Radium
class Notif extends Component {
  constructor(props) {
    super(props)
    this._id = new Date().getTime()
    this._onActionClick = this._onActionClick.bind(this)
  }

  static defaultProps = {
    kind: 'info'
  }

  /*
   * Handle action click event
   * @description Handle click events on the
   */
  _onActionClick = (event) => {
    event.preventDefault()
    if (this.props.onClick) {
      this.props.onActionClick()
    } else {
      return
    }
  }

  render() {
    const NotifClass = classNames({
      notif: true,
      'notif-top': this.props.top,
      'notif-bottom': this.props.bottom,
    });

    return (
      <div className={NotifClass} style={[stylesNotif.base, stylesNotif[this.props.kind]]}>
        <div className="notif-icon"/>
        <div className="notif-content">
          <span className="notif-message">{this.props.message}</span>
        </div>
        {this.props.action !== undefined ? (
          <span className="notif-action">
            <button onClick={this._onActionClick}>{this.props.action}</button>
          </span>
        ) : null}
        <div className="notif-countdown" style={[styleCountdown.base, styleCountdown[this.props.kind]]}/>
        <div className="notif-close"/>
      </div>
    )
  }
}

const stylesNotif = {
  base: {
    position: 'relative',
    font: '1rem normal Helvetica, sans-serif',
    overflow: 'hidden',
    'borderRadius': 4,
    'marginBottom': 2,
    'maxHeight': 400,
    boxSizing: 'border-box',
    transition: 'all 500ms ease-in',
    boxShadow: '0 1px 2px rgba(26, 26, 26, .2)',
    padding: '1rem',
    color: '#fff'
  },

  success: {
    backgroundColor: '#64ce83'
  },

  info: {
    backgroundColor: '#3ea2ff'
  },

  warning: {
    backgroundColor: '#ff7f48'
  },

  error: {
    backgroundColor: '#EA4335'
  }
}

const styleCountdown = {
  base: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 4
  },

  info: {
    'backgroundColor': '#71bbff'
  }
}

Notif.propTypes = {
    top: PropTypes.bool,
    bottom: PropTypes.bool,
  /*
   * The notification message
   */
  message: PropTypes.string.isRequired,

  kind: React.PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,

  /*
   * The given text will be rendered as a button within the notification
   */
  action: PropTypes.string,

  /*
   * A handler to be invoked when the action recieves a click event.
   */
  onActionClick: PropTypes.func,

  /*
   * The time in milliseconds that the notification will automatically dismiss after
   */
  dismissAfter: PropTypes.number,

  /*
   * A handler to be invoked upon notification dismiss
   */
  onDismis: PropTypes.func
}
export default Notif
