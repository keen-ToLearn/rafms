import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class SMSalesViewSales extends Component{
    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid h-100 p-5" ref={(ref) => { this.viewSale = ref }}>
                    <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                        <h1 className="mr-auto">Sale {this.props.saleToView.sNo}</h1>
                        <Link to={`/usermain/${this.props.forPid}/sales_management/edit_sale/${this.props.saleToView.sNo}`}>
                            <Button type="button" color="primary" className="float-right mr-3 my-2">Edit</Button>
                        </Link>
                        <ReactToPrint content={() => this.viewSale}>
                            <PrintContextConsumer>
                                {
                                    ({ handlePrint }) => (
                                        <Button type="button" color="primary" className="float-right mr-3 my-2" onClick={handlePrint}>Print</Button>
                                    )
                                }
                            </PrintContextConsumer>
                        </ReactToPrint>
                    </div>
                    <div className="row col-10 mx-5 mt-5 px-0 text-left">
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Sale Item</th>
                                    <td>{this.props.saleToView.saleOf}</td>
                                    <th scope="row">Date</th>
                                    <td>{this.props.saleToView.saleDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan={4}>Details</th>
                                </tr>
                                <tr>
                                    <th scope="row">Quantity</th>
                                    <th scope="row" colSpan={3}>Amount</th>
                                </tr>
                                <tr>
                                    <td>{this.props.saleToView.saleQty}</td>
                                    <td colSpan={3}>{this.props.saleToView.saleAmt}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default SMSalesViewSales;