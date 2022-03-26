import * as ActionTypes from './ActionTypes';

export const Login = (state = {
        isLoading : true,
        errMes : null,
        login : []
    }, action) => {
    switch(action.type){
        case ActionTypes.LOGIN_LOADING:
            return {...state, isLoading: true, errMes: null, login: []};
        case ActionTypes.LOGIN_FAILED:
            return {...state, isLoading: false, errMes: action.payload, login: []};
        case ActionTypes.LOGIN_ADD:
            return {...state, isLoading: false, errMes: null, login: action.payload};
        default:
            return state;
    }
}