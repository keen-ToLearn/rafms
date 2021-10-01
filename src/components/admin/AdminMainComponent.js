import React, { Component } from 'react';
import AdminHome from './AdminHomeComponent';
import AdminAddProject from './AdminAddProjectComponent';
import AdminEditProject from './AdminEditProjectComponent';
import { PROJECTS } from '../../shared/projects';
import { Switch, Route, Link } from 'react-router-dom';
import { ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderAdmin = ({isBtnOpen, toggleState}) => {
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
                        <NavItem>
                            <ButtonDropdown isOpen={isBtnOpen} onClick={() => toggleState(isBtnOpen)} toggle={toggleBtn}>
                                <DropdownToggle caret>
                                    Admin
                                </DropdownToggle>
                                <DropdownMenu>
                                    <Link to="/adminlogin">
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

class AdminMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBtnOpen : false,
            projects : PROJECTS
        };
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState(iBO){
        this.setState({ isBtnOpen : iBO });
    }
    
    render(){
        const EditSelectedProject = ({match}) => {
            return(
                <AdminEditProject
                selectedProject={this.state.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }

        return(
            <div className="container-fluid h-100">
                <HeaderAdmin isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)}/>
                <Switch>
                    <Route exact path="/adminmain" component={() => <AdminHome projects={this.state.projects}/>}/>
                    <Route path="/adminmain/add_project" component={AdminAddProject}/>
                    <Route path="/adminmain/edit_project/:pid" component={EditSelectedProject}/>
                </Switch>
            </div>
        );
    }
}

export default AdminMain;