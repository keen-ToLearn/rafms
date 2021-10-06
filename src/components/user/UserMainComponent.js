import React, { Component } from 'react';
import UserHome from './UserHomeComponent';
import ProjectDashboard from '../project/ProjectDashboardComponent';
import { USERS } from '../../shared/users';
import { PROJECTS } from '../../shared/projects';
import { Switch, Route, Link } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderUser = ({isBtnOpen, toggleState}) => {
    function toggleBtn(){
        isBtnOpen = !isBtnOpen
    }
    return(
        <div className="row h-30 bg-dark">
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
                                    <Link to="/usermain/view_profile">
                                        <DropdownItem>Profile</DropdownItem>
                                    </Link>
                                    <Link to="/userlogin">
                                        <DropdownItem>Logout</DropdownItem>
                                    </Link>
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
            users : USERS,
            projects : PROJECTS,
            openProjects : []
        };
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState(iBO){
        this.setState({ isBtnOpen : iBO });
    }

    componentDidMount(){
        let ulen = this.state.users.length;
        let index;
        for(let i = 0; i < ulen; i++){
            if (this.state.users[i].uuname === 'user') {
                index = i;
                break;
            }
        }
        let uuoplen = this.state.users[index].uopenproject.length;
        let plen = this.state.projects.length;
        const openprojects = [];
        for(let i = 0; i < uuoplen; i++){
            for(let j = 0; j < plen; j++){
                if (this.state.users[index].uopenproject[i] === this.state.projects[j].pid) {
                    openprojects.push(this.state.projects[j])
                    break;
                }
            }
        }
        this.setState({ openProjects : openprojects });
    }

    render(){
        const LoadSelectedProject = ({match}) => {
            return(
                <ProjectDashboard selectedProject={this.state.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }
        return(
            <div className="container-fluid h-100">
                <HeaderUser isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)}/>
                <Switch>
                    <Route exact path="/usermain" component={() => <UserHome openProjects={this.state.openProjects}/>}/>
                    {/*<Route path="/usermain/todo" component={UserTodo}/>
                    <Route path="/usermain/view_profile" component={UserProfile}/>*/}
                    <Route path="/usermain/:pid" component={LoadSelectedProject}/>
                </Switch>
            </div>
        );
    }
}

export default UserMain;