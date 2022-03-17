import React, { Component } from 'react';
import SMSales from './SMSalesComponent';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';

class SalesManagement extends Component{
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
                <Nav className="mx-4 mt-1 nav nav-tabs">
                    <NavItem className="px-4 nav-item"></NavItem>
                    <NavItem className="pl-1 nav-item">
                        <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                            <h5 className="m-0">Sales</h5>
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent className="mx-4 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                    <TabPane tabId='1'>
                        <SMSales sales={this.props.sales}/>
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default SalesManagement;