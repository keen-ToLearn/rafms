import React, { Component } from "react";
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";

const RenderTableBody = ({fundDetails, renderRowList, forPid}) => {
    if( fundDetails === '')
        return(
            <></>
        );
    const fundItems = fundDetails.map((fundDetail) => {
        if(renderRowList[fundDetail.sNo-1] === 1){
            return(
                <tr key={fundDetail.sNo}>
                    <td>
                        <Link className="text-dark" to={`/usermain/${forPid}/finance_transaction/view_fund/${fundDetail.sNo}`}><span className="fa fa-sticky-note"></span></Link>
                        {' '}
                        <Link className="text-dark" to={`/usermain/${forPid}/finance_transaction/edit_fund/${fundDetail.sNo}`}><span className="fa fa-pencil-square"></span></Link>
                    </td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/finance_transaction/view_fund/${fundDetail.sNo}`}>{fundDetail.sNo}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/finance_transaction/view_fund/${fundDetail.sNo}`}>{fundDetail.fundFrom}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/finance_transaction/view_fund/${fundDetail.sNo}`}>{fundDetail.fundDate}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/finance_transaction/view_fund/${fundDetail.sNo}`}>{fundDetail.fundAmt}</Link></td>
                </tr>
            );
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {fundItems}
        </tbody>
    );
}

class FTFund extends Component{
    constructor(props){
        super(props);
        this.state = {
            thIconList : ['primary', 'dark', 'dark', 'dark'],
            fundList : this.props.fundList,
            ascdesc : 'asc',
            renderRowList : new Array(this.props.fundList.length).fill(1)
        };
        this.filterTrData = this.filterTrData.bind(this);
    }

    toggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'fundFrom', 'fundDate', 'fundAmt'];
        const fundListCopy = [...this.state.fundList];
        fundListCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?-1:1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?1:-1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            fundList : fundListCopy,
            ascdesc : (this.state.ascdesc === 'asc')?'desc':'asc'
        });
    }

    forceToggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'billTo', 'billDate', 'billTotal'];
        const fundListCopy = [...this.state.fundList];
        fundListCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return -1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return 1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            fundList : fundListCopy
        });
    }
    
    filterTrData(){
        const allFundsCopy = [...this.state.fundList];
        const keyList = ['sNo', 'fundFrom', 'fundDate', 'fundAmt'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allFundsCopy.length; i++){
            let tmpBill = allFundsCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpBill[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchfunds.value) !== -1){
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
                                    <th onClick={() => this.toggleThIcon(1)} style={{cursor : 'pointer'}}>Funded By <span className={`fa fa-sort text-${this.state.thIconList[1]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(2)} style={{cursor : 'pointer'}}>Date <span className={`fa fa-sort text-${this.state.thIconList[2]}`}></span></th>
                                    <th onClick={() => this.toggleThIcon(3)} style={{cursor : 'pointer'}}>Amount <span className={`fa fa-sort text-${this.state.thIconList[3]}`}></span></th>
                                </tr>
                            </thead>
                            <RenderTableBody fundDetails={this.state.fundList} renderRowList={this.state.renderRowList} forPid={this.props.forPid}/>
                        </Table>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Link style={{textDecoration : 'none'}} to={`/usermain/${this.props.forPid}/finance_transaction/add_fund`}>
                                    <Button color="primary" block outline>Add Fund</Button>
                                </Link>
                            </div>
                            <div className="row-fluid mt-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchfunds"
                                    name="searchfunds" placeholder="Search funds" onFocus={() => this.forceToggleThIcon(0)} onChange={this.filterTrData}
                                    innerRef={(input) => this.searchfunds = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default FTFund;