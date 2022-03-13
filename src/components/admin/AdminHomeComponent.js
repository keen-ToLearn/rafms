import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardHeader, CardBody, CardText, Button,
    InputGroup, InputGroupAddon, Input, InputGroupText  } from 'reactstrap';

const RenderProject = ({project}) => {
    return(
        <Card outline color="secondary"
        className={project.ppriority === "High" ? 'bg-danger' :
        (project.ppriority === "Medium" ? 'bg-warning' : 'bg-success')}>
            <Link style={{ textDecoration: 'none' }} className="text-dark" to={`/adminmain/view_project/${project.pid}`}>
                <CardHeader>
                    <CardTitle>{project.pname}</CardTitle>
                </CardHeader>
            </Link>
            <CardBody className="p-4">
                <CardText>Start Date: {project.pstart}</CardText>
                <Link to={`/adminmain/edit_project/${project.pid}`}>
                    <Button type="button" color="secondary">Edit</Button>
                </Link>
            </CardBody>
        </Card>
    );
}

class AdminHome extends Component{
    constructor(props){
        super(props);
        this.state = {
            renderRowList : new Array(this.props.projects.length).fill(1)
        };
        this.filterClientData = this.filterClientData.bind(this);
    }

    filterClientData(){
        const projectsCopy = [...this.props.projects];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<projectsCopy.length; i++){
            let pnametmp = projectsCopy[i].pname.toLowerCase();
            if(pnametmp.indexOf(this.searchclients.value) !== -1)
                renderRowListCopy[i] = 1;
            else
                renderRowListCopy[i] = 0;
        }
        this.setState({ renderRowList : renderRowListCopy });
    }
    
    render(){
        const projectlist = this.props.projects.map((project) => {
            return(
                <div key={project.pid} className={`col-12 col-md-4 p-5 ${ this.state.renderRowList[project.pid] === 1 ? '' : 'd-none' }`}>
                    <RenderProject project={project}/>
                </div>
            );
        });

        return(
            <div className="row">
                <div className="container-fluid h-100">
                    <div className="row justify-content-center border-bottom border-secondary bg-light" style={{height : "15%"}}>
                        <Link style={{ textDecoration: 'none' }} className="mr-5" to="/adminmain/add_project">
                            {/*<h1 className="font-weight-normal">Create New Project</h1>*/}
                            <h1 className="font-weight-normal">Add New Client</h1>
                        </Link>
                        <Link style={{ textDecoration: 'none' }} to="/adminmain/give_access">
                            <h1 className="font-weight-normal">Authorize Users</h1>
                        </Link>
                    </div>
                    <div className="row justify-content-center pt-4">
                        <InputGroup className="w-25">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText className="bg-white border-right-0"><span className="fa fa-search"></span></InputGroupText>
                            </InputGroupAddon>
                            <Input className="border-left-0" type="text" id="searchclients" name="searchclients"
                            placeholder="Search clients" onChange={this.filterClientData} innerRef={(input) => this.searchclients = input}/>
                        </InputGroup>
                    </div>
                    <div className="row justify-content-center p-4">
                        {projectlist}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHome;