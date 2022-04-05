import React, { Component } from 'react';
import Home from './HomeComponent';
import AdminLogin from './admin/AdminLoginComponent';
import AdminMain from './admin/AdminMainComponent';
import UserLogin from './user/UserLoginComponent';
import UserMain from './user/UserMainComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { billsPost, billsPut, complaintsPostDelete, employeesAddLeave, employeesMarkAttendance, employeesPost, employeesPut, employeesUnmarkAttendance,
    fetchComplaints, fetchEmployees, fetchFinances, fetchInventory, fetchLogin, fetchProjects, fetchSales, fetchUsers, fundsPost, fundsPut, inventoryPost,
    inventoryPut, loansPost, loansPut, projectsPost, projectsPut, salesPostDelete, stocksPost, stocksPut, usersAddDeleteTask, usersLogInOut, usersPut } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        login : state.login,
        projects : state.projects,
        users : state.users,
        finances : state.finances,
        inventory : state.inventory,
        employees : state.employees,
        complaints : state.complaints,
        sales : state.sales
    }
}

const mapDispatchToProps = dispatch => ({
    fetchLogin : () => dispatch(fetchLogin()),
    fetchProjects : () => dispatch(fetchProjects()),
    fetchUsers : () => dispatch(fetchUsers()),
    fetchFinances : () => dispatch(fetchFinances()),
    fetchInventory : () => dispatch(fetchInventory()),
    fetchEmployees : () => dispatch(fetchEmployees()),
    fetchComplaints : () => dispatch(fetchComplaints()),
    fetchSales : () => dispatch(fetchSales()),
    usersLogInOut : (uid, uloggedIn) => dispatch(usersLogInOut(uid, uloggedIn)),
    usersPut : (uid, uopenproject) => dispatch(usersPut(uid, uopenproject)),
    usersAddDeleteTask : (uid, task, option) => dispatch(usersAddDeleteTask(uid, task, option)),
    projectsPost : (pData) => dispatch(projectsPost(pData)),
    projectsPut : (id, pData) => dispatch(projectsPut(id, pData)),
    complaintsPostDelete : (forPid, newComplaint, option) => dispatch(complaintsPostDelete(forPid, newComplaint, option)),
    salesPostDelete : (forPid, newSale, option) => dispatch(salesPostDelete(forPid, newSale, option)),
    inventoryPost : (newInventory) => dispatch(inventoryPost(newInventory)),
    inventoryPut : (id, editInventory) => dispatch(inventoryPut(id, editInventory)),
    stocksPost : (newStock) => dispatch(stocksPost(newStock)),
    stocksPut : (id, editStock) => dispatch(stocksPut(id, editStock)),
    billsPost : (newBill) => dispatch(billsPost(newBill)),
    billsPut : (id, editBill) => dispatch(billsPut(id, editBill)),
    loansPost : (newLoan) => dispatch(loansPost(newLoan)),
    loansPut : (id, editLoan) => dispatch(loansPut(id, editLoan)),
    fundsPost : (newFund) => dispatch(fundsPost(newFund)),
    fundsPut : (id, editFund) => dispatch(fundsPut(id, editFund)),
    employeesPost : (eData) => dispatch(employeesPost(eData)),
    employeesPut : (id, eData) => dispatch(employeesPut(id, eData)),
    employeesAddLeave : (eid, leaveInfo) => dispatch(employeesAddLeave(eid, leaveInfo)),
    employeesUnmarkAttendance : (eid, index) => dispatch(employeesUnmarkAttendance(eid, index)),
    employeesMarkAttendance : (presenteeList) => dispatch(employeesMarkAttendance(presenteeList))
});

class HomeMain extends Component{
    componentDidMount(){
        this.props.fetchLogin();
        this.props.fetchProjects();
        this.props.fetchUsers();
        this.props.fetchFinances();
        this.props.fetchInventory();
        this.props.fetchEmployees();
        this.props.fetchComplaints();
        this.props.fetchSales();
    }

    render(){
        const RenderAdminMain = () => {
            return(
                <AdminMain projects={this.props.projects} users={this.props.users.users} givingAccess={this.props.users.givingAccess}
                bills={this.props.finances.bills} loans={this.props.finances.loans} funds={this.props.finances.funds}
                employees={this.props.employees.employees} sales={this.props.sales.sales}
                projectsPost={this.props.projectsPost} projectsPut={this.props.projectsPut} usersPut={this.props.usersPut}/>
            );
        }
        const RenderUserMain = () => {
            if(this.props.users.loggingIn){
                return(
                    <div className="container-fluid h-100 pt-5">
                        <div className="pt-5">
                            <span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span>
                            <h4>Logging In...</h4>
                        </div>
                    </div>
                );
            }
            else{
                const userIn = this.props.users.users.filter((user) => user.uloggedIn)[0];
                if(userIn === undefined)
                    return(
                        <div className="container-fluid h-100 pt-5 bg-light">
                            <div className="pt-5">
                                <h3 className="pt-5">User is logged out. Relaunch the application.</h3>
                            </div>
                        </div>
                    );
                else
                    return(
                        <UserMain projects={this.props.projects} projectsPut={this.props.projectsPut}
                        user={userIn} usersLogInOut={this.props.usersLogInOut} usersAddDeleteTask={this.props.usersAddDeleteTask}
                        inventory={this.props.inventory} inventoryPost={this.props.inventoryPost} inventoryPut={this.props.inventoryPut} stocksPost={this.props.stocksPost} stocksPut={this.props.stocksPut}
                        finances={this.props.finances} billsPost={this.props.billsPost} billsPut={this.props.billsPut} loansPost={this.props.loansPost} loansPut={this.props.loansPut} fundsPost={this.props.fundsPost} fundsPut={this.props.fundsPut}
                        employees={this.props.employees} employeesPost={this.props.employeesPost} employeesPut={this.props.employeesPut} employeesAddLeave={this.props.employeesAddLeave}
                        employeesUnmarkAttendance={this.props.employeesUnmarkAttendance} employeesMarkAttendance={this.props.employeesMarkAttendance}
                        sales={this.props.sales} salesPostDelete={this.props.salesPostDelete}
                        complaints={this.props.complaints} complaintsPostDelete={this.props.complaintsPostDelete}/>
                    );
            }
        }
        return(
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/adminlogin" component={() => <AdminLogin login={this.props.login.login[0]} isLoading={this.props.login.isLoading} errMes={this.props.login.errMes}/>}/>
                <Route path="/adminmain" component={RenderAdminMain}/>
                <Route path="/userlogin" component={() => <UserLogin login={this.props.login} users={this.props.users.users} usersLogInOut={this.props.usersLogInOut}/>}/>
                <Route path="/usermain" component={RenderUserMain}/>
                <Redirect to="/home"/>
            </Switch>
        );
    }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeMain));