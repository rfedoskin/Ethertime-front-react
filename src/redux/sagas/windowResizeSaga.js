import { take, put, call } from 'redux-saga/effects';
import { eventChannel, buffers } from 'redux-saga';
import { mediaSizeChanged } from '../actions/appActions';

const mediaSizes = {
  XL: '(min-width: 1280px)',
  L: '(max-width: 1279px)',
};

function initWindowResizeChannel() {
  const mediaQueryList = Object.entries(mediaSizes);

  return eventChannel(emit => {
    const listeners = mediaQueryList.map(([size, mediaQuery]) => {
      const mql = global.matchMedia(mediaQuery);

      const handleQueryListener = event => {
        if (event.matches) {
          emit(size);
        }
      };

      mql.addListener(handleQueryListener);

      if (mql.matches) {
        emit(size);
      }

      return () => mql.removeListeners(handleQueryListener);
    });

    return () => {
      listeners.forEach(remove => remove());
    };
  }, buffers.fixed(1));
}

export default function* windowResizeSaga() {
  const channel = yield call(initWindowResizeChannel);

  while (true) {
    const mediaMatch = yield take(channel);
    yield put(mediaSizeChanged(mediaMatch));
  }
}
