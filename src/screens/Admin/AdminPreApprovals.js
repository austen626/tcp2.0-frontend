import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'react-bootstrap';
import Loader from 'shared/Loader'
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft, IconPreapprovalWaiting, IconPreapprovalDeclined, IconStatusConfirmed } from '../../assets/images';

import { getPreapprovals, setSelectedPreApproval } from '../../redux/actions/admin';

import IconRefresh from 'assets/images/icons8-refresh.svg';
class PreApprovals extends Component {

    componentDidMount() {
        this.props.getPreapprovals();
    }

    handleArrowBack = () => {       
        const { history } = this.props;
        history.push('/')
    }

    handleRowClick = (item) => {
        this.props.setSelectedPreApproval(item);
        this.props.history.push(`/admin/preapproval/${item.id}`);
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
                        <span>PREAPPROVAL REQUEST</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="sales-list">
                        { this.props.data.data.map((item,index) => {
                            if(item.status !== 3) {
                                return (
                                    <Row key={item.id} className="single-row" onClick={() => this.handleRowClick(item)}>
                                        <Col xs={4} className="m-auto">{ item.customer.name }</Col>
                                        <Col xs={4}>
                                            <div>{item.customer.street}, {item.customer.zip}</div>
                                            <div>{item.customer.city}, {item.customer.state}</div>
                                        </Col>
                                        <Col xs={4} className="m-auto">
                                            { item.status === 0 && item.pre_approvals_request_id !== 1 && <img src={IconPreapprovalWaiting} width="39" height="39" alt=""/> }
                                            { item.status === 1 && <img src={IconStatusConfirmed} width="39" height="39" alt=""/> }
                                            { item.status === 2 && <img src={IconPreapprovalDeclined} width="39" height="39" alt=""/> }
                                            {
                                                item.pre_approvals_request_id === 1 && <img src={IconRefresh} width="39" height="39" alt=""/> 
                                            }
                                        </Col>
                                    </Row>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    data: state.admin.preapprovals
});

export default connect(
    mapStateToProps,
    {
        getPreapprovals,
        setSelectedPreApproval
    }
)(PreApprovals);