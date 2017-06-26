import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Row, Col } from 'react-bootstrap';

import Header from '../../components/Sales/Header';
import CustomerModalList from 'shared/CustomerModalList';
import DivLoader from 'shared/Loader/divLoader';
import SmallInnerDiv from 'shared/Loader/smallInnerDiv';
import { IconDashboardSales, IconDashboardStaff, IconDashboardSalesApp, IconDashboardPending, IconDashboardApproved, IconDashboardDeclined, IconDashboardFunded, IconDashboardCanceled, IconDashboardPreApprovals, IconDashboardIncomplete, IconSearchInActive } from '../../assets/images';
import { getCancelTypeCount, getPendingTypeCount } from '../../redux/actions/sales';
import { getUserDetails } from '../../redux/actions/userAction';
import { searchCustomers, getPreapprovalCount } from '../../redux/actions/customers';
import Loader from 'shared/Loader';
class HomeScreen extends Component {

    state = {
        lastName: '',
        city: '',

        searchShow: false
    }

    componentDidMount() {
        const { 
            getPreapprovalCount, 
            getCancelTypeCount, 
            getPendingTypeCount,
            getUserDetails
        } = this.props;
        getUserDetails();
        getPreapprovalCount();
        getCancelTypeCount();
        getPendingTypeCount();
    }

    onSalesApp = () => {
        this.props.history.push('/sales');
    }

    onStaffApp = () => {
        this.props.history.push('/staff');
    }

    onSales = (status) => {
        this.props.history.push(`/sales-list/${status}`);
    }

    handleSearchClick = (e) => {
        e.preventDefault();
        const body = {
            name: this.state.lastName,
            city: this.state.city
        }
        this.props.searchCustomers(body, 'main');
        this.setState({ searchShow: true });
    }

    handleSearchRowClick = (cifno) => {
        const { history } = this.props;
        history.push(`/prefilled-view/${cifno.Cifno}`);
    }

    hideSearchBox = () => {
        this.setState({
            searchShow: false
        })
    }

    render() {
        const { lastName, city, searchShow } = this.state;
        const { customers, salesData } = this.props;
        const { 
            cancelTypeCount, 
            pendingTypeCont, 
            pendingTypeLoading, 
            cancelTypeLoading
        } = salesData;
        return (
            <div className="dealer sales">
                {
                    customers.loading && <Loader />
                }
                <Header isHome={true} history={this.props.history} avatar={this.props.avatar} className="home-header"></Header>
                <div className="main">
                    <div className="dashboard">
                        <div className="customer-search">
                            <div id="header">
                                <span>CUSTOMER SEARCH</span>
                                <div id="icon">
                                    <img src={IconSearchInActive} onClick={this.handleSearchClick} alt=""/>
                                </div>
                            </div>
                            <Form onSubmit={this.handleSearchClick}>     
                                <div id="form">
                                    <Form.Group className="mb-18">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control value={lastName} onChange={(e) => this.setState({ lastName: e.target.value })}></Form.Control>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>City</Form.Label>
                                        <Form.Control value={city} onChange={(e) => this.setState({ city: e.target.value })}></Form.Control>
                                    </Form.Group>
                                </div>
                                <button type="submit" style={{"display": "none"}} />
                            </Form>
                        </div>

                        { !searchShow && (
                            <div className="light-bg">
                                <div className="sales-details">
                                    <div id="box" className="main-btn">
                                        <div className="part1">
                                            <div id="pre-approvals" onClick={() => {this.props.history.push('/preapprovals');}}>
                                                {
                                                    customers.approveCountLoading ? <DivLoader /> : <img src={IconDashboardPreApprovals} alt="" /> }
                                                <div>
                                                    {/* <div className="listing-action">
                                                        PRE-APPROVALS <div className="count">{preApprovalCount}</div>
                                                    </div> */}
                                                    <div className="listing-action">
                                                        PRE-APPROVALS <div className="count">{customers.approveCount}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="incomplete" onClick={() => {this.props.history.push('/incomplete-page');}}>
                                                {
                                                    pendingTypeLoading ? <DivLoader />: <img src={IconDashboardIncomplete} alt="" /> 
                                                }
                                                <div>
                                                    <div className="listing-action">
                                                        Waiting for Customer Signature <div className="count">{pendingTypeCont.incompleteCount}</div>
                                                    </div>
                                                    {/* pendingTypeCont.incompleteCount > 0 && <img className="notify-count" src={iconNotify} alt="" /> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div id="box">
                                        <div className="part2">
                                            <div>
                                            <div className="count">{pendingTypeCont.pendingCount}</div>
                                                {
                                                    pendingTypeLoading && <SmallInnerDiv classValue="home-small-loader cursor-pointer" onClick={()=>{this.onSales('pending')}}/>
                                                }
                                                <img className="icon" src={IconDashboardPending} onClick={()=>{this.onSales('pending')}} alt=""/>
                                                <div className="status">Disposition Pending</div>
                                            </div>
                                            <div>
                                            <div className="count">{cancelTypeCount.declineCount}</div>
                                                {
                                                    cancelTypeLoading && <SmallInnerDiv classValue="home-small-loader cursor-pointer" onClick={()=>{this.onSales('declined')}}/>
                                                }
                                                <img className="icon" src={IconDashboardDeclined} onClick={()=>{this.onSales('declined')}} alt="" />
                                                <div className="status">Declined</div>
                                            </div>
                                            <div>
                                            <div className="count">{cancelTypeCount.approvedCount}</div>
                                                {
                                                    cancelTypeLoading && <SmallInnerDiv classValue="home-small-loader cursor-pointer" onClick={()=>{this.onSales('approved')}}/>
                                                }
                                                <img className="icon" src={IconDashboardApproved} onClick={()=>{this.onSales('approved')}} alt="" />
                                                <div className="status">Approved</div>
                                            </div>
                                            <div>
                                            <div className="count">{cancelTypeCount.fundedCount}</div>
                                                {
                                                    cancelTypeLoading && <SmallInnerDiv classValue="home-small-loader cursor-pointer" onClick={()=>{this.onSales('funded')}}/>
                                                }
                                                <img className="icon" src={IconDashboardFunded} onClick={()=>{this.onSales('funded')}} alt="" />
                                                <div className="status">Funded</div>
                                            </div>
                                            <div>
                                            <div className="count">{cancelTypeCount.cancelCount}</div>
                                                {
                                                    cancelTypeLoading && <SmallInnerDiv classValue="home-small-loader cursor-pointer" onClick={()=>{this.onSales('cancelled')}}/>
                                                }
                                                <img className="icon" src={IconDashboardCanceled} onClick={()=>{this.onSales('cancelled')}} alt=""/>
                                                <div className="status">Canceled</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="action-button" onClick={()=>{this.onSales('all')}}>
                                        <div id="icon">
                                            <img src={IconDashboardSalesApp} alt=""/>
                                        </div>
                                        <div id="title">
                                            <span>SALES</span>
                                        </div>
                                    </div>
                                </div>

                                <Row className="actions">
                                    <Col md="6" className="action-button pl-0 pr-2" onClick={this.onStaffApp}>
                                        <div id="icon">
                                            <img src={IconDashboardStaff} alt="" />
                                        </div>
                                        <div id="title">STAFF MANAGEMENT</div>
                                    </Col>
                                    <Col md="6" className="action-button pr-0 pl-2" onClick={this.onSalesApp}>
                                        <div id="icon">
                                            <img src={IconDashboardSales} alt=""/>
                                        </div>
                                        <div id="title">SALES APP</div>
                                    </Col>
                                </Row>
                            </div>
                        )}
                        
                    </div>
                </div>
                {
                    searchShow && 
                        <CustomerModalList
                        customers={ customers }
                        setCancel={ this.hideSearchBox }
                        handleSearchRowClick={ this.handleSearchRowClick } />
                }   
                <div className="cmp-info">
                    2020 Travis Capital Partners
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    apps: state.sales.apps,
    avatar: state.auth.avatar,
    customers: state.customers,
    preAprrovalCustomer: state.customers.preAprrovalCustomer,
    salesData: state.sales,
});

export default connect(
    mapStateToProps,
    {
        searchCustomers,
        getUserDetails,
        getPreapprovalCount,
        getCancelTypeCount,
        getPendingTypeCount
    }
)(HomeScreen);