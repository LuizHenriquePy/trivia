import { combineReducers } from 'redux';
import questions from './questions';
import player from './player';

const rootReducer = combineReducers({ player, questions });

export default rootReducer;
