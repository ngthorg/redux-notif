import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'


import { notifReducer, notifActions, NotifsComponent } from '../lib'
const { notifSend, notifClear } = notifActions

// React component
class Demo extends Component {
  constructor() {
    super()
    this.state = {msg: 'hello!', kind: 'info', dismissAfter: 3000}
  }

  handleChange (e) {
    this.setState({msg: e.target.value});
  }

  handleDismissAfter (e) {
    this.setState({dismissAfter: e.target.value});
  }

  onKindChange (e) {
    this.setState({kind: e.target.value});
  }

  send() {
    this.props.notifSend({message: this.state.msg, kind: this.state.kind, dismissAfter: this.state.dismissAfter})
  }

  clear() {
    this.props.notifClear()
  }

  render(){
    let { msg, kind, dismissAfter } = this.state
    const { onNotifSend } = this.props
    const kinds = ['info', 'success', 'warning', 'error']
    return (
      <div className="container">
        <NotifsComponent right top />
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h2 style={{marginBottom: '40px'}}>Re-Notif Demo</h2>
            <form>
              <div className="form-group row">
                <label className="col-sm-4 form-control-label">Message</label>
                <div className="col-sm-8">
                  <input id="message" className="form-control" type="text" value={msg} onChange={::this.handleChange} />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 form-control-label">Kind</label>
                <div className="col-sm-8">
                  {kinds.map((k, i) =>
                    <label key={i} className="radio-inline">
                      <input type="radio" name={k} value={k} checked={kind === k} onChange={::this.onKindChange} />{k}
                    </label>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label className="col-sm-4 form-control-label">Dismiss After (ms)</label>
                <div className="col-sm-8">
                  <input className="form-control" type="text" value={dismissAfter} onChange={::this.handleDismissAfter} />
                </div>
              </div>
            </form>
            <button className="btn btn-primary btn-sm btn-block" onClick={::this.send}>Send</button>
            <button className="btn btn-secondary btn-sm btn-block" onClick={::this.clear}>Clear all</button>
          </div>
        </div>
      </div>
    )
  }
}

// Store:
const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)
)(createStore)

const store = createStoreWithMiddleware(combineReducers({notifs: notifReducer}), {})

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Connected Component:
const App = connect(
  mapStateToProps,
  {notifSend, notifClear}
)(Demo)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
