import React, { Component } from 'react';
import UserHome from './UserHomeComponent';
import UserTodo from './UserTodoComponent';
import ProjectDashboard from '../project/ProjectDashboardComponent';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderUser = ({isBtnOpen, toggleState, location, history}) => {
    function toggleBtn(){
        isBtnOpen = !isBtnOpen
    }
    function triggerLogout(){
        const path = location.pathname;
        if(path.indexOf('view') >= 0 || path.indexOf('edit') >= 0){
            if((history.length-3) !== (path.split('/').length-2))
                if(path.indexOf('view') >= 0)
                    history.go(-(path.split('/').length-2));
                else
                    history.go(-(history.length-3));
            else
                history.go(-(path.split('/').length-2));
        }
        else
            history.go(-(path.split('/').length-1));
    }
    return(
        <div className="row h-25 bg-dark">
            <Navbar className="container-fluid mx-5 px-5" expand="md">
                    <NavbarBrand className="mr-auto">
                        <h1 className="display-2 text-white">RAFMS</h1>
                    </NavbarBrand>
                    <Nav className="float-right" navbar>
                        <NavItem className="mr-4">
                            <Link to="/usermain/todo">
                                <Button type="button" className="btn-outline-light">
                                    <span className="fa fa-check fa-lg"></span>{' '}To-Do
                                </Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <ButtonDropdown isOpen={isBtnOpen} onClick={() => toggleState(isBtnOpen)} toggle={toggleBtn}>
                                <DropdownToggle caret>
                                    User
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => triggerLogout()}>Logout</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </NavItem>
                    </Nav>
            </Navbar>
        </div>
    );
}

class UserMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBtnOpen : false,
            openProjects : [],
            openFeatures : []
        };
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState(iBO){
        this.setState({ isBtnOpen : iBO });
    }

    preventBackNavigation(event){
        if((window.location.pathname === '/usermain') && (event.code === 'ArrowLeft' && event.altKey))
            event.preventDefault();
    }

    componentDidMount(){
        document.addEventListener('keydown', event => this.preventBackNavigation(event));

        let uuoplen = this.props.user.uopenproject.length;
        let plen = this.props.projects.length;
        const featureList = [101,102,104,105];
        const openprojects = [];
        const openfeatures = [];
        for(let i = 0; i < uuoplen; i++){
            if ( featureList.includes(this.props.user.uopenproject[i]) ) {
                openfeatures.push(this.props.user.uopenproject[i]);
            }
            else
                for(let j = 0; j < plen; j++)
                    if (this.props.user.uopenproject[i] === this.props.projects[j].pid) {
                        openprojects.push(this.props.projects[j]);
                        break;
                    }
        }
        this.setState({
            openProjects : openprojects,
            openFeatures : openfeatures
        });
    }

    render(){
        const LoadSelectedProject = ({match}) => {
            return(
                <ProjectDashboard selectedProject={this.props.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }
        return(
            <div className="container-fluid h-100">
                <HeaderUser isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)}
                location={this.props.location} history={this.props.history}/>
                <Switch>
                    <Route exact path="/usermain" component={() => <UserHome openProjects={this.state.openProjects}/>}/>
                    <Route path="/usermain/todo" component={UserTodo}/>
                    <Route path="/usermain/:pid" component={LoadSelectedProject}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(UserMain);