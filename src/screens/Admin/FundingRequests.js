import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';

import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft, IconPreapprovalWaiting, IconPreapprovalDeclined, IconStatusConfirmed } from '../../assets/images';

import { getFundingRequests, setSelectedFundingRequest } from '../../redux/actions/admin';
import Loader from 'shared/Loader';

class FundingRequests extends Component {

    componentDidMount() {
        this.props.getFundingRequests();
    }

    handleArrowBack = () => {       
        const { history } = this.props;
        history.push('/')
    }

    handleRowClick = (item) => {
        this.props.setSelectedFundingRequest(item);
        this.props.history.push(`/admin/funding/${item.id}`);
    }

    render() {
        const { data } = this.props;
        return (
            <div className="dealer">
                {
                    data.loading && <Loader />
                }
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>FUNDING REQUESTS</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="sales-list">
                        { this.props.data.data.map(item => (
                            <Row key={item.id} className="single-row" onClick={() => this.handleRowClick(item)}>
                                <Col xs={4} className="m-auto">{ item.applicant.name }</Col>
                                <Col xs={4} className="m-auto">
                                    { item.products.map(product => (
                                        <div key={product.id}>{ product.type }: ${product.balance}, {item.delivery_date}</div>
                                    )) }
                                </Col>
                                <Col xs={4} className="m-auto">
                                    { item.status === 0 && <img src={IconPreapprovalWaiting} width="39" height="39"/> }
                                    { item.status === 1 && <img src={IconStatusConfirmed} width="39" height="39"/> }
                                    { item.status === 2 && <img src={IconPreapprovalDeclined} width="39" height="39"/> }
                                </Col>
                            </Row>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.admin.fundings
});

export default connect(
    mapStateToProps,
    {
        getFundingRequests,
        setSelectedFundingRequest
    }
)(FundingRequests);