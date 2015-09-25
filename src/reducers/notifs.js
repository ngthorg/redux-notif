import { NOTIF_SEND, NOTIF_DISMISS, NOTIF_CLEAR } from '../actions/notifs'
import { Map, List } from 'immutable';


export default function notifs(domain = new List([]), action) {
  if (!action || !action.type) return domain

  switch (action.type) {
    case NOTIF_SEND:
      return domain.concat(Map(action.payload))

    case NOTIF_DISMISS:
      return domain.filter(n =>
        n.get('id') !== action.payload
      )

    case NOTIF_CLEAR:
      return notifClear(domain, action)

    default:
        return []
  }
}
