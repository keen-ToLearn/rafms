import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Badge, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';

class AdminManageAccess extends Component{
    constructor(props){
        super(props);
        this.handleAccessRemoval = this.handleAccessRemoval.bind(this);
    }
    handleAccessRemoval(){
    }
    render(){
        const useraccesses = this.props.users.map((user) => {
            let uopeprojectCopy = [...user.uopenproject];
            let accessFeatures = [];
            for(let i=0; i<uopeprojectCopy.length; i++){
                if(uopeprojectCopy[i] === 101)
                    accessFeatures.push('Finance and Transaction');
                else if(uopeprojectCopy[i] === 102)
                    accessFeatures.push('Sales Management');
                else if(uopeprojectCopy[i] === 103)
                    accessFeatures.push('Customer Relations Management');
                else if(uopeprojectCopy[i] === 104)
                    accessFeatures.push('Inventory Management');
                else if(uopeprojectCopy[i] === 105)
                    accessFeatures.push('Human Resources');
                else{
                    for(let j=0; j<this.props.projects.length; j++){
                        if(uopeprojectCopy[i] === this.props.projects[j].pid){
                            accessFeatures.push(this.props.projects[j].pname);
                            break;
                        }
                    }
                }
            }

            const renderAccessFeatures = accessFeatures.map((accessFeature) => {
                return(
                    <h4 className="d-inline mr-2">
                        <Badge color="primary" className="font-weight-normal p-2 mb-2">{accessFeature}</Badge>
                    </h4>
                );
            });

            if(accessFeatures.length !== 0)
                return(
                    <div className="col-10 col-md-8 offset-2 mb-2">
                        <Card className="p-3 px-5">
                            <Row>
                                <Col md={10}>
                                    <CardTitle className="mb-0">
                                        <h4><em className="text-secondary">User#</em>{user.uuname}</h4>
                                    </CardTitle>
                                    <CardBody>
                                        { renderAccessFeatures }
                                    </CardBody>
                                </Col>
                                <Col md={2}>
                                    <span className="fa fa-trash fa-2x py-4" onClick={this.handleAccessRemoval} style={{ cursor : 'pointer' }}></span>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                );
            else
                return( <></> );
        });

        return(
            <div className="row">
                <div className="container-fluid h-100">
                    <div className="row justify-content-center border-bottom border-secondary bg-light" style={{height : "15%"}}>
                        <h1 className="font-weight-normal mr-5 text-primary" style={{ cursor : 'pointer' }} onClick={() => this.props.history.replace('/adminmain/give_access')}>Give Access</h1>
                        <h1 className="font-weight-normal text-primary" style={{ cursor : 'pointer' }} onClick={() => this.props.history.replace('/adminmain/manage_access')}>Manage Access</h1>
                    </div>
                    <div className="row text-left pt-5">
                        {useraccesses}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminManageAccess);