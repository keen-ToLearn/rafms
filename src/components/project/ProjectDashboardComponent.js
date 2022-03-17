import React, { Component } from 'react';

import CustomerRelationsManagement from './CRM/CustomerRelationsManagementComponent';
    import CRMComplaintViewComplaint from './CRM/CRMComplaintViewComplaintComponent';

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
            const projectViewComplaint = this.props.complaints.issues.filter((issue) => issue.sNo === parseInt(match.params.vcid))[0];
            return( <CRMComplaintViewComplaint complaintToView={projectViewComplaint}/> );
        }

        return(
            <div className="col-11 p-0">
                <Switch>
                    <Route exact path={`/usermain/${this.props.selectedProject.pid}`} component={() => <ProjectInfo selectedProject={this.props.selectedProject}/>}/>

                    {/*<Route path={`/usermain/${this.props.selectedProject.pid}/sales_management`} component={SalesManagement}/>*/}

                        <Route path={`/usermain/${this.props.selectedProject.pid}/crm/view_complaint/:vcid`} component={RenderCRMViewComplaint}/>

                    <Route path={`/usermain/${this.props.selectedProject.pid}/crm`} component={() => <CustomerRelationsManagement
                        selectedProject={this.props.selectedProject} complaints={this.props.complaints}/>}/>
                </Switch>
            </div>
        );
    }
}

export default ProjectDashboard;