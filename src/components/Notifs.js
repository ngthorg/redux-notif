import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react/lib/ReactCSSTransitionGroup'

const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]}

import Notif from './Notif'

class Notifs extends Component {
  render(){
    const { notifs } = this.props
    const items = notifs.map((n) => {
      return (
        <Notif key={getter(n, 'id')} message={getter(n, 'message')} kind={getter(n, 'kind')}/>
      )
    })
    return (
      <div className='notif-container' style={styles}>
      <TransitionGroup transitionName="notif">
        {items}
      </TransitionGroup>
      </div>
    )
  }
}

var styles = {
  position: 'fixed',
  bottom: '10px',
  left: '20px',
  zIndex: 2000,
  width: '80%',
  maxWidth: 400,
  margin: 'auto'
}

export default connect(
  (state) => {
    return { notifs: state.get ? state.get('notifs') : state.notifs }
  },
  { }
)(Notifs)
