import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import DatePicker from 'react-datepicker';
import { setApplianceFlag } from 'utils/helper';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import Footer from '../../components/Dealer/Footer';
import { IconArrowLeft, IconMetroCalendar, IconStatusWaiting, IconStatusConfirmed } from '../../assets/images';
import { requestFunding, requestCancel } from '../../redux/actions/admin';
import { getAppDetailById } from '../../redux/actions/sales';
import { ApplicationDeliveryBox } from './style';
class AppDetails extends Component {

    state = {
        deliveryDate: null,
        sentModal: false,
        dateErrorModal: false,
        cancelRequestConfirmModal: false,
        cancelRequestModal: false
    }

    componentDidMount() {
        this.mountFunction()
    }
    mountFunction = () => {
        this.props.getAppDetailById(this.props.match.params.appId, this.setDeliveryDate);
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleModalClose = () => {
        this.setState({ sentModal: false, dateErrorModal: false, cancelRequestModal: false, cancelRequestConfirmModal: false });
    }

    handleRequestFundingClick = () => {
        const { deliveryDate } = this.state;
        if(deliveryDate && deliveryDate !== "") {
            const dateForm = moment(deliveryDate).format('MM/DD/yyyy');
            this.props.requestFunding(this.props.app.data.id, dateForm, this.openSentModal, this.mountFunction);
            // this.setState({ sentModal: true });
        } else {
            this.setState({ dateErrorModal: true });
        }
        // window.location.reload()
    }

    openSentModal = () => {
        this.setState({ sentModal: true });
    }

    setDeliveryDate = date => {
        this.setState({
            deliveryDate: date
        })
    }

    handleRequestCancelClick = () => {
        this.props.requestCancel(this.props.app.data.id);
        this.setState({ cancelRequestModal: true });
        this.props.getAppDetailById(this.props.match.params.appId, this.setDeliveryDate);
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
                        { app.loading && <span>Loading...</span> }
                        { !app.loading && Object.keys(app.data).length > 0 && <span>APPLICATION DETAILS</span> }
                    </HeaderCenter>
                    <HeaderRight>
                        { app.data.status === 'waiting' ? <img src={IconStatusWaiting} alt=""/> : <img src={IconStatusConfirmed} alt=""/> }
                    </HeaderRight>
                </Header>

                { !app.loading && Object.keys(app.data).length > 0 && (

                    <div className="application-main">
                        <div className="app-details">                        
                            <div className="contact-details">                            
                                <Row className="main-app">
                                    {app.data.applicant && (
                                        <Col xs={12} md={6}>
                                            <label className="name">{app.data.applicant.name}</label>
                                            <div className="contact">{app.data.applicant.address} {app.data.applicant.city} {app.data.applicant.zip} {app.data.applicant.state}</div>
                                            <div className="contact">{app.data.applicant.phone}</div>
                                        </Col>
                                    )}
                                    {app.data.co_applicant && (
                                        <Col xs={12} md={6} className="border-left">
                                            <label className="name">{app.data.co_applicant.name}</label>
                                            <div className="contact">{app.data.co_applicant.address} {app.data.co_applicant.city} {app.data.co_applicant.zip} {app.data.co_applicant.state}</div>
                                            <div className="contact">{app.data.applicant.phone}</div>
                                        </Col>
                                    )}
                                </Row>                            
                                <Row className="co-app">
                                    {
                                        app.data.status === 'approved' && 
                                        <Col className="details text-center">
                                            <label>

                                                {/* { app.data.products && app.data.products.map((product, index) => (
                                                    `${product.type} ${app.data.products.length > index+1 ? " + " : ""}`
                                                )) }  */}
                                                
                                                
                                                <span>TIER - {app.data.rating || 0}</span></label>
                                        </Col>                                    
                                    }
                                    <Col className="emp-name text-center">
                                        <label>Assigned Employee <br/>{app.data.salesperson_email}</label>
                                    </Col>
                                    <Col className="date text-center">
                                        <label>Delivery Date <br/>{
                                        app.data && 
                                        app.data.funding && 
                                        app.data.funding[0] &&
                                        app.data.funding[0].delivery_date || "" }</label>
                                    </Col>
                                    {/* <Col className="emp-name" sm="3" xs="6">
                                        <label>Product <br/>{app.data.products[0].product_type}</label>
                                    </Col> */}
                                </Row>
                            </div>
                            <div className="order-summary-header">ORDER SUMMARY</div>                        
                            <div className="order-summary-details">
                                <ul>
                                    <li>1. Credit Application</li>
                                    { app.data.products && app.data.products.map((product, id) => (
                                        <li key={id} >{id+2}. {setApplianceFlag((product.product_type).toLowerCase())} - ${product.balance} <br/> <span>{product.period} months</span></li>
                                    )) }                                
                                </ul>
                                <div className="note">Applicant and co-applicant will each complete their own section of each form.</div>
                            </div>                        
                            <div className="order-summary-header">DOCUMENTS</div>                        
                            <div className="document-link"><a href="#">Product Order Documents Set</a></div>                      
                            
                            <Footer className="bottom-footer">

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
                                
                                <Modal show={this.state.dateErrorModal} onHide={this.handleModalClose}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        <p>Please Select Funding Date.</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={this.handleModalClose}>
                                            Ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                
                                <Modal show={this.state.cancelRequestConfirmModal} onHide={this.handleModalClose}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        <p>{
                                            app.data.status === "approved"  ? "WARNING: You are about to cancel this order and remove it from the system. Would you like to proceed?" : "Do you want to cancel request." }
                                        </p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleModalClose}>
                                            No
                                        </Button>
                                        <Button variant="primary" onClick={() => {this.handleRequestCancelClick()}}>
                                            Yes
                                        </Button>
                                    </Modal.Footer>
                                </Modal> 
                                
                                <Modal show={this.state.cancelRequestModal} onHide={this.handleModalClose}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        <p>Your request is canceled successfully.</p>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="primary" onClick={this.handleModalClose}>
                                            Ok
                                        </Button>
                                    </Modal.Footer>
                                </Modal>                         
                                
                                {app.data.status === 'approved' ? (
                                    <Row>
                                        <Col xs={6} className="delivery-date">
                                            <ApplicationDeliveryBox>
                                                <span>Delivery date: </span>
                                                    <DatePicker 
                                                        selected={this.state.deliveryDate && new Date(this.state.deliveryDate)} 
                                                        onChange={date => this.setState({
                                                            deliveryDate: date })}
                                                        minDate={new Date()}
                                                        className="calendar-application"
                                                        dateFormat="MM/dd/yyyy"
                                                        placeholderText="MM/DD/YYYY"
                                                        disabled={ app.data.funding.length > 0 ? true : false } />
                                                {/* <label>
                                                    <DatePicker 
                                                        selected={this.state.deliveryDate} 
                                                        onChange={date => this.setState({
                                                            deliveryDate: date })}
                                                        minDate={new Date()}
                                                        className="calendar-application"
                                                        dateFormat="MM/dd/yyyy"
                                                        placeholderText="MM/DD/YYYY" />
                                                    <InputMask
                                                        className={`form-control date-picker ${app.data.funding.length > 0 ? 'disabled' : ''}`}
                                                        pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}"
                                                        mask="99/99/9999"
                                                        maskChar=""
                                                        placeholder="MM/DD/YYYY"
                                                        value={this.state.deliveryDate}
                                                        onChange={e => this.setState({ deliveryDate: e.target.value })}
                                                        disabled = {app.data.funding.length > 0 ? true : false }
                                                    />
                                                    <img src={IconCaledar} alt="" />
                                                </label> */}
                                            
                                            </ApplicationDeliveryBox>
                                        </Col>
                                        <Col xs={6} className="btn-request-funding">
                                            {app.data.funding.length > 0 ?
                                                <Button disabled>ALREADY REQUESTED</Button>
                                                :
                                                <Button onClick={() => {this.handleRequestFundingClick()}}>REQUEST FUNDING</Button>
                                            }
                                            &nbsp;&nbsp;
                                            <Button onClick={() => this.setState({ cancelRequestConfirmModal: true })}>{
                                                app.data.status === "approved" ? "CANCEL THIS ORDER": "CANCEL" }</Button>
                                        </Col>
                                    </Row>
                                ) : (
                                    <>
                                        {app.data.status !== 'canceled' && (
                                            <Col xs={12} className="btn-request-funding text-center">
                                                <Button onClick={() => this.setState({ cancelRequestConfirmModal: true })}>{
                                                app.data.status === "approved" ? "CANCEL THIS ORDER": "CANCEL" }</Button>
                                            </Col>
                                        )}
                                    </>
                                )}

                            </Footer>                       
                        </div>
                    </div>

                )}
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
        requestFunding,
        requestCancel,
        getAppDetailById
    }
)(AppDetails);