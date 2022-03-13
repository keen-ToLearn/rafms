import React, { Component } from 'react';
import { Button, Nav, NavItem, UncontrolledTooltip } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class ProjectNavPane extends Component{
    constructor(props){
        super(props);
        this.state = {
            pid : this.props.location.pathname.split('/')[2]
        };
    }
    handleClick(feature){
        if(['finance_transaction', 'human_resources', 'inventory'].includes(feature)){
            if(this.props.location.pathname === '/usermain')
                this.props.history.push(`/usermain/${feature}`);
            else
                this.props.history.replace(`/usermain/${feature}`);
        }
        else{
            if(this.props.location.pathname === '/usermain')
                this.props.history.push(`/usermain/${feature}`);
            else if(['/usermain/finance_transaction', '/usermain/sales_management', '/usermain/crm', '/usermain/inventory', '/usermain/human_resources'].includes(this.props.location.pathname))
                this.props.history.replace(`/usermain/${feature}`);
            else if(this.props.location.pathname === `/usermain/${this.state.pid}`)
                this.props.history.push(`/usermain/${this.state.pid}/${feature}`);
            else
                this.props.history.replace(`/usermain/${this.state.pid}/${feature}`);
        }
    }
    render(){
        return(
            <div className="col-1 px-2 h-100 bg-light">
                <Nav className="py-4" vertical>
                    
                    <NavItem className="py-2 w-100">
                        <Button outline color="primary" className="py-3 w-100" id="fnt" disabled={this.props.btnToggler[0]} onClick={() => this.handleClick('finance_transaction')}>
                            <span className="fa fa-inr fa-2x"></span>
                            <UncontrolledTooltip placement="right" target="fnt">
                                Finance and Transactions
                            </UncontrolledTooltip>
                        </Button>
                    </NavItem>
                    
                    <NavItem className="py-2 w-100">
                        <Button outline color="primary" className="py-3 w-100" id="snm" disabled={this.props.btnToggler[1]} onClick={() => this.handleClick('sales_management')}>
                            <span className="fa fa-book fa-2x"></span>
                            <UncontrolledTooltip placement="right" target="snm">
                                Sales Management
                            </UncontrolledTooltip>
                        </Button>
                    </NavItem>
                    
                    <NavItem className="py-2 w-100">
                        <Button outline color="primary" className="py-3 w-100" id="crm" disabled={this.props.btnToggler[2]} onClick={() => this.handleClick('crm')}>
                            <span className="fa fa-users fa-2x"></span>
                            <UncontrolledTooltip placement="right" target="crm">
                                Customer Relationship Management
                            </UncontrolledTooltip>
                        </Button>
                    </NavItem>
                    
                    <NavItem className="py-2 w-100">
                        <Button outline color="primary" className="py-3 w-100" id="inv" disabled={this.props.btnToggler[3]} onClick={() => this.handleClick('inventory')}>
                            <span className="fa fa-database fa-2x"></span>
                            <UncontrolledTooltip placement="right" target="inv">
                                Inventory Management
                            </UncontrolledTooltip>
                        </Button>
                    </NavItem>
                    
                    <NavItem className="py-2 w-100">
                        <Button outline color="primary" className="py-3 w-100" id="hrm" disabled={this.props.btnToggler[4]} onClick={() => this.handleClick('human_resources')}>
                            <span className="fa fa-id-badge fa-2x"></span>
                            <UncontrolledTooltip placement="right" target="hrm">
                                Human Resources
                            </UncontrolledTooltip>
                        </Button>
                    </NavItem>

                </Nav>
            </div>
        );
    }
}

export default  withRouter(ProjectNavPane);