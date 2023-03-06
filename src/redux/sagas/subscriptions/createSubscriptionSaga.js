import { eventChannel } from 'redux-saga';
import { take, select, call } from 'redux-saga/effects';
import { getContract } from '../../reducers/contractReducer';

function* createSubscription(event) {
  const contract = yield select(getContract);

  return eventChannel(emit => {
    const subscription = contract.events[event]({}, (error, data) => {
      if (error) {
        emit({ error: new Error(error) });
      }
      emit({ payload: data });
    });
    return () => {
      subscription.unsubscribe();
    };
  });
}

export default function createSubscriptionSaga(eventName, callback) {
  return function* subscriptionSaga() {
    const chan = yield call(createSubscription, eventName);
    try {
      while (true) {
        const data = yield take(chan);

        if (data.error) {
          console.warn(data.error);
          return;
        }

        yield call(callback, data.payload);
      }
    } finally {
      console.log('Subscription terminated.');
    }
  };
}
