import React, { Component } from "react";
import { Button, Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from "reactstrap";
import { Link } from "react-router-dom";
import ReactToPrint, { PrintContextConsumer } from "react-to-print";

const RenderTableBody = ({inventory, renderRowList}) => {
    if( inventory === '')
        return(
            <></>
        );
    const inventoryItems = inventory.map((inventoryItem) => {
        if(renderRowList[inventoryItem.sNo-1] === 1){
            return(
                <tr key={inventoryItem.sNo}>
                    <td>
                        <Link className="text-dark" to={`/usermain/inventory/edit_inventory/${inventoryItem.sNo}`}><span className="fa fa-pencil-square"></span></Link>
                    </td>
                    <td>{inventoryItem.sNo}</td>
                    <td>{inventoryItem.inventoryName}</td>
                    <td>{inventoryItem.inventoryBuyDate}</td>
                    <td>{inventoryItem.inventoryCost}</td>
                    <td>{inventoryItem.inventoryQty}</td>
                    <td>{inventoryItem.inventoryMaintenanceDate}</td>
                </tr>
            );
        }
        return(
            <></>
        );
    });
    return(
        <tbody>
            {inventoryItems}
        </tbody>
    );
}

class INVInventory extends Component{
    constructor(props){
        super(props);
        this.state = {
            thIconList : ['primary', 'dark', 'dark', 'dark', 'dark', 'dark'],
            inventory : this.props.inventory,
            ascdesc : 'asc',
            renderRowList : new Array(this.props.inventory.length).fill(1)
        };
        this.filterTrData = this.filterTrData.bind(this);
    }

    toggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'inventoryName', 'inventoryBuyDate', 'inventoryCost', 'inventoryQty', 'inventoryMaintenanceDate'];
        const inventoryCopy = [...this.state.inventory];
        inventoryCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?-1:1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return (this.state.ascdesc === 'asc')?1:-1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            inventory : inventoryCopy,
            ascdesc : (this.state.ascdesc === 'asc')?'desc':'asc'
        });
    }

    forceToggleThIcon(index){
        const thIconListCopy = [...this.state.thIconList];
        for(let i=0; i<thIconListCopy.length; i++){
            thIconListCopy[i]=(index === i)?'primary':'dark';
        }
        const mapperList = ['sNo', 'inventoryName', 'inventoryBuyDate', 'inventoryCost', 'inventoryQty', 'inventoryMaintenanceDate'];
        const inventoryCopy = [...this.state.inventory];
        inventoryCopy.sort((x,y) => {
            if(x[mapperList[index]] < y[mapperList[index]])
                return -1;
            else if(x[mapperList[index]] > y[mapperList[index]])
                return 1;
            return 0;
        });
        this.setState({
            thIconList : thIconListCopy,
            inventory : inventoryCopy
        });
    }

    filterTrData(){
        const allInventoryCopy = [...this.state.inventory];
        const keyList = ['sNo', 'inventoryName', 'inventoryBuyDate', 'inventoryCost', 'inventoryQty', 'inventoryMaintenanceDate'];
        const renderRowListCopy = [...this.state.renderRowList];
        for(let i=0; i<allInventoryCopy.length; i++){
            let tmpInventory = allInventoryCopy[i];
            for(let j=0; j<keyList.length; j++){
                let tmpdata = tmpInventory[keyList[j]];
                tmpdata = (typeof tmpdata === 'number')?tmpdata.toString().toLowerCase():tmpdata.toLowerCase();
                if(tmpdata.indexOf(this.searchInventory.value) !== -1){
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
                        <div ref={(ref) => { this.inventoryOverview = ref }}>
                            <Table hover>
                                <thead>
                                    <tr>
                                        <th>Action</th>
                                        <th onClick={() => this.toggleThIcon(0)} style={{cursor : 'pointer'}}>SNo. <span className={`fa fa-sort text-${this.state.thIconList[0]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(1)} style={{cursor : 'pointer'}}>Inventory <span className={`fa fa-sort text-${this.state.thIconList[1]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(2)} style={{cursor : 'pointer'}}>Buy Date <span className={`fa fa-sort text-${this.state.thIconList[2]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(3)} style={{cursor : 'pointer'}}>Unit Cost <span className={`fa fa-sort text-${this.state.thIconList[3]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(4)} style={{cursor : 'pointer'}}>Qty <span className={`fa fa-sort text-${this.state.thIconList[4]}`}></span></th>
                                        <th onClick={() => this.toggleThIcon(5)} style={{cursor : 'pointer'}}>Maintenance Date <span className={`fa fa-sort text-${this.state.thIconList[5]}`}></span></th>
                                    </tr>
                                </thead>
                                <RenderTableBody inventory={this.state.inventory} renderRowList={this.state.renderRowList}/>
                            </Table>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="container-fluid">
                            <div className="row-fluid">
                                <Link style={{textDecoration : 'none'}} to={`/usermain/inventory/add_inventory`}>
                                    <Button color="primary" block outline>Add Inventory</Button>
                                </Link>
                            </div>
                            <div className="row-fluid mt-3">
                                <ReactToPrint content={() => this.inventoryOverview}>
                                    <PrintContextConsumer>
                                        {
                                            ({ handlePrint }) => (
                                                <Button type="button" color="primary" onClick={handlePrint} block outline>Print Inventory</Button>
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
                                    <Input className="border-left-0" type="text" id="searchInventory"
                                    name="searchInventory" placeholder="Search inventory" onFocus={() => this.forceToggleThIcon(0)} onChange={this.filterTrData}
                                    innerRef={(input) => this.searchInventory = input}/>
                                </InputGroup>
                            </div>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}

export default INVInventory;