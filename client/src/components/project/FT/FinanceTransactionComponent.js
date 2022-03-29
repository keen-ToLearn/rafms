import React, { Component } from 'react';
import FTBill from './FTBillComponent';
import FTLoan from './FTLoanComponent';
import FTFund from './FTFundComponent';
import { Nav, NavItem, TabContent, TabPane, Row, Col, NavLink } from 'reactstrap';

class FinanceTransaction extends Component{
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
                                    <Row>
                                        <Col md={12}>
                                            <h4>Graphs</h4>
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