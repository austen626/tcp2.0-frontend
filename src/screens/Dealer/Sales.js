import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import queryString from 'query-string';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { setApplianceFlag } from 'utils/helper';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import Footer from '../../components/Dealer/Footer';
import { IconDashboardPending, IconStatusConfirmed, IconDashboardFunded, IconDashboardCanceled, IconDashboardDeclined, IconArrowLeft, IconSortInActive, IconSortActive, IconSearchInActive, IconSearchActive, IconFilterActive, IconFilterInActive, IconTrash, IconDashboardIncomplete } from '../../assets/images';
import { getSalesList, getAppDetailById, changeApplicationStatus } from '../../redux/actions/sales';
import Loader from 'shared/Loader';
import { salesType } from './constant';
import { TrashContainer } from './style';
class SalesScreen extends Component {

    sidebarRef = React.createRef();

    state = {
        sortClicked: false,
        searchClicked: true,
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
        const status = this.props.match.params.status;
        const { location } = this.props;
        const paramsQuery = queryString.parse(location.search);
        this.props.getSalesList(status, paramsQuery.salesId);
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

    handleSortClick = () => {
        this.setState({ sidebarOpen: "sort" });
    }

    handleFilterClick = () => {
        this.setState({ sidebarOpen: "filter" });
    }

    handleSearchClick = () => {
        // this.setState({ searchClicked: !this.state.searchClicked });
        this.setState({ searchClicked: true})
    }

    handleAppDetails = (appId) => {
        this.props.getAppDetailById(appId);
        this.props.history.push(`/application-details/${appId}`);
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
        const { sidebarOpen, sortBy, filterPerson, filterCategory } = this.state;

        // const names = this.props.apps.map(app => app.name);
        const salesPersonEmail = this.props.apps.map(app => app.salesperson_email);
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
                    {/* <Form.Control
                        as="select"
                        value={filterStatus}
                        onChange={(e) => this.setState({ filterStatus: e.target.value })}
                    >
                        <option value="all">Status</option>
                        <option value="approved">Approved</option>
                        <option value="waiting">Waiting</option>
                    </Form.Control> */}

                    <Form.Control
                        as="select"
                        value={filterPerson}
                        onChange={(e) => {
                            this.setState({ filterPerson: e.target.value })
                            this.setState({
                                filterClicked: true,
                            })   
                        }}
                    >
                        <option key="all" value="all">Salesperson Name</option>
                        { salesPersonEmail.filter((name, index) => salesPersonEmail.indexOf(name) === index).map(name => (
                            <option key={name} value={name}>{name}</option>
                        )) }
                    </Form.Control>

                    <Form.Control
                        as="select"
                        value={filterCategory}
                        onChange={(e) => {
                            this.setState({ filterCategory: e.target.value })
                            this.setState({
                                filterClicked: true,
                            })  
                        } }
                    >
                        <option value="all">Category</option>
                        <option value="food">FOOD</option>
                        <option value="fsp">FSP</option>
                        <option value="app">APP</option>
                    </Form.Control>

                    {/* <Form.Label>Value range</Form.Label>

                    <div className="value-range">
                        <Form.Control placeholder="$600" />
                        <Form.Label>-</Form.Label>
                        <Form.Control placeholder="$3990" />
                    </div> */}
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
                            <Button onClick={this.handleSideBarApply}>CLOSE</Button>
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

    deleteSales = (deleteId, id) => {
        this.setState({
            deleteId: id,
            backModal: true
        })
    }

    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        const { deleteId } = this.state;
        this.setState({ backModal: false });
        const { changeApplicationStatus, getSalesList, location } = this.props;
        
        const paramsQuery = queryString.parse(location.search);
        const pageStatus = this.props.match.params.status;
        changeApplicationStatus({
            deleteDivId: deleteId,
            getSalesList: getSalesList,
            pageStatus: pageStatus,
            id: deleteId,
            status: 'deleted',
            email: paramsQuery.salesId && paramsQuery.salesId
        })
    }

    render() {
        const { sortClicked, searchClicked, filterClicked, searchVal } = this.state;
        const { salesData, match } = this.props;
        let apps = this.props.apps;
        if (searchClicked && searchVal !== '') {
            apps = apps.filter(app => app.name.toLowerCase().includes(searchVal.toLowerCase())) 
        }
        if (filterClicked) {
            const { filterStatus, filterPerson, filterCategory } = this.state;
            if (filterStatus !== "all") {
                apps = apps.filter(app => app.status.toLowerCase() === filterStatus);
            }
            if (filterPerson !== "all") {
                apps = apps.filter(app => app.salesperson_email === filterPerson);
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
                apps = apps.sort((a, b) => moment(new Date(b.updated_at)).format("X") - moment(new Date(a.updated_at)).format("X"))
            }
            else if (sortBy === "date-old") {
                apps = apps.sort((a, b) => moment(new Date(a.updated_at)).format("X") - moment(new Date(b.updated_at)).format("X"))
            }
        }

        // apps = apps.filter(a => a.hello_sign && a.hello_sign.length > 0 && a.hello_sign[0].status_code === "signed");

        // if(this.props.match.params.status === "waiting") 
        // {
        //     apps = apps.filter(a => a.status === 'waiting');
        // } 
        // else if(this.props.match.params.status === "declined") 
        // {
        //     apps = apps.filter(a => a.status === 'declined');
        // } 
        // else if(this.props.match.params.status === "approved") 
        // {
        //     apps = apps.filter(a => a.status === 'approved');
        // } 
        // else if(this.props.match.params.status === "funded") 
        // {
        //     apps = apps.filter(a => a.status === 'funded');
        // } 
        // else if(this.props.match.params.status === "canceled") 
        // {
        //     apps = apps.filter(a => a.status === 'canceled');
        // }

        return (
            <div className="dealer">
                { salesData.getListLoading && <Loader /> }
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
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                        <img src={sortClicked ? IconSortActive : IconSortInActive} onClick={this.handleSortClick} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>SALES</span>
                    </HeaderCenter>
                    <HeaderRight>
                        <img src={searchClicked ? IconSearchActive : IconSearchInActive} onClick={this.handleSearchClick} alt=""/>
                        <img src={filterClicked ? IconFilterActive : IconFilterInActive} onClick={this.handleFilterClick} alt=""/>
                    </HeaderRight>
                </Header>
                <div className="sales-main">
                        <div className="sales-list-search">
                            <Form.Control
                                placeholder="Search"
                                value={this.state.searchVal}
                                onChange={(e) => this.setState({ searchVal: e.target.value })}
                            />
                        </div>
                   
                    <div className="sales-list">

                        { apps.map((app, index) => {
                            return (
                            <div key={index} id={`sales${app.id}`}  className={`request-row ${index%2 === 0 && "dark"}`}>
                                <Row>
                                    <Col xs={6} md={5} className="data" onClick={() => {app.status !== 'waiting1' && this.handleAppDetails(app.id)}}>
                                        <div className="title">{ app.name }{
                                            app.co_customer && 
                                            app.co_name &&
                                            <span>{` and ${app.co_name}`}</span>}</div>
                                        {/* <div className="sub-title">Product Name</div>
                                        <div className="sub-title">Employee Name</div> */}
                                    </Col>
                                    <Col xs={4} md={4} className="data text-left" onClick={() => {app.status !== 'waiting1' && this.handleAppDetails(app.id)}}>
                                        {
                                            app.status === "approved" && <div className="date-title">TIER-{app.rating || 0 }</div>
                                        }
                                        
                                        { app.products.map(product => (
                                            <div key={product.id} className="date">{ setApplianceFlag((product.type).toLowerCase())}: ${product.balance}</div>
                                        )) }
                                        <div className="date">{ moment(app.created_at, 'YYYY/MM/DD').format('MM/DD/YYYY')}</div>
                                    </Col>
                                   
                                    <Col xs={2} md={3} className="data text-center d-flex">
                                        { app.status === "pending" && <img src={IconDashboardPending} width="39" height="39" style={{borderRadius: "50%"}} alt=""/> }
                                        { app.status === "waiting" && <img src={IconDashboardIncomplete} width="39" height="39" style={{borderRadius: "50%"}} alt=""/> }
                                        { app.status === "approved" && <img src={IconStatusConfirmed} width="39" height="39" style={{borderRadius: "50%"}} alt="" /> }
                                        { app.status === "declined" && <img src={IconDashboardDeclined} width="39" height="39" style={{borderRadius: "50%"}} alt=""/> }
                                        { app.status === "cancelled" && <img src={IconDashboardCanceled} width="39" height="39" style={{borderRadius: "50%"}} alt=""/> }
                                        { app.status === "funded" && <img src={IconDashboardFunded} width="39" height="39" style={{borderRadius: "50%"}} alt=""/> }
                                        
                                            <TrashContainer onClick={() => this.deleteSales(`sales${app.id}`, app.id)}>
                                                <img src={IconTrash} alt="" />
                                            </TrashContainer>
                                        
                                    </Col>
                                </Row>
                            </div>
                        )})}
                         {
                            !salesData.getListLoading && apps && apps.length === 0 &&
                            <div className="request-row dark">
                                <Row className="d-flex justify-content-center align-items-center">
                                    <div>There are no { salesType[match.params.status] || 'List'} Items in the Queue</div>
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
    apps: state.sales.apps,
    salesData: state.sales
});

export default connect(
    mapStateToProps,
    {
        getSalesList,
        getAppDetailById,
        changeApplicationStatus
    }
)(SalesScreen);