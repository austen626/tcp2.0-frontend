import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Modal } from 'react-bootstrap';

import Header from '../../components/Sales/Header';
import Footer from '../../components/Sales/Footer';
import Header2 from '../../components/Sales/Header2';

import { product_options } from '../../assets/options';
import { IconHome, IconDelete, IconEnvelops } from '../../assets/images';

import { 
    clearCustomer, 
    sendAll, 
    removeProduct,
    addProduct, 
    changeCustomer,
    emailValidateRequest,
    resentSuccessRequest
} from '../../redux/actions/customer';
import Loader from 'shared/Loader';

class SummaryScreen extends Component {

    state = {
        backModal: false,
        sentModal: false,
        confirmModal: false,
    }

    componentDidMount() {
        const { emailValidateRequest, customer } = this.props;
        const emailCheck = emailValidateRequest({ email: customer.contact.main_app.email });
        emailCheck.then(() => {
            if(customer.contact.co_enabled) {
                emailValidateRequest({ email: customer.contact.co_app.email });
            }
        })
        
        
        // if (this.props.customer.contact.name === '') {
        //     this.props.history.replace('/');
        // }
    }

    onDeleteProduct = (index) => {
        this.props.removeProduct(index);
    }

    onAddSlip = () => {
        const { products } = this.props.customer;
        const count = products.length;
        if (count >= 2) {
            return;
        }

        this.props.addProduct();
        this.props.history.replace(`/product/${count}`);
    }

    handleModalShow = () => {
        this.setState({ sentModal: true });
    }

    handleModalClose = () => {
        this.setState({ sentModal: false });
        // this.props.clearCustomer();
        // this.props.history.replace('/');
    }

    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        this.props.clearCustomer();
        this.props.history.replace('/');
    }

    handleBackConfirmModalNo = () => {
        this.setState({ confirmModal: false });
    }

    eventChangeCustomer() {
        this.props.changeCustomer({ sent: true });
    }

    handleBackConfirmModalYes = () => {
        const { history, changeCustomer } = this.props;
        this.handleBackConfirmModalNo();
        const { contact, products } = this.props.customer;
        let data = {
            contact: contact,
            products: products
        };

        this.props.sendAll(data, this.handleModalShow, 'new-customer', history, { changeCustomer: changeCustomer, sentFirstTimeTrue: this.sentFirstTimeTrue});
        // this.handleModalShow();
       // this.props.changeCustomer({ sent: true });
    }

    sentFirstTimeTrue = () => {
        const { resentSuccessRequest } = this.props;
        resentSuccessRequest();
        // this.setState({
        //     sentOneTime: true
        // })
    }

    renderModals = () => {
        const { sent, order_type } = this.props.customer.contact;
        return (
            <>
                <Modal show={this.state.backModal} onHide={this.handleBackModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p>{sent ? "Returning to the Start Screen will prevent you from making additional changes and re-sending these documents." : "Returning to the Start Screen will cause you to lose all progress on this customer." }</p>
                        <p>Do you wish to continue?</p>
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
                
                <Modal show={this.state.confirmModal} onHide={this.handleBackConfirmModalNo}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        { order_type === 1 ?
                            "Would you like to send the credit application and sales slip(s) to the customer to be signed?" :
                            "Would you like to send the sales slip(s) to the customer to be signed?" }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleBackConfirmModalNo}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleBackConfirmModalYes}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.sentModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>Customer has been sent the documents associated with this order. To edit these documents, please make the desired changes and press the send to customer button again. To start a new order, please press the home button.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    render() {
        const { contact, products, isCustomerFormLoading, isEmailNotValid, isEmailCheckLoading, sentOneTime } = this.props.customer;
        const { order_type, main_app , sent } = contact;
        const { name, street, city, state, email, zip, cell_phone } = main_app;
      
        const unsaved = products.filter(product => product.saved === false).length > 0;
        let buttonClassValue = unsaved ? "button product-button" : "button product-button active";
        buttonClassValue = (isEmailCheckLoading || isEmailNotValid) ? `${buttonClassValue} not-allowed` : buttonClassValue;
        let ifBalanceZero = false;
        return (
            <div className="sales">
                { isCustomerFormLoading && <Loader /> }
                { this.renderModals() }  
                <Header history={this.props.history}>
                    <img src={IconHome} alt="home" className="icon-home" onClick={() => this.setState({ backModal: true })} />
                </Header>
                <div className="summary-page">
                    <Header2
                        id={-2}
                        history={this.props.history}
                    />
                    <div className="contact">
                        <div className="wrapper">
                            <div>
                                <div>
                                    <span className="key">Name:</span>
                                    <span className="value">{name}</span>
                                </div>
                                <div>
                                    <span className="key">Street:</span>
                                    <span className="value">{street}</span>
                                    <span className="key">City:</span>
                                    <span className="value">{city}</span>
                                </div>
                                <div>
                                    <span className="key">State:</span>
                                    <span className="value">{state}</span>
                                </div>
                                <div>
                                    <span className="key">Zip:</span>
                                    <span className="value">{zip}</span>
                                </div>
                                <div>
                                    <span className="key">Email:</span>
                                    <span className="value">{email}</span>
                                </div>
                                <div>
                                    <span className="key">Phone:</span>
                                    <span className="value">{cell_phone}</span>
                                </div>
                                <div>
                                    {
                                        isEmailCheckLoading &&  <span className="text-danger">Email is verifying</span>
                                    }
                                    {   !isEmailCheckLoading && isEmailNotValid &&
                                        <span className="text-danger">Please check email address</span>
                                    }
                                </div>

                            </div>
                            {/* { co_enabled && (
                                <div className="summary-contact-co">
                                    <div style={{ marginLeft: 10, marginBottom: 3 }}>Co-applicant</div>
                                    <div className="split"></div>
                                    { co_separate && (
                                        <div>
                                            <div style={{ marginTop: 10 }}>- Applicant completing form for co-applicant</div>
                                            <div style={{ marginTop: 5 }}>- Co-applicant does not have seperate email address</div>
                                        </div>
                                    ) }
                                    { !co_separate && (
                                        <div>
                                            <div className="email">
                                                <span className="email-label">Email:</span>
                                                <span>{co_email}</span>
                                            </div>
                                            
                                            { co_complete ? (
                                                <div className="description">Applicant completing form for co-applicant (other than signatures)</div>
                                            ) : (
                                                <div className="description">Applicant and co-applicant will each complete their own sections of each form</div>
                                            )}
                                        </div>
                                    ) }
                                </div>
                            ) } */}
                        </div>
                    </div>
                    <div className="documents">
                        <div className="title">Your Order Includes the Following Documents</div>
                        { order_type === 1 && (
                            <>
                                <div className="app-item">
                                    <span className="number">1.</span>
                                    <div className="details">
                                        Credit Application
                                    </div>
                                </div>
                                <div className="split"></div>
                            </>
                        ) }
                        { products.map((product, index) => {
                            const { 
                                product_type, price, tax,
                                coupon, total_discount, add_discount,
                                finance_period,
                                check,
                                cash_credit
                            } = product;
                            const net_price = parseFloat(price) * (100 - parseFloat(total_discount)) / 100 - parseFloat(add_discount) - parseInt(coupon)
                            const balance = net_price + parseFloat(tax);
                            const down_payment = parseFloat(cash_credit) + parseFloat(check);
                            const unpaid_balance = balance - down_payment;
                            if(unpaid_balance.toFixed(2) < 0 || balance.toFixed(2) <= 0 ) {
                                ifBalanceZero = true;
                            }
                            
                            return (
                                <div key={index}>
                                    <div className="app-item">
                                        <span className="number">{ order_type === 1 ? index+2 : index+1}.</span>
                                        <div className="details">
                                            <div className="item">
                                                <div>{product_options[product_type]} - ${balance.toFixed(2)}</div>
                                                <div className="subtitle">{finance_period} months</div>
                                                <div className="delete-btn" onClick={() => this.onDeleteProduct(index)}>
                                                    <img src={IconDelete} alt="view"></img>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="split"></div>
                                </div>
                            )
                        }) }
                       
                        {/* <div className="total">
                            <div>Total:</div>
                            <div>Price: ${total_price.toFixed(2)}</div>
                            <div>Unpaid Balance: ${total_unpaid.toFixed(2)}</div>
                            <div>Monthly: ${total_monthly.toFixed(2)}</div>
                        </div> */}

                        { unsaved && (
                            <div className="warning">
                                This order includes incomplete Sales Slips that have not been added to this order. Please Cancel unwanted Sales Slips or complete and add them to the order to continue.
                            </div>
                        ) }

                        { sent && (
                            <div className="info">
                                Documents have been sent to Customer.
                            </div>
                        )}
                    </div>
                </div>
                <Footer>
                    <Row>
                        <Col xs={6}>
                            <Button className={products.length < 2 ? "button product-button active" : "button product-button"} onClick={this.onAddSlip}>
                                 <span>Add New Sales Slip</span>
                            </Button>
                        </Col>
                        <Col xs={6}>
                            <Button
                                className={ buttonClassValue }
                                onClick={() => {
                                    if(!(isEmailCheckLoading || isEmailNotValid || ifBalanceZero)) {
                                        if (unsaved) {
                                            return;
                                        }
                                        this.setState({ confirmModal: true })
                                    }                                  
                                }}
                                disabled={ ((isEmailCheckLoading || isEmailNotValid || ifBalanceZero)) }>
                                <img src={IconEnvelops} alt="send" style={{ width: 26, height: 21 }} />
                                <span style={{ marginLeft: 10 }}>{
                                    ifBalanceZero ? 'Please check balance' :
                                ((isEmailCheckLoading || isEmailNotValid)) ? 'Email is not valid' : (sentOneTime ? 'Re-send to Customer': 'Send to Customer') }</span>
                            </Button>
                        </Col>
                    </Row>
                </Footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer
});

export default connect(
    mapStateToProps,
    {
        clearCustomer,
        sendAll,
        removeProduct,
        addProduct,
        changeCustomer,
        emailValidateRequest,
        resentSuccessRequest
    }
)(SummaryScreen);