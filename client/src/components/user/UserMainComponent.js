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

import GlobalSales from '../project/SM/GlobalSalesComponent';
import GlobalCRM from '../project/CRM/GlobalCRMComponent';

import Inventory from '../project/INV/InventoryComponent';
    import INVInventoryEditInventory from '../project/INV/INVInventoryEditInventoryComponent';
    import INVInventoryAddInventory from '../project/INV/INVInventoryAddInventoryComponent';
    import INVStockEditStock from '../project/INV/INVStockEditStockComponent';
    import INVStockAddStock from '../project/INV/INVStockAddStockComponent';

import HumanResources from '../project/HR/HumanResourcesComponent';
    import HREmployeeViewEmployee from '../project/HR/HREmployeeViewEmployeeComponent';
    import HREmployeeEditEmployee from '../project/HR/HREmployeeEditEmployeeComponent';
    import HREmployeeAddEmployee from '../project/HR/HREmployeeAddEmployeeComponent';

import { Switch, Route, withRouter } from 'react-router-dom';
import { Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Nav, Navbar, NavbarBrand, NavItem } from 'reactstrap';

const HeaderUser = ({isBtnOpen, toggleState, location, history, user, usersLogInOut}) => {
    function toggleBtn(){
        isBtnOpen = !isBtnOpen
    }
    function triggerLogout(){
        usersLogInOut(user._id, false);
        history.push('/home');
        history.push('/userlogin');
    }
    return(
        <div className="row h-25 bg-dark">
            <Navbar className="container-fluid mx-5 px-5" expand="md">
                    <NavbarBrand className="mr-auto">
                        <h1 className="display-2 text-white">RAFMS</h1>
                    </NavbarBrand>
                    <Nav className="float-right" navbar>
                        <NavItem className="mr-4">
                            <h4 className="font-weight-light text-white">Welcome {user.uuname}</h4>
                        </NavItem>
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
        if((window.location.pathname === '/usermain' || window.location.pathname === '/home') && (event.code === 'ArrowLeft' && event.altKey))
            event.preventDefault();
    }

    componentDidMount(){
        document.addEventListener('keydown', event => this.preventBackNavigation(event));

        //filtering uopenproject into open projects and open features, open projects go to UserHome
        let uuoplen = this.props.user.uopenproject.length;
        let plen = this.props.projects.projects.length;
        const featureList = [101,102,103,104,105];
        const openprojects = [];
        const openfeatures = [];
        for(let i = 0; i < uuoplen; i++){
            if ( featureList.includes(this.props.user.uopenproject[i]) ) {
                openfeatures.push(this.props.user.uopenproject[i]);
            }
            else
                for(let j = 0; j < plen; j++)
                    if (this.props.user.uopenproject[i] === this.props.projects.projects[j].pid) {
                        openprojects.push(this.props.projects.projects[j]);
                        break;
                    }
        }

        //btnToggler created using open features, btnToggler goes to ProjectNavPane
        const btnTogglerCopy = new Array(5).fill(true);
        const featureMapper = ['finance_transaction', 'sales_management', 'crm', 'inventory', 'human_resources'];
        let path = this.props.location.pathname;
        if( path === '/usermain' || isNaN(Number(path.split('/')[2])) ){
            for(let i=0; i < openfeatures.length; i++)
                btnTogglerCopy[openfeatures[i]-101] = false;
            btnTogglerCopy[featureMapper.indexOf(path.split('/')[2])] = true;
        }
        else{
            btnTogglerCopy[1] = btnTogglerCopy[2] = false;
            btnTogglerCopy[featureMapper.indexOf(path.split('/')[3])] = true;
        }

        this.setState({
            openProjects : openprojects,
            btnToggler : btnTogglerCopy
        });
    }

    render(){
        const RenderFTViewBill = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectViewBill = this.props.finances.bills.filter((bill) => bill.sNo === parseInt(match.params.vbid))[0];
                return( <FTBillViewBill billToView={projectViewBill}/> );
            }
        }

        const RenderFTEditBill = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditBill = this.props.finances.bills.filter((bill) => bill.sNo === parseInt(match.params.ebid))[0];
                return( <FTBillEditBill billToEdit={projectEditBill} projects={this.props.projects.projects} billsPut={this.props.billsPut}/> );
            }
        }

        const RenderFTViewLoan = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectViewLoan = this.props.finances.loans.filter((loan) => loan.sNo === parseInt(match.params.vlid))[0];
                return( <FTLoanViewLoan loanToView={projectViewLoan}/> );
            }
        }

        const RenderFTEditLoan = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditLoan = this.props.finances.loans.filter((loan) => loan.sNo === parseInt(match.params.elid))[0];
                return( <FTLoanEditLoan loanToEdit={projectEditLoan} loansPut={this.props.loansPut}/> );
            }
        }

        const RenderFTViewFund = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectViewFund = this.props.finances.funds.filter((fund) => fund.sNo === parseInt(match.params.vfid))[0];
                return( <FTFundViewFund fundToView={projectViewFund}/> );
            }
        }

        const RenderFTEditFund = ({match}) => {
            if(this.props.finances.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditFund = this.props.finances.funds.filter((fund) => fund.sNo === parseInt(match.params.efid))[0];
                return( <FTFundEditFund fundToEdit={projectEditFund} fundsPut={this.props.fundsPut}/> );
            }
        }

        const RenderINVEditInventory = ({match}) => {
            if(this.props.inventory.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditInventory = this.props.inventory.inventory.filter((inventoryItem) => inventoryItem.sNo === parseInt(match.params.einvid))[0];
                return( <INVInventoryEditInventory inventoryToEdit={projectEditInventory} inventoryPut={this.props.inventoryPut}/> );
            }
        }

        const RenderINVEditStock = ({match}) => {
            if(this.props.inventory.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditStock = this.props.inventory.stocks.filter((stock) => stock.sNo === parseInt(match.params.estkid))[0];
                return( <INVStockEditStock stockToEdit={projectEditStock} stocksPut={this.props.stocksPut}/> );
            }
        }

        const RenderHRViewEmployee = ({match}) => {
            if(this.props.employees.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectViewEmployee = this.props.employees.employees.filter((employee) => employee.sNo === parseInt(match.params.vempid))[0];
                return(
                    <HREmployeeViewEmployee employeeToView={projectViewEmployee} employeesAddLeave={this.props.employeesAddLeave} employeesUnmarkAttendance={this.props.employeesUnmarkAttendance}
                        addingunmarking={this.props.employees.addingunmarking}/>
                );
            }
        }
        
        const RenderHREditEmployee = ({match}) => {
            if(this.props.employees.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else{
                const projectEditEmployee = this.props.employees.employees.filter((employee) => employee.sNo === parseInt(match.params.eempid))[0];
                return( <HREmployeeEditEmployee employeeToEdit={projectEditEmployee} employeesPut={this.props.employeesPut}/> );
            }
        }

        const LoadSelectedProject = ({match}) => {
            if(this.props.projects.isLoading)
                return(<span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span>);
            else
                return(
                    <ProjectDashboard selectedProject={this.props.projects.projects.filter((project) => project.pid === parseInt(match.params.pid,10))[0]}
                    complaints={this.props.complaints.complaints.filter((complaint) => complaint.forPid === parseInt(match.params.pid,10))[0]}
                    isLoadingComplaint={this.props.complaints.isLoading} errMesComplaint={this.props.complaints.errMes} postingDeletingComplaint={this.props.complaints.postingdeleting}
                    sales={this.props.sales.sales.filter((salesClient) => salesClient.forPid === parseInt(match.params.pid,10))[0]}
                    isLoadingSales={this.props.sales.isLoading} errMesSales={this.props.sales.errMes} postingDeletingSale={this.props.sales.postingdeleting}
                    projectsPut={this.props.projectsPut} complaintsPostDelete={this.props.complaintsPostDelete} salesPostDelete={this.props.salesPostDelete}/>
                );
        }

        const RenderGlobalCRM = () => {
            if(this.props.complaints.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else
                return(
                    <GlobalCRM complaints={this.props.complaints.complaints} projects={this.props.projects.projects}/>
                );
        }

        const RenderGlobalSales = () => {
            if(this.props.sales.isLoading)
                return(<div className="mx-auto"><span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span></div>);
            else
                return(
                    <GlobalSales sales={this.props.sales.sales} projects={this.props.projects.projects}/>
                );
        }
        return(
            <div className="container-fluid h-100">
                <HeaderUser isBtnOpen={this.state.isBtnOpen} toggleState={(iBO) => this.toggleState(iBO)} usersLogInOut={this.props.usersLogInOut}
                location={this.props.location} history={this.props.history} user={this.props.user}/>
                <div className="row h-75">
                    { (this.props.location.pathname !== '/usermain/todo') ?
                        <ProjectNavPane btnToggler={this.state.btnToggler} /> : <></> }
                    
                    <Switch>
                            <Route path="/usermain/finance_transaction/view_bill/:vbid" component={RenderFTViewBill}/>
                            <Route path="/usermain/finance_transaction/edit_bill/:ebid" component={RenderFTEditBill}/>
                            <Route path="/usermain/finance_transaction/add_bill" component={() => <FTBillAddBill projects={this.props.projects.projects} billsPost={this.props.billsPost} recordsLength={this.props.finances.bills.length}/>}/>

                            <Route path="/usermain/finance_transaction/view_loan/:vlid" component={RenderFTViewLoan}/>
                            <Route path="/usermain/finance_transaction/edit_loan/:elid" component={RenderFTEditLoan}/>
                            <Route path="/usermain/finance_transaction/add_loan" component={() => <FTLoanAddLoan loansPost={this.props.loansPost} recordsLength={this.props.finances.loans.length}/>}/>

                            <Route path="/usermain/finance_transaction/view_fund/:vfid" component={RenderFTViewFund}/>
                            <Route path="/usermain/finance_transaction/edit_fund/:efid" component={RenderFTEditFund}/>
                            <Route path="/usermain/finance_transaction/add_fund" component={() => <FTFundAddFund fundsPost={this.props.fundsPost} recordsLength={this.props.finances.funds.length}/>}/>

                        <Route path="/usermain/finance_transaction" component={() => <FinanceTransaction finances={this.props.finances}/>}/>
                        
                        <Route path="/usermain/sales_management" component={RenderGlobalSales}/>
                        <Route path="/usermain/crm" component={RenderGlobalCRM}/>

                            <Route path="/usermain/inventory/edit_inventory/:einvid" component={RenderINVEditInventory}/>
                            <Route path="/usermain/inventory/add_inventory" component={() => <INVInventoryAddInventory inventoryPost={this.props.inventoryPost} recordsLength={this.props.inventory.inventory.length}/>}/>

                            <Route path="/usermain/inventory/edit_stock/:estkid" component={RenderINVEditStock}/>
                            <Route path="/usermain/inventory/add_stock" component={() => <INVStockAddStock stocksPost={this.props.stocksPost} recordsLength={this.props.inventory.stocks.length}/>}/>
                        
                        <Route path="/usermain/inventory" component={() => <Inventory inventory={this.props.inventory}/>}/>
                        
                            <Route path="/usermain/human_resources/view_employee/:vempid" component={RenderHRViewEmployee}/>
                            <Route path="/usermain/human_resources/edit_employee/:eempid" component={RenderHREditEmployee}/>
                            <Route path="/usermain/human_resources/add_employee" component={() => <HREmployeeAddEmployee employeesPost={this.props.employeesPost} recordsLength={this.props.employees.employees.length}/>}/>
                        
                        <Route path="/usermain/human_resources" component={() => <HumanResources employees={this.props.employees} employeesMarkAttendance={this.props.employeesMarkAttendance}/>}/>
                        
                        <Route exact path="/usermain" component={() => <UserHome openProjects={this.state.openProjects}/>}/>
                        <Route path="/usermain/todo" component={() => <UserTodo uid={this.props.user._id} todoList={this.props.user.utodo} addingdeletingtask={this.props.user.addingdeletingtask} usersAddDeleteTask={this.props.usersAddDeleteTask}/>}/>
                        <Route path="/usermain/:pid" component={LoadSelectedProject}/>
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(UserMain);