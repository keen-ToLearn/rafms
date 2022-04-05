import React, { Component } from 'react';
import FTBill from './FTBillComponent';
import FTLoan from './FTLoanComponent';
import FTFund from './FTFundComponent';
import { Nav, NavItem, TabContent, TabPane, Row, Col, NavLink } from 'reactstrap';
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

class FinanceTransaction extends Component{
    constructor(props){
        super(props);
        this.state = {
            activeTab : '1',
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
        let clientbillMap = new Map();
        let billlabelsCopy = [];
        let billdataCopy = [];

        this.props.finances.bills.map((bill) => {
            clientbillMap.set(bill.billClient, (clientbillMap.get(bill.billClient) === undefined ?
                bill.billTotal : (clientbillMap.get(bill.billClient) + bill.billTotal)));
            return true;
        });

        clientbillMap.forEach((total, client) => {
            billlabelsCopy.push(client);
            billdataCopy.push(total);
        });

        const bardata = {
            labels : billlabelsCopy,
            datasets : [
                {
                    label : 'PPC',
                    data : billdataCopy,
                    backgroundColor : 'rgba(255, 99, 71, 0.75)'
                }
            ]
        };

        let loansTotal = 0;
        let fundsTotal = 0;
        this.props.finances.funds.map((fund) => { fundsTotal = fundsTotal + fund.fundAmt; return true; });
        this.props.finances.loans.map((loan) => { loansTotal = loansTotal + loan.loanAmt; return true; });

        const piedata = {
            labels : ['Loans', 'Funds'],
            datasets : [
                {
                    label : 'loans & funds : assets',
                    data : [loansTotal, fundsTotal],
                    backgroundColor : ['rgba(221, 160, 221)', 'rgba(75, 0, 130)']
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
        return(
            <div className="col-11 pt-3">
                { (this.props.finances.isLoading || this.props.finances.posting || this.props.finances.putting) ? <span className="fa fa-circle-o-notch fa-spin fa-3x"></span> :
                    ( (this.props.finances.errMes !== null) ? <h4>{this.props.finances.errMes}</h4> :
                        <>
                            <Nav className="mx-4 mt-1 nav nav-tabs">
                                <NavItem className="px-4 nav-item"></NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                                        <h5 className="m-0">Overview</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('2')} href="#" className={(this.state.activeTab === '2')?'active':''}>
                                        <h5 className="m-0">Bills</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('3')} href="#" className={(this.state.activeTab === '3')?'active':''}>
                                        <h5 className="m-0">Loans</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('4')} href="#" className={(this.state.activeTab === '4')?'active':''}>
                                        <h5 className="m-0">Funds</h5>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent className="mx-4 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                                <TabPane tabId='1'>
                                    <Row className="m-0 mx-5">
                                        <Col md={8} className="text-left">
                                            <Row className="m-0">
                                                <Col md={12}>
                                                    <h4>Purchases per Client</h4>
                                                </Col>
                                                <Col md={12}>
                                                    <Bar options={this.state.options} data={this.state.bardata}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4} className="text-left">
                                            <Row className="m-0">
                                                <Col md={12}>
                                                    <h4>Assets</h4>
                                                </Col>
                                                <Col md={12}>
                                                    <Pie data={this.state.piedata}/>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <FTBill billList={this.props.finances.bills}/>
                                </TabPane>
                                <TabPane tabId='3'>
                                    <FTLoan loanList={this.props.finances.loans}/>
                                </TabPane>
                                <TabPane tabId='4'>
                                    <FTFund fundList={this.props.finances.funds}/>
                                </TabPane>
                            </TabContent>
                        </>
                    )
                }
            </div>
        );
    }
}

export default FinanceTransaction;