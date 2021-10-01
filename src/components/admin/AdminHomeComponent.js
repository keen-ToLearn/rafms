import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardHeader, CardBody, CardText, Button } from 'reactstrap';

const RenderProject = ({project}) => {
    return(
        <Card outline color="secondary"
        className={project.ppriority === "High" ? 'bg-danger' :
        (project.ppriority === "Medium" ? 'bg-warning' : 'bg-success')}>
            <CardHeader>
                <CardTitle>{project.pname}</CardTitle>
            </CardHeader>
            <CardBody className="p-4">
                <CardText>Start Date: {project.pstart}</CardText>
                <CardText>Deadline: {project.pdeadline}</CardText>
                <Link to={`/adminmain/edit_project/${project.pid}`}>
                    <Button type="button" color="secondary">Edit</Button>
                </Link>
            </CardBody>
        </Card>
    );
}

class AdminHome extends Component{
    render(){
        const projectlist = this.props.projects.map((project) => {
            return(
                <div key={project.pid} className="col-12 col-md-4 p-5">
                    <RenderProject project={project}/>
                </div>
            );
        });

        return(
            <div className="row h-70">
                <div className="container-fluid h-100">
                    <div className="row justify-content-center border-bottom border-secondary bg-light" style={{height : "15%"}}>
                        <Link style={{ textDecoration: 'none' }} to="/adminmain/add_project">
                            <h1 className="font-weight-normal">
                                Create New Project
                            </h1>
                        </Link>
                    </div>
                    <div className="row justify-content-center p-5" style={{height : "85%"}}>
                        {projectlist}
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminHome;