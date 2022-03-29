import React, { Component } from 'react';
import { Card, Form, FormGroup, FormText, Row, Col, Button, Label, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class HREmployeeAddEmployee extends Component{
    constructor(props){
        super(props);
        this.state = {
            empName : '',
            empAge : '',
            empDept : '',
            empRole : '',
            empMobNo : '',
            resd : '',
            locality : '',
            vilcity : '',
            pincode : '',
            empDailyHours : '',
            empPayType : '',
            empPay : '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name] : value });
    }

    handleSubmit(event){
        event.preventDefault();
        const newEmployee = {
            sNo : this.props.recordsLength + 1,
            empName : this.state.empName,
            empAge : Number(this.state.empAge),
            empDept : this.state.empDept,
            empRole : this.state.empRole,
            empMobNo : Number(this.state.empMobNo),
            empAddress : {
                resd : this.state.resd,
                locality : this.state.locality,
                vilcity : this.state.vilcity,
                pincode : this.state.pincode,
            },
            empDailyHours : Number(this.state.empDailyHours),
            empPayType : this.state.empPayType,
            empPay : Number(this.state.empPay),
            empAttendance : [],
            empLeave : []
        };
        this.props.employeesPost(newEmployee);
        this.props.history.push('/usermain/human_resources');
    }

    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Add Employee</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="empName" md={3}>Employee Name</Label>
                                    <Col md={9}>
                                        <Input type="text" id="empName" name="empName" placeholder="Enter employee name"
                                        value={this.state.empName} valid={this.state.empName !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="empAge" md={12} className="px-0">Age</Label>
                                            <Input type="number" id="empAge" name="empAge" placeholder="Enter age"
                                            value={this.state.empAge} valid={this.state.empAge !== ''} onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="empMobNo" md={12} className="px-0">Mobile No.</Label>
                                            <Input type="number" id="empMobNo" name="empMobNo" placeholder="Enter Mobile No."
                                            value={this.state.empMobNo} valid={this.state.empMobNo !== ''} onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormText className="h4 font-weight-normal">Address</FormText>
                                <FormGroup row>
                                    <Label htmlFor="resd" md={3}>Residence</Label>
                                    <Col md={6}>
                                        <Input type="text" id="resd" name="resd" placeholder="Flat No. / Building name"
                                        value={this.state.resd} valid={this.state.resd !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="locality" md={3}>Locality</Label>
                                    <Col md={6}>
                                        <Input type="text" id="locality" name="locality" placeholder="Locality / Landmark"
                                        value={this.state.locality} valid={this.state.locality !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="vilcity" md={3}>Village / City</Label>
                                    <Col md={6}>
                                        <Input type="text" id="vilcity" name="vilcity" placeholder="Village / City name"
                                        value={this.state.vilcity} valid={this.state.vilcity !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pincode" md={3}>Pin Code</Label>
                                    <Col md={6}>
                                        <Input type="text" id="pincode" name="pincode" placeholder="Pin code"
                                        value={this.state.pincode} valid={this.state.pincode !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="empDept" md={12} className="px-0">Department</Label>
                                            <Input type="text" id="empDept" name="empDept" placeholder="Enter employee department"
                                            value={this.state.empDept} valid={this.state.empDept !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="empRole" md={12} className="px-0">Job Role</Label>
                                            <Input type="text" id="empRole" name="empRole" placeholder="Enter job role"
                                            value={this.state.empRole} valid={this.state.empRole !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="empDailyHours" md={12} className="px-0">Daily Hours</Label>
                                            <Input type="text" id="empDailyHours" name="empDailyHours" placeholder="Enter daily work hours"
                                            value={this.state.empDailyHours} valid={this.state.empDailyHours !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="empPayType" md={12} className="px-0">Pay Type</Label>
                                            <Input type="text" id="empPayType" name="empPayType" placeholder="Enter pay type"
                                            value={this.state.empPayType} valid={this.state.empPayType !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="empPay" md={12} className="px-0">Pay</Label>
                                            <Input type="number" id="empPay" name="empPay" placeholder="Enter Total Pay"
                                            value={this.state.empPay} valid={this.state.empPay !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Add Employee</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(HREmployeeAddEmployee);