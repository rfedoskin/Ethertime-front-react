import { combineReducers } from 'redux';
import appReducer from './appReducer';
import contractReducer from './contractReducer';
import accountReducer from './accountReducer';
import lotteriesReducer from './lotteriesReducer';
import lotteriesSearchPaginationReducer from './lotteriesSearchPaginationReducer';
import lotteriesSearchReducer from './lotteriesSearchReducer';
import cyclesReducer from './cyclesReducer';
import upcomingCyclesReducer from './upcomingCyclesReducer';

export default combineReducers({
  appReducer,
  contractReducer,
  accountReducer,
  lotteriesReducer,
  lotteriesSearchPaginationReducer,
  lotteriesSearchReducer,
  cyclesReducer,
  upcomingCyclesReducer,
});
