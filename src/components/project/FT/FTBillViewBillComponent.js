import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

const RenderBillRecords = ({billRecords}) => {
    const recordList = billRecords.map((billRecord) => {
        return(
            <tr>
                <td>{billRecord.itemQty}</td>
                <td>{billRecord.itemDesc}</td>
                <td>{billRecord.itemUnitCost}</td>
                <td>{billRecord.itemTotal}</td>
            </tr>
        );
    });
    return(
        <>
            {recordList}
        </>
    );
}

class FTBillViewBill extends Component{
    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid h-100 p-5">
                    <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                        <h1 className="mr-auto">{this.props.billToView.billTo}</h1>
                        <Link to={`/usermain/${this.props.forPid}/finance_transaction/edit_bill/${this.props.billToView.sNo}`}>
                            <Button type="button" color="primary" className="float-right mr-3 my-2">Edit</Button>
                        </Link>
                    </div>
                    <div className="row col-10 mx-5 mt-5 px-0 text-left">
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{this.props.billToView.billName}</td>
                                    <th scope="row">Date</th>
                                    <td>{this.props.billToView.billDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Total</th>
                                    <td colSpan="3">{this.props.billToView.billTotal}</td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan="4">Details</th>
                                </tr>
                                <tr>
                                    <th scope="row">Qty</th>
                                    <th scope="row">Product</th>
                                    <th scope="row">Unit Cost</th>
                                    <th scope="row">Product Total</th>
                                </tr>
                                <RenderBillRecords billRecords={this.props.billToView.billRecords}/>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default FTBillViewBill;