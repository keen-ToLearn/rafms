import * as ActionTypes from './ActionTypes';

export const Sales = (state = {
        isLoading : true,
        postingdeleting : false,
        errMes : null,
        sales : []
    }, action) => {
    switch(action.type){
        case ActionTypes.SALES_LOADING:
            return {...state, isLoading: true, postingdeleting: false, errMes: null, sales: []};
        case ActionTypes.SALES_FAILED:
            return {...state, isLoading: false, postingdeleting: false, errMes: action.payload, sales: []};
        case ActionTypes.SALES_ADD:
            return {...state, isLoading: false, postingdeleting: false, errMes: null, sales: action.payload};
        case ActionTypes.SALES_POST:
            let sale = action.payload;
            return {...state, isLoading: false, postingdeleting: false, errMes: null, sales: state.sales.concat(sale)};
        case ActionTypes.SALES_POSTINGDELETING:
            return {...state, isLoading: false, postingdeleting: true, errMes: null};
        case ActionTypes.SALES_POSTDELETE:
            let newSale = action.payload;
            let salesCopy = [...state.sales];
            if(newSale !== null){
                salesCopy[newSale.forPid] = newSale;
            }
            return {...state, isLoading: false, postingdeleting: false, errMes: null, sales: [...salesCopy]};
        default:
            return state;
    }
}