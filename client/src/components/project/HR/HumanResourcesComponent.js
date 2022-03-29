import React, { Component } from 'react';
import HREmployee from './HREmployeeComponent';
import { Nav, NavItem, TabContent, TabPane, Row, Col, NavLink } from 'reactstrap';

class HumanResources extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1'
        };
    }
    activeTabModifier(selectedTab){
        this.setState({activeTab : selectedTab});
    }
    render(){
        return(
            <div className="col-11 px-1 pt-3">
                { (this.props.employees.isLoading || this.props.employees.posting || this.props.employees.putting || this.props.employees.marking) ?
                    <span className="fa fa-circle-o-notch fa-spin fa-3x"></span> :
                    ( (this.props.employees.errMes !== null) ? <h4>{this.props.employees.errMes}</h4> :
                        <>
                            <Nav className="mx-3 mt-1 nav nav-tabs">
                                <NavItem className="px-4 nav-item"></NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                                        <h5 className="m-0">Overview</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('2')} href="#" className={(this.state.activeTab === '2')?'active':''}>
                                        <h5 className="m-0">Employees</h5>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent className="mx-3 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                                <TabPane tabId='1'>
                                    <Row>
                                        <Col md={12}>
                                            <h4>Graphs</h4>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <HREmployee employees={this.props.employees.employees} employeesMarkAttendance={this.props.employeesMarkAttendance}/>
                                </TabPane>
                            </TabContent>
                        </>
                    )
                }
            </div>
        );
    }
}

export default HumanResources;