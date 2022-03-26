import * as ActionTypes from './ActionTypes';
import { baseURL } from '../shared/baseURL';

//Login related action creators
export const fetchLogin = () => dispatch => {
    dispatch(loginLoading(true));

    return fetch(baseURL + 'login')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(login => dispatch(loginAdd(login)))
        .catch(error => dispatch(loginFailed(error.message)));
}

export const loginLoading = () => ({
    type : ActionTypes.LOGIN_LOADING
});

export const loginFailed = (errMes) => ({
    type : ActionTypes.LOGIN_FAILED,
    payload : errMes
});

export const loginAdd = (login) => ({
    type : ActionTypes.LOGIN_ADD,
    payload : login
});

//_______________________________________________________________________________________________________________________________
//Projects related action creators

//to fetch projects
export const fetchProjects = () => dispatch => {
    dispatch(projectsLoading(true));

    return fetch(baseURL + 'projects')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(projects => dispatch(projectsAdd(projects)))
        .catch(error => dispatch(projectsFailed(error.message)));
}

export const projectsLoading = () => ({
    type : ActionTypes.PROJECTS_LOADING
});

export const projectsFailed = (errMes) => ({
    type : ActionTypes.PROJECTS_FAILED,
    payload : errMes
});

export const projectsAdd = (projects) => ({
    type : ActionTypes.PROJECTS_ADD,
    payload : projects
});

//to add new project
export const projectsPost = (pData) => dispatch => {
    dispatch(projectPosting(true));

    const newProject = {
        pid : pData.pid,
        pname : pData.pname,
        pstart : pData.pstart,
        pdesc : pData.pdesc,
        ppriority : pData.ppriority,
        pContact : '',
        pAddress : {
            area : '',
            locality : '',
            vilcity : '',
            pinCode : ''
        }
    };

    fetch(baseURL + 'projects', {
        method: 'POST',
        body: JSON.stringify(newProject),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(project => dispatch(projectPost(project)))
    .catch(error => console.log(error.message));

    const newProjectComplaint = {
        forPid : pData.pid,
        issues : []
    };
    
    fetch(baseURL + 'complaints', {
        method: 'POST',
        body: JSON.stringify(newProjectComplaint),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(complaint => dispatch(complaintsPost(complaint)))
    .catch(error => console.log(error.message));

    const newProjectSale = {
        forPid : pData.pid,
        records : []
    };

    fetch(baseURL + 'sales', {
        method: 'POST',
        body: JSON.stringify(newProjectSale),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(sale => dispatch(salesPost(sale)))
    .catch(error => console.log(error.message));
}

export const projectPosting = () => ({
    type : ActionTypes.PROJECTS_POSTING
});

export const projectPost = (project) => ({
    type : ActionTypes.PROJECTS_POST,
    payload : project
});

export const complaintsPost = (complaint) => ({
    type : ActionTypes.COMPLAINTS_POST,
    payload : complaint
});

export const salesPost = (sale) => ({
    type : ActionTypes.SALES_POST,
    payload : sale
});

//to edit project
export const projectsPut = (pData) => dispatch => {
    dispatch(projectPutting(true));

    const pDataKeys = Object.keys(pData);
    fetch(baseURL + 'projects/' + pData.pid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(project => {
            for(let i=0; i<pDataKeys.length; i++){
                if(['area', 'locality', 'vilcity', 'pinCode'].includes(pDataKeys[i])){
                    project.pAddress[pDataKeys[i]] = pData[pDataKeys[i]];
                }
                else
                    project[pDataKeys[i]] = pData[pDataKeys[i]];
            }

            return fetch(baseURL + 'projects/' + pData.pid.toString(), {
                method: 'PUT',
                body: JSON.stringify(project),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(project => dispatch(projectPut(project)))
        .catch(error => console.log(error.message));
}

export const projectPutting = () => ({
    type : ActionTypes.PROJECTS_PUTTING
});

export const projectPut = (project) => ({
    type : ActionTypes.PROJECTS_PUT,
    payload : project
});

//_______________________________________________________________________________________________________________________________
//Users related action creators

//to fetch users
export const fetchUsers = () => dispatch => {
    return fetch(baseURL + 'users')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(users => dispatch(usersAdd(users)))
        .catch(error => console.log(error.message));
}

export const usersAdd = (users) => ({
    type : ActionTypes.USERS_ADD,
    payload : users
});

//to handle user login logout
export const usersLogInOut = (uid, uloggedIn) => dispatch => {
    dispatch(usersLoggingIn(true));
    
    fetch(baseURL + 'users/' + uid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(user => {
            user.uloggedIn = uloggedIn;
            return fetch(baseURL + 'users/' + uid.toString(), {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(user => dispatch(usersLoginLogout(user)))
        .catch(error => console.log(error.message));
}

export const usersLoggingIn = () => ({
    type : ActionTypes.USERS_LOGGING_IN
});

export const usersLoginLogout = (user) => ({
    type : ActionTypes.USERS_LOGINOUT,
    payload : user
});

//to revoke give access to users
export const usersPut = (uid, uopenproject) => dispatch => {
    dispatch(usersGivingAccess(true));

    fetch(baseURL + 'users/' + uid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(user => {
            user.uopenproject = uopenproject;
            return fetch(baseURL + 'users/' + uid.toString(), {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(user => dispatch(usersGiveAccess(user)))
        .catch(error => console.log(error.message));
}

export const usersGivingAccess = () => ({
    type : ActionTypes.USERS_GIVINGACCESS
});

export const usersGiveAccess = (user) => ({
    type : ActionTypes.USERS_GIVEACCESS,
    payload : user
});

//to add delete task
export const usersAddDeleteTask = (uid, task, option) => dispatch => {
    dispatch(userAddingDeletingTask(true));

    fetch(baseURL + 'users/' + uid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(user => {
            if(option === 'POST')
                user.utodo.push(task);
            else if(option === 'DELETE')
                user.utodo.splice(task, 1);
            
            return fetch(baseURL + 'users/' + uid.toString(), {
                method: 'PUT',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials : 'same-origin'
            })
        })
        .then(response => response.json())
        .then(user => dispatch(userAddDeleteTask(user)))
        .catch(error => console.log(error.message));
}

export const userAddingDeletingTask = () => ({
    type : ActionTypes.USERS_ADDINGDELETINGTASK
});

export const userAddDeleteTask = (user) => ({
    type : ActionTypes.USERS_ADDDELETETASK,
    payload : user
});

//_______________________________________________________________________________________________________________________________
//Finances related action creators

//to fetch bills, loans, funds
export const fetchFinances = () => dispatch => {
    dispatch(financesLoading(true));

    fetch(baseURL + 'bills')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(bills => dispatch(billsAdd(bills)))
        .catch(error => dispatch(financesFailed(error.message)));
    
    fetch(baseURL + 'loans')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(loans => dispatch(loansAdd(loans)))
        .catch(error => dispatch(financesFailed(error.message)));
    
    fetch(baseURL + 'funds')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(funds => dispatch(fundsAdd(funds)))
        .catch(error => dispatch(financesFailed(error.message)));
}

export const financesLoading = () => ({
    type : ActionTypes.FINANCES_LOADING
});

export const financesFailed = (errMes) => ({
    type : ActionTypes.FINANCES_FAILED,
    payload : errMes
});

export const billsAdd = (bills) => ({
    type : ActionTypes.BILLS_ADD,
    payload : bills
});

export const loansAdd = (loans) => ({
    type : ActionTypes.LOANS_ADD,
    payload : loans
});

export const fundsAdd = (funds) => ({
    type : ActionTypes.FUNDS_ADD,
    payload : funds
});

//to add bill
export const billsPost = (newBill) => dispatch => {
    dispatch(billPosting(true));

    return fetch(baseURL + 'bills', {
        method: 'POST',
        body: JSON.stringify(newBill),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(bill => dispatch(billPost(bill)))
    .catch(error => console.log(error.message));
}

export const billPosting = () => ({
    type : ActionTypes.BILLS_POSTING
});

export const billPost = (bill) => ({
    type : ActionTypes.BILLS_POST,
    payload : bill
});

//to edit bill
export const billsPut = (id, editBill) => dispatch => {
    dispatch(billPutting(true));

    return fetch(baseURL + 'bills/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(editBill),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(bill => dispatch(billPut(bill)))
    .catch(error => console.log(error.message));
}

export const billPutting = () => ({
    type : ActionTypes.BILLS_PUTTING
});

export const billPut = (bill) => ({
    type : ActionTypes.BILLS_PUT,
    payload : bill
});

//to add loan
export const loansPost = (newLoan) => dispatch => {
    dispatch(loanPosting(true));

    return fetch(baseURL + 'loans', {
        method: 'POST',
        body: JSON.stringify(newLoan),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(loan => dispatch(loanPost(loan)))
    .catch(error => console.log(error.message));
}

export const loanPosting = () => ({
    type : ActionTypes.LOANS_POSTING
});

export const loanPost = (loan) => ({
    type : ActionTypes.LOANS_POST,
    payload : loan
});

//to edit loan
export const loansPut = (id, editLoan) => dispatch => {
    dispatch(loanPutting(true));

    return fetch(baseURL + 'loans/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(editLoan),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(loan => dispatch(loanPut(loan)))
    .catch(error => console.log(error.message));
}

export const loanPutting = () => ({
    type : ActionTypes.LOANS_PUTTING
});

export const loanPut = (loan) => ({
    type : ActionTypes.LOANS_PUT,
    payload : loan
});

//to add fund
export const fundsPost = (newFund) => dispatch => {
    dispatch(fundPosting(true));

    return fetch(baseURL + 'funds', {
        method: 'POST',
        body: JSON.stringify(newFund),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(fund => dispatch(fundPost(fund)))
    .catch(error => console.log(error.message));
}

export const fundPosting = () => ({
    type : ActionTypes.FUNDS_POSTING
});

export const fundPost = (fund) => ({
    type : ActionTypes.FUNDS_POSTING,
    payload : fund
});

//to edit fund
export const fundsPut = (id, editFund) => dispatch => {
    dispatch(fundPutting(true));

    return fetch(baseURL + 'funds/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(editFund),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(fund => dispatch(fundPut(fund)))
    .catch(error => console.log(error.message));
}

export const fundPutting = () => ({
    type : ActionTypes.FUNDS_PUTTING
});

export const fundPut = (fund) => ({
    type : ActionTypes.FUNDS_PUT,
    payload : fund
});

//_______________________________________________________________________________________________________________________________
//Inventory related action creators

//to fetch inventory, stocks
export const fetchInventory = () => dispatch => {
    dispatch(inventoryLoading(true));

    fetch(baseURL + 'inventory')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(inventory => dispatch(inventoryAdd(inventory)))
        .catch(error => dispatch(inventoryFailed(error.message)));
    
    fetch(baseURL + 'stocks')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(stocks => dispatch(stocksAdd(stocks)))
        .catch(error => dispatch(inventoryFailed(error.message)));
}

export const inventoryLoading = () => ({
    type : ActionTypes.INVENTORY_LOADING
});

export const inventoryFailed = (errMes) => ({
    type : ActionTypes.INVENTORY_FAILED,
    payload : errMes
});

export const inventoryAdd = (inventory) => ({
    type : ActionTypes.INVENTORY_ADD,
    payload : inventory
});

export const stocksAdd = (stocks) => ({
    type : ActionTypes.STOCKS_ADD,
    payload : stocks
});

//to add inventory
export const inventoryPost = (newInventory) => dispatch => {
    dispatch(inventoryPosting(true));

    return fetch(baseURL + 'inventory', {
        method: 'POST',
        body: JSON.stringify(newInventory),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(inventory => dispatch(inventoryItemPost(inventory)))
    .catch(error => console.log(error.message));
}

export const inventoryPosting = () => ({
    type : ActionTypes.INVENTORY_POSTING
});

export const inventoryItemPost = (inventory) => ({
    type : ActionTypes.INVENTORY_POST,
    payload : inventory
});

//to edit inventory
export const inventoryPut = (id, editInventory) => dispatch => {
    dispatch(inventoryPutting(true));

    return fetch(baseURL + 'inventory/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(editInventory),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(inventory => dispatch(inventoryItemPut(inventory)))
    .catch(error => console.log(error.message));
}

export const inventoryPutting = () => ({
    type : ActionTypes.INVENTORY_PUTTING
});

export const inventoryItemPut = (inventory) => ({
    type : ActionTypes.INVENTORY_PUT,
    payload : inventory
});

//to add stock
export const stocksPost = (newStock) => dispatch => {
    dispatch(stockPosting(true));

    return fetch(baseURL + 'stocks', {
        method: 'POST',
        body: JSON.stringify(newStock),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(stock => dispatch(stockPost(stock)))
    .catch(error => console.log(error.message));
}

export const stockPosting = () => ({
    type : ActionTypes.STOCKS_POSTING
});

export const stockPost = (stock) => ({
    type : ActionTypes.STOCKS_POST,
    payload : stock
});

//to edit stock
export const stocksPut = (id, editStock) => dispatch => {
    dispatch(stockPutting(true));

    return fetch(baseURL + 'stocks/' + id.toString(), {
        method: 'PUT',
        body: JSON.stringify(editStock),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(stock => dispatch(stockPut(stock)))
    .catch(error => console.log(error.message));
}

export const stockPutting = () => ({
    type : ActionTypes.STOCKS_PUTTING
});

export const stockPut = (stock) => ({
    type : ActionTypes.STOCKS_PUT,
    payload : stock
});

//_______________________________________________________________________________________________________________________________
//Employees related action creators

//to fetch employees
export const fetchEmployees = () => dispatch => {
    dispatch(employeesLoading(true));

    return fetch(baseURL + 'employees')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(employees => dispatch(employeesAdd(employees)))
        .catch(error => dispatch(employeesFailed(error.message)));
}

export const employeesLoading = () => ({
    type : ActionTypes.EMPLOYEES_LOADING
});

export const employeesFailed = (errMes) => ({
    type : ActionTypes.EMPLOYEES_FAILED,
    payload : errMes
});

export const employeesAdd = (employees) => ({
    type : ActionTypes.EMPLOYEES_ADD,
    payload : employees
});

//to add employee
export const employeesPost = (eData) => dispatch => {
    dispatch(employeePosting(true));

    return fetch(baseURL + 'employees', {
        method: 'POST',
        body: JSON.stringify(eData),
        headers: {
            'Content-Type' : 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMes = new Error(error.message);
        throw errMes;
    })
    .then(response => response.json())
    .then(employee => dispatch(employeePost(employee)))
    .catch(error => console.log(error.message));
}

export const employeePosting = () => ({
    type : ActionTypes.EMPLOYEES_POSTING
});

export const employeePost = (employee) => ({
    type : ActionTypes.EMPLOYEES_POST,
    payload : employee
});

//to edit employee
export const employeesPut = (eData) => dispatch => {
    dispatch(employeePutting(true));

    fetch(baseURL + 'employees/' + (eData.sNo - 1).toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(employee => {
            eData.empAttendance = employee.empAttendance;
            eData.empLeave = employee.empLeave;

            return fetch(baseURL + 'employees/' + (eData.sNo - 1).toString(), {
                method: 'PUT',
                body: JSON.stringify(eData),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(employee => dispatch(employeePut(employee)))
        .catch(error => console.log(error.message));
}

export const employeePutting = () => ({
    type : ActionTypes.EMPLOYEES_PUTTING
});

export const employeePut = (employee) => ({
    type : ActionTypes.EMPLOYEES_PUT,
    payload : employee
});

//to mark attendance
export const employeesMarkAttendance = (presenteeList) => dispatch => {
    dispatch(employeeMarkingAttendance(true));

    fetch(baseURL + 'employees')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(employees => {
            let curDate = (new Date().getDate())+'/'+(new Date().getMonth() + 1)+'/'+(new Date().getFullYear());
            for(let i=0; i < presenteeList.length; i++){
                employees[presenteeList[i] - 1].empAttendance.push(curDate);
            }

            dispatch(employeeMarkAttendance(employees));

            async function putBackEmployees(){
                for(let i=0; i < presenteeList.length; i++){
                    await fetch(baseURL + 'employees/' + (presenteeList[i] - 1).toString(), {
                        method: 'PUT',
                        body: JSON.stringify(employees[presenteeList[i] - 1]),
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        credentials: 'same-origin'
                    })
                    .then(response => response.json(),
                    error => {
                        var errMes = new Error(error.message);
                        throw errMes;
                    })
                    .catch(error => console.log(error.message));
                }
            }

            putBackEmployees();
        })
        .catch(error => console.log(error.message));
}

export const employeeMarkingAttendance = () => ({
    type : ActionTypes.EMPLOYEES_MARKING
});

export const employeeMarkAttendance = (employees) => ({
    type : ActionTypes.EMPLOYEES_MARK,
    payload : employees
});

//to delete attendance
export const employeesUnmarkAttendance = (eid, index) => dispatch => {
    dispatch(employeeUnmarkingAttendance(true));

    fetch(baseURL + 'employees/' + eid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(employee => {
            employee.empAttendance.splice(index, 1);

            return fetch(baseURL + 'employees/' + eid.toString(), {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(employee => dispatch(employeeUnmarkAttendance(employee)))
        .catch(error => console.log(error.message));
}

export const employeeUnmarkingAttendance = () => ({
    type : ActionTypes.EMPLOYEES_ADDINGUNMARKING
});

export const employeeUnmarkAttendance = (employee) => ({
    type : ActionTypes.EMPLOYEES_UNMARK,
    payload : employee
});

//to add leave
export const employeesAddLeave = (eid, leaveInfo) => dispatch => {
    dispatch(employeeAddingLeave(true));

    fetch(baseURL + 'employees/' + eid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(employee => {
            employee.empLeave.push(leaveInfo);

            return fetch(baseURL + 'employees/' + eid.toString(), {
                method: 'PUT',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials: 'same-origin'
            })
        })
        .then(response => response.json())
        .then(employee => dispatch(employeeAddLeave(employee)))
        .catch(error => console.log(error.message));
}

export const employeeAddingLeave = () => ({
    type : ActionTypes.EMPLOYEES_ADDINGUNMARKING
});

export const employeeAddLeave = (employee) => ({
    type : ActionTypes.EMPLOYEES_ADDLEAVE,
    payload : employee
});

//_______________________________________________________________________________________________________________________________
//Complaints related action creators

//to fetch complaints
export const fetchComplaints = () => dispatch => {
    dispatch(complaintsLoading(true));

    return fetch(baseURL + 'complaints')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(complaints => dispatch(complaintsAdd(complaints)))
        .catch(error => dispatch(complaintsFailed(error.message)));
}

export const complaintsLoading = () => ({
    type : ActionTypes.COMPLAINTS_LOADING
});

export const complaintsFailed = (errMes) => ({
    type : ActionTypes.COMPLAINTS_FAILED,
    payload : errMes
});

export const complaintsAdd = (complaints) => ({
    type : ActionTypes.COMPLAINTS_ADD,
    payload : complaints
});

//to add delete complaint
export const complaintsPostDelete = (forPid, newComplaint, option) => dispatch => {
    dispatch(complaintPostingDeleting(true));

    fetch(baseURL + 'complaints/' + forPid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(complaint => {
            if(option === 'POST'){
                complaint.issues.push(newComplaint);
            }
            else if(option === 'PUT'){
                complaint.issues[newComplaint.sNo - 1] = newComplaint;
            }
            else if(option === 'DELETE'){
                complaint.issues.splice(newComplaint-1 ,1);
            }

            return fetch(baseURL + 'complaints/' + forPid.toString(), {
                method: 'PUT',
                body: JSON.stringify(complaint),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials : 'same-origin'
            })
        })
        .then(response => response.json())
        .then(complaint => dispatch(complaintPostDelete(complaint)))
        .catch(error => console.log(error.message));
}

export const complaintPostingDeleting = () => ({
    type : ActionTypes.COMPLAINTS_POSTINGDELETING
});

export const complaintPostDelete = (complaint) => ({
    type : ActionTypes.COMPLAINTS_POSTDELETE,
    payload : complaint
});

//_______________________________________________________________________________________________________________________________
//Sales related action creators

//to fetch sales
export const fetchSales = () => dispatch => {
    dispatch(salesLoading(true));

    return fetch(baseURL + 'sales')
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(sales => dispatch(salesAdd(sales)))
        .catch(error => dispatch(salesFailed(error.message)));
}

export const salesLoading = () => ({
    type : ActionTypes.SALES_LOADING
});

export const salesFailed = (errMes) => ({
    type : ActionTypes.SALES_FAILED,
    payload : errMes
});

export const salesAdd = (sales) => ({
    type : ActionTypes.SALES_ADD,
    payload : sales
});

//to add delete sales
export const salesPostDelete = (forPid, newSale, option) => dispatch => {
    dispatch(salePostingDeleting(true));

    fetch(baseURL + 'sales/' + forPid.toString())
        .then(response => {
            if(response.ok){
                return response;
            }
            else{
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errMes = new Error(error.message);
            throw errMes;
        })
        .then(response => response.json())
        .then(sale => {
            if(option === 'POST'){
                sale.records.push(newSale);
            }
            else if(option === 'PUT'){
                sale.records[newSale.sNo - 1] = newSale;
            }
            else if(option === 'DELETE'){
                sale.records.splice(newSale-1 ,1);
            }

            return fetch(baseURL + 'sales/' + forPid.toString(), {
                method: 'PUT',
                body: JSON.stringify(sale),
                headers: {
                    'Content-Type' : 'application/json'
                },
                credentials : 'same-origin'
            })
        })
        .then(response => response.json())
        .then(sale => dispatch(salePostDelete(sale)))
        .catch(error => console.log(error.message));
}

export const salePostingDeleting = () => ({
    type : ActionTypes.SALES_POSTINGDELETING
});

export const salePostDelete = (sale) => ({
    type : ActionTypes.SALES_POSTDELETE,
    payload : sale
});