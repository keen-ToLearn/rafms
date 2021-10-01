import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Label, Input, Col, FormGroup, Button, Card } from 'reactstrap';

class AdminLogin extends Component{
    constructor(props){
        super(props);
        this.state = {
            validBtn : true
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(){
        if(this.username.value === this.props.login.uname && this.password.value === this.props.login.pass){
            this.setState({ validBtn : !this.state.validBtn });
        }
    }
    handleLogin(event){
        event.preventDefault();
    }
    render(){
        return(
            <div className="container-fluid h-100">
                <div className="row p-4 h-20 bg-dark">
                    <h1 className="display-1 text-white">Admin Login</h1>
                </div>
                <div className="row h-80">
                    <div className="p-5 h-100 col-10 col-md-6 offset-3">
                        <div className="text-left mt-5">
                            <Card className="p-3 bg-light">
                                <Form onSubmit={() => this.handleLogin()}>
                                    <FormGroup>
                                        <Label htmlFor="username" md={6}>Username</Label>
                                        <Col md={12}>
                                            <Input type="text" id="username"
                                            name="username" onChange={this.handleInputChange}
                                            innerRef={(input) => this.username = input}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="password" md={6}>Password</Label>
                                        <Col md={12}>
                                            <Input type="password" id="password"
                                            name="password" onChange={this.handleInputChange}
                                            innerRef={(input) => this.password = input}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup>
                                        <Col md={10}>
                                            <Link to="/adminmain">
                                                <Button type="submit" value="submit" color="info" disabled={this.state.validBtn}>Login</Button>
                                            </Link>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;