import * as ActionTypes from './ActionTypes';

export const Inventory = (state = {
        isLoading : true,
        posting : false,
        putting : false,
        errMes : null,
        inventory : [],
        stocks : []
    }, action) => {
    switch(action.type){
        case ActionTypes.INVENTORY_LOADING:
            return {...state, isLoading: true, posting: false, putting: false, errMes: null, inventory: [], stocks: []};
        case ActionTypes.INVENTORY_FAILED:
            return {...state, isLoading: false, posting: false, putting: false, errMes: action.payload, inventory: [], stocks: []};
        case ActionTypes.INVENTORY_ADD:
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, inventory: action.payload};
        case ActionTypes.STOCKS_ADD:
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, stocks: action.payload};
        case ActionTypes.INVENTORY_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.INVENTORY_POST:
            let newInventory = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, inventory: state.inventory.concat(newInventory)};
        case ActionTypes.INVENTORY_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.INVENTORY_PUT:
            let editInventory = action.payload;
            let inventoryCopy = [...state.inventory];
            inventoryCopy[editInventory.sNo - 1] = editInventory;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, inventory: [...inventoryCopy]};
        case ActionTypes.STOCKS_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.STOCKS_POST:
            let newStock = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, stocks: state.stocks.concat(newStock)};
        case ActionTypes.STOCKS_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.STOCKS_PUT:
            let editStock = action.payload;
            let stocksCopy = [...state.stocks];
            stocksCopy[editStock.sNo - 1] = editStock;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, stocks: [...stocksCopy]};
        default:
            return state;
    }
}