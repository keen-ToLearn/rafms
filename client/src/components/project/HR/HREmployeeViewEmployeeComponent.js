import React, { Component } from 'react';
import HRViewLeave from './HRViewLeaveComponent';
import HRViewAttendance from './HRViewAttendanceComponent';
import { Link } from 'react-router-dom';
import { Button, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

class HREmployeeViewEmployee extends Component{
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
            <div className="col-11 p-0">
                <div className="container-fluid h-100 p-5">
                    <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                        <h1 className="mr-auto">{this.props.employeeToView.empName}</h1>
                        <Link to={`/usermain/human_resources/edit_employee/${this.props.employeeToView.sNo}`}>
                            <Button type="button" color="primary" className="float-right mr-3 my-2">Edit</Button>
                        </Link>
                    </div>
                    <div className="row col-10 mx-5 my-5 px-0 text-left">
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Age</th>
                                    <td>{this.props.employeeToView.empAge}</td>
                                    <th scope="row">Mobile No.</th>
                                    <td>{this.props.employeeToView.empMobNo}</td>
                                </tr>
                                <h5 className="ml-2 mt-3">Address</h5>
                                <tr>
                                    <th scope="row">Residence</th>
                                    <td colSpan={3}>{this.props.employeeToView.empAddress.resd}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Locality</th>
                                    <td colSpan={3}>{this.props.employeeToView.empAddress.locality}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Village / City</th>
                                    <td colSpan={3}>{this.props.employeeToView.empAddress.vilcity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Pin Code</th>
                                    <td colSpan={3}>{this.props.employeeToView.empAddress.pincode}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4">Department</th>
                                    <td className="pt-4">{this.props.employeeToView.empDept}</td>
                                    <th scope="row" className="pt-4">Job Role</th>
                                    <td className="pt-4">{this.props.employeeToView.empRole}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="pt-4">Daily Hours</th>
                                    <th scope="row" className="pt-4">Pay type</th>
                                    <th scope="row" className="pt-4" colSpan={2}>Pay</th>
                                </tr>
                                <tr>
                                    <td>{this.props.employeeToView.empDailyHours}</td>
                                    <td>{this.props.employeeToView.empPayType}</td>
                                    <td colSpan={2}>{this.props.employeeToView.empPay}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <hr/>
                    { this.props.addingunmarking ? <div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div> :
                        <div className="row-fluid col-10 mx-5 mt-5 px-0">
                            <Nav className="mx-3 mt-1 nav nav-tabs justify-content-center">
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                                        <h5 className="m-0">Leave</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('2')} href="#" className={(this.state.activeTab === '2')?'active':''}>
                                        <h5 className="m-0">Attendance</h5>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent className="mx-3 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                                <TabPane tabId='1'>
                                    <HRViewLeave eid={this.props.employeeToView._id} employeesAddLeave={this.props.employeesAddLeave} leaves={this.props.employeeToView.empLeave}/>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <HRViewAttendance eid={this.props.employeeToView._id} employeesUnmarkAttendance={this.props.employeesUnmarkAttendance} attendance={this.props.employeeToView.empAttendance}/>
                                </TabPane>
                            </TabContent>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default HREmployeeViewEmployee;