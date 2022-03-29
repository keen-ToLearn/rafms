import React, { Component } from 'react';
import { Button, Table } from 'reactstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class AdminViewProject extends Component{
    constructor(props){
        super(props);
        this.state = {
            saleTotal : 0
        };
    }

    componentDidMount(){
        let sTotal = 0;
        this.props.sales.records.map((sale) => { sTotal = sTotal + sale.saleAmt; return true; });
        this.setState({ saleTotal : sTotal });
    }

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
                            <tr>
                                <th scope="row">Contact No.</th>
                                <td>{this.props.selectedProject.pContact}</td>
                            </tr>
                            <h5 className="ml-2 mt-4">Address</h5>
                            <tr>
                                <th scope="row">Area</th>
                                <td>{this.props.selectedProject.pAddress.area}</td>
                            </tr>
                            <tr>
                                <th scope="row">Locality</th>
                                <td>{this.props.selectedProject.pAddress.locality}</td>
                            </tr>
                            <tr>
                                <th scope="row">Village / City</th>
                                <td>{this.props.selectedProject.pAddress.vilcity}</td>
                            </tr>
                            <tr>
                                <th scope="row">Pin Code</th>
                                <td>{this.props.selectedProject.pAddress.pinCode}</td>
                            </tr>
                            {
                                this.props.sales.records.length <= 0 ? '' :
                                <>
                                    <h5 className="ml-2 mt-4">Sales</h5>
                                    <tr>
                                        <th scope="row">No. of Sales Made</th>
                                        <td>{this.props.sales.records.length}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Total Sales</th>
                                        <td>{this.state.saleTotal}</td>
                                    </tr>
                                </>
                            }
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminViewProject;