import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

class FTFundViewFund extends Component{
    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid h-100 p-5">
                    <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                        <h1 className="mr-auto">{this.props.fundToView.fundFrom}</h1>
                        <Link to={`/usermain/finance_transaction/edit_fund/${this.props.fundToView.sNo}`}>
                            <Button type="button" color="primary" className="float-right mr-3 my-2">Edit</Button>
                        </Link>
                    </div>
                    <div className="row col-10 mx-5 mt-5 px-0 text-left">
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Date</th>
                                    <td>{this.props.fundToView.fundDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Amount</th>
                                    <td>{this.props.fundToView.fundAmt}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default FTFundViewFund;