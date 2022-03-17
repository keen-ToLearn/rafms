import React, { Component } from 'react';
import { Button, Card, CardText, CardTitle, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

class HRViewLeave extends Component{
    constructor(props){
        super(props);
        this.state = {
            openForm : false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    toggleOpenForm(){
        this.setState({ openForm : !this.state.openForm });
    }
    handleSubmit(event){
        event.preventDefault();
        this.toggleOpenForm();
    }
    render(){
        const leavesList = this.props.leaves.map((leave) => {
            return(
                <Card className="p-2 px-3 mb-3">
                    <Row>
                        <Col md={3}><CardTitle >{leave.leaveDate}</CardTitle></Col>
                        <Col md={9}><CardText>{leave.leaveFor}</CardText></Col>
                    </Row>
                </Card>
            );
        });
        return(
            <>
                <Row>
                    <Col md={12}>
                        <div className="container-fluid px-5">
                            <div className="row-fluid text-left mb-3">
                                <Button type="button" color="primary" onClick={() => this.toggleOpenForm()}>Add Leave Info</Button>
                            </div>
                            { this.state.openForm &&
                                <div className="row-fluid text-left mb-3">
                                    <Form onSubmit={this.handleSubmit}>
                                        <FormGroup row>
                                            <Label htmlFor="leaveDate" md={3}>Leave Date</Label>
                                            <Col md={9}>
                                                <Input type="text" id="leaveDate" name="leaveDate" placeholder="Enter leave date"
                                                innerRef={(ref) => this.leaveDate = ref}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label htmlFor="leaveFor" md={3}>Leave Reason</Label>
                                            <Col md={9}>
                                                <Input type="text" id="leaveFor" name="leaveFor" maxLength="50" placeholder="Enter leave reason"
                                                innerRef={(ref) => this.leaveFor = ref}/>
                                            </Col>
                                        </FormGroup>
                                        <FormGroup className="text-right">
                                            <Button type="submit" color="info">Submit Leave</Button>
                                        </FormGroup>
                                    </Form>
                                </div>
                            }
                            <div className="row-fluid px-0 col-md-10 text-left">
                                {leavesList}
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default HRViewLeave;