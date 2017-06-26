import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from 'components/Dealer/Header';
import { message as ConstMessage } from 'shared/constant';
import { setApplianceFlag } from 'utils/helper';
import { IconArrowLeft, IconCustomerEdit, UnderConstruction } from 'assets/images';
import CustomerLoanHistoryList from '../CustomerLoanHistoryList';
import Loader from 'shared/Loader';

class ApplyPreFilledView extends Component {

    customerDetailsRef = React.createRef();

    state = {
        modalShow: false,
        commentBoxShow: false,
        currentWidth: 500,
        openLoadDetails: false
    }

    async componentDidMount() {        
        const { setReorderCustomerById, getCustomerHistory } = this.props
        const id = this.props.match.params.id;
        setReorderCustomerById(id);
        getCustomerHistory({ id: id })
        if (this.customerDetailsRef !== undefined && this.customerDetailsRef.current.offsetWidth !== undefined) {
            this.setState({ currentWidth: this.customerDetailsRef.current.offsetWidth })
        }
    }

    handleGenerateOrderClick = (item) => {
        this.props.addProduct();
        this.props.history.replace('/product/0');
    }

    requestForSales = (type) => {
        const { sendAll, customer } = this.props;
        let productType = [];
        const { contact } = customer;
        const { main_app } = contact;
        const typeStructure = {
            'food': 'food',
            'food-app': 'food, appliance',
            'app': 'appliance'
        }
        productType.push(typeStructure[type])
        const body = {
            "contact": {
               "same_address": false,
                "co_enabled": false,
                "co_complete": false,
                "co_separate": false,
                "product_type": productType,
                "main_app": {
                    "cif_number": main_app.cif_number,
                    "nortridge_cif_number": main_app.nortridge_cif_number || null,
                    "name": main_app.name,
                    "email": main_app.email,
                    "cell_phone": main_app.cell_phone,
                    "street": main_app.street,
                    "city": main_app.city,
                    "state": main_app.state,
                    "zip": main_app.zip,
                    "home_phone": ""
                },
                "co_app": {
                    "name": "",
                    "email": "",
                    "cell_phone": "",
                    "home_phone": "",
                    "street": "",
                    "city": "",
                    "state": "",
                    "zip": "",
                }
            },
        }
        sendAll(body, undefined, "pre-order", this.props.history);
    }

    handleRedirect = () => {
        const id = this.props.match.params.id;
        const { history } = this.props;
        history.push('/prefilled/'+id);
    }

    handleArrowBack = () => {
        const { history } = this.props;
        history.push('/');
    }

    render() {
        const {
            getCustomerPaymentHistory,
            customerData,
            customer
        } = this.props;
        const { contact, customerError, isSettingCustomerDetails } = customer;
        const { main_app } = contact;
        return (
            <div ref={this.customerDetailsRef} className="dealer">
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt="" />
                    </HeaderLeft>
                    <HeaderCenter>
                        {
                            customerError === 'Not Found' ?
                            <span className="name">This page is under construction</span> 
                            :
                            <span className="name">{main_app.name || '-'}</span> 
                        }
                    </HeaderCenter>
                    <HeaderRight>
                        {
                            customerError !== 'Not Found' &&
                            <img src={ IconCustomerEdit } alt="" onClick={this.handleRedirect}/>
                        }
                    </HeaderRight>
                </Header>               
                {
                    isSettingCustomerDetails && <Loader />
                }
                <>
                {
                    customerError !== 'Not Found' && 
                    <div className="main">
                        <div className="customer-details">
                            { this.state.currentWidth < 571 ? (
                                <>
                                    <div className="address-and-buttons">
                                        <div className="address">
                                            <div>{main_app.street || '-'}</div>
                                            <div>{main_app.zip || '-'} {main_app.city || ''}</div>
                                            <div>{main_app.state || '-'}</div>
                                        </div>                                      
                                        <div className="buttons mt-3">
                                            <>
                                                <div className="btn-preview-green btn-custom button-preapproval" onClick={() => this.requestForSales('food')}>REQUEST PREAPPROVAL</div>
                                                {/* <div className="btn-preview-green btn-custom button-preapproval" onClick={() => this.requestForSales('food')}>REQUEST FOR FOOD</div>
                                                <div className="btn-preview-green btn-custom button-preapproval" onClick={() => this.requestForSales('app')}>REQUEST FOR APPLIANCE</div> */}
                                                <div className="btn-generate-preview btn-custom button-preapproval" onClick={ this.handleGenerateOrderClick }>GENERATE ORDER</div>
                                            </>
                                        </div> 
                                    </div>
                                    <>
                                        <div className="tab1">Contact</div>
                                        <div className="contact-info">
                                            <div className="details">
                                                <strong>Contact Type: </strong>
                                                <span>{main_app.cell_phone}</span>
                                            </div>
                                            <div className="details">
                                                <strong>Email: </strong>
                                                <span>{main_app.email}</span>
                                            </div>
                                            <div className="details">
                                                <strong>Date Of Birth: </strong>
                                                <span>{main_app.dob}</span>
                                            </div>
                                            <div className="details">
                                                <strong>TCP Customer Number: </strong>
                                                <span>{ main_app.nortridge_cif_number}</span>
                                            </div>
                                        </div>
                                    </>
                                </>)
                                :
                                <Row className="web-info-box">
                                    <Col xs="6" className="text-left right-border">
                                        <div className="web-address-and-buttons">
                                            <div className="address">
                                                <div>{main_app.street || '-'}</div>
                                                <div>{main_app.zip} {main_app.city || '-'}</div>
                                                <div>{main_app.state || '-'}</div>
                                                <div className="buttons">
                                                <div className="btn-custom button-preapproval" onClick={() => this.requestForSales('food')}>REQUEST PREAPPROVAL</div>
                                                    {/* <div className="btn-custom button-preapproval" onClick={() => this.requestForSales('food')}>REQUEST FOR FOOD</div>
                                                    <div className="btn-custom button-preapproval" onClick={() => this.requestForSales('app')}>REQUEST FOR APPLIANCE</div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs="6" className="text-left">
                                        <div className="web-address-and-buttons">
                                            <div className="address ml-50">
                                                <div>Contact: {main_app.cell_phone}</div>
                                                <div>Email: {main_app.email}</div>
                                                <div>Date Of Birth: {main_app.dob}</div>
                                                <div>TCP Customer Number: {`${main_app?.nortridge_cif_number || ''}`}</div>
                                                <div className="buttons">                                            
                                                    <div className="btn-generate-preview btn-custom button-preapproval" onClick={this.handleGenerateOrderClick}>GENERATE ORDER</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            }
                        </div>
                    </div>
    }
                    {
                        customerError !== 'Not Found' ?
                        <CustomerLoanHistoryList 
                            customerData = { customerData }
                            getCustomerPaymentHistory = { getCustomerPaymentHistory }
                        /> :
                        <div className="d-flex justify-content-center m-5">
                            <img className="img-fluid" src={ UnderConstruction } alt="under construction" />
                        </div>
                    }            
                </>
            </div>
        )
    }
}


export default  ApplyPreFilledView;