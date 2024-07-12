import { SET_LANGUAGE, SET_SETTINGS } from "../constants";
const initialState = {

    language: 'es',
    settings: {
        plates: '',
        bus: '',
        seat: '',
        theme: '#707062',
        berlinas: false
    },
};

export default function settingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LANGUAGE:
            return {...state, language: action.payload.language};

        case SET_SETTINGS:
            return {...state, settings: action.payload.settings || state.settings};
        default:
            return state;
    }
};
