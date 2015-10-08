import React, { Component } from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-addons-css-transition-group'
import Notif from './Notif'


const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]}


@connect(state => ({
  notifs: state.get ? state.get('notifs') : state.notifs
}))

export default class Notifs extends Component {
  render(){
    const { notifs } = this.props
    const items = notifs.map((n) => {
      return (
        <Notif key={getter(n, 'id')} message={getter(n, 'message')} kind={getter(n, 'kind')}/>
      )
    })
    return (
      <div className='notif-container' style={styles}>
        <TransitionGroup transitionName="notif" transitionEnterTimeout={800} transitionLeaveTimeout={600} >
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
