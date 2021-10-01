import React, { Component } from 'react';
import Home from './HomeComponent';
import AdminLogin from './admin/AdminLoginComponent';
import AdminMain from './admin/AdminMainComponent';
import UserLogin from './user/UserLoginComponent';
import UserMain from './user/UserMainComponent';
import { LOGIN } from '../shared/login';
import { Switch, Route, Redirect } from 'react-router-dom';

class HomeMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            login : LOGIN
        }
    }
    render(){
        return(
            <Switch>
                <Route path="/home" component={Home}/>
                <Route path="/adminlogin" component={() => <AdminLogin login={this.state.login[0]}/>}/>
                <Route path="/adminmain" component={AdminMain}/>
                <Route path="/userlogin" component={() => <UserLogin login={this.state.login[1]}/>}/>
                <Route path="/usermain" component={UserMain}/>
                <Redirect to="/home"/>
            </Switch>
        );
    }
}

export default HomeMain;