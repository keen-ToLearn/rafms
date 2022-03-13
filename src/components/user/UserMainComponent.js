import React, { Component } from 'react';
import UserHome from './UserHomeComponent';
import UserTodo from './UserTodoComponent';

import ProjectDashboard from '../project/ProjectDashboardComponent';
import ProjectNavPane from '../project/ProjectNavPaneComponent';

import FinanceTransaction from '../project/FT/FinanceTransactionComponent';
    import FTBillViewBill from '../project/FT/FTBillViewBillComponent';
    import FTBillEditBill from '../project/FT/FTBillEditBillComponent';
    import FTBillAddBill from '../project/FT/FTBillAddBillComponent';
    import FTLoanViewLoan from '../project/FT/FTLoanViewLoanComponent';
    import FTLoanEditLoan from '../project/FT/FTLoanEditLoanComponent';
    import FTLoanAddLoan from '../project/FT/FTLoanAddLoanComponent';
    import FTFundViewFund from '../project/FT/FTFundViewFundComponent';
    import FTFundEditFund from '../project/FT/FTFundEditFundComponent';
    import FTFundAddFund from '../project/FT/FTFundAddFundComponent';

import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderUser = ({isBtnOpen, toggleState, location, history}) => {
    function toggleBtn(){
        isBtnOpen = !isBtnOpen
    }
    function triggerLogout(){
        window.localStorage.removeItem('user');

        const path = location.pathname;
        if(path.indexOf('view') >= 0 || path.indexOf('edit') >= 0){
            if((history.length-3) !== (path.split('/').length-2))
                if(path.indexOf('view') >= 0)
                    history.go(-(path.split('/').length-2));
                else
                    history.go(-(history.length-3));
            else
                history.go(-(path.split('/').length-2));
        }
        else
            history.go(-(path.split('/').length-1));
    }
    return(
        <div className="row h-25 bg-dark">
            <Navbar className="container-fluid mx-5 px-5" expand="md">
                    <NavbarBrand className="mr-auto">
                        <h1 className="display-2 text-white">RAFMS</h1>
                    </NavbarBrand>
                    <Nav className="float-right" navbar>
                        <NavItem className="mr-4">
                            <Button type="button" className="btn-outline-light" onClick={() => {
                                if(location.pathname !== '/usermain/todo')
                                    history.push('/usermain/todo');
                                else
                                    history.replace('/usermain/todo');
                            }}>
                                <span className="fa fa-check fa-lg"></span>{' '}To-Do
                            </Button>
                        </NavItem>
                        <NavItem>
                            <ButtonDropdown isOpen={isBtnOpen} onClick={() => toggleState(isBtnOpen)} toggle={toggleBtn}>
                                <DropdownToggle caret>
                                    User
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => triggerLogout()}>Logout</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </NavItem>
                    </Nav>
            </Navbar>
        </div>
    );
}

class UserMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBtnOpen : false,
            openProjects : [],
            btnToggler : []
        };
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState(iBO){
        this.setState({ isBtnOpen : iBO });
    }

    preventBackNavigation(event){
        if((window.location.pathname === '/usermain') && (event.code === 'ArrowLeft' && event.altKey))
            event.preventDefault();
    }

    componentDidMount(){
        document.addEventListener('keydown', event => this.preventBackNavigation(event));

        //filtering uopenproject into open projects and open features, open projects go to UserHome
        let uuoplen = this.props.user.uopenproject.length;
        let plen = this.props.projects.length;
        const featureList = [101,102,104,105];
        const openprojects = [];
        const openfeatures = [];
        for(let i = 0; i < uuoplen; i++){
            if ( featureList.includes(this.props.user.uopenproject[i]) ) {
                openfeatures.push(this.props.user.uopenproject[i]);
            }
            else
                for(let j = 0; j < plen; j++)
                    if (this.props.user.uopenproject[i] === this.props.projects[j].pid) {
                        openprojects.push(this.props.projects[j]);
                        break;
                    }
        }

        //btnToggler created using open features, btnToggler goes to ProjectNavPane
        const btnTogglerCopy = new Array(5).fill(true);
        let path = this.props.location.pathname;
        if( path === '/usermain' || isNaN(Number(path.split('/')[2])) ){
            for(let i=0; i < openfeatures.length; i++)
                btnTogglerCopy[openfeatures[i]-101] = false;
        }
        else
            btnTogglerCopy[1] = btnTogglerCopy[2] = false;

        this.setState({
            openProjects : openprojects,
            btnToggler : btnTogglerCopy
        });
    }

    render(){
        const RenderFTViewBill = ({match}) => {
            const projectViewBill = this.props.bills.filter((bill) => bill.sNo === parseInt(match.params.vbid))[0];
            return( <FTBillViewBill billToView={projectViewBill}/> );
        }

        const RenderFTEditBill = ({match}) => {
            const projectEditBill = this.props.bills.filter((bill) => bill.sNo === parseInt(match.params.ebid))[0];
            return( <FTBillEditBill billToEdit={projectEditBill} projects={this.props.projects}/> );
        }

        const RenderFTViewLoan = ({match}) => {
            const projectViewLoan = this.props.loans.filter((loan) => loan.sNo === parseInt(match.params.vlid))[0];
            return( <FTLoanViewLoan loanToView={projectViewLoan}/> );
        }

        const RenderFTEditLoan = ({match}) => {
            const projectEditLoan = this.props.loans.filter((loan) => loan.sNo === parseInt(match.params.elid))[0];
            return( <FTLoanEditLoan loanToEdit={projectEditLoan}/> );
        }

        const RenderFTViewFund = ({match}) => {
            const projectViewFund = this.props.funds.filter((fund) => fund.sNo === parseInt(match.params.vfid))[0];
            return( <FTFundViewFund fundToView={projectViewFund}/> );
        }

        const RenderFTEditFund = ({match}) => {
            const projectEditFund = this.props.funds.filter((fund) => fund.sNo === parseInt(match.params.efid))[0];
            return( <FTFundEditFund fundToEdit={projectEditFund}/> );
        }

        const LoadSelectedProject = ({match}) => {
            return(
                <ProjectDashboard selectedProject={this.props.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}/>
            );
        }
        return(
            <div className="container-fluid h-100">
                <HeaderUser isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)}
                location={this.props.location} history={this.props.history}/>
                <div className="row h-75">
                    { (this.props.location.pathname !== '/usermain/todo') ?
                        <ProjectNavPane btnToggler={this.state.btnToggler} /> : <></> }
                    
                    <Switch>
                            <Route path="/usermain/finance_transaction/view_bill/:vbid" component={RenderFTViewBill}/>
                            <Route path="/usermain/finance_transaction/edit_bill/:ebid" component={RenderFTEditBill}/>
                            <Route path="/usermain/finance_transaction/add_bill" component={() => <FTBillAddBill projects={this.props.projects}/>}/>

                            <Route path="/usermain/finance_transaction/view_loan/:vlid" component={RenderFTViewLoan}/>
                            <Route path="/usermain/finance_transaction/edit_loan/:elid" component={RenderFTEditLoan}/>
                            <Route path="/usermain/finance_transaction/add_loan" component={FTLoanAddLoan}/>

                            <Route path="/usermain/finance_transaction/view_fund/:vfid" component={RenderFTViewFund}/>
                            <Route path="/usermain/finance_transaction/edit_fund/:efid" component={RenderFTEditFund}/>
                            <Route path="/usermain/finance_transaction/add_fund" component={FTFundAddFund}/>

                        <Route path="/usermain/finance_transaction" component={() => <FinanceTransaction
                            billList={this.props.bills} loanList={this.props.loans} fundList={this.props.funds}/>}/>
                        
                        {/*<Route path="/usermain/sales_management" component={GlobalSales}/>
                        <Route path="/usermain/crm" component={GlobalCRM}/>
                        <Route path="/usermain/inventory" component={Inventory}/>
                        <Route path="/usermain/human_resources" component={HumanResources}/>*/}
                        
                        <Route exact path="/usermain" component={() => <UserHome openProjects={this.state.openProjects}/>}/>
                        <Route path="/usermain/todo" component={UserTodo}/>
                        <Route path="/usermain/:pid" component={LoadSelectedProject}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(UserMain);