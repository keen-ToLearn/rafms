import React, { Component } from 'react';
import { Button, Card, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { withRouter } from 'react-router-dom';

class AdminGiveAccess extends Component{
    constructor(props){
        super(props);
        this.state = {
            accessor : ''
        }
        this.checkboxes = [];
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAccess = this.handleAccess.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({ [name] : value });
    }

    handleAccess(event){
        event.preventDefault();
        // const opArray = [];
        // for(let i=0; i < this.checkboxes.length; i++){
        //     opArray.push([this.checkboxes[i].checked, this.checkboxes[i].value]);
        // }
        // alert(JSON.stringify(opArray));
        this.props.history.replace('/adminmain/manage_access');
    }

    render(){
        const selectoptions = this.props.users.map((user) => {
            return(
                <option>{user.uuname}</option>
            );
        });

        const checkboxes = this.props.projects.map((project, index) => {
            return(
                <Label check size="lg" className="d-block">
                    <Input type="checkbox" name={`chk${project.pid}`} id={`chk${project.pid}`} value={project.pid}
                    innerRef={ref => { this.checkboxes[5+index] = ref; return true;}} style={{ width : '1.25rem', height : '1.25rem' }}/>
                    
                    <Label check size="lg" className="d-inline ml-3">{project.pname}</Label>
                </Label>
            );
        });

        return(
            <div className="row">
                <div className="container-fluid h-100">
                    <div className="row justify-content-center border-bottom border-secondary bg-light" style={{height : "15%"}}>
                        <h1 className="font-weight-normal mr-5 text-primary" style={{ cursor : 'pointer' }} onClick={() => this.props.history.replace('/adminmain/give_access')}>Give Access</h1>
                        <h1 className="font-weight-normal text-primary" style={{ cursor : 'pointer' }} onClick={() => this.props.history.replace('/adminmain/manage_access')}>Manage Access</h1>
                    </div>
                    <div className="row text-left p-5">
                        <Card className="col-10 col-md-6 offset-3 p-3 bg-light">
                            <Form onSubmit={this.handleAccess}>
                                <FormGroup row>
                                    <Label htmlFor="accessor" md={3} size="lg">User</Label>
                                    <Col md={8}>
                                        <Input type="select" name="accessor" id="accessor" bsSize="lg"
                                        value={this.state.accessor} onChange={this.handleInputChange}>
                                            <option selected>None</option>
                                            {selectoptions}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label md={3} size="lg">Features</Label>
                                    <Col md={{ size : 7, offset : 1 }}>
                                        <Label check size="lg" className="d-block">
                                            <Input type="checkbox" name="chkFT" id="chkFT" value="101"
                                            innerRef={(ref) => { this.checkboxes[0] = ref; return true; }} style={{ width : '1.25rem', height : '1.25rem' }}/>
                                            
                                            <Label check size="lg" className="d-inline ml-3">Finance and Transaction</Label>
                                        </Label>
                                        
                                        <Label check size="lg" className="d-block">
                                            <Input type="checkbox" name="chkSM" id="chkSM" value="102"
                                            innerRef={(ref) => { this.checkboxes[1] = ref; return true; }} style={{ width : '1.25rem', height : '1.25rem' }}/>
                                            
                                            <Label check size="lg" className="d-inline ml-3">Sales Management</Label>
                                        </Label>

                                        <Label check size="lg" className="d-block">
                                            <Input type="checkbox" name="chkCRM" id="chkCRM" value="103"
                                            innerRef={(ref) => { this.checkboxes[2] = ref; return true; }} style={{ width : '1.25rem', height : '1.25rem' }}/>
                                            
                                            <Label check size="lg" className="d-inline ml-3">Customer Relations Management</Label>
                                        </Label>
                                        
                                        <Label check size="lg" className="d-block">
                                            <Input type="checkbox" name="chkI" id="chkI" value="104"
                                            innerRef={(ref) => { this.checkboxes[3] = ref; return true; }} style={{ width : '1.25rem', height : '1.25rem' }}/>
                                            
                                            <Label check size="lg" className="d-inline ml-3">Inventory Management</Label>
                                        </Label>
                                        
                                        <Label check size="lg" className="d-block">
                                            <Input type="checkbox" name="chkHR" id="chkHR" value="105"
                                            innerRef={(ref) => { this.checkboxes[4] = ref; return true; }} style={{ width : '1.25rem', height : '1.25rem' }}/>
                                            
                                            <Label check size="lg" className="d-inline ml-3">Human Resources</Label>
                                        </Label>
                                        
                                        {checkboxes}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Authorize</Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminGiveAccess);