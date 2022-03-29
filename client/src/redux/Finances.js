import * as ActionTypes from './ActionTypes';

export const Finances = (state = {
        isLoading : true,
        posting : false,
        putting : false,
        errMes : null,
        bills : [],
        loans : [],
        funds : []
    }, action) => {
    switch(action.type){
        case ActionTypes.FINANCES_LOADING:
            return {...state, isLoading: true, errMes: null, bills: [], loans: [], funds: []};
        case ActionTypes.FINANCES_FAILED:
            return {...state, isLoading: false, errMes: action.payload, bills: [], loans: [], funds: []};
        case ActionTypes.BILLS_ADD:
            return {...state, isLoading: false, errMes: null, bills: action.payload};
        case ActionTypes.LOANS_ADD:
            return {...state, isLoading: false, errMes: null, loans: action.payload};
        case ActionTypes.FUNDS_ADD:
            return {...state, isLoading: false, errMes: null, funds: action.payload};
        
        case ActionTypes.BILLS_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.BILLS_POST:
            let newBill = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, bills: state.bills.concat(newBill)};
        case ActionTypes.BILLS_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.BILLS_PUT:
            let editBill = action.payload;
            let billsCopy = [...state.bills];
            billsCopy[editBill.sNo - 1] = editBill;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, bills: [...billsCopy]};
        
        case ActionTypes.LOANS_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.LOANS_POST:
            let newLoan = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, loans: state.loans.concat(newLoan)};
        case ActionTypes.LOANS_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.LOANS_PUT:
            let editLoan = action.payload;
            let loansCopy = [...state.loans];
            loansCopy[editLoan.sNo - 1] = editLoan;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, loans: [...loansCopy]};
        
        case ActionTypes.FUNDS_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.FUNDS_POST:
            let newFund = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, funds: state.funds.concat(newFund)};
        case ActionTypes.FUNDS_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.FUNDS_PUT:
            let editFund = action.payload;
            let fundsCopy = [...state.funds];
            fundsCopy[editFund.sNo - 1] = editFund;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, funds: [...fundsCopy]};
        default:
            return state;
    }
}