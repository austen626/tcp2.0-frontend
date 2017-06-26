import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { setApplianceFlag, capitalize } from 'utils/helper';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import Footer from '../../components/Dealer/Footer';
import { changeCustomer, addProduct, changeProduct } from '../../redux/actions/customer';
import { IconPreapprovalWaiting, IconPreapprovalDeclined, IconSortInActive, IconSortActive, IconSearchInActive, IconSearchActive, IconFilterActive, IconFilterInActive, IconArrowLeft, IconTrash } from '../../assets/images';
import { getAppDetailById, changeApplicationStatus } from '../../redux/actions/sales';
import { getPreApprovalCustomers } from '../../redux/actions/customers';
import Loader from 'shared/Loader';
import IconRefresh from 'assets/images/icons8-refresh.svg';
import { TrashContainer } from './style';
import ListPreapprovalType from './listPreapprovalType';
class DealerPreApprovals extends Component {

    sidebarRef = React.createRef();

    state = {
        sortClicked: false,
        searchClicked: false,
        filterClicked: false,

        sidebarOpen: "",

        sortBy: "date-new",
        filterStatus: "all",
        filterPerson: "all",
        filterCategory: "all",

        searchVal: "",
        deleteId: '',
        backModal: false
    }

    componentDidMount() {
        this.props.getPreApprovalCustomers();
        // document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        // document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // handleClickOutside = (event) => {
    //     if (this.sidebarRef && this.sidebarRef.current && !this.sidebarRef.current.contains(event.target)) {
    //         this.setState({ sidebarOpen: "" });
    //     }
    // }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleGenerateOrderClick = (customer, id) => {
        const { product_type } = customer.preapproval;
        const { changeProduct } = this.props;
        const co_enabled = customer.co_customer.id ? true : false;
        this.props.changeCustomer({
            order_type: 2,
            co_enabled: co_enabled,
            type: 'preorder',
            preapproval_id: id,
            existing_customer_id: customer.cif_number,
            main_app: {
                name: customer.name,
                email: customer.email,
                dobY: customer.dobY,
                dobM: customer.dobM,
                dobD: customer.dobD,
                ssn: customer.ssn,
                dl: customer.dl,
                nod: customer.nod,
                cell_phone: customer.cell_phone,
                home_phone: customer.home_phone,
                street: customer.street,
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
                yt1: customer.yt1,
                own_or_rent: customer.own_or_rent,
                present_employer: customer.present_employer,
                yt2: customer.yt2,
                job_title: customer.job_title,
                employer_phone: customer.employer_phone,
                monthly_income: customer.monthly_income,
                additional_income: customer.additional_income,
                source: customer.source,
                landlord_holder: customer.landlord_holder,
                monthly_rent_payment: customer.monthly_rent_payment
            },
            co_app: {
                name: co_enabled ? customer.co_customer.name : "",
                email: co_enabled ? customer.co_customer.email : "",
                dobY: co_enabled ? customer.co_customer.dobY : "",
                dobM: co_enabled ? customer.co_customer.dobM : "",
                dobD: co_enabled ? customer.co_customer.dobD : "",
                ssn: co_enabled ? customer.co_customer.ssn : "",
                dl: co_enabled ? customer.co_customer.dl : "",
                nod: co_enabled ? customer.co_customer.nod : "",
                cell_phone: co_enabled ? customer.co_customer.cell_phone : "",
                home_phone: co_enabled ? customer.co_customer.home_phone : "",
                street: co_enabled ? customer.co_customer.street : "",
                city: co_enabled ? customer.co_customer.city : "",
                state: co_enabled ? customer.co_customer.state : "",
                zip: co_enabled ? customer.co_customer.zip : "",
                yt1: co_enabled ? customer.co_customer.yt1 : "",
                own_or_rent: co_enabled ? customer.co_customer.own_or_rent : "",
                present_employer: co_enabled ? customer.co_customer.present_employer : "",
                yt2: co_enabled ? customer.co_customer.yt2 : "",
                job_title: co_enabled ? customer.co_customer.job_title : "",
                employer_phone: co_enabled ? customer.co_customer.employer_phone : "",
                monthly_income: co_enabled ? customer.co_customer.monthly_income : "",
                additional_income: co_enabled ? customer.co_customer.additional_income : "",
                source: co_enabled ? customer.co_customer.source : "",
                landlord_holder: co_enabled ? customer.co_customer.landlord_holder : "",
                monthly_rent_payment: co_enabled ? customer.co_customer.monthly_rent_payment : ""
            },
        });
        this.props.addProduct();
        changeProduct(0, { product_type: (product_type.replace(/ +/g, "") === 'appliance' || product_type.replace(/ +/g, "") === 'food,appliance') ? 'FSP' : 'FOOD' })
        this.props.history.push('/product/0');
    }


    handleSortClick = () => {
        this.setState({ sidebarOpen: "sort" });
    }

    handleFilterClick = () => {
        this.setState({ sidebarOpen: "filter" });
    }

    handleSearchClick = () => {
        this.setState({ searchClicked: !this.state.searchClicked });
    }

    handleSearchRowClick = (cifno, type) => {
        this.props.history.push(`/customer/${cifno}/${type || 'food'}`);
    }

    handleSideBarApply = () => {
        const { sidebarOpen } = this.state;
        if (sidebarOpen === "sort") {
            this.setState({ sidebarOpen: "", sortClicked: true });
        } else if (sidebarOpen === "search") {
            this.setState({ sidebarOpen: "", searchClicked: true });
        } else if (sidebarOpen === "filter") {
            this.setState({ sidebarOpen: "", filterClicked: true });
        }
    }

    handleSideBarClear = () => {
        const { sidebarOpen } = this.state;
        if (sidebarOpen === "sort") {
            this.setState({ sidebarOpen: "", sortClicked: false, sortBy: "date-new" });
        } else if (sidebarOpen === "search") {
            this.setState({ sidebarOpen: "", searchClicked: false });
        } else if (sidebarOpen === "filter") {
            this.setState({ sidebarOpen: "", filterClicked: false, filterStatus: "all", filterPerson: "all", filterCategory: "all" });
        }
    }

    renderSideBarOptions = () => {
        const { sidebarOpen, sortBy, filterStatus, filterPerson } = this.state;

        const names = this.props.apps.map(app => app.name);

        if (sidebarOpen === "sort") {
            return (
                <Form.Control
                    as="select"
                    value={sortBy}
                    onChange={(e) => {
                        this.setState({ sortBy: e.target.value })
                        this.setState({
                            sortClicked: true,
                        })  
                    } }
                >
                    <option value="date-new">Date: newest</option>
                    <option value="date-old">Date: oldest</option>
                    <option value="name-ascending">Name: A-Z</option>
                    <option value="date-descending">Name: Z-A</option>
                </Form.Control>
            )   
        }

        if (sidebarOpen === "filter") {
            return (
                <>
                    <Form.Control
                        as="select"
                        value={filterStatus}
                        onChange={(e) => {
                            this.setState({
                                filterClicked: true,
                            })    
                            this.setState({ filterStatus: e.target.value })
                        } }
                    >
                        <option value="all">Status</option>
                        <option value="1">Approved</option>
                        <option value="2">Declined</option>
                        <option value="0">Waiting</option>
                    </Form.Control>

                    <Form.Control
                        as="select"
                        value={filterPerson}
                        onChange={(e) => {
                            this.setState({ filterPerson: e.target.value })
                            this.setState({
                                filterClicked: true,
                            })
                        } }
                    >
                        <option key="all" value="all">Customer Name</option>
                        { names.filter((name, index) => names.indexOf(name) === index).map(name => (
                            <option key={name} value={name}>{name}</option>
                        )) }
                    </Form.Control>
                </>
            )
        }

    }

    renderSideBar = () => {
        const { sidebarOpen } = this.state;

        if (sidebarOpen === "") {
            return null;
        }

        return (
            <div ref={this.sidebarRef}>
                <div  className="sidebar">
                    { this.renderSideBarOptions() }
                </div>
                <Footer>
                    <Row>
                        <Col xs={6}>
                            <Button onClick={this.handleSideBarApply}>Close</Button>
                        </Col>
                        <Col xs={6}>
                            <Button onClick={this.handleSideBarClear}>CLEAR</Button>
                        </Col>
                    </Row>
                </Footer>
            </div>
        )
    }

    handleAppClick = (appId) => {
        this.props.getAppDetailById(appId);
        this.props.history.push(`/app-details/${appId}`);
    }

    deletePreApprovals = (preApprovalItemId) => {
        this.setState({
            deleteId: preApprovalItemId,
            backModal: true
        })
       

    }

    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        const { changeApplicationStatus, getPreApprovalCustomers } = this.props;
        const pageStatus = this.props.match.params.status;
        const { deleteId } = this.state;
        this.setState({ backModal: false });
        changeApplicationStatus({
            getPreApprovalCustomers: getPreApprovalCustomers,
            pageStatus: pageStatus,
            id: deleteId,
            type: 'pre-approval',
        })
    }

    render() {
        const { sortClicked, searchClicked, filterClicked, searchVal } = this.state;
        const { customersData } = this.props;
        let apps = this.props.apps;

        if (searchClicked && searchVal !== '') {
            apps = apps.filter(app => app.name.toLowerCase().includes(searchVal.toLowerCase())) 
        }
        if (filterClicked) {
            const { filterStatus, filterPerson, filterCategory } = this.state;
            if (filterStatus !== "all") {
                apps = apps.filter(app => app.preapproval.status.toString() === filterStatus);
            }
            if (filterPerson !== "all") {
                apps = apps.filter(app => app.name === filterPerson);
            }
            if (filterCategory !== "all") {
                apps = apps.filter(app => app.products.find(product => product.type.toLowerCase() === filterCategory.toLowerCase()) !== undefined)
            }
        }
        
        if (sortClicked) {
            const { sortBy } = this.state;
            if (sortBy === "name-ascending") {
                apps = apps.sort((a, b) => a.name > b.name ? 1 : -1)
            }
            else if (sortBy === "date-descending") {
                apps = apps.sort((a, b) => a.name < b.name ? 1 : -1)
            }
            else if (sortBy === "date-new") {
                apps = apps.sort((a, b) => moment(new Date(b.preapproval.updated_at)).format("X") - moment(new Date(a.preapproval.updated_at)).format("X"))
            }
            else if (sortBy === "date-old") {
                apps = apps.sort((a, b) => moment(new Date(a.preapproval.updated_at)).format("X") - moment(new Date(b.preapproval.updated_at)).format("X"))
            }
        }  

        return (
            <div className="dealer">
                { customersData.loading && <Loader /> }
                <Modal show={this.state.backModal} onHide={this.handleBackModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this item from the system? You will not be able to access this record again.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleBackModalClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleBackModalYes}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt="" />
                        <img src={sortClicked ? IconSortActive : IconSortInActive} onClick={this.handleSortClick} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>PREAPPROVAL REQUEST</span>
                    </HeaderCenter>
                    <HeaderRight>
                        <img src={searchClicked ? IconSearchActive : IconSearchInActive} onClick={this.handleSearchClick} alt=""/>
                        <img src={filterClicked ? IconFilterActive : IconFilterInActive} onClick={this.handleFilterClick} alt=""/>
                    </HeaderRight>
                </Header>
                <div className="preapproval-main">
                    { searchClicked && (
                        <div className="dealer-list-search">
                            <Form.Control
                                placeholder="Search"
                                value={this.state.searchVal}
                                onChange={(e) => this.setState({ searchVal: e.target.value })}
                            />
                        </div>
                    ) }
                    <div className="dealer-list">
                        { apps?.map((app, index) => {
                            let createdAt = "";
                            if(app.preapproval && app.preapproval.created_at) {
                                createdAt = moment(app.preapproval.created_at, 'YYYY/MM/DD').format('MM/DD/YYYY');
                            }
                            let updatedAt = "";
                            if(app.preapproval && app.preapproval.updated_at) {
                                updatedAt = moment(app.preapproval.updated_at, 'YYYY/MM/DD').format('MM/DD/YYYY');
                            }
                            let earliestDate = "";
                            if(app.preapproval && app.preapproval.earliest_delivery_date) {
                                earliestDate = moment(app.preapproval.earliest_delivery_date, 'YYYY/MM/DD').format('MM/DD/YYYY');
                            }
                            const preapprovalRequestMSG = 
                            (app.preapproval && 
                            app.preapproval && 
                            app.preapproval.message);
                            const messageSplit = preapprovalRequestMSG && preapprovalRequestMSG.split('#');
                            return(
                                <div className={`request-row ${index%2 === 0 && "dark"}`} key={ index }>
                                    <Row>
                                        <Col xs={6} md={4} className="data" onClick={() => {this.handleSearchRowClick(app.id, app.preapproval.product_type)}}>
                                            <div className="title">{ app.name }{
                                            app.co_customer && 
                                            app.co_customer.name &&
                                            <span>{` and ${app.co_customer.name}`}</span>}</div>
                                            <div className="sub-title">{ app.street } { app.city } <br/> { app.zip } { app.state }</div>
                                        </Col>
                                        <Col xs={3} md={4} className="data text-center" onClick={() => {this.handleSearchRowClick(app.id, app.preapproval.product_type)}}>
                                            {
                                                app.preapproval.status !== 0 &&
                                                <ListPreapprovalType 
                                                    item={ app.preapproval.product_type } 
                                                    messageSplit={ messageSplit }
                                                    status={ app.preapproval.status } />
                                            }
                                            {
                                                app.preapproval.status === 1 && setApplianceFlag(app.preapproval.product_type) !== 'Food' &&
                                                <div className="date"> 
                                                    { capitalize(app.preapproval.appliance) } 
                                                </div>
                                            }
                                            {
                                                earliestDate ? 
                                                (<div className="date">
                                                    Earliest delivery date: { earliestDate || "" }
                                                </div>) : ( <><div className="date">Request: { createdAt }</div>
                                                {
                                                   updatedAt !== "" &&  <div className="date">Last Update: { updatedAt || "" }</div>
                                                } </>
                                                )
                                            }
                                           
                                            
                                            {/* <div className="date">Product: { setApplianceFlag(app.preapproval.product_type)}</div>                                         */}
                                        </Col>
                                        <Col xs={3} md={4} className="data text-center d-flex justify-content-center">
                                            {
                                                app.preapproval.pre_approvals_request_id === 1 ? <img width="33" src={IconRefresh} alt=""/> : app.preapproval.status === 0 ? 
                                                <img src={IconPreapprovalWaiting} alt=""/> : app.preapproval.status === 2 ? 
                                                <div className="">
                                                    <img src={IconPreapprovalDeclined} alt=""/>
                                                </div> : 
                                                <Button className="green-primary-btn" onClick={() => {this.handleGenerateOrderClick(app, app.preapproval.id)}}> GENERATE ORDER </Button> }
                                                <TrashContainer onClick={() => this.deletePreApprovals(app.preapproval.id)} width="33px" imageHeight="21px">
                                                    <img src={IconTrash} alt="" />
                                                </TrashContainer>
                                        </Col>
                                    </Row>
                                </div>
                                )
                            }
                        )}
                        {
                            !customersData.loading && apps && apps.length === 0 &&
                            <div className="request-row dark">
                                <Row className="d-flex justify-content-center align-items-center">
                                    <div>No List Found</div>
                                </Row>
                            </div>
                        }
                    </div>
                </div>

                { this.renderSideBar() }              
            </div>
        )
    }
}

const mapStateToProps = state => ({
    apps: state.customers.preAprrovalCustomer,
    customersData: state.customers,
});

export default connect(
    mapStateToProps,
    {
        getPreApprovalCustomers,
        getAppDetailById,
        changeCustomer,
        addProduct,
        changeProduct,
        changeApplicationStatus
    }
)(DealerPreApprovals);