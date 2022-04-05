import React, { Component } from 'react';
import HREmployee from './HREmployeeComponent';
import { Nav, NavItem, TabContent, TabPane, Row, Col, NavLink, Badge } from 'reactstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

class HumanResources extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1',
            activeEmployeeList : this.props.employees.employees,
            options : { responsive : true },
            bardata : {
                datasets : [
                    {
                        data : []
                    }
                ]
            },
            piedata : {
                datasets : [
                    {
                        data : []
                    }
                ]
            }
        };
    }
    componentDidMount(){
        let pielabelsCopy = new Set();
        let pieDataCopy = new Map();
        let barlabelsCopy = new Set();
        let barDataCopy = new Map();

        this.state.activeEmployeeList.map((employee) => {
            pielabelsCopy.add(employee.empPayType);
            barlabelsCopy.add(employee.empDept);
            pieDataCopy.set(employee.empPayType, (pieDataCopy.get(employee.empPayType) === undefined ?
                1 : (pieDataCopy.get(employee.empPayType) + 1)));
            barDataCopy.set(employee.empDept, (barDataCopy.get(employee.empDept) === undefined ?
                1 : (barDataCopy.get(employee.empDept) + 1)));
            return true;
        });

        let pielabels = [];
        let pieData = [];
        pielabelsCopy.forEach((pielabel) => { pielabels.push(pielabel) });
        pieDataCopy.forEach((epaytypecount, epaytype) => { pieData.push(epaytypecount) });
        
        const piedata = {
            labels : pielabels,
            datasets : [
                {
                    label : 'fixed vs daily count',
                    data : pieData,
                    backgroundColor : ['rgba(255, 206, 86)', 'rgba(255, 99, 132)']
                }
            ]
        };

        let barlabels = [];
        let barData = [];
        barlabelsCopy.forEach((barlabel) => { barlabels.push(barlabel) });
        barDataCopy.forEach((edeptcount, edept) => { barData.push(edeptcount) });

        const bardata = {
            labels : barlabels,
            datasets : [
                {
                    label : 'EPD',
                    data : barData,
                    backgroundColor : 'rgb(0, 128, 128, 0.75)'
                }
            ]
        };

        this.setState({
            bardata : bardata,
            piedata : piedata
        });
    }
    activeTabModifier(selectedTab){
        this.setState({activeTab : selectedTab});
    }
    render(){
        const activeemployees = [...this.state.activeEmployeeList].sort((x, y) => (y.empAttendance.length - x.empAttendance.length)).map((employee, index, currArray) => {
            if(employee.empAttendance.length === currArray[0].empAttendance.length)
                return(
                    <h4 className="d-inline mr-2">
                        <Badge color="primary" className="p-2 mb-2">{employee.empName}</Badge>
                    </h4>
                );
            else
                return( <></> );
        });

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
                                    <Row className="m-0 mx-5">
                                        <Col md={3} className="text-left">
                                            <h4>Most Active Employee(s)</h4>
                                        </Col>
                                        <Col md={9} className="text-left">
                                            {activeemployees}
                                        </Col>
                                    </Row>
                                    <Row className="m-0 mx-5">
                                        <Col md={12}>
                                            <hr/>
                                        </Col>
                                    </Row>
                                    <Row className="m-0 mx-5">
                                        <Col md={8} className="text-left">
                                            <Row className="m-0">
                                                <Col md={12}>
                                                    <h4>Employees per Department</h4>
                                                </Col>
                                                <Col md={12}>
                                                    <Bar options={this.state.options} data={this.state.bardata}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4} className="text-left">
                                            <Row className="m-0">
                                                <Col md={12}>
                                                    <h4>Pay Type: Fixed v/s Daily</h4>
                                                </Col>
                                                <Col md={12}>
                                                    <Pie data={this.state.piedata}/>
                                                </Col>
                                            </Row>
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