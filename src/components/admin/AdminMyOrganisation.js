import React, { Component } from 'react';
import { Button, Card, CardTitle, CardText, CardSubtitle, Modal, ModalHeader, ModalBody,
    Row, Col, ListGroup, ListGroupItem, Table } from 'reactstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

class AdminMyOrganisation extends Component{
    constructor(props){
        super(props);
        this.state = {
            btotal : 0,
            ltotal : 0,
            ftotal : 0,
            isModalOpen : false,
            min : 0,
            max : 0
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount(){
        let btotal = 0;
        let ltotal = 0;
        let ftotal = 0;
        this.props.bills.map((bill) => {
            btotal = btotal + bill.billTotal;
            return true;
        });
        this.props.loans.map((loan) => {
            ltotal = ltotal + loan.loanAmt;
            return true;
        });
        this.props.funds.map((fund) => {
            ftotal = ftotal + fund.fundAmt;
            return true;
        });

        let minC = 0;
        let maxC = 0;
        this.props.employees.map((employee, index) => {
            let paytypeval = (employee.empPayType === 'daily') ? (employee.empPay * 30) : employee.empPay;
            if(index === 0){
                minC = paytypeval;
                maxC = paytypeval;
            }
            else{
                minC = (paytypeval <= minC) ? paytypeval : minC;
                maxC = (paytypeval >= maxC) ? paytypeval : maxC;
            }
            return true;
        });
        this.setState({
            btotal : btotal,
            ltotal : ltotal,
            ftotal : ftotal,
            min : minC,
            max : maxC
        });
    }

    toggleModal(){
        this.setState({ isModalOpen : !this.state.isModalOpen });
    }
    
    render(){
        const clientlist = this.props.projects.map((project) => {
            return(
                <ListGroupItem key={project.pid}>{project.pname}</ListGroupItem>
            );
        });

        const clientinfo = this.props.projects.map((project) => {
            return (
                <>
                    <Col md={4}><CardTitle className="font-weight-normal">{project.pname}</CardTitle></Col>
                    <Col md={8}><CardText>Since {project.pstart}</CardText></Col>
                </>
            );
        });

        const billsinfo = this.props.bills.map((bill) => {
            return(
                <tr>
                    <td>{bill.sNo}</td>
                    <td>{bill.billTo}</td>
                    <td>{bill.billDate}</td>
                    <td>{bill.billClient}</td>
                    <td>{bill.billTotal}</td>
                </tr>
            );
        });

        const loansinfo = this.props.loans.map((loan) => {
            return(
                <tr>
                    <td>{loan.sNo}</td>
                    <td>{loan.loanSrc}</td>
                    <td>{loan.loanDate}</td>
                    <td>{loan.loanAmt}</td>
                    <td>{loan.loanPeriod}</td>
                    <td>{loan.loanRate}</td>
                </tr>
            );
        });

        const fundsinfo = this.props.funds.map((fund) => {
            return(
                <tr>
                    <td>{fund.sNo}</td>
                    <td>{fund.fundFrom}</td>
                    <td>{fund.fundDate}</td>
                    <td>{fund.fundAmt}</td>
                </tr>
            );
        });

        return(
            <div className="row">
                <div className="container-fluid text-left p-5">
                    <div className="row mx-5 mb-4">
                        <h2 className="d-inline mr-auto">Summary</h2>
                        <Button color="primary" className="float-right my-2" onClick={this.toggleModal}>
                            Generate | Print Summary
                        </Button>
                    </div>
                    <div className="row mx-5">
                        {/*
                            Company staff strength, range of pay from /hr
                            Company total sales quantity and amount /sales
                        */}
                        <Card className="col-12 p-4 bg-light">
                            <Row>
                                <Col md={12}>
                                    <CardTitle className="border-bottom border-primary">
                                        <h1 className="font-weight-light">Palamahen Infra</h1>
                                    </CardTitle>
                                </Col>
                                <Col md={12}>
                                    <CardSubtitle className="text-right">
                                        Boost infrastructural development with the best minds in the industry and cutting edge technology
                                    </CardSubtitle>
                                </Col>
                            </Row>
                            <Row className="pt-5">
                                <Col md={2}><CardTitle className="font-weight-normal">Inception:</CardTitle></Col>
                                <Col><CardText>1/2/2015</CardText></Col>
                            </Row>
                            <hr/>
                            <Row className="pt-3">
                                <Col md={12}>
                                    <CardTitle>
                                        <h3 className="font-weight-light">Company Clients</h3>
                                    </CardTitle>
                                </Col>
                                <Col md={12} className="mt-3">
                                    <ListGroup className="col-4">
                                        {clientlist}
                                    </ListGroup>
                                </Col>
                            </Row>
                            <hr/>
                            <Row className="pt-3">
                                <Col md={12}>
                                    <CardTitle>
                                        <h3 className="font-weight-light">Company Manpower</h3>
                                    </CardTitle>
                                </Col>
                            </Row>
                            <Row className="pt-3">
                                <Col md={2}><CardTitle className="font-weight-normal">Staff Strength:</CardTitle></Col>
                                <Col md={2}><CardText>{this.props.employees.length}</CardText></Col>
                            </Row>
                            <Row className="pt-3">
                                <Col md={2}><CardTitle className="font-weight-normal">Range of Pay:</CardTitle></Col>
                                <Col md={2}><CardText>{this.state.min} - {this.state.max}</CardText></Col>
                            </Row>
                            <hr/>
                            <Row className="pt-3">
                                <Col md={12}>
                                    <CardTitle>
                                        <h3 className="font-weight-light">Company Finances</h3>
                                    </CardTitle>
                                </Col>
                            </Row>
                            <Row className="pt-3">
                                <Col md={2}><CardTitle className="font-weight-normal">Total Expenditure:</CardTitle></Col>
                                <Col md={2}><CardText>{this.state.btotal}</CardText></Col>
                            </Row>
                            <Row className="pt-3">
                                <Col md={12}><CardTitle className="font-weight-normal">Total Assets:</CardTitle></Col>
                                <Col md={2}><CardTitle className="font-weight-normal">Loans:</CardTitle></Col>
                                <Col md={2}><CardText>{this.state.ltotal}</CardText></Col>
                                <Col md={2}><CardTitle className="font-weight-normal">Funds:</CardTitle></Col>
                                <Col md={2}><CardText>{this.state.ftotal}</CardText></Col>
                            </Row>
                            <hr/>
                            <Row className="pt-3">
                                <Col md={12}>
                                    <CardTitle>
                                        <h3 className="font-weight-light">Company Sales</h3>
                                    </CardTitle>
                                </Col>
                            </Row>
                        </Card>
                    </div>

                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} size="lg">
                        <ModalHeader toggle={this.toggleModal}>Summary</ModalHeader>
                        <ModalHeader className="py-0">
                            <ReactToPrint content={() => this.orgsummary}>
                                <PrintContextConsumer>
                                    {
                                        ({ handlePrint }) => (
                                            <Button type="button" className="my-2" onClick={handlePrint}>Print</Button>
                                        )
                                    }
                                </PrintContextConsumer>
                            </ReactToPrint>
                        </ModalHeader>
                        <ModalBody>
                            <div className="p-2" ref={(ref) => { this.orgsummary = ref }}>
                                <Row>
                                    <Col md={12}>
                                        <CardTitle className="border-bottom border-primary">
                                            <h1 className="font-weight-light">Palamahen Infra</h1>
                                        </CardTitle>
                                    </Col>
                                    <Col md={2}><CardTitle className="font-weight-normal">Inception:</CardTitle></Col>
                                    <Col><CardText>1/2/2015</CardText></Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col md={12} className="mb-2">
                                        <CardTitle>
                                            <h3 className="font-weight-light">Company Clients</h3>
                                        </CardTitle>
                                    </Col>
                                    {clientinfo}
                                    {/* Include total sales in quantity and amount
                                        Include data of all sales - 3 cols: what, qty, amt */}
                                </Row>
                                <hr/>
                                <Row className="mb-2">
                                    <Col md={12}>
                                        <CardTitle>
                                            <h3 className="font-weight-light">Company Finances</h3>
                                        </CardTitle>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}><CardTitle className="font-weight-normal">Bills</CardTitle></Col>
                                    <Col md={6} className="text-right"><CardTitle className="font-weight-normal">Total Expenditure:</CardTitle></Col>
                                    <Col md={2}><CardText>{this.state.btotal}</CardText></Col>
                                    <Col md={12}>
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th>Sno.</th>
                                                    <th>Biller</th>
                                                    <th>Date</th>
                                                    <th>Client</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {billsinfo}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}><CardTitle className="font-weight-normal">Loans</CardTitle></Col>
                                    <Col md={6} className="text-right"><CardTitle className="font-weight-normal">Total Loans:</CardTitle></Col>
                                    <Col md={2}><CardText>{this.state.ltotal}</CardText></Col>
                                    <Col md={12}>
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th>Sno.</th>
                                                    <th>Lender</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Period</th>
                                                    <th>Rate</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loansinfo}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row className="mb-2">
                                    <Col md={4}><CardTitle className="font-weight-normal">Funds</CardTitle></Col>
                                    <Col md={6} className="text-right"><CardTitle className="font-weight-normal">Total Funds:</CardTitle></Col>
                                    <Col md={2}><CardText>{this.state.ltotal}</CardText></Col>
                                    <Col md={12}>
                                        <Table borderless>
                                            <thead>
                                                <tr>
                                                    <th>Sno.</th>
                                                    <th>Funded By</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {fundsinfo}
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                            </div>
                        </ModalBody>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default AdminMyOrganisation;