import { createStore } from 'redux';
import {
  APPTIMER_TICK,
  APP_FININSH_LOADING,
  SET_HINT_SHOWN,
  CHANGE_MEDIA_SIZE,
} from '../actions/appActions';

const initialState = {
  isAppLoaded: false,
  appTimerId: null,
  nowTime: Date.now(),
  isHintShown: false,
  mediaSize: 'XL',
};

const appReducer = (state = initialState, action) => {
  const oldState = { ...state };

  switch (action.type) {
    case APP_FININSH_LOADING:
      return {
        ...oldState,
        isAppLoaded: true,
      };
    case APPTIMER_TICK:
      return {
        ...oldState,
        nowTime: action.nowTime,
      };
    case SET_HINT_SHOWN:
      return {
        ...oldState,
        isHintShown: action.isShown,
      };
    case CHANGE_MEDIA_SIZE:
      return {
        ...oldState,
        mediaSize: action.mediaSize,
      };
    default:
      return oldState;
  }
};

export const getNowTimeInSeconds = state => {
  return state.appReducer.nowTime / 1000;
};

export const getNowTimeInMilliseconds = state => {
  return state.appReducer.nowTime;
};

export const getMediaSize = state => {
  return state.appReducer.mediaSize;
};

export default appReducer;

export const store = createStore(appReducer);
