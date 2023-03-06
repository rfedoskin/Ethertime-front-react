import { put } from 'redux-saga/effects';
import createSubscriptionSaga from './createSubscriptionSaga';
import { ticketBuyedNotification } from '../../actions/lotteriesActions';

function* buyTicketHandler(data) {
  yield put(ticketBuyedNotification(data.returnValues.lotteryId));
}

const buyTicketSubscriptionSaga = createSubscriptionSaga('BuyTicketEvent', buyTicketHandler);

export default buyTicketSubscriptionSaga;
