import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, CardBody, CardText, Col, Form, FormGroup, Input, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

class UserTodo extends Component{
    constructor(props){
        super(props);
        this.state = {
            isModalOpen : false
        };
        this.offset = '';
        this.toggleModal = this.toggleModal.bind(this);
        this.handleCreation = this.handleCreation.bind(this);
    }

    toggleModal(){
        this.setState({ isModalOpen : !this.state.isModalOpen });
    }

    handleDeletion(index){
        this.props.usersAddDeleteTask(this.props.uid, index, 'DELETE');
        this.props.history.replace('/usermain/todo');
    }

    handleCreation(){
        this.props.usersAddDeleteTask(this.props.uid, this.newtask.value, 'POST');
        this.toggleModal();
    }
    
    render(){
        const taskslist = this.props.todoList.map((task, index) => {
            if(index % 2 === 0){
                if(index % 4 === 0)
                    this.offset = 'offset-1';
                else
                    this.offset = '';
            }
            else
                this.offset = 'offset-1';
            return(
                <Card key={index} className={`col-12 col-md-5 mb-4 ${this.offset} bg-info text-white`}>
                    <CardBody>
                        <Row>
                            <Col md={10}>
                                <CardText>{task}</CardText>
                            </Col>
                            <Col md={2}>
                                <span className="fa fa-trash fa-2x" style={{ cursor : 'pointer' }} onClick={() => this.handleDeletion(index)}></span>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            );
        });

        return(
            <div className="container-fluid">
                <div className="row justify-content-center border-bottom border-secondary bg-light">
                    <h1 className="font-weight-normal text-primary" style={{ cursor : 'pointer' }} onClick={this.toggleModal}>Add Task</h1>
                </div>
                { this.props.addingdeletingtask ? <div><span className="fa fa-circle-o-notch fa-spin fa-3x"></span></div> :
                    <div className="row justify-content-center pt-5">
                        <div className="col-12 col-md-8 text-left">
                            <Card className="p-3">
                                <div className="container">
                                    <div className="row">
                                        {taskslist}
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                }
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Add New Task</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleCreation}>
                            <FormGroup>
                                <Input type="textarea" rows={8} name="newtask" id="newtask" placeholder="Enter task"
                                innerRef={(input) => this.newtask = input}/>
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">Add Task</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default withRouter(UserTodo);