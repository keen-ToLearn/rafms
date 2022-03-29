import React, { Component } from 'react';
import INVInventory from './INVInventoryComponent';
import INVStock from './INVStockComponent';
import { Nav, NavItem, TabContent, TabPane, NavLink } from 'reactstrap';

class Inventory extends Component{
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
                { (this.props.inventory.isLoading || this.props.inventory.posting || this.props.inventory.putting) ? <span className="fa fa-circle-o-notch fa-spin fa-3x"></span> :
                    ( (this.props.inventory.errMes !== null) ? <h4>{this.props.inventory.errMes}</h4> :
                        <>
                            <Nav className="mx-4 mt-1 nav nav-tabs">
                                <NavItem className="px-4 nav-item"></NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('1')} href="#" className={(this.state.activeTab === '1')?'active':''}>
                                        <h5 className="m-0">Inventory</h5>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="pl-1 nav-item">
                                    <NavLink onClick={() => this.activeTabModifier('2')} href="#" className={(this.state.activeTab === '2')?'active':''}>
                                        <h5 className="m-0">Stock</h5>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent className="mx-4 pt-5 border border-top-0 rounded-bottom" activeTab={this.state.activeTab}>
                                <TabPane tabId='1'>
                                    <INVInventory inventory={this.props.inventory.inventory}/>
                                </TabPane>
                                <TabPane tabId='2'>
                                    <INVStock stocks={this.props.inventory.stocks}/>
                                </TabPane>
                            </TabContent>
                        </>
                    )
                }
            </div>
        );
    }
}

export default Inventory;