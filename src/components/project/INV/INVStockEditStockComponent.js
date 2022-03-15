import React, { Component } from 'react';
import { Card, Form, FormGroup, Row, Col, Button, Label, Input } from 'reactstrap';

class INVStockEditStock extends Component{
    constructor(props){
        super(props);
        this.state = {
            stockItem : this.props.stockToEdit.stockItem,
            stockCost : this.props.stockToEdit.stockCost,
            stockQty : this.props.stockToEdit.stockQty,
            stockTotalCost : this.props.stockToEdit.stockTotalCost
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        let valTotalCost = 0;
        if(name === 'stockCost' && this.state.stockQty !== '')
            valTotalCost = value*this.state.stockQty;
        else if(name === 'stockQty' && this.state.stockCost !== '')
            valTotalCost = value*this.state.stockCost;
        
        this.setState({
            [name] : value,
            stockTotalCost : valTotalCost
        });
    }

    handleEdit(event){
        //event.preventDefault();
    }

    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid">
                    <div className="row border-bottom border-secondary bg-light">
                        <div className="mx-5 px-5">
                            <h1 className="font-weight-normal">Edit Stock</h1>
                        </div>
                    </div>
                    <div className="row text-left">
                        <Card className="p-3 mt-5 col-md-6 offset-3 bg-light">
                            <Form onSubmit={this.handleEdit}>
                                <FormGroup row>
                                    <Label htmlFor="stockItem" md={3}>Stock Item</Label>
                                    <Col md={9}>
                                        <Input type="text" id="stockItem" name="stockItem" placeholder="Enter stock item"
                                        value={this.state.stockItem} valid={this.state.stockItem !== ''} onChange={this.handleInputChange}/>
                                    </Col>
                                </FormGroup>
                                <Row>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="stockCost" md={6} className="px-0">Unit Cost</Label>
                                            <Input type="number" id="stockCost" name="stockCost" placeholder="Enter Unit Cost"
                                            value={this.state.stockCost} valid={this.state.stockCost !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="stockQty" md={6} className="px-0">Quantity</Label>
                                            <Input type="number" id="stockQty" name="stockQty" placeholder="Enter stock count"
                                            value={this.state.stockQty} valid={this.state.stockQty !== ''} onChange={this.handleInputChange} />
                                        </FormGroup>
                                    </Col>
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label htmlFor="stockTotalCost" md={6} className="px-0">Total</Label>
                                            <Input type="number" id="stockTotalCost" name="stockTotalCost" placeholder="Total Cost" readOnly
                                            value={this.state.stockTotalCost} valid={this.state.stockTotalCost !== ''} onChange={this.handleInputChange}/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup row>
                                    <Col md={3}>
                                        <Button type="submit" color="info">Edit Stock</Button>
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

export default INVStockEditStock;