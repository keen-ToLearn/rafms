import React, { Component } from "react";
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";

const RenderTableBody = ({loanDetails, renderRowList}) => {
    if( loanDetails === '')
        return(
            <></>
        );
    const loanItems = loanDetails.map((loanDetail) => {
        if(renderRowList[loanDetail.sNo-1] === 1){
            return(
                <tr key={loanDetail.sNo}>
                    <td>
                        <Link className="text-dark" to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}><span className="fa fa-sticky-note"></span></Link>
                        {' '}
                        <Link className="text-dark" to={`/usermain/finance_transaction/edit_loan/${loanDetail.sNo}`}><span className="fa fa-pencil-square"></span></Link>
                    </td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.sNo}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.loanSrc}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.loanDate}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.loanAmt}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.loanPeriod}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/view_loan/${loanDetail.sNo}`}>{loanDetail.loanRate}</Link></td>
                </tr>
            );
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {loanItems}
        </tbody>
    );
}

class FTLoan extends Component{
    constructor(props){
        super(props);
        this.state = {
            thIconList : ['primary', 'dark', 'dark', 'dark', 'dark', 'dark'],
            loanList : this.props.loanList,
            ascdesc : 'asc',
            renderRowList : new Array(this.props.loanList.length).fill(1)
        };
        this.filterTrData = this.filterTrData.bind(this);
    }

    toggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'loanSrc', 'loanDate', 'loanAmt', 'loanPeriod', 'loanRate'];
        const loanListCopy = [...this.state.loanList];
        loanListCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?-1:1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?1:-1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            loanList : loanListCopy,
            ascdesc : (this.state.ascdesc === 'asc')?'desc':'asc'
        });
    }

    forceToggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'loanSrc', 'loanDate', 'loanAmt', 'loanPeriod', 'loanRate'];
        const loanListCopy = [...this.state.loanList];
        loanListCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return -1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return 1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            loanList : loanListCopy
        });
    }

    filterTrData(){
        const allLoansCopy = [...this.state.loanList];
        const keyList = ['sNo', 'loanSrc', 'loanDate', 'loanAmt', 'loanPeriod', 'loanRate'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allLoansCopy.length; i++){
            let tmpBill = allLoansCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpBill[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchloans.value) !== -1){
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

    render(){
        return(
            <>
                <Row className="m-0">
                    <Col md={9}>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>Action</th>
                                    <th onClick={() => this.toggleThIcon(0)} style={{cursor : 'pointer'}}>SNo. <span className={`fa fa-sort text-${this.state.thIconList[0]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(1)} style={{cursor : 'pointer'}}>Lender <span className={`fa fa-sort text-${this.state.thIconList[1]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(2)} style={{cursor : 'pointer'}}>Date <span className={`fa fa-sort text-${this.state.thIconList[2]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(3)} style={{cursor : 'pointer'}}>Amount <span className={`fa fa-sort text-${this.state.thIconList[3]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(4)} style={{cursor : 'pointer'}}>Period <span className={`fa fa-sort text-${this.state.thIconList[4]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(5)} style={{cursor : 'pointer'}}>Rate <span className={`fa fa-sort text-${this.state.thIconList[5]}`}></span></th>
                                </tr>
                            </thead>
                            <RenderTableBody loanDetails={this.state.loanList} renderRowList={this.state.renderRowList}/>
                        </Table>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Link style={{textDecoration : 'none'}} to={`/usermain/finance_transaction/add_loan`}>
                                    <Button color="primary" block outline>Add Loan</Button>
                                </Link>
                            </div>
                            <div className="row-fluid mt-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchloans"
                                    name="searchloans" placeholder="Search loans" onFocus={() => this.forceToggleThIcon(0)} onChange={this.filterTrData}
                                    innerRef={(input) => this.searchloans = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default FTLoan;