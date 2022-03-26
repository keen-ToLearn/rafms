import * as ActionTypes from './ActionTypes';

export const Projects = (state = {
        isLoading : true,
        posting : false,
        putting : false,
        errMes : null,
        projects : []
    }, action) => {
    switch(action.type){
        case ActionTypes.PROJECTS_LOADING:
            return {...state, isLoading: true, posting: false, putting: false, errMes: null, projects: []};
        case ActionTypes.PROJECTS_FAILED:
            return {...state, isLoading: false, posting: false, putting: false, errMes: action.payload, projects: []};
        case ActionTypes.PROJECTS_ADD:
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, projects: action.payload};
        case ActionTypes.PROJECTS_POSTING:
            return {...state, isLoading: false, posting: true, putting: false, errMes: null};
        case ActionTypes.PROJECTS_POST:
            let addproject = action.payload;
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, projects: state.projects.concat(addproject)};
        case ActionTypes.PROJECTS_PUTTING:
            return {...state, isLoading: false, posting: false, putting: true, errMes: null};
        case ActionTypes.PROJECTS_PUT:
            let projectsCopy = [...state.projects];
            let editproject = action.payload;
            for(let i=0; i<projectsCopy.length; i++)
                if(projectsCopy[i].pid === editproject.pid){
                    projectsCopy[i] = editproject;
                    break;
                }
            return {...state, isLoading: false, posting: false, putting: false, errMes: null, projects: [...projectsCopy]};
        default:
            return state;
    }
}