import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button, Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import Footer from '../../components/Dealer/Footer';
import { IconArrowLeft, IconStatusWaiting } from '../../assets/images';
import { product_options } from '../../assets/options';
import { requestFunding } from '../../redux/actions/admin';

class AppDetails extends Component {

    state = {
        deliveryDate: "",
        sentModal: false
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleModalClose = () => {
        this.setState({ sentModal: false });
    }

    handleRequestFundingClick = () => {
        this.props.requestFunding(this.props.app.data.id, this.state.deliveryDate);
        this.setState({ sentModal: true });
    }

    render() {
        const { app } = this.props;
        return (
            <div className="dealer">
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>APPLICATION DETAILS</span>
                    </HeaderCenter>
                    <HeaderRight>
                        <img src={IconStatusWaiting} alt=""/>
                    </HeaderRight>
                </Header>
                <div className="main">
                    { app.loading || Object.keys(app.data).length === 0 ? (
                        <div>
                            Loading
                        </div>
                    ) : (
                        <div className="app-details">
                            <div className="contact-details">
                                <div className="main-app">
                                    <div><strong>{this.props.app.data.applicant.name}</strong></div>
                                    <div>Address: {this.props.app.data.applicant.address} {this.props.app.data.applicant.zip}, {this.props.app.data.applicant.city}, {this.props.app.data.applicant.state}</div>
                                    <div>Phone: {this.props.app.data.applicant.phone}</div>
                                </div>
                                { this.props.app.data.co_applicant && (
                                    <div className="co-app">
                                        <div><strong>{this.props.app.data.co_applicant.name}</strong></div>
                                        <div>Address: {this.props.app.data.co_applicant.address}</div>
                                        <div>Phone: {this.props.app.data.co_applicant.phone}</div>
                                    </div>
                                ) }
                            </div>
                            <div className="tab1">ORDER SUMMARY</div>
                            <div className="slips">
                                <div>1. Credit Application</div>
                                { this.props.app.data.products.map((product, id) => (
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
                    )}
                </div>
                { !app.loading && Object.keys(app.data).length > 0 && (
                    <Footer>
                        <Modal show={this.state.sentModal} onHide={this.handleModalClose}>
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                                <p>Funding request has been sent to the Admin.</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="primary" onClick={this.handleModalClose}>
                                    Ok
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <Row>
                            <Col xs={6} className="delivery-date">
                                <span>Delivery Date:</span>
                                <InputMask
                                    className="form-control"
                                    pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                                    mask="99/99/9999"
                                    maskChar=""
                                    placeholder="MM/DD/YYYY"
                                    value={this.state.deliveryDate}
                                    onChange={e => this.setState({ deliveryDate: e.target.value })}
                                />
                            </Col>
                            <Col xs={6} className="btn-request-funding">
                                <Button onClick={this.handleRequestFundingClick}>REQUEST FUNDING</Button>
                            </Col>
                        </Row>
                    </Footer>
                ) }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    app: state.sales.selectedApp
});

export default connect(
    mapStateToProps,
    {
        requestFunding
    }
)(AppDetails);