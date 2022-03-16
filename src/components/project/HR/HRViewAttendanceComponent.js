import React, { Component } from 'react';
import { Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from "reactstrap";

class HRViewAttendance extends Component{
    constructor(props){
        super(props);
        this.state = {
            attendance : this.props.attendance,
            renderRowList : new Array(this.props.attendance.length).fill(1),
        };
        this.filterTrData = this.filterTrData.bind(this);
    }

    filterTrData(){
        const attendanceCopy = [...this.state.attendance];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<attendanceCopy.length; i++){
            let tmpdata = attendanceCopy[i].toLowerCase();
            if(tmpdata.indexOf(this.searchAttendance.value) !== -1)
                renderRowListCopy[i] = 1;
            else
                renderRowListCopy[i] = 0;
        }
        this.setState({ renderRowList : renderRowListCopy });
    }

    handleDeletion(){
    }

    render(){
        const attendanceList = this.state.attendance.map((attendanceItem, index) => {
            if(this.state.renderRowList[index] === 1){
                return(
                    <tr>
                        <td><span style={{ cursor : 'pointer' }} className="fa fa-times" onClick={() => this.handleDeletion()}></span></td>
                        <td>{attendanceItem}</td>
                    </tr>
                );
            }
            return(
                <></>
            );
        });
        return(
            <>
                <Row className="m-0">
                    <Col md={12}>
                        <div className="container-fluid mb-3">
                            <div className="row-fluid col-4 offset-4">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchAttendance"
                                    name="searchAttendance" placeholder="Search attendance" onChange={this.filterTrData}
                                    innerRef={(input) => this.searchAttendance = input}/>
                                </InputGroup>
                            </div>
                        </div>
                        <div className="col-10 offset-1">
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th>Present On</th>
                                    </tr>
                                </thead>
                                {attendanceList}
                            </Table>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default HRViewAttendance;