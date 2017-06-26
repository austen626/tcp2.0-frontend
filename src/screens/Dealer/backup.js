import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import Footer from '../../components/Dealer/Footer';
import { IconStatusWaiting, IconStatusConfirmed, IconHome, IconPreapprovalWaiting, IconPreapprovalDeclined, IconSortInActive, IconSortActive, IconSearchInActive, IconSearchActive, IconFilterActive, IconFilterInActive } from '../../assets/images';
import { getAppDetailById } from '../../redux/actions/sales';
import { getPreapprovals } from '../../redux/actions/admin';

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

        searchVal: ""
    }

    componentDidMount() {
        this.props.getPreapprovals();
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.sidebarRef && this.sidebarRef.current && !this.sidebarRef.current.contains(event.target)) {
            this.setState({ sidebarOpen: "" });
        }
    }

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
        const { sidebarOpen, sortBy, filterStatus, filterPerson, filterCategory } = this.state;

        const names = this.props.apps.map(app => app.name);

        if (sidebarOpen === "sort") {
            return (
                <Form.Control
                    as="select"
                    value={sortBy}
                    onChange={(e) => this.setState({ sortBy: e.target.value })}
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
                        onChange={(e) => this.setState({ filterStatus: e.target.value })}
                    >
                        <option value="all">Status</option>
                        <option value="approved">Approved</option>
                        <option value="waiting">Waiting</option>
                    </Form.Control>

                    <Form.Control
                        as="select"
                        value={filterPerson}
                        onChange={(e) => this.setState({ filterPerson: e.target.value })}
                    >
                        <option key="all" value="all">Salesperson Name</option>
                        { names.filter((name, index) => names.indexOf(name) === index).map(name => (
                            <option key={name} value={name}>{name}</option>
                        )) }
                    </Form.Control>

                    <Form.Control
                        as="select"
                        value={filterCategory}
                        onChange={(e) => this.setState({ filterCategory: e.target.value })}
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
                            <Button onClick={this.handleSideBarApply}>APPLY</Button>
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

    render() {
        const { sortClicked, searchClicked, filterClicked, searchVal } = this.state;
        let apps = this.props.apps;


        // if (searchClicked && searchVal !== '') {
        //     apps = apps.filter(app => app.name.toLowerCase().includes(searchVal.toLowerCase())) 
        // }
        // if (filterClicked) {
        //     const { filterStatus, filterPerson, filterCategory } = this.state;
        //     if (filterStatus !== "all") {
        //         apps = apps.filter(app => app.status.toLowerCase() === filterStatus);
        //     }
        //     if (filterPerson !== "all") {
        //         apps = apps.filter(app => app.name === filterPerson);
        //     }
        //     if (filterCategory !== "all") {
        //         apps = apps.filter(app => app.products.find(product => product.type.toLowerCase() === filterCategory.toLowerCase()) !== undefined)
        //     }
        // }
        // if (sortClicked) {
        //     const { sortBy } = this.state;
        //     if (sortBy === "name-ascending") {
        //         apps = apps.sort((a, b) => a.name > b.name ? 1 : -1)
        //     }
        //     else if (sortBy === "date-descending") {
        //         apps = apps.sort((a, b) => a.name < b.name ? 1 : -1)
        //     }
        //     else if (sortBy === "date-new") {
        //         apps = apps.sort((a, b) => a.created_at > b.created_at ? 1 : -1)
        //     }
        //     else if (sortBy === "date-old") {
        //         apps = apps.sort((a, b) => a.created_at < b.created_at ? 1 : -1)
        //     }
        // }

        // apps = apps.filter(a => (a.status === 'waiting' || a.status === 'approved' || a.status === 'declined'));   

        return (
            // <div className="dealer">
            //     <Header>
            //         <HeaderLeft>
            //             <img src={IconHome} onClick={this.handleArrowBack} height="28"/>
            //             <img src={sortClicked ? IconSortActive : IconSortInActive} onClick={this.handleSortClick} />
            //         </HeaderLeft>
            //         <HeaderCenter>
            //             <span>PREAPPROVAL REQUEST</span>
            //         </HeaderCenter>
            //         <HeaderRight>
            //             <img src={searchClicked ? IconSearchActive : IconSearchInActive} onClick={this.handleSearchClick} />
            //             <img src={filterClicked ? IconFilterActive : IconFilterInActive} onClick={this.handleFilterClick} />
            //         </HeaderRight>
            //     </Header>
            //     <div className="preapproval-main">
            //         { searchClicked && (
            //             <div className="dealer-list-search">
            //                 <Form.Control
            //                     placeholder="Search"
            //                     value={this.state.searchVal}
            //                     onChange={(e) => this.setState({ searchVal: e.target.value })}
            //                 />
            //             </div>
            //         ) }
            //         <div className="dealer-list">
            //             { apps.map((app, index) => (
            //                 <div className={`request-row ${index%2 === 0 && "dark"}`}>
            //                     <Row onClick={() => {app.status !== 'waiting' && this.handleSearchRowClick(app.id)}}>
            //                         <Col xs={6} md={4} className="data">
            //                             <div className="title">{ app.name }</div>
            //                             <div className="sub-title">{ app.street } { app.city } <br/> { app.zip } { app.state }</div>
            //                         </Col>
            //                         <Col xs={3} md={4} className="data text-center">
            //                             <div className="date">R: MM/DD/YY</div>
            //                             <div className="date">A: MM/DD/YY</div>
            //                         </Col>
            //                         <Col xs={3} md={4} className="data text-center">
            //                             { app.status === 'waiting' ? 
            //                                 <img src={IconPreapprovalWaiting} /> : app.status !== "approved" ? 
            //                                 <img src={IconPreapprovalDeclined} /> : 
            //                                 <Button> GENERATE ORDER </Button> }
            //                         </Col>
            //                     </Row>
            //                 </div>
            //             ))}
            //         </div>
            //     </div>

            //     { this.renderSideBar() }              
            // </div>

            ""
        )
    }
}


{/* <Row>
<Col xs={4}>{ app.name }</Col>
<Col xs={4}>
    { app.products.map(product => (
        <div key={product.id}>{ product.type }, ${product.balance}</div>
    )) }
</Col>
<Col xs={4}>
    { app.status === 'waiting' ? 
        <img src={IconStatusWaiting} /> :
        <img src={IconStatusConfirmed} /> }
</Col>
</Row> */}


const mapStateToProps = state => ({
    // apps: state.sales.apps
    apps: state.admin.preapprovals
});

export default connect(
    mapStateToProps,
    {
        getPreapprovals,
        getAppDetailById
    }
)(DealerPreApprovals);