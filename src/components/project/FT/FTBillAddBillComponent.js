import React, { Component } from 'react';
import { Card, Form, FormGroup, FormText, Row, Col, Button, Label, Input } from 'reactstrap';

class FTBillAddBill extends Component{
    constructor(props){
        super(props);
        this.state = {
            billTo : '',
            billName : '',
            billDate : '',
            billTotal : '',
            times : 1,
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

    changeTimes(incdec){
        let timesCopy = (this.state.times + incdec < 1)?1:this.state.times + incdec;
        this.setState({ times : timesCopy });
    }

    render(){
        const RenderRecordToAdd = ({times}) => {
            let tmpTimes = new Array(times).fill(1);
            const timesRecordList = tmpTimes.map(() => {
                return(
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemQty" md={12}>Qty</Label>
                                <Input type="number" id="itemQty" name="itemQty" placeholder="Product Qty" innerRef={(input) => this.itemQty = input}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemDesc" md={12}>Product</Label>
                                <Input type="text" id="itemDesc" name="itemDesc" placeholder="Description" innerRef={(input) => this.itemDesc = input}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemUnitCost" md={12}>Unit Cost</Label>
                                <Input type="number" id="itemUnitCost" name="itemUnitCost" placeholder="Unit Cost" innerRef={(input) => this.itemUnitCost = input}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemTotal" md={12}>Product Total</Label>
                                <Input type="number" id="itemTotal" name="itemTotal" placeholder="Total Cost" innerRef={(input) => this.itemTotal = input}/>
                            </FormGroup>
                        </Col>
                    </Row>
                );
            });
            return(
                <>
                    {timesRecordList}
                </>
            );
        }
        
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary" style={{backgroundImage : 'linear-gradient(to right, white, #f8f9fa)'}}>
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Add Bill</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="billTo" md={2}>Biller</Label>
                                    <Col md={10}>
                                        <Input type="text" id="billTo" name="billTo" placeholder="Enter name of biller"
                                        value={this.state.billTo} valid={this.state.billTo !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="billName" md={6} className="px-0">Description</Label>
                                            <Input type="text" id="billName" name="billName" placeholder="Enter bill description"
                                            value={this.state.billName} valid={this.state.billName !== ''} onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label htmlFor="billDate" md={6} className="px-0">Date</Label>
                                            <Input type="text" id="billDate" name="billDate" placeholder="Enter bill date"
                                            value={this.state.billDate} valid={this.state.billDate !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                    <Label htmlFor="billTotal" md={2}>Total</Label>
                                    <Col md={10}>
                                        <Input type="number" id="billTotal" name="billTotal" placeholder="Enter bill total"
                                        value={this.state.billTotal} valid={this.state.billTotal !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormText>
                                    <h6 className="d-inline">Bill Details</h6>
                                    <span className="fa fa-plus-circle fa-lg ml-2" style={{cursor : 'pointer'}} onClick={() => this.changeTimes(1)}></span>
                                    <span className="fa fa-minus-circle fa-lg ml-2" style={{cursor : 'pointer'}} onClick={() => this.changeTimes(-1)}></span>
                                </FormText>
                                <RenderRecordToAdd times={this.state.times}/>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Add Bill</Button>
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

export default FTBillAddBill;