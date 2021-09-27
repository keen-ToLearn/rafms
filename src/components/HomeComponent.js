import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div className="container-fluid h-100 bg-dark">
                <div className="row h-50 bg-primary">
                    <div className="p-5 h-100 col-12">
                        <div className="p-5 mt-5">
                            <h1 className="display-1">RAFMS</h1>
                        </div>
                    </div>
                </div>
                <div className="row h-50 bg-primary">
                    <div className="p-5 h-50 col-12">
                        <Link to="/adminlogin">
                            <Button color="success" size="lg">Admin</Button>{' '}
                        </Link>
                        <Link to="/userlogin">
                            <Button color="success" size="lg">User</Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;