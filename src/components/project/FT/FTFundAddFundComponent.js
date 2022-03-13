import React, { Component } from 'react';
import { Card, Form, FormGroup, Col, Button, Label, Input } from 'reactstrap';

class FTLoanAddLoan extends Component{
    constructor(props){
        super(props);
        this.state = {
            fundFrom : '',
            fundDate : '',
            fundAmt : ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name] : value });
    }

    handleSubmit(event){
        //event.preventDefault();
    }

    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Add Fund</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="fundFrom" md={2}>Funding Organisation</Label>
                                    <Col md={10}>
                                        <Input type="text" id="fundFrom" name="fundFrom" placeholder="Enter name of funding body"
                                        value={this.state.fundFrom} valid={this.state.fundFrom !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="fundDate" md={2}>Date</Label>
                                    <Col md={10}>
                                        <Input type="text" id="fundDate" name="fundDate" placeholder="Enter fund date"
                                        value={this.state.fundDate} valid={this.state.fundDate !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="fundAmt" md={2}>Amount</Label>
                                    <Col md={10}>
                                        <Input type="number" id="fundAmt" name="fundAmt" placeholder="Enter fund amount"
                                        value={this.state.fundAmt} valid={this.state.fundAmt !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Add Fund</Button>
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

export default FTLoanAddLoan;