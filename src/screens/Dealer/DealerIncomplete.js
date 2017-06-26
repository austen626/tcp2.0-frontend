import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { setApplianceFlag } from 'utils/helper';
import Footer from '../../components/Dealer/Footer';
import { IconArrowLeft, IconSortInActive, IconSortActive, IconSearchInActive, IconSearchActive, IconFilterActive, IconFilterInActive, IconDelete, IconFixIssueAwesomeSendRed } from '../../assets/images';
import { 
    getSalesList,
    getAppDetailById,
    changeApplicationStatus,
    reminderIncompleteRequest
} from '../../redux/actions/sales';
import Loader from 'shared/Loader';
import { ReminderButton } from './style';
import ReminderImg from "assets/images/reminder.svg";
class DealerIncomplete extends Component {

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
        this.props.getSalesList('incomplete');
        // document.addEventListener("mousedown", this.handleClickOutside);
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
        this.setState({ searchClicked: !this.state.searchClicked });
    }

    handleSearchRowClick = (cifno) => {
        this.props.history.push(`/customer/${cifno}`);
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
                        onChange={(e) => {
                                this.setState({ filterStatus: e.target.value })
                                this.setState({
                                    filterClicked: true,
                                })   
                            }
                        }
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

    deleteList = (appId) => {
        this.setState({
            deleteId: appId,
            backModal: true
        })       
    }

    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        const { changeApplicationStatus, getSalesList } = this.props;
        const { deleteId } = this.state;
        this.setState({ backModal: false });
        changeApplicationStatus({
            getSalesList: getSalesList,
            pageStatus: 'incomplete',
            id: deleteId,
            status: 'deleted',
            page: 'incomplete'
        })
    }

    setReminderAction = (item, id) => {
        const { reminderIncompleteRequest } = this.props;
        reminderIncompleteRequest({
            id: id,
            email: item.signer_email,
        })
    }

    render() {
        const { sortClicked, searchClicked, filterClicked, searchVal } = this.state;
        let apps = this.props.apps;
        const { sales } = this.props;
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

        
        // apps = apps.filter(a => (a.hello_sign && a.hello_sign.length > 0 && (a.hello_sign[0].status_code === "declined" || a.hello_sign[0].status_code === "error_unknown" || a.hello_sign[0].status_code === "error_file" || a.hello_sign[0].status_code === "error_component_position" || a.hello_sign[0].status_code === "error_text_tag" || a.hello_sign[0].last_viewed_at === null || a.hello_sign[0].status_code === "awaiting_signature")));
        

        const IconAwesomePaperPlane = <svg xmlns="http://www.w3.org/2000/svg" width="17.982" height="18.273" viewBox="0 0 17.982 18.273">
                                        <path d="M8.956 6.775v2.43c.931.211 1.759.557 2.626.8V7.567c-.928-.207-1.763-.553-2.626-.792zm7.969-4.389a10.42 10.42 0 0 1-4.175 1.138c-1.909 0-3.49-1.242-5.9-1.242a6.938 6.938 0 0 0-2.427.428 2 2 0 1 0-3.008.924v13.779a.854.854 0 0 0 .856.856h.571a.854.854 0 0 0 .856-.856v-3.369a9.95 9.95 0 0 1 4.082-.789c1.913 0 3.49 1.242 5.9 1.242a7.457 7.457 0 0 0 4.371-1.46 1.138 1.138 0 0 0 .492-.942V3.421a1.14 1.14 0 0 0-1.619-1.035zm-10.6 9.228a11.242 11.242 0 0 0-2.626.592V9.691a10.209 10.209 0 0 1 2.63-.621zm10.506-4.8a11.383 11.383 0 0 1-2.626.853V10.2a6.633 6.633 0 0 0 2.626-.928v2.516a5.766 5.766 0 0 1-2.626.967V10.2a6.036 6.036 0 0 1-2.626-.2v2.41a20.821 20.821 0 0 0-2.626-.76V9.205a7.932 7.932 0 0 0-2.624-.135v-2.5a12.593 12.593 0 0 0-2.629.748V4.8a10.219 10.219 0 0 1 2.626-.785v2.557a6.07 6.07 0 0 1 2.626.2V4.37a20.315 20.315 0 0 0 2.626.76v2.441a6.8 6.8 0 0 0 2.626.1V5.1a12.626 12.626 0 0 0 2.626-.8z" transform="translate(-.563 .003)"/>
                                    </svg>


        const IconEnvelopeOpen = <svg xmlns="http://www.w3.org/2000/svg" width="17.266" height="17.266" viewBox="0 0 17.266 17.266">
                                    <path d="M8.633 0L0 4.316v12.95h17.266V4.316zm0 2.439l6.475 3.237v4.058l-6.475 3.237-6.475-3.237V5.676zM4.316 6.5v2.155l4.316 2.158 4.316-2.158V6.5z"/>
                                </svg>


        const IconAwesomePenFancy = <svg xmlns="http://www.w3.org/2000/svg" width="17.266" height="17.266" viewBox="0 0 17.266 17.266">
                                        <g>
                                            <path d="M2.67 9.541a1.079 1.079 0 0 0-.683.683L0 16.187l.158.158 3.132-3.132a1.038 1.038 0 0 1-.053-.263 1.079 1.079 0 1 1 1.079 1.079 1.038 1.038 0 0 1-.263-.053L.921 17.108l.158.158 5.963-1.988a1.079 1.079 0 0 0 .683-.683l1.115-2.834-3.335-3.335zM12.452.955L6.277 7.682l3.3 3.3L16.3 4.807c2.868-2.531-1.336-6.693-3.848-3.852z"/>
                                        </g>
                                    </svg>


        const IconSend = <svg xmlns="http://www.w3.org/2000/svg" width="18.494" height="18.499" viewBox="0 0 18.494 18.499">
                            <path d="M17.2.115L.452 9.774a.868.868 0 0 0 .079 1.561l3.84 1.611L14.75 3.8a.217.217 0 0 1 .311.3l-8.7 10.6v2.908a.867.867 0 0 0 1.535.571l2.294-2.792 4.5 1.886a.869.869 0 0 0 1.192-.657l2.6-15.606A.867.867 0 0 0 17.2.115z" transform="translate(-.001 .002)"/>
                        </svg>


        const IconEnvelopeClosed = <svg xmlns="http://www.w3.org/2000/svg" width="17.331" height="12.998" viewBox="0 0 17.331 12.998">
                                        <path d="M0 0v2.166L8.665 6.5l8.665-4.333V0zm0 4.333V13h17.331V4.333L8.665 8.665z"/>
                                    </svg>


        const IconAwesomePenFancyRight = <svg xmlns="http://www.w3.org/2000/svg" width="17.875" height="19.445" viewBox="0 0 17.875 19.445">
                                            <g>
                                                <path d="M2.527 9.029a1.021 1.021 0 0 0-.646.646L0 15.318l.15.15L3.114 12.5a.982.982 0 0 1-.05-.249 1.021 1.021 0 1 1 1.021 1.021.982.982 0 0 1-.249-.05L.872 16.19l.149.149 5.643-1.881a1.021 1.021 0 0 0 .646-.646l1.055-2.682L5.21 7.974zM11.784.9L5.94 7.27l3.123 3.123 6.366-5.844c2.71-2.395-1.268-6.334-3.645-3.649z" transform="translate(1.5) rotate(-90 8.188 8.151)"/>
                                                <path stroke="#c8e0ed" stroke-linecap="round" stroke-width="3px" d="M0 0h14.769" transform="translate(1.5) translate(0 17.945)"/>
                                            </g>
                                        </svg>
        return (
            <div className="dealer">
                {
                    (sales.getListLoading || sales.isReminderLoading) && <Loader />
                }
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
                        <span>WAITING FOR CUSTOMER SIGNATURE </span>
                    </HeaderCenter>
                    <HeaderRight>
                        <img src={searchClicked ? IconSearchActive : IconSearchInActive} onClick={this.handleSearchClick} alt=""/>
                        <img src={filterClicked ? IconFilterActive : IconFilterInActive} onClick={this.handleFilterClick} alt=""/>
                    </HeaderRight>
                </Header>
                <div className="preapproval-main">
                    <div className="dealer-list-search">
                        <Form.Control
                            placeholder="Search"
                            value={this.state.searchVal}
                            onChange={(e) => this.setState({ searchVal: e.target.value })}
                        />
                    </div>
                    {/* { searchClicked ? (
                        <div className="dealer-list-search">
                            <Form.Control
                                placeholder="Search"
                                value={this.state.searchVal}
                                onChange={(e) => this.setState({ searchVal: e.target.value })}
                            />
                        </div>
                    ) : (
                        <div className="dealer-list-search">
                            <Form.Control
                                as="select"
                                value={this.state.filterCategory}
                                onChange={(e) => this.setState({ filterCategory: e.target.value })}
                            >
                                <option value="all">Choose an associated sales-rep</option>
                                <option value="food">FOOD</option>
                                <option value="fsp">FSP</option>
                                <option value="app">APP</option>
                            </Form.Control>
                        </div>
                    )} */}
                    <div className="dealer-list">
                        { apps?.map((app, index) => {
                            if(app.products.length > 0) {
                                return (
                                <div className={`request-row ${index%2 === 0 && "dark"}`} key={ index }>
                                `<Row>
                                    <Col xs={8} className="data incomplete-customer">
                                        <div className="title">{ app.name }{
                                            app.co_customer && 
                                            app.co_name &&
                                            <span>{` and ${app.co_name}`}</span>}</div>
                                            <div className="sub-title">{ app.street } { app.city } <br/> { app.zip } { app.state } <br />
                                            {
                                                app.products && 
                                                app.products.map((item, index) => {
                                                return <>
                                                        <span>
                                                            { setApplianceFlag((item.type).toLowerCase()) }: ${ item.balance}
                                                        </span>
                                                        {
                                                            app.products.length !== (index + 1) && <br/>
                                                        }
                                                    </>
                                                })
                                            }
                                            {/* {app.products && app.products[0] && setApplianceFlag((app.products[0].type).toLowerCase())} */}
                                        </div>
                                    </Col>
                                    <Col xs={4} className="data text-center incomplete-customer-action d-flex justify-content-end  align-items-center">

                                        <div>
                                            <div className="d-flex">
                                            {
                                                Array.isArray(app.hello_sign) && app.hello_sign.length === 0 ? 
                                                <Button className="active" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                    <img src={ IconFixIssueAwesomeSendRed } alt="" />
                                                </Button>
                                                :
                                                app.hello_sign &&
                                                app.hello_sign[0] &&
                                                (app.hello_sign[0].last_viewed_at !== null && app.hello_sign[0].status_code !== "delivery_in_queue" && (app.hello_sign[0].status_code === "declined" || app.hello_sign[0].status_code === "error" || app.hello_sign[0].status_code === "not_delivered")) ? (
                                                <Button className="active-mark" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                    {IconSend}
                                                </Button>
                                            ) : (
                                                <Button className="active" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                    {IconAwesomePaperPlane}
                                                </Button>
                                            )}


                                            {
                                                app.hello_sign && 
                                                app.hello_sign[0] && 
                                                app.hello_sign[0].last_viewed_at !== null &&
                                                app.hello_sign[0].status_code !== "delivery_in_queue" ? (
                                                    <Button className="active">
                                                        {IconEnvelopeOpen}
                                                    </Button>
                                                ) : (
                                                    <Button>
                                                        {IconEnvelopeClosed}
                                                    </Button>
                                            )}


                                            {
                                                app.hello_sign && 
                                                app.hello_sign[0] && 
                                                app.hello_sign[0].last_viewed_at !== null &&
                                                app.hello_sign[0].status_code !== "delivery_in_queue" &&
                                                app.hello_sign[0].status_code == "signed" ? (
                                                <Button className="active">
                                                    {IconAwesomePenFancyRight}
                                                </Button>
                                            ) : (
                                                <Button>
                                                    {IconAwesomePenFancy}
                                                </Button>
                                            )}
                                            {/* <ReminderButton className="active" onClick={ () => this.setReminderAction(app.hello_sign[0], app.id)}>
                                                <img src = {ReminderImg} alt=""/>
                                            </ReminderButton> */}
                                        </div>            

                                        {app.co_customer && (
                                            
                                            <div className="clearfix">
                                                        {
                                                            Array.isArray(app.hello_sign) && app.hello_sign.length === 0 ? 
                                                                <Button className="active" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                                    <img src={ IconFixIssueAwesomeSendRed } alt="" />
                                                                </Button>
                                                            :
                                                            app.hello_sign &&
                                                            app.hello_sign[1] &&
                                                            app.hello_sign[1].last_viewed_at !== null && app.hello_sign[1].status_code !== "delivery_in_queue" && (app.hello_sign[1].status_code === "declined" || app.hello_sign[0].status_code === "error" || app.hello_sign[0].status_code === "not_delivered" ) ? (
                                                            <Button className="active-mark" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                                {IconSend}
                                                            </Button>
                                                            ) : (
                                                                <Button className="active" onClick={() => {this.props.history.push(`/dealer-fix/${app.id}`)}}>
                                                                    {IconAwesomePaperPlane}
                                                                </Button>
                                                            )}


                                                        {
                                                            app.hello_sign &&
                                                            app.hello_sign[1] &&
                                                            app.hello_sign[1].last_viewed_at !== null &&
                                                            app.hello_sign[1].status_code !== "delivery_in_queue" ? (
                                                            <Button className="active">
                                                                {IconEnvelopeOpen}
                                                            </Button>
                                                        ) : (
                                                            <Button>
                                                                {IconEnvelopeClosed}
                                                            </Button>
                                                        )}


                                                        {
                                                            app.hello_sign &&
                                                            app.hello_sign[1] &&
                                                            app.hello_sign[1].last_viewed_at !== null && 
                                                            app.hello_sign[1].status_code !== "delivery_in_queue" &&
                                                            app.hello_sign[1].status_code == "signed" ? (
                                                            <Button className="active">
                                                                {IconAwesomePenFancyRight}
                                                            </Button>
                                                        ) : (
                                                            <Button>
                                                                {IconAwesomePenFancy}
                                                            </Button>
                                                        )}
                                                        {/* <ReminderButton className="active" onClick={ () => this.setReminderAction(app.hello_sign[1], app.id)}>
                                                            <img src = {ReminderImg} alt=""/>
                                                        </ReminderButton> */}
                                                    </div>
                                                )}
                                            </div>
                                        <div className="ml-1" onClick={() => this.deleteList(app.id)}>
                                            {/* <Button className="active-mark" title="Reminder">
                                                {IconSend}
                                            </Button> */}
                                            <img style={{height: '18px'}} src={ IconDelete } alt="" title="Delete"/>
                                        </div>
                                    </Col>
                                </Row>
                            </div>)
                            } 
                            
                        })}
                        {
                            !sales.getListLoading && apps && apps.length === 0 &&
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
    apps: state.sales.apps,
    sales: state.sales,
});

export default connect(
    mapStateToProps,
    {
        getSalesList,
        getAppDetailById,
        changeApplicationStatus,
        reminderIncompleteRequest
    }
)(DealerIncomplete);