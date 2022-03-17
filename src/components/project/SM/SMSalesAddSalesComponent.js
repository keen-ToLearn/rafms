import React, { Component } from 'react';
import { Card, Form, FormGroup, Row, Col, Button, Label, Input } from 'reactstrap';

class SMSalesAddSales extends Component{
    constructor(props){
        super(props);
        this.state = {
            saleOf : '',
            saleDate : '',
            saleQty : '',
            saleAmt : ''
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
        event.preventDefault();
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row border-bottom border-secondary bg-light">
                    <div className="mx-5 px-5">
                        <h1 className="font-weight-normal">Add Sale Data</h1>
                    </div>
                </div>
                <div className="row text-left">
                    <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="saleOf" md={2}>Item</Label>
                                <Col md={10}>
                                    <Input type="text" id="saleOf" name="saleOf" placeholder="Enter description of sale item"
                                    value={this.state.saleOf} valid={this.state.saleOf !== ''} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="saleDate" md={2}>Sale Date</Label>
                                <Col md={10}>
                                    <Input type="text" id="saleDate" name="saleDate" placeholder="Enter sale date"
                                    value={this.state.saleDate} valid={this.state.saleDate !== ''} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label htmlFor="saleQty" md={6} className="px-0">Quantity</Label>
                                        <Input type="text" id="saleQty" name="saleQty" placeholder="Enter sale quantity"
                                        value={this.state.saleQty} valid={this.state.saleQty !== ''} onChange={this.handleInputChange}/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label htmlFor="saleAmt" md={6} className="px-0">Sale Amount</Label>
                                        <Input type="number" id="saleAmt" name="saleAmt" placeholder="Enter sale amount"
                                        value={this.state.saleAmt} valid={this.state.saleAmt !== ''} onChange={this.handleInputChange} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup row>
                                <Col md={3}>
                                    <Button type="submit" color="info">Add Sale Data</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </Card>
                </div>
            </div>
        );
    }
}

export default SMSalesAddSales;