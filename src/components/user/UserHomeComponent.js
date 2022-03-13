import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardTitle, CardHeader, CardBody, CardText } from 'reactstrap';

const RenderProject = ({project}) => {
    return(
        <Link style={{ textDecoration: 'none', color: 'black' }} to={`/usermain/${project.pid}`}>
            <Card outline color="secondary"
            className={project.ppriority === "High" ? 'bg-danger' :
            (project.ppriority === "Medium" ? 'bg-warning' : 'bg-success')}>
                <CardHeader>
                    <CardTitle>{project.pname}</CardTitle>
                </CardHeader>
                <CardBody className="p-4">
                    <CardText>Start Date: {project.pstart}</CardText>
                </CardBody>
            </Card>
        </Link>
    );
}

class UserHome extends Component{
    render(){
        const openprojects = this.props.openProjects.map((project) => {
            return(
                <div key={project.pid} className="col-12 col-md-4 p-5">
                    <RenderProject project={project}/>
                </div>
            );
        });
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            {/*<h1 className="font-weight-light">Select A Project To Start Working...</h1>*/}
                            <h1 className="font-weight-light">Select A Client To Start Working...</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center p-5">
                        {openprojects}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserHome;