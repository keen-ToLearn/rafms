import React, { Component } from "react";
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from 'reactstrap';
import { Link } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';

const RenderTableBody = ({salesDetails, renderRowList, forPid, salesPostDelete}) => {
    function handleDeletion(sNo){
        salesPostDelete(forPid, sNo, 'DELETE');
    }

    if( salesDetails === '')
        return(
            <></>
        );
    const saleItems = salesDetails.map((saleDetail) => {
        if(renderRowList[saleDetail.sNo-1] === 1){
            return(
                <tr key={saleDetail.sNo}>
                    <td>
                        <span style={{ cursor : 'pointer' }} className="fa fa-times" onClick={() => handleDeletion(saleDetail.sNo)}></span>
                        {' '}
                        <Link className="text-dark" to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}><span className="fa fa-sticky-note"></span></Link>
                        {' '}
                        <Link className="text-dark" to={`/usermain/${forPid}/sales_management/edit_sale/${saleDetail.sNo}`}><span className="fa fa-pencil-square"></span></Link>
                    </td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}>{saleDetail.sNo}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}>{saleDetail.saleOf}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}>{saleDetail.saleDate}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}>{saleDetail.saleQty}</Link></td>
                    <td><Link className="text-dark d-block" style={{textDecoration : 'none'}} to={`/usermain/${forPid}/sales_management/view_sale/${saleDetail.sNo}`}>{saleDetail.saleAmt}</Link></td>
                </tr>
            );
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {saleItems}
        </tbody>
    );
}

class SMSales extends Component{
    constructor(props){
        super(props);
        this.state = {
            thIconList : ['primary', 'dark', 'dark', 'dark', 'dark'],
            sales : this.props.sales.records,
            ascdesc : 'asc',
            renderRowList : new Array(this.props.sales.records.length).fill(1)
        };
        this.filterTrData = this.filterTrData.bind(this);
    }

    toggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'saleOf', 'saleDate', 'saleQty', 'saleAmt'];
        const salesCopy = [...this.state.sales];
        salesCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?-1:1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?1:-1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            sales : salesCopy,
            ascdesc : (this.state.ascdesc === 'asc')?'desc':'asc'
        });
    }

    forceToggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'saleOf', 'saleDate', 'saleQty', 'saleAmt'];
        const salesCopy = [...this.state.sales];
        salesCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return -1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return 1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            sales : salesCopy
        });
    }

    filterTrData(){
        const allSalesCopy = [...this.state.sales];
        const keyList = ['sNo', 'saleOf', 'saleDate', 'saleQty', 'saleAmt'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allSalesCopy.length; i++){
            let tmpBill = allSalesCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpBill[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchSales.value) !== -1){
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
                        <div ref={(ref) => { this.salesOverview = ref }}>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th onClick={() => this.toggleThIcon(0)} style={{cursor : 'pointer'}}>SNo. <span className={`fa fa-sort text-${this.state.thIconList[0]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(1)} style={{cursor : 'pointer'}}>Item <span className={`fa fa-sort text-${this.state.thIconList[1]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(2)} style={{cursor : 'pointer'}}>Date <span className={`fa fa-sort text-${this.state.thIconList[2]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(3)} style={{cursor : 'pointer'}}>Qty <span className={`fa fa-sort text-${this.state.thIconList[3]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(4)} style={{cursor : 'pointer'}}>Amount <span className={`fa fa-sort text-${this.state.thIconList[4]}`}></span></th>
                                    </tr>
                                </thead>
                                <RenderTableBody salesDetails={this.state.sales} renderRowList={this.state.renderRowList}
                                    forPid={this.props.sales.forPid} salesPostDelete={this.props.salesPostDelete}/>
                            </Table>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Link style={{textDecoration : 'none'}} to={`/usermain/${this.props.sales.forPid}/sales_management/add_sale`}>
                                    <Button color="primary" block outline>Add Sale Data</Button>
                                </Link>
                            </div>
                            <div className="row-fluid mt-3">
                                <ReactToPrint content={() => this.salesOverview}>
                                    <PrintContextConsumer>
                                        {
                                            ({ handlePrint }) => (
                                                <Button type="button" color="primary" onClick={handlePrint} block outline>Print Sales List</Button>
                                            )
                                        }
                                    </PrintContextConsumer>
                                </ReactToPrint>
                            </div>
                            <div className="row-fluid mt-3">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="bg-white border-right-0 "><span className="fa fa-search"></span></InputGroupText>
                                    </InputGroupAddon>
                                    <Input className="border-left-0" type="text" id="searchSales"
                                    name="searchSales" placeholder="Search funds" onFocus={() => this.forceToggleThIcon(0)} onChange={this.filterTrData}
                                    innerRef={(input) => this.searchSales = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default SMSales;