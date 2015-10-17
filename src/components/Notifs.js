import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import TransitionGroup from 'react-addons-css-transition-group'
import Notif from './Notif'


const getter = (obj, propName) => {return obj.get ? obj.get(propName) : obj[propName]}


@connect(state => ({
  notifs: state.get ? state.get('notifs') : state.notifs
}))

export default class Notifs extends Component {

  static propTypes = {
    left: PropTypes.bool
    , right: PropTypes.bool
    , bottom: PropTypes.bool
    , top: PropTypes.bool
    , getStyle: PropTypes.func.isRequired
  }

  static defaultProps = {
    getStyle: getDefaultStyle
  }

  render(){
    const { notifs } = this.props
    const items = notifs.map((n) => {
      return (
        <Notif key={getter(n, 'id')} message={getter(n, 'message')} kind={getter(n, 'kind')}/>
      )
    })
    return (
      <div className='notif-container' style={{...getDefaultStyle(this.props)}}>
        <TransitionGroup transitionName="notif" transitionEnterTimeout={800} transitionLeaveTimeout={600} >
          {items}
        </TransitionGroup>
      </div>
    )
  }
}

export function getDefaultStyle(props) {
  let { left, right, bottom, top } = props;
  if (typeof left === 'undefined' && typeof right === 'undefined') {
    right = true;
  }
  if (typeof top === 'undefined' && typeof bottom === 'undefined') {
    top = true;
  }

  return {
    position: 'fixed',
    top: top ? '10px' : undefined,
    bottom: bottom ? '10px' : undefined,
    left: left ? '20px' : undefined,
    right: right ? '20px' : undefined,
    zIndex: 2000,
    width: '80%',
    maxWidth: 400,
    margin: 'auto'
  }
}

