import * as ActionTypes from './ActionTypes';

export const Complaints = (state = {
        isLoading : true,
        postingdeleting : false,
        errMes : null,
        complaints : []
    }, action) => {
    switch(action.type){
        case ActionTypes.COMPLAINTS_LOADING:
            return {...state, isLoading: true, postingdeleting: false, errMes: null, complaints: []};
        case ActionTypes.COMPLAINTS_FAILED:
            return {...state, isLoading: false, postingdeleting: false, errMes: action.payload, complaints: []};
        case ActionTypes.COMPLAINTS_ADD:
            return {...state, isLoading: false, postingdeleting: false, errMes: null, complaints: action.payload};
        case ActionTypes.COMPLAINTS_POST:
            let complaint = action.payload;
            return {...state, isLoading: false, postingdeleting: false, errMes: null, complaints: state.complaints.concat(complaint)};
        case ActionTypes.COMPLAINTS_POSTINGDELETING:
            return {...state, isLoading: false, postingdeleting: true, errMes: null};
        case ActionTypes.COMPLAINTS_POSTDELETE:
            let newComplaint = action.payload;
            let complaintsCopy = [...state.complaints];
            if(newComplaint !== null){
                complaintsCopy[newComplaint.forPid] = newComplaint;
            }
            return {...state, isLoading: false, postingdeleting: false, errMes: null, complaints: [...complaintsCopy]};
        default:
            return state;
    }
}