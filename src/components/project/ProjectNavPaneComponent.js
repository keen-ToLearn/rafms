import React, { Component } from 'react';
import { Button, Nav, NavItem, UncontrolledTooltip } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class ProjectNavPane extends Component{
    render(){
        return(
            <div className="col-1 bg-light" style={{ height : "78.7vh" }}>
                <Nav className="py-4" vertical>
                    <NavItem className="py-2">
                        <NavLink className="nav-link p-0 w-75" to={`/usermain/${this.props.projectRouteId}/finance_transaction`}>
                            <Button outline color="primary" className="px-4 py-3" id="fnt">
                                <span className="fa fa-inr fa-2x fa-fw"></span>
                                <UncontrolledTooltip placement="right" target="fnt">
                                    Finance and Transactions
                                </UncontrolledTooltip>
                            </Button>
                        </NavLink>
                    </NavItem>
                    <NavItem className="py-2">
                        <NavLink className="nav-link p-0 w-75" to={`/usermain/${this.props.projectRouteId}/sales_management`}>
                            <Button outline color="primary" className="px-4 py-3" id="snm">
                                <span className="fa fa-book fa-2x fa-fw"></span>
                                <UncontrolledTooltip placement="right" target="snm">
                                    Sales Management
                                </UncontrolledTooltip>
                            </Button>
                        </NavLink>
                    </NavItem>
                    <NavItem className="py-2">
                        <NavLink className="nav-link p-0 w-75" to={`/usermain/${this.props.projectRouteId}/crm`}>
                            <Button outline color="primary" className="px-4 py-3" id="crm">
                                <span className="fa fa-users fa-2x fa-fw"></span>
                                <UncontrolledTooltip placement="right" target="crm">
                                    Customer Relationship Management
                                </UncontrolledTooltip>
                            </Button>
                        </NavLink>
                    </NavItem>
                    <NavItem className="py-2">
                        <NavLink className="nav-link p-0 w-75" to={`/usermain/${this.props.projectRouteId}/inventory`}>
                            <Button outline color="primary" className="px-4 py-3" id="inv">
                                <span className="fa fa-database fa-2x fa-fw"></span>
                                <UncontrolledTooltip placement="right" target="inv">
                                    Inventory Management
                                </UncontrolledTooltip>
                            </Button>
                        </NavLink>
                    </NavItem>
                    <NavItem className="py-2">
                        <NavLink className="nav-link p-0 w-75" to={`/usermain/${this.props.projectRouteId}/human_resources`}>
                            <Button outline color="primary" className="px-4 py-3" id="hrm">
                                <span className="fa fa-id-badge fa-2x fa-fw"></span>
                                <UncontrolledTooltip placement="right" target="hrm">
                                    Human Resources
                                </UncontrolledTooltip>
                            </Button>
                        </NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default ProjectNavPane;