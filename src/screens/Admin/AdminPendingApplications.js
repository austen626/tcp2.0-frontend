import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import { setApplianceFlag } from 'utils/helper';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft, IconPreapprovalWaiting, IconStatusConfirmed, IconDashboardDeclined, IconDashboardCanceled,IconDashboardFunded, IconDashboardIncomplete} from '../../assets/images';

import { setSelectedPendingApplication } from '../../redux/actions/admin';
import { getSalesList } from '../../redux/actions/sales';
import Loader from 'shared/Loader';

class PendingApplications extends Component {

    componentDidMount() {
        this.props.getSalesList();
    }

    handleArrowBack = () => {
        const { history } = this.props;
        history.push('/')
        //        this.props.history.goBack();
    }

    handleRowClick = (item) => {
        this.props.setSelectedPendingApplication(item);
        this.props.history.push(`/admin/pendingApplication/${item.id}`);
        // alert("API Pending");
    }

    render() {

        const apps = this.props.apps.filter(a => a.hello_sign && a.hello_sign.length > 0 && (a.hello_sign[0].status_code === "signed" || a.hello_sign[0].status_code === "awaiting_signature"));
        const { getListLoading } = this.props.salesData;
        return (
            <div className="dealer">
                {
                    getListLoading && <Loader />
                }
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>MANAGE APPLICATIONS</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="sales-list">
                        { apps.map(item => (
                            <Row key={item.id} className="single-row" onClick={() => this.handleRowClick(item)}>
                                <Col xs={4} className="m-auto text-left">
                                    <b>{ item.name }</b>                                    
                                    <small>{ item.products.map(product => {
                                        return(
                                        <div key={product.id}>{ setApplianceFlag((product.type).toLowerCase()) }: ${product.balance}</div>
                                    ) }) }</small>
                                </Col>
                                <Col xs={4} className="m-auto">
                                    <div>{item.street}, {item.zip}</div>
                                    <div>{item.city}, {item.state}</div>
                                </Col>
                                <Col xs={4} className="m-auto text-right">
                                    {
                                        item.hello_sign[0].status_code === "awaiting_signature" &&
                                        <img alt="" src={ IconDashboardIncomplete } width="39" height="39" style={{borderRadius: "50%"}} />
                                    }
                                    { item.hello_sign[0].status_code !== "awaiting_signature" && item.status === "waiting" && <img alt="" src={IconPreapprovalWaiting} width="39" height="39" style={{borderRadius: "50%"}}/> }
                                    {  item.hello_sign[0].status_code !== "awaiting_signature" && item.status === "approved" && <img alt="" src={IconStatusConfirmed} width="39" height="39" style={{borderRadius: "50%"}}/> }
                                    {  item.hello_sign[0].status_code !== "awaiting_signature" && item.status === "declined" && <img alt="" src={IconDashboardDeclined} width="39" height="39" style={{borderRadius: "50%"}}/> }
                                    {/* { item.status === "cancelled" && <img alt="" src={IconDashboardCanceled} width="39" height="39" style={{borderRadius: "50%"}}/> } */}
                                    {/* { item.status === "funded" && <img alt="" src={IconDashboardFunded} width="39" height="39" style={{borderRadius: "50%"}}/> } */}
                                </Col>
                            </Row>
                        ))}
                        {
                            apps.length === 0 &&
                            <div>No Applications Found</div>
                        }
                    </div>
                </div>
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
        setSelectedPendingApplication
    }
)(PendingApplications);