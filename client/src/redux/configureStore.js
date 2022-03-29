import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Login } from './Login';
import { Projects } from './Projects';
import { Users } from './Users';
import { Finances } from './Finances';
import { Inventory } from './Inventory';
import { Employees } from './Employees';
import { Complaints } from './Complaints';
import { Sales } from './Sales';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            login : Login,
            projects : Projects,
            users : Users,
            finances : Finances,
            inventory : Inventory,
            employees : Employees,
            complaints : Complaints,
            sales : Sales
        }),
        applyMiddleware(thunk)
    );

    return store;
}