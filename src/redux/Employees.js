import * as ActionTypes from './ActionTypes';

export const Employees = (state = {
        isLoading : true,
        posting : false,
        putting : false,
        addingunmarking : false,
        marking : false,
        errMes : null,
        employees : []
    }, action) => {
    switch(action.type){
        case ActionTypes.EMPLOYEES_LOADING:
            return {...state, isLoading: true, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: []};
        case ActionTypes.EMPLOYEES_FAILED:
            return {...state, isLoading: false, errMes: action.payload, posting: false, putting: false, addingunmarking: false, marking: false, employees: []};
        case ActionTypes.EMPLOYEES_ADD:
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: action.payload};
        
        case ActionTypes.EMPLOYEES_POSTING:
            return {...state, isLoading: false, errMes: null, posting: true, putting: false, addingunmarking: false, marking: false};
        case ActionTypes.EMPLOYEES_POST:
            let newEmployee = action.payload;
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: state.employees.concat(newEmployee)};
        
        case ActionTypes.EMPLOYEES_PUTTING:
            return {...state, isLoading: false, errMes: null, posting: false, putting: true, addingunmarking: false, marking: false};
        case ActionTypes.EMPLOYEES_PUT:
            let editEmployee = action.payload;
            let employeesCopy = [...state.employees];
            employeesCopy[editEmployee.id] = editEmployee;
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: [...employeesCopy]};
        
        case ActionTypes.EMPLOYEES_ADDINGUNMARKING:
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: true, marking: false};
        case ActionTypes.EMPLOYEES_ADDLEAVE:
            let employeeWithLeave = action.payload;
            let employeesDuplicate = [...state.employees];
            employeesDuplicate[employeeWithLeave.id] = employeeWithLeave;
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: [...employeesDuplicate]};
        case ActionTypes.EMPLOYEES_UNMARK:
            let employeeUnmarked = action.payload;
            let employeesFaux = [...state.employees];
            employeesFaux[employeeUnmarked.id] = employeeUnmarked;
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: [...employeesFaux]};
        
        case ActionTypes.EMPLOYEES_MARKING:
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: true};
        case ActionTypes.EMPLOYEES_MARK:
            return {...state, isLoading: false, errMes: null, posting: false, putting: false, addingunmarking: false, marking: false, employees: action.payload};
        default:
            return state;
    }
}