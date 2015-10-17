# re-notif
Redux &amp; React based Notifications center.

*Docs coming soon :-)*

Acknowledgement
I based this off of https://github.com/indexiatech/re-notif which is an Notifications center.

## Example

#### Store
`/reducers/index.js`
```
import { combineReducers } from 'redux';
import { notifReducer } from 'redux-notif';

const rootReducer = combineReducers({
  ...
  , notifs: notifReducer
});

export default rootReducer;
```

#### Smart Components
`containers/App.js`
```
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { notifActions } from 'react-notif';

const { notifSend, notifClear } = notifActions;

// React component
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {msg: 'hello!', kind: 'info', dismissAfter: 3000}
  }

  send() {
    this.props.notifSend({message: this.state.msg, kind: this.state.kind, dismissAfter: this.state.dismissAfter})
  }

  render() {
    return (
      <div>
        <NotifsComponent top right />

        <div className="container">
          ...
          <div onClick={::this.send}>Click me!</div>
        </div>
      </div>
    )
  }
}

// Map Redux state to component props
function mapStateToProps(state) {
  return {}
}

// Connected Component:
const App = connect(
  mapStateToProps,
  {notifSend, notifClear}
)(Demo)

export default App;

```
