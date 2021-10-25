import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

class FTLoanViewLoan extends Component{
    render(){
        return(
            <div className="col-11 p-0">
                <div className="container-fluid h-100 p-5">
                    <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                        <h1 className="mr-auto">{this.props.loanToView.loanSrc}</h1>
                        <Link to={`/usermain/${this.props.forPid}/finance_transaction/edit_loan/${this.props.loanToView.sNo}`}>
                            <Button type="button" color="primary" className="float-right mr-3 my-2">Edit</Button>
                        </Link>
                    </div>
                    <div className="row col-10 mx-5 mt-5 px-0 text-left">
                        <Table borderless>
                            <tbody>
                                <tr>
                                    <th scope="row">Loan For</th>
                                    <td>{this.props.loanToView.loanFor}</td>
                                    <th scope="row">Date</th>
                                    <td>{this.props.loanToView.loanDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row" colSpan="4">Details</th>
                                </tr>
                                <tr>
                                    <th scope="row">Amount</th>
                                    <th scope="row">Period</th>
                                    <th scope="row" colSpan="2">Rate</th>
                                </tr>
                                <tr>
                                    <td>{this.props.loanToView.loanAmt}</td>
                                    <td>{this.props.loanToView.loanPeriod}</td>
                                    <td colSpan="2">{this.props.loanToView.loanRate}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default FTLoanViewLoan;