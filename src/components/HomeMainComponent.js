import React, { Component } from 'react';
import Home from './HomeComponent';
import AdminLogin from './admin/AdminLoginComponent';
import AdminMain from './admin/AdminMainComponent';
import UserLogin from './user/UserLoginComponent';
import UserMain from './user/UserMainComponent';
import { LOGIN } from '../shared/login';
import { PROJECTS } from '../shared/projects';
import { USERS } from '../shared/users';

import { BILLS } from '../shared/finances/bills';
import { LOANS } from '../shared/finances/loans';
import { FUNDS } from '../shared/finances/funds';

import { INVENTORY } from '../shared/inventory/inventory';
import { STOCKS } from '../shared/inventory/stocks';

import { EMPLOYEES } from '../shared/hr/employees';
import { Switch, Route, Redirect } from 'react-router-dom';

class HomeMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : LOGIN,
            projects : PROJECTS,
            users : USERS,
            bills : BILLS,
            loans : LOANS,
            funds : FUNDS,
            inventory : INVENTORY,
            stocks : STOCKS,
            employees : EMPLOYEES
        };
    }

    setUser(user){
        window.localStorage.setItem('user', JSON.stringify(user));
    }

    render(){
        const RenderAdminMain = () => {
            return(
                <AdminMain projects={this.state.projects} users={this.state.users}
                bills={this.state.bills} loans={this.state.loans} funds={this.state.funds}
                employees={this.state.employees}/>
            );
        }
        const RenderUserMain = () => {
            return(
                <UserMain projects={this.state.projects}
                user={this.state.users.filter((user) => user.uuname === JSON.parse(window.localStorage.getItem('user')))[0]}
                bills={this.state.bills} loans={this.state.loans} funds={this.state.funds}
                inventory={this.state.inventory} stocks={this.state.stocks}
                employees={this.state.employees}/>
            );
        }
        return(
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/adminlogin" component={() => <AdminLogin login={this.state.login[0]}/>}/>
                <Route path="/adminmain" component={RenderAdminMain}/>
                <Route path="/userlogin" component={() => <UserLogin login={this.state.login} setUser={(user) => this.setUser(user)} />}/>
                <Route path="/usermain" component={RenderUserMain}/>
                <Redirect to="/home"/>
            </Switch>
        );
    }
}

export default HomeMain;