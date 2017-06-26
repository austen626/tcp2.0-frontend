import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button } from 'react-bootstrap';

import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft } from '../../assets/images';
import { product_options  } from "../../assets/options";

import { changeSelectedFundingRequestStatus } from '../../redux/actions/admin';
import Loader from 'shared/Loader';

class PreApprovalItem extends Component {

    componentDidMount() {
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleApproveClick = () => {
        this.props.changeSelectedFundingRequestStatus(this.props.item.id, 1);
    }

    handleDeclineClick = () => {
        this.props.changeSelectedFundingRequestStatus(this.props.item.id, 2);
    }

    render() {
        const { item, setFundingLoading } = this.props;
        if (Object.keys(item).length === 0) {
            return (
                <div>

                </div>
            )
        }
        const { id, created_at, status, applicant, co_applicant, products, delivery_date, salesperson_email } = item;
        return (
            <div className="dealer">
                {
                    setFundingLoading && <Loader />
                }
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>{applicant.name}</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="customer-details">
                        <div className="contact-info">
                            <div>
                                <strong>Delivery Date: </strong>
                                <span>{delivery_date}</span>
                            </div>
                            <div>
                                <strong>Sales Person Email: </strong>
                                <span>{salesperson_email}</span>
                            </div>
                            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                
                                { status === 0 && (
                                    <>
                                        <Button
                                            style={{ marginRight: 20 }}
                                            variant="success"
                                            onClick={this.handleApproveClick}
                                        >
                                            Funded
                                        </Button>
                                        {/* <Button
                                            variant="danger"
                                            onClick={this.handleDeclineClick}
                                        >
                                            Decline
                                        </Button> */}
                                    </>
                                ) }
                                </div>
                                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                { status === 0 && (
                                    <div style={{ color: '#d81740', fontSize: 16, fontWeight: 'bold' }}>
                                        Funding Request Pending
                                    </div>
                                ) }

                                { status === 1 && (
                                    <div style={{ color: '#009e87', fontSize: 16, fontWeight: 'bold' }}>
                                        Funding Request accepted
                                    </div>
                                ) }

                                { status === 2 && (
                                    <div style={{ color: '#d81740', fontSize: 16, fontWeight: 'bold' }}>
                                        Funding Request declined
                                    </div>
                                ) }
                                
                            </div>
                        </div>                        
                    </div>

                    <div className="app-details mt-20">
                        <div className="contact-details">
                            <div className="main-app">
                                <div><strong>{applicant.name}</strong></div>
                                <div>Address: {applicant.address} {applicant.zip}, {applicant.city}, {applicant.state}</div>
                                <div>Phone: {applicant.phone}</div>
                            </div>
                            { co_applicant && (
                                <div className="co-app">
                                    <div><strong>{co_applicant.name}</strong></div>
                                    <div>Address: {co_applicant.address}</div>
                                    <div>Phone: {co_applicant.phone}</div>
                                </div>
                            ) }
                        </div>
                        <div className="tab1">ORDER SUMMARY</div>
                        <div className="slips">
                            <div>1. Credit Application</div>
                            { products.map((product, id) => (
                                <div key={id} className="mt-20">
                                    <div>{id+2}. {product_options[product.type]} - ${product.balance}</div>
                                    <div>{product.period} months</div>
                                </div>
                            )) }
                            <div className="mt-20">Applicant and co-applicant will each complete their own section of each form.</div>
                        </div>
                        <div className="tab1">ORDER DOCUMENTS</div>
                        <div className="mt-20">
                            <div>Product Order Documents Set</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.admin.selectedFunding,
    setFundingLoading: state.admin.setFundingLoading
});

export default connect(
    mapStateToProps,
    {
        changeSelectedFundingRequestStatus
    }
)(PreApprovalItem);