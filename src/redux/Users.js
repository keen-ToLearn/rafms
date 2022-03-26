import * as ActionTypes from './ActionTypes';

export const Users = (state = {
        loggingIn : true,
        givingAccess : false,
        addingdeletingtask : false,
        users : []
    }, action) => {
    switch(action.type){
        case ActionTypes.USERS_ADD:
            return {...state, loggingIn: false, givingAccess: false, addingdeletingtask: false, users: action.payload};
        
        case ActionTypes.USERS_LOGGING_IN:
            return {...state, loggingIn: true, givingAccess: false, addingdeletingtask: false};
        
        case ActionTypes.USERS_LOGINOUT:
            let usersCopy = [...state.users];
            let userInfo = action.payload;
            for(let i=0; i<usersCopy.length; i++)
                if(usersCopy[i].uid === userInfo.uid){
                    usersCopy[i] = userInfo;
                    break;
                }
            return {...state, loggingIn: false, givingAccess: false, addingdeletingtask: false, users: [...usersCopy]};
        
        case ActionTypes.USERS_GIVINGACCESS:
            return {...state, loggingIn: false, givingAccess: true, addingdeletingtask: false};
        
        case ActionTypes.USERS_GIVEACCESS:
            let usersDuplicate = [...state.users];
            let userAccessInfo = action.payload;
            for(let i=0; i<usersDuplicate.length; i++)
                if(usersDuplicate[i].uid === userAccessInfo.uid){
                    usersDuplicate[i] = userAccessInfo;
                    break;
                }
            return {...state, loggingIn: false, givingAccess: false, addingdeletingtask: false, users: [...usersDuplicate]};
        
        case ActionTypes.USERS_ADDINGDELETINGTASK:
            return {...state, loggingIn: false, givingAccess: false, addingdeletingtask: true};
        
        case ActionTypes.USERS_ADDDELETETASK:
            let usersFaux = [...state.users];
            let userWithTodo = action.payload;
            usersFaux[userWithTodo.id] = userWithTodo;
            return {...state, loggingIn: false, givingAccess: false, addingdeletingtask: false, users: [...usersFaux]};
        
        default:
            return state;
    }
}