import React, { Component } from 'react';
import { Card, Form, FormGroup, FormText, Row, Col, Button, Label, Input } from 'reactstrap';

class FTBillEditBill extends Component{
    constructor(props){
        super(props);
        this.state = {
            billTo : this.props.billToEdit.billTo,
            billName : this.props.billToEdit.billName,
            billDate : this.props.billToEdit.billDate,
            billClient : this.props.billToEdit.billClient,
            billTotal : this.props.billToEdit.billTotal,
            billRecords : this.props.billToEdit.billRecords
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
        //event.preventDefault();
    }

    render(){
        const RenderRecordToEdit = ({billRecords}) => {
            const editRecList = billRecords.map((billRecord) => {
                return(
                    <Row>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemQty" md={12}>Qty</Label>
                                <Input type="number" id="itemQty" name="itemQty" placeholder="Product Qty"
                                value={billRecord.itemQty} valid={billRecord.itemQty !== ''} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemDesc" md={12}>Product</Label>
                                <Input type="text" id="itemDesc" name="itemDesc" placeholder="Description"
                                value={billRecord.itemDesc} valid={billRecord.itemDesc !== ''} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemUnitCost" md={12}>Unit Cost</Label>
                                <Input type="number" id="itemUnitCost" name="itemUnitCost" placeholder="Unit Cost"
                                value={billRecord.itemUnitCost} valid={billRecord.itemUnitCost !== ''} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label htmlFor="itemTotal" md={12}>Product Total</Label>
                                <Input type="number" id="itemTotal" name="itemTotal" placeholder="Total Cost"
                                value={billRecord.itemTotal} valid={billRecord.itemTotal !== ''} onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                );
            });
            return(
                <>
                    {editRecList}
                </>
            );
        }

        const clientoptions = this.props.projects.map((project) => {
            return(
                <option>{project.pname}</option>
            );
        });

        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Edit Bill</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-8 offset-2 bg-light">
                            <Form onSubmit={this.handleEdit}>
                                <FormGroup row>
                                    <Label htmlFor="billTo" md={3}>Billed by</Label>
                                    <Col md={9}>
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
                                    <Label htmlFor="billClient" md={2}>Client</Label>
                                    <Col md={4}>
                                        <Input type="select" id="billClient" name="billClient"
                                        value={this.state.billClient} onChange={this.handleInputChange}>
                                            <option selected>Select Client</option>
                                            {clientoptions}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="billTotal" md={3}>Total</Label>
                                    <Col md={9}>
                                        <Input type="number" id="billTotal" name="billTotal" placeholder="Enter bill total"
                                        value={this.state.billTotal} valid={this.state.billTotal !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <FormText><h6>Bill Details</h6></FormText>
                                <RenderRecordToEdit billRecords={this.state.billRecords}/>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Edit Bill</Button>
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

export default FTBillEditBill;