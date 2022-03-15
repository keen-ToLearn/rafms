import React, { Component } from 'react';
import AdminHome from './AdminHomeComponent';
import AdminAddProject from './AdminAddProjectComponent';
import AdminEditProject from './AdminEditProjectComponent';
import AdminViewProject from './AdminViewProjectComponent';
import AdminMyOrganisation from './AdminMyOrganisation';
import AdminGiveAccess from './AdminGiveAccessComponent';
import AdminManageAccess from './AdminManageAccessComponent';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderAdmin = ({isBtnOpen, toggleState, location, history}) => {
    function toggleBtn(){
        isBtnOpen = !isBtnOpen
    }
    function triggerLogout(){
        history.push('/home');
        history.push('/adminlogin');
    }
    return(
        <div className="row h-25 bg-dark">
            <Navbar className="container-fluid mx-5 px-5" expand="md">
                    <NavbarBrand className="mr-auto">
                        <h1 className="display-2 text-white">RAFMS</h1>
                    </NavbarBrand>
                    <Nav className="float-right" navbar>
                        <NavItem className="mr-4">
                            <Button type="button" className="btn-outline-light" onClick={() => {
                                if(location.pathname !== '/adminmain/my_org')
                                    history.push('/adminmain/my_org')
                                else
                                    history.replace('/adminmain/my_org')
                            }}>
                                My Organisation
                            </Button>
                        </NavItem>
                        <NavItem>
                            <ButtonDropdown isOpen={isBtnOpen} onClick={() => toggleState(isBtnOpen)} toggle={toggleBtn}>
                                <DropdownToggle caret>
                                    Admin
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

class AdminMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBtnOpen : false
        };
        this.toggleState = this.toggleState.bind(this);
    }

    preventBackNavigation(event){
        if((window.location.pathname === '/adminmain' || window.location.pathname === '/home') && (event.code === 'ArrowLeft' && event.altKey))
            event.preventDefault();
    }

    componentDidMount(){
        document.addEventListener('keydown', (event) => this.preventBackNavigation(event));
    }

    toggleState(iBO){
        this.setState({ isBtnOpen : iBO });
    }

    render(){
        const EditSelectedProject = ({match}) => {
            return(
                <AdminEditProject
                selectedProject={this.props.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }
        const ViewSelectedProject = ({match}) => {
            return(
                <AdminViewProject
                selectedProject={this.props.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }

        return(
            <div className="container-fluid h-100">
                <HeaderAdmin isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)}
                location={this.props.location} history={this.props.history}/>
                <Switch>
                    <Route exact path="/adminmain" component={() => <AdminHome projects={this.props.projects}/>}/>
                    <Route path="/adminmain/my_org" component={() => <AdminMyOrganisation projects={this.props.projects} bills={this.props.bills} loans={this.props.loans} funds={this.props.funds}/>}/>
                    <Route path="/adminmain/give_access" component={() => <AdminGiveAccess projects={this.props.projects} users={this.props.users}/>}/>
                    <Route path="/adminmain/manage_access" component={() => <AdminManageAccess projects={this.props.projects} users={this.props.users}/>}/>
                    <Route path="/adminmain/add_project" component={AdminAddProject}/>
                    <Route path="/adminmain/edit_project/:pid" component={EditSelectedProject}/>
                    <Route path="/adminmain/view_project/:pid" component={ViewSelectedProject}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AdminMain);