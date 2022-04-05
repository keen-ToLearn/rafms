import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Badge } from 'reactstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

class GlobalCRM extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1',
            clientComplaintMap : [],
            options : { responsive : true },
            data : {
                datasets : [
                    {
                        data : []
                    }
                ]
            }
        };
    }
    componentDidMount(){
        let clientComplaintMapCopy = [];
        let labelsCopy = [];
        let dataCopy = [];
        
        for(let i=0; i < this.props.projects.length; i++){
            clientComplaintMapCopy.push([this.props.projects[i].pname, this.props.complaints[i].issues.length]);
        }

        clientComplaintMapCopy.map((clientComplaint) => {
            labelsCopy.push(clientComplaint[0]);
            dataCopy.push(clientComplaint[1]);
            return true;
        });

        clientComplaintMapCopy.sort((x, y) => x[1] - y[1]);

        const data = {
            labels : labelsCopy,
            datasets : [
                {
                    label : 'Number of complaints',
                    data : dataCopy,
                    backgroundColor : 'rgba(220, 20, 60, 0.75)'
                }
            ]
        };

        this.setState({
            clientComplaintMap : clientComplaintMapCopy,
            data : data
        });
    }
    activeTabModifier(selectedTab){
        this.setState({activeTab : selectedTab});
    }
    render(){
        const happyclients = this.state.clientComplaintMap.map((clientComplaint, index, currArray) => {
            if(clientComplaint[1] === currArray[0][1])
                return(
                    <h4 className="d-inline mr-2">
                        <Badge color="primary" className="p-2 mb-2">{clientComplaint[0]}</Badge>
                    </h4>
                );
            else
                return( <></> );
        });

        return(
            <div className="col-11 pt-3">
                <Nav className="mx-4 mt-1 nav nav-tabs">
                    <NavItem className="px-4 nav-item"></NavItem>
                    <NavItem className="pl-1 nav-item">
                        <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                            <h5 className="m-0">Overview</h5>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="mx-4 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <Row className="m-0 mx-5">
                            <Col md={3} className="text-left">
                                <h4>Happiest Client(s)</h4>
                            </Col>
                            <Col md={9} className="text-left">
                                {happyclients}
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5">
                            <Col md={12} className="text-left">
                                <hr/>
                                <h4>Complaints per Client</h4>
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5 justify-content-center">
                            <Col md={10}>
                                <Bar options={this.state.options} data={this.state.data}/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default GlobalCRM;