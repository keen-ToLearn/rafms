import React, { Component } from 'react';
import ProjectNavPane from './ProjectNavPaneComponent';
import FinanceTransaction from './FinanceTransactionComponent';
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
    render(){
        return(
            <div className="row">
                <ProjectNavPane projectRouteId={this.props.selectedProject.pid}/>
                <Switch>
                    <Route exact path={`/usermain/${this.props.selectedProject.pid}`} component={() => <ProjectInfo selectedProject={this.props.selectedProject}/>}/>
                    <Route path={`/usermain/${this.props.selectedProject.pid}/finance_transaction`} component={FinanceTransaction}/>
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