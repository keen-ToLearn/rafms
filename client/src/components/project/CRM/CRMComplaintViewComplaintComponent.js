import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class CRMComplaintViewComplaint extends Component{
    markResolved(){
        const updateComplaint = {
            sNo : this.props.complaintToView.sNo,
            cDate : this.props.complaintToView.cDate,
            cDesc : this.props.complaintToView.cDesc,
            cStatus : 'Resolved'
        };
        this.props.complaintsPostDelete(this.props.id, updateComplaint, 'PUT');
        this.props.history.push(`/usermain/${this.props.forPid}/crm`);
    }

    render(){
        return(
            <div className="container-fluid h-100 p-5" ref={(ref) => { this.viewComplaint = ref }}>
                <div className="row col-10 mx-5 px-0 border-bottom border-primary">
                    <h1 className="mr-auto">Complaint {this.props.complaintToView.sNo}</h1>
                    <Button type="button" color="primary" className="float-right mr-3 my-2" onClick={() => this.markResolved()}>Mark Resolved</Button>
                    <ReactToPrint content={() => this.viewComplaint}>
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
                                <th scope="row">Complaint Date</th>
                                <td>{this.props.complaintToView.cDate}</td>
                            </tr>
                            <tr>
                                <th scope="row">Complaint</th>
                                <td>{this.props.complaintToView.cDesc}</td>
                            </tr>
                            <tr>
                                <th scope="row">Status</th>
                                <td>{this.props.complaintToView.cStatus}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default withRouter(CRMComplaintViewComplaint);