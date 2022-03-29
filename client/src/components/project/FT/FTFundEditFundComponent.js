import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card, Form, FormGroup, Col, Button, Label, Input } from 'reactstrap';

class FTFundEditFund extends Component{
    constructor(props){
        super(props);
        this.state = {
            fundFrom : this.props.fundToEdit.fundFrom,
            fundDate : this.props.fundToEdit.fundDate,
            fundAmt : this.props.fundToEdit.fundAmt
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

    handleEdit(event){
        event.preventDefault();
        const editFund = this.state;
        editFund.sNo = this.props.fundToEdit.sNo;
        editFund.fundAmt = Number(editFund.fundAmt);
        this.props.fundsPut(this.props.fundToEdit._id, editFund);
        this.props.history.push('/usermain/finance_transaction');
    }

    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Edit Fund</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                            <Form onSubmit={this.handleEdit}>
                                <FormGroup row>
                                    <Label htmlFor="fundFrom" md={3}>Funding Organisation</Label>
                                    <Col md={9}>
                                        <Input type="text" id="fundFrom" name="fundFrom" placeholder="Enter name of funding body"
                                        value={this.state.fundFrom} valid={this.state.fundFrom !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="fundDate" md={3}>Date</Label>
                                    <Col md={9}>
                                        <Input type="text" id="fundDate" name="fundDate" placeholder="Enter fund date"
                                        value={this.state.fundDate} valid={this.state.fundDate !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="fundAmt" md={3}>Amount</Label>
                                    <Col md={9}>
                                        <Input type="number" id="fundAmt" name="fundAmt" placeholder="Enter fund amount"
                                        value={this.state.fundAmt} valid={this.state.fundAmt !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Edit Fund</Button>
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

export default withRouter(FTFundEditFund);