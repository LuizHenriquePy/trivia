import { combineReducers } from 'redux';
import questions from './questions';
import player from './player';
import gameSettings from './gameSettings';

const rootReducer = combineReducers({ player, questions, gameSettings });

export default rootReducer;
