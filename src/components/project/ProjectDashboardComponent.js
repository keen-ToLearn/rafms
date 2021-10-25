import React, { Component } from 'react';
import ProjectNavPane from './ProjectNavPaneComponent';
import FinanceTransaction from './FT/FinanceTransactionComponent';
    import { BILLS } from '../../shared/finances/bills';
    import { LOANS } from '../../shared/finances/loans';
    import { FUNDS } from '../../shared/finances/funds';
    import FTBillViewBill from './FT/FTBillViewBillComponent';
    import FTBillEditBill from './FT/FTBillEditBillComponent';
    import FTBillAddBill from './FT/FTBillAddBillComponent';
    import FTLoanViewLoan from './FT/FTLoanViewLoanComponent';
    import FTLoanEditLoan from './FT/FTLoanEditLoanComponent';
    import FTLoanAddLoan from './FT/FTLoanAddLoanComponent';
    import FTFundViewFund from './FT/FTFundViewFundComponent';
    import FTFundEditFund from './FT/FTFundEditFundComponent';
    import FTFundAddFund from './FT/FTFundAddFundComponent';
import { Switch, Route } from 'react-router-dom';
import { Table } from 'reactstrap';

const RenderInfoTable = ({selectedProject}) => {
    return(
        <Table borderless>
            <tbody>
                <tr>
                    <th scope="row">Project Name</th>
                    <td>{selectedProject.pname}</td>
                </tr>
                <tr>
                    <th scope="row">Start Date</th>
                    <td>{selectedProject.pstart}</td>
                </tr>
                <tr>
                    <th scope="row">Deadline</th>
                    <td>{selectedProject.pdeadline}</td>
                </tr>
                <tr>
                    <th scope="row">Description</th>
                    <td>{selectedProject.pdesc}</td>
                </tr>
                <tr>
                    <th scope="row">Priority</th>
                    <td>{selectedProject.ppriority}</td>
                </tr>
            </tbody>
        </Table>
    );
}

const ProjectInfo = ({selectedProject}) => {
    return(
        <div className="col-11 p-0">
            <div className="container-fluid h-100 p-5">
                <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                    <h1>About the Project</h1>
                </div>
                <div className="row col-10 mx-5 mt-5 px-0 text-left">
                    <RenderInfoTable selectedProject={selectedProject}/>
                </div>
            </div>
        </div>
    );
}
class ProjectDashboard extends Component{
    constructor(props){
        super(props);
        this.state = {
            bills : BILLS,
            loans : LOANS,
            funds : FUNDS
        };
    }
    render(){
        const RenderFTViewBill = ({match}) => {
            const projectBill = this.state.bills.filter((projectbill) => projectbill.forPid === this.props.selectedProject.pid)[0];
            const billToViewCopy = projectBill.allBills.filter((bill) => bill.sNo === parseInt(match.params.vbid))[0];
            return(
                <FTBillViewBill billToView={billToViewCopy} forPid={this.props.selectedProject.pid}/>
            );
        }

        const RenderFTEditBill = ({match}) => {
            const projectBill = this.state.bills.filter((projectbill) => projectbill.forPid === this.props.selectedProject.pid)[0];
            const billToEditCopy = projectBill.allBills.filter((bill) => bill.sNo === parseInt(match.params.ebid))[0];
            return(
                <FTBillEditBill billToEdit={billToEditCopy}/>
            );
        }

        const RenderFTViewLoan = ({match}) => {
            const projectLoan = this.state.loans.filter((projectloan) => projectloan.forPid === this.props.selectedProject.pid)[0];
            const loanToViewCopy = projectLoan.allLoans.filter((loan) => loan.sNo === parseInt(match.params.vlid))[0];
            return(
                <FTLoanViewLoan loanToView={loanToViewCopy} forPid={this.props.selectedProject.pid}/>
            );
        }

        const RenderFTEditLoan = ({match}) => {
            const projectLoan = this.state.loans.filter((projectloan) => projectloan.forPid === this.props.selectedProject.pid)[0];
            const loanToEditCopy = projectLoan.allLoans.filter((loan) => loan.sNo === parseInt(match.params.elid))[0];
            return(
                <FTLoanEditLoan loanToEdit={loanToEditCopy}/>
            );
        }

        const RenderFTViewFund = ({match}) => {
            const projectFund = this.state.funds.filter((projectfund) => projectfund.forPid === this.props.selectedProject.pid)[0];
            const fundToViewCopy = projectFund.allFunds.filter((fund) => fund.sNo === parseInt(match.params.vfid))[0];
            return(
                <FTFundViewFund fundToView={fundToViewCopy} forPid={this.props.selectedProject.pid}/>
            );
        }

        const RenderFTEditFund = ({match}) => {
            const projectFund = this.state.funds.filter((projectfund) => projectfund.forPid === this.props.selectedProject.pid)[0];
            const fundToEditCopy = projectFund.allFunds.filter((fund) => fund.sNo === parseInt(match.params.efid))[0];
            return(
                <FTFundEditFund fundToEdit={fundToEditCopy}/>
            );
        }

        return(
            <div className="row">
                <ProjectNavPane projectRouteId={this.props.selectedProject.pid}/>
                <Switch>
                    <Route exact path={`/usermain/${this.props.selectedProject.pid}`} component={() => <ProjectInfo selectedProject={this.props.selectedProject}/>}/>

                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/view_bill/:vbid`} component={RenderFTViewBill}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/edit_bill/:ebid`} component={RenderFTEditBill}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/add_bill`} component={FTBillAddBill}/>

                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/view_loan/:vlid`} component={RenderFTViewLoan}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/edit_loan/:elid`} component={RenderFTEditLoan}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/add_loan`} component={FTLoanAddLoan}/>

                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/view_fund/:vfid`} component={RenderFTViewFund}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/edit_fund/:efid`} component={RenderFTEditFund}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction/add_fund`} component={FTFundAddFund}/>

                    <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction`} component={() => <FinanceTransaction
                        forPid={this.props.selectedProject.pid}
                        billList={(this.props.selectedProject.pid === 1)?(this.state.bills[0].allBills):('')}
                        loanList={(this.props.selectedProject.pid === 1)?(this.state.loans[0].allLoans):('')}
                        fundList={(this.props.selectedProject.pid === 1)?(this.state.funds[0].allFunds):('')}/>}/>
                    
                    {/*<Route path={`/usermain/${this.props.selectedProject.pid}/sales_management`} component={SalesManagement}/>
                    <Route path={`/usermain/${this.props.selectedProject.pid}/crm`} component={CustomerRelationsManagement}/>
                    <Route path={`/usermain/${this.props.selectedProject.pid}/inventory`} component={Inventory}/>
                    <Route path={`/usermain/${this.props.selectedProject.pid}/human_resources`} component={HumanResources}/>*/}
                </Switch>
            </div>
        );
    }
}

export default ProjectDashboard;