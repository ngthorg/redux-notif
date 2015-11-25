import { NOTIF_SEND, NOTIF_DISMISS, NOTIF_CLEAR } from '../actions/notifs'
import { fromJS, List } from 'immutable';

const initialState = new fromJS({
  domain: List()
});

export default function counter(state = initialState, action) {
  if (!action || !action.type) return state

  switch (action.type) {
    case NOTIF_SEND:
      return state.merge({
        domain: state.get('domain').toJS().concat(action.payload)
      });

    case NOTIF_DISMISS:
      return state.merge({
        domain: state.get('domain').filter(n => n.get('id') !== action.payload)
      });

    case NOTIF_CLEAR:
      return state.merge({
        domain: List()
      });

    default:
      return state;
  }
}
