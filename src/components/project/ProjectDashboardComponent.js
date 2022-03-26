import React, { Component } from 'react';

import CustomerRelationsManagement from './CRM/CustomerRelationsManagementComponent';
    import CRMComplaintViewComplaint from './CRM/CRMComplaintViewComplaintComponent';

import SalesManagement from './SM/SalesManagementComponent';
    import SMSalesAddSales from './SM/SMSalesAddSalesComponent';
    import SMSalesEditSales from './SM/SMSalesEditSalesComponent';
    import SMSalesViewSales from './SM/SMSalesViewSalesComponent';

import { Switch, Route } from 'react-router-dom';
import { Table } from 'reactstrap';

const RenderInfoTable = ({selectedProject}) => {
    return(
        <Table key={selectedProject.pid} borderless>
            <tbody>
                <tr>
                    {/*<th scope="row">Project Name</th>*/}
                    <th scope="row">Client Name</th>
                    <td>{selectedProject.pname}</td>
                </tr>
                <tr>
                    <th scope="row">Start Date</th>
                    <td>{selectedProject.pstart}</td>
                </tr>
                <tr>
                    <th scope="row">Nature of Alliance</th>
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
        <div className="container-fluid h-100 p-5">
            <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                {/*<h1>About the Project</h1>*/}
                <h1>About Client</h1>
            </div>
            <div className="row col-10 mx-5 mt-5 px-0 text-left">
                <RenderInfoTable selectedProject={selectedProject}/>
            </div>
        </div>
    );
}
class ProjectDashboard extends Component{
    render(){
        const RenderCRMViewComplaint = ({match}) => {
            if(this.props.isLoadingComplaint){
                return(<span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span>);
            }
            else{
                const projectViewComplaint = this.props.complaints.issues.filter((issue) => issue.sNo === parseInt(match.params.vcid))[0];
                if(typeof projectViewComplaint === 'undefined'){
                    return(<h4 className="mt-5">Complaint Deleted</h4>);
                }
                else
                    return(
                        <CRMComplaintViewComplaint complaintToView={projectViewComplaint} forPid={this.props.complaints.forPid}
                            complaintsPostDelete={this.props.complaintsPostDelete}/>
                    );
            }
        }

        const RenderSMEditSales = ({match}) => {
            if(this.props.isLoadingSales){
                return(<span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span>);
            }
            else{
                const projectEditSale = this.props.sales.records.filter((sale) => sale.sNo === parseInt(match.params.esid))[0];
                if(typeof projectEditSale === 'undefined'){
                    return(<h4 className="mt-5">Sale Data Deleted</h4>);
                }
                else
                    return (
                        <SMSalesEditSales saleToEdit={projectEditSale} salesPostDelete={this.props.salesPostDelete} forPid={this.props.sales.forPid}/>
                    );
            }
        }

        const RenderSMViewSales = ({match}) => {
            if(this.props.isLoadingSales){
                return(<span className="mt-5 fa fa-circle-o-notch fa-spin fa-3x"></span>);
            }
            else{
                const projectViewSale = this.props.sales.records.filter((sale) => sale.sNo === parseInt(match.params.vsid))[0];
                if(typeof projectViewSale === 'undefined'){
                    return(<h4 className="mt-5">Sale Data Deleted</h4>);
                }
                else
                    return(
                        <SMSalesViewSales saleToView={projectViewSale} forPid={this.props.sales.forPid}/>
                    );
            }
        }

        return(
            <div className="col-11 p-0">
                <Switch>
                    <Route exact path={`/usermain/${this.props.selectedProject.pid}`} component={() => <ProjectInfo selectedProject={this.props.selectedProject}/>}/>

                        <Route path={`/usermain/${this.props.selectedProject.pid}/sales_management/view_sale/:vsid`} component={RenderSMViewSales}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/sales_management/edit_sale/:esid`} component={RenderSMEditSales}/>
                        <Route path={`/usermain/${this.props.selectedProject.pid}/sales_management/add_sale`} component={() => <SMSalesAddSales forPid={this.props.sales.forPid} recordsLength={this.props.sales.records.length} salesPostDelete={this.props.salesPostDelete}/>}/>
                    
                    <Route path={`/usermain/${this.props.selectedProject.pid}/sales_management`} component={() => <SalesManagement sales={this.props.sales}
                        isLoading={this.props.isLoadingSales} errMes={this.props.errMesSales} postingdeleting={this.props.postingDeletingSale} salesPostDelete={this.props.salesPostDelete}/>}/>

                        <Route path={`/usermain/${this.props.selectedProject.pid}/crm/view_complaint/:vcid`} component={RenderCRMViewComplaint}/>

                    <Route path={`/usermain/${this.props.selectedProject.pid}/crm`} component={() => <CustomerRelationsManagement selectedProject={this.props.selectedProject} complaints={this.props.complaints}
                        isLoading={this.props.isLoadingComplaint} errMes={this.props.errMesComplaint} postingdeleting={this.props.postingDeletingComplaint}
                        projectsPut={this.props.projectsPut} complaintsPostDelete={this.props.complaintsPostDelete}/>}/>
                </Switch>
            </div>
        );
    }
}

export default ProjectDashboard;