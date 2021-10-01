import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, FormGroup, Label, Input, Col, Button, ButtonGroup } from 'reactstrap';

class AdminAddProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            pname : '',
            pstart : '',
            pdeadline : '',
            pdesc : '',
            ppriority : ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({ [name] : value });
    }

    handleCreation(event){
        //event.preventDefault();
    }
    
    render(){
        return(
            <div className="row">
                <div className="container-fluid">
                    <div className="row px-5 border-bottom border-secondary bg-light">
                        <h1 className="font-weight-normal">Create New Project</h1>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-10 col-md-6 offset-3 bg-light">
                            <Form onSubmit={this.handleCreation}>
                                <FormGroup row>
                                    <Label htmlFor="pname" md={3}>Project Title</Label>
                                    <Col md={9}>
                                        <Input type="text" id="pname" name="pname" placeholder="Enter project name"
                                        value={this.state.pname} valid={this.state.pname !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pstart" md={3}>Start Date</Label>
                                    <Col md={9}>
                                        <Input type="text" id="pstart" name="pstart" placeholder="Enter project start date"
                                        value={this.state.pstart} valid={this.state.pstart !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pdeadline" md={3}>Deadline</Label>
                                    <Col md={9}>
                                        <Input type="text" id="pdeadline" name="pdeadline" placeholder="Enter project deadline"
                                        value={this.state.pdeadline} valid={this.state.pdeadline !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="pdesc" md={3}>Project Description</Label>
                                    <Col md={9}>
                                        <Input type="textarea" id="pdesc" name="pdesc" placeholder="Enter project description"
                                        value={this.state.pdesc} valid={this.state.pdesc !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                    <Label htmlFor="ppriority" md={3}>Priority</Label>
                                    <Col md={4}>
                                        <Input type="select" id="ppriority" name="ppriority"
                                        value={this.state.ppriority} onChange={this.handleInputChange}>
                                            <option>Select priority</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </Input>
                                    </Col>
                                </FormGroup>*/}
                                <FormGroup row>
                                    <Label htmlFor="ppriority" md={3}>Priority</Label>
                                    <Col md={9}>
                                        <ButtonGroup>
                                            <Button type="button" id="ppriority" name="ppriority" color="danger"
                                            value={this.state.ppriority} onClick={this.handleInputChange}>
                                                High
                                            </Button>
                                            <Button type="button" id="ppriority" name="ppriority" color="warning"
                                            value={this.state.ppriority} onClick={this.handleInputChange}>
                                                Medium
                                            </Button>
                                            <Button type="button" id="ppriority" name="ppriority" color="success"
                                            value={this.state.ppriority} onClick={this.handleInputChange}>
                                                Low
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={2}>
                                        <Link to="/adminmain">
                                            <Button type="submit" color="info">Create</Button>
                                        </Link>
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

export default AdminAddProject;