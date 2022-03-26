import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, FormGroup, FormText, Col, Button, Label, Input } from 'reactstrap';

class CRMModifyClient extends Component{
    constructor(props){
        super(props);
        this.state = {
            pid : this.props.selectedProject.pid,
            pdesc : this.props.selectedProject.pdesc,
            pContact : this.props.selectedProject.pContact,
            area : this.props.selectedProject.pAddress.area,
            locality : this.props.selectedProject.pAddress.locality,
            vilcity : this.props.selectedProject.pAddress.vilcity,
            pinCode : this.props.selectedProject.pAddress.pinCode,
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name] : value });
    }

    handleEdit(){
        this.props.projectsPut(this.state);
        this.props.history.push(`/usermain/${this.state.pid}/crm`);
    }

    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row pb-4 text-left">
                        <Card className="p-4 col-md-11 offset-1 bg-light">
                            <Form onSubmit={this.handleEdit}>
                                <FormGroup row>
                                    <Label htmlFor="pdesc" md={3}>Nature of Alliance</Label>
                                    <Col md={8}>
                                        <Input type="text" id="pdesc" name="pdesc" placeholder="Enter client description"
                                        value={this.state.pdesc} valid={this.state.pdesc !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pContact" md={3}>Contact No.</Label>
                                    <Col md={8}>
                                        <Input type="number" id="pContact" name="pContact" placeholder="Enter Contact No."
                                        value={this.state.pContact} valid={this.state.pContact !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormText className="h4 font-weight-normal">Address</FormText>
                                <FormGroup row>
                                    <Label htmlFor="area" md={3}>Area</Label>
                                    <Col md={6}>
                                        <Input type="text" id="area" name="area" placeholder="Flat No. / Building name"
                                        value={this.state.area} valid={this.state.area !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="locality" md={3}>Locality</Label>
                                    <Col md={6}>
                                        <Input type="text" id="locality" name="locality" placeholder="Locality / Landmark"
                                        value={this.state.locality} valid={this.state.locality !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="vilcity" md={3}>Village / City</Label>
                                    <Col md={6}>
                                        <Input type="text" id="vilcity" name="vilcity" placeholder="Village / City name"
                                        value={this.state.vilcity} valid={this.state.vilcity !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pinCode" md={3}>Pin Code</Label>
                                    <Col md={6}>
                                        <Input type="text" id="pinCode" name="pinCode" placeholder="Pin code"
                                        value={this.state.pinCode} valid={this.state.pinCode !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Modify</Button>
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

export default withRouter(CRMModifyClient);