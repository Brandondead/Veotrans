import { combineReducers } from 'redux';
import settingsReducer from './SettingsReducer';

const rootReducer = combineReducers({
    settingsReducer,
});

export default rootReducer;