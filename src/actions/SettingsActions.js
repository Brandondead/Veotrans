import SyncStorage from 'sync-storage';
import { SET_LANGUAGE, SET_SETTINGS } from "../constants";

function setSettings(settings) {
    return {
        type: SET_SETTINGS,
        payload: {
            settings
        }
    }
}

function setLanguage(language) {
    return {
        type: SET_LANGUAGE,
        payload: {
            language
        }
    }
}

export function getSettings() {
    return (dispatch) => {
        SyncStorage.init().then(()=>{
            const settings = SyncStorage.get('settings');
            dispatch(setSettings(settings));
        });
    }
}

export function saveSettings(settings) {
    return (dispatch) => {
        SyncStorage.init().then(()=>{
            SyncStorage.set('settings', settings);
            dispatch(setSettings(settings));
        });
    }
}

export function changeLanguage(language) {
    return (dispatch) => {
        dispatch(setLanguage(language));
    }
}
