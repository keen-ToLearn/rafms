import React, { Component } from 'react';
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table,
    Modal, ModalHeader, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const RenderTableBody = ({employees, renderRowList, checkBoxes}) => {
    if( employees === '')
        return(
            <></>
        );
    const employeeList = employees.map((employee, index) => {
        if(renderRowList[employee.sNo-1] === 1){
            return(
                <tr key={employee.sNo}>
                    <td>
                        <Input type="checkbox" name={`chk${employee.sNo}`} id={`chk${employee.sNo}`} value={employee.sNo}
                        innerRef={ref => { checkBoxes[index] = ref; return true;}}/>
                        {' '}
                        <Link className="text-dark" to={`/usermain/human_resources/view_employee/${employee.sNo}`}><span className="fa fa-sticky-note"></span></Link>
                        {' '}
                        <Link className="text-dark" to={`/usermain/human_resources/edit_employee/${employee.sNo}`}><span className="fa fa-pencil-square"></span></Link>
                    </td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.sNo}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empName}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empDept}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empRole}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empDailyHours}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empPayType}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/human_resources/view_employee/${employee.sNo}`}>{employee.empPay}</Link></td>
                </tr>
            );
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {employeeList}
        </tbody>
    );
}

class HREmployee extends Component{
    constructor(props){
        super(props);
        this.state = {
            thIconList : ['primary', 'dark', 'dark', 'dark', 'dark', 'dark', 'dark'],
            employees : this.props.employees,
            ascdesc : 'asc',
            renderRowList : new Array(this.props.employees.length).fill(1),
            isModalOpen : false
        };
        this.checkBoxes = [];
        this.filterTrData = this.filterTrData.bind(this);
        this.handleMarker = this.handleMarker.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.clearCheckboxes = this.clearCheckboxes.bind(this);
    }

    toggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'empName', 'empDept', 'empRole', 'empDailyHours', 'empPayType', 'empPay'];
        const employeesCopy = [...this.state.employees];
        employeesCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?-1:1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?1:-1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            employees : employeesCopy,
            ascdesc : (this.state.ascdesc === 'asc')?'desc':'asc'
        });
    }

    forceToggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'empName', 'empDept', 'empRole', 'empDailyHours', 'empPayType', 'empPay'];
        const employeesCopy = [...this.state.employees];
        employeesCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return -1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return 1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            employees : employeesCopy
        });
    }

    filterTrData(){
        const allemployeesCopy = [...this.state.employees];
        const keyList = ['sNo', 'empName', 'empDept', 'empRole', 'empDailyHours', 'empPayType', 'empPay'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allemployeesCopy.length; i++){
            let tmpemployees = allemployeesCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpemployees[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchEmployees.value) !== -1){
                    renderRowListCopy[i] = 1;
                    break;
                }
                else{
                    renderRowListCopy[i] = 0;
                }
            }
        }
        this.setState({ renderRowList : renderRowListCopy });
    }

    clearCheckboxes(){
        for(let i=0; i<this.checkBoxes.length; i++)
            this.checkBoxes[i].checked = false;
    }

    handleMarker(){
        const present = [];
        for(let i=0; i<this.checkBoxes.length; i++)
            if(this.checkBoxes[i].checked)
                present.push(this.checkBoxes[i].value);
        
        this.clearCheckboxes();
    }

    toggleModal(){
        this.setState({ isModalOpen : !this.state.isModalOpen }, () => {
            if(!this.state.isModalOpen){
                this.clearCheckboxes();
            }
        });
    }

    render(){
        const paySlips = this.checkBoxes.map((checkBox) => {
            if(checkBox.checked){
                return(
                    <div className="p-2 mb-3 border border-secondary">
                        <Table bordered>
                            <thead>
                                <tr>
                                    <td colSpan={4} className="text-center"><h4>Palamahen Infra</h4></td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th>Employee Name:</th>
                                    <td>{this.state.employees[checkBox.value-1].empName}</td>
                                </tr>
                                <tr>
                                    <th>Job Role:</th>
                                    <td>{this.state.employees[checkBox.value-1].empRole}</td>
                                </tr>
                                <tr>
                                    <th>Pay Type:</th>
                                    <td>{this.state.employees[checkBox.value-1].empPayType}</td>
                                </tr>
                                <tr>
                                    <th>Pay:</th>
                                    <td>
                                        {
                                            (this.state.employees[checkBox.value-1].empPayType === 'daily') ?
                                                (this.state.employees[checkBox.value-1].empPay * this.state.employees[checkBox.value-1].empAttendance.length) :
                                                this.state.employees[checkBox.value-1].empPay
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                );
            }
            return true;
        });
        
        return(
            <>
                <Row className="m-0">
                    <Col md={9}>
                        <div ref={(ref) => { this.employeesOverview = ref }}>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th onClick={() => this.toggleThIcon(0)} style={{cursor : 'pointer'}}>SNo. <span className={`fa fa-sort text-${this.state.thIconList[0]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(1)} style={{cursor : 'pointer'}}>Name <span className={`fa fa-sort text-${this.state.thIconList[1]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(2)} style={{cursor : 'pointer'}}>Department <span className={`fa fa-sort text-${this.state.thIconList[2]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(3)} style={{cursor : 'pointer'}}>Role <span className={`fa fa-sort text-${this.state.thIconList[3]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(4)} style={{cursor : 'pointer'}}>Daily Hours <span className={`fa fa-sort text-${this.state.thIconList[4]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(5)} style={{cursor : 'pointer'}}>Pay Type <span className={`fa fa-sort text-${this.state.thIconList[5]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(6)} style={{cursor : 'pointer'}}>Pay <span className={`fa fa-sort text-${this.state.thIconList[6]}`}></span></th>
                                    </tr>
                                </thead>
                                <RenderTableBody employees={this.state.employees} renderRowList={this.state.renderRowList} checkBoxes={this.checkBoxes}/>
                            </Table>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Link style={{textDecoration : 'none'}} to={`/usermain/human_resources/add_employee`}>
                                    <Button color="primary" block outline>Add Employee</Button>
                                </Link>
                            </div>
                            <div className="row-fluid mt-3">
                                <ReactToPrint content={() => this.employeesOverview}>
                                    <PrintContextConsumer>
                                        {
                                            ({ handlePrint }) => (
                                                <Button type="button" color="primary" onClick={handlePrint} block outline>Print Employee List</Button>
                                            )
                                        }
                                    </PrintContextConsumer>
                                </ReactToPrint>
                            </div>
                            <div className="row-fluid mt-3">
                                <Button type="button" color="primary" onClick={this.handleMarker} block outline>Mark Attendance</Button>
                            </div>
                            <div className="row-fluid mt-3">
                                <Button type="button" color="primary" onClick={this.toggleModal} block outline>Generate | Print Pay Slip</Button>
                            </div>
                            <div className="row-fluid mt-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchEmployees"
                                    name="searchEmployees" placeholder="Search employees" onFocus={() => this.forceToggleThIcon(0)} onChange={this.filterTrData}
                                    innerRef={(input) => this.searchEmployees = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size="lg">
                    <ModalHeader toggle={this.toggleModal}>Pay Slips</ModalHeader>
                    <ModalHeader className="py-0">
                        <ReactToPrint content={() => this.paySlips}>
                            <PrintContextConsumer>
                                {
                                    ({ handlePrint }) => (
                                        <Button type="button" className="my-2" onClick={handlePrint}>Print</Button>
                                    )
                                }
                            </PrintContextConsumer>
                        </ReactToPrint>
                    </ModalHeader>
                    <ModalBody>
                        <div className="p-2" ref={(ref) => { this.paySlips = ref }}>
                            {paySlips}
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default HREmployee;