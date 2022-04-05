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

class GlobalSales extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1',
            clientSalesQtyMap : [],
            options : { responsive : true },
            saleqtydata : {
                datasets : [
                    {
                        data : []
                    }
                ]
            },
            saleamtdata : {
                datasets : [
                    {
                        data : []
                    }
                ]
            }
        };
    }
    componentDidMount(){
        let clientSalesQtyMapCopy = [];
        let labelsCopy = [];
        let salesNoCopy = [];
        let salesAmtCopy = [];

        for(let i=0; i < this.props.sales.length; i++){
            let clientSaleTotal = 0;
            this.props.sales[i].records.map((record) => { clientSaleTotal = clientSaleTotal + record.saleAmt; return true; });

            clientSalesQtyMapCopy.push([this.props.projects[i].pname, this.props.sales[i].records.length, clientSaleTotal]);
        }

        clientSalesQtyMapCopy.map((clientSaleQty) => {
            labelsCopy.push(clientSaleQty[0]);
            salesNoCopy.push(clientSaleQty[1]);
            salesAmtCopy.push(clientSaleQty[2]);
            return true;
        });

        const saleqtydata = {
            labels : labelsCopy,
            datasets : [
                {
                    label : 'Number of sales made per client',
                    data : salesNoCopy,
                    backgroundColor : 'rgb(55, 185, 122, 0.75)'
                }
            ]
        };

        const saleamtdata = {
            labels : labelsCopy,
            datasets : [
                {
                    label : 'Total Amount of sales made per client',
                    data : salesAmtCopy,
                    backgroundColor : 'rgb(54, 162, 235, 0.75)'
                }
            ]
        };

        this.setState({
            clientSalesQtyMap : clientSalesQtyMapCopy,
            saleqtydata : saleqtydata,
            saleamtdata : saleamtdata
        });
    }
    activeTabModifier(selectedTab){
        this.setState({activeTab : selectedTab});
    }
    render(){
        const regularclients = [...this.state.clientSalesQtyMap].sort((a, b) => b[1] - a[1]).map((clientSQ, index, currArray) => {
            if(clientSQ[1] === currArray[0][1])
                return(
                    <h4 className="d-inline mr-2">
                        <Badge color="primary" className="p-2 mb-2">{clientSQ[0]}</Badge>
                    </h4>
                );
            else
                return( <></> );
        });

        const topclients = [...this.state.clientSalesQtyMap].sort((a, b) => b[2] - a[2]).map((clientSQ, index, currArray) => {
            if(clientSQ[2] === currArray[0][2])
                return(
                    <h4 className="d-inline mr-2">
                        <Badge color="primary" className="p-2 mb-2">{clientSQ[0]}</Badge>
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
                                <h4>Most Consistent Client(s)</h4>
                            </Col>
                            <Col md={9} className="text-left">
                                {regularclients}
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5">
                            <Col md={12} className="text-left">
                                <hr/>
                                <h4>Sales per Client</h4>
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5 justify-content-center">
                            <Col md={10} className="mb-4">
                                <Bar options={this.state.options} data={this.state.saleqtydata}/>
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5">
                            <Col md={12}>
                                <hr/>
                            </Col>
                            <Col md={3} className="text-left">
                                <h4>Top Purchaser(s)</h4>
                            </Col>
                            <Col md={9} className="text-left">
                                {topclients}
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5">
                            <Col md={12} className="text-left">
                                <hr/>
                                <h4>Total amount of Sales per Client</h4>
                            </Col>
                        </Row>
                        <Row className="m-0 mx-5 justify-content-center">
                            <Col md={10} className="mb-4">
                                <Bar options={this.state.options} data={this.state.saleamtdata}/>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default GlobalSales;