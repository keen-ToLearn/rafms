import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class AdminViewProject extends Component{
    render(){
        return(
            <div className="row">
                {/* A table, client name, client basic details, sales management related details, client complaint info
                    other details like client basic details, sales and complaints from files in /crm dir
                */}
                <div className="container-fluid mx-5 px-5 mt-5" ref={(ref) => { this.clientView = ref }}>
                    <div className="row col-10 border-bottom border-primary">
                        <h1 className="mr-auto">{this.props.selectedProject.pname}</h1>
                        <ReactToPrint content={() => this.clientView}>
                            <PrintContextConsumer>
                                {
                                    ({ handlePrint }) => (
                                        <Button type="button" color="primary" className="float-right my-2 mr-3" onClick={handlePrint}>Print</Button>
                                    )
                                }
                            </PrintContextConsumer>
                        </ReactToPrint>
                    </div>
                    <div className="row col-10 px-0 mt-5 text-left">
                        <Table borderless>
                            <tr>
                                <th scope="row">Start Date</th>
                                <td>{this.props.selectedProject.pstart}</td>
                            </tr>
                            <tr>
                                <th scope="row">Nature of Alliance</th>
                                <td>{this.props.selectedProject.pdesc}</td>
                            </tr>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminViewProject;