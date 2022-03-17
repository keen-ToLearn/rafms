import React, { Component } from 'react';
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table,
    Modal, ModalHeader, ModalBody, Form, FormGroup, Label } from "reactstrap";
import { Link } from "react-router-dom";

const RenderTableBody = ({complaints, renderRowList, forPid, showResolved}) => {
    function handleDeletion(){
    }
    if( complaints === '')
        return(
            <></>
        );
    const complaintList = complaints.map((complaint) => {
        if(renderRowList[complaint.sNo-1] === 1){
            if((showResolved === 'Show') || (showResolved === 'Hide' && complaint.cStatus === 'Pending')){
                return(
                    <tr key={complaint.sNo}>
                        <td>
                            <span style={{ cursor : 'pointer' }} className="fa fa-times" onClick={() => handleDeletion()}></span>
                            {' '}
                            <Link className="text-dark" to={`/usermain/${forPid}/view_complaint/${complaint.sNo}`}><span className="fa fa-sticky-note"></span></Link>
                        </td>
                        <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/crm/view_complaint/${complaint.sNo}`}>{complaint.sNo}</Link></td>
                        <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/crm/view_complaint/${complaint.sNo}`}>{complaint.cDate}</Link></td>
                        <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/crm/view_complaint/${complaint.sNo}`}>{complaint.cDesc.slice(0, 10)}...</Link></td>
                        <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/crm/view_complaint/${complaint.sNo}`}>{complaint.cStatus}</Link></td>
                    </tr>
                );
            }
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {complaintList}
        </tbody>
    );
}

class CRMComplaint extends Component{
    constructor(props){
        super(props);
        this.state = {
            complaints : this.props.complaints.issues,
            renderRowList : new Array(this.props.complaints.issues.length).fill(1),
            showResolved : 'Hide',
            isModalOpen : false,
            cDate : '',
            cDesc : ''
        };
        this.filterTrData = this.filterTrData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({ [name] : value });
    }

    handleSubmit(event){
        event.preventDefault();
    }

    filterTrData(){
        const allComplaintsCopy = [...this.state.complaints];
        const keyList = ['sNo', 'cDate', 'cDesc', 'cStatus'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allComplaintsCopy.length; i++){
            let tmpcomplaints = allComplaintsCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpcomplaints[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchComplaints.value) !== -1){
                    renderRowListCopy[i] = 1;
                    break;
                }
                else{
                    renderRowListCopy[i] = 0;
                }
            }
        }
        this.setState({ renderRowList : renderRowListCopy });
    }

    toggleShowHide(){
        let showhide = (this.state.showResolved === 'Show') ? 'Hide' : 'Show';
        this.setState({ showResolved : showhide });
    }

    toggleModal(){
        this.setState({ isModalOpen : !this.state.isModalOpen });
    }

    render(){        
        return(
            <>
                <Row className="m-0">
                    <Col md={9}>
                        <div>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>SNo.</th>
                                        <th>Date</th>
                                        <th>Complaint</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <RenderTableBody complaints={this.state.complaints} renderRowList={this.state.renderRowList}
                                    forPid={this.props.complaints.forPid} showResolved={this.state.showResolved}/>
                            </Table>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Button color="primary" onClick={this.toggleModal} block outline>Add Complaint</Button>
                            </div>
                            <div className="row-fluid mt-3">
                                <Button color="primary" onClick={() => this.toggleShowHide()} block outline>
                                    {this.state.showResolved === 'Hide' ? 'Show' : 'Hide'} Resolved
                                </Button>
                            </div>
                            <div className="row-fluid mt-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchComplaints"
                                    name="searchComplaints" placeholder="Search complaints" onChange={this.filterTrData}
                                    innerRef={(input) => this.searchComplaints = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add Complaint</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="cDate" md={6}>Date</Label>
                                <Col md={12}>
                                    <Input type="text" id="cDate" name="cDate" placeholder="Enter complaint date"
                                    value={this.state.cDate} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="cDesc" md={6}>Complaint</Label>
                                <Col md={12}>
                                    <Input type="text" id="cDesc" name="cDesc" placeholder="Enter complaint"
                                    value={this.state.cDesc} onChange={this.handleInputChange}/>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Col md={12}>
                                    <Button type="submit" color="info">Add Complaint</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default CRMComplaint;