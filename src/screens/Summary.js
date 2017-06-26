import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Modal } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';

import { product_options } from '../assets/options';

import { clearCustomer, sendAll, removeProduct } from '../redux/actions/customer';

class SummaryScreen extends Component {

    state = {
        sentModal: false
    }

    componentDidMount() {
        if (this.props.customer.contact.name === '') {
            this.props.history.replace('/');
        }
    }

    onBack = () => {
        this.props.history.goBack();
    }

    onDeleteProduct = (index) => {
        this.props.removeProduct(index);
    }

    onSendAll = () => {
        const { contact, products } = this.props.customer;
        let data = {
            contact: contact,
            products: products
        };

        this.props.sendAll(data);
        this.handleModalShow();
    }

    handleModalShow = () => {
        this.setState({ sentModal: true });
    }

    handleModalClose = () => {
        this.setState({ sentModal: false });
        // this.props.clearCustomer();
        // this.props.history.replace('/');
    }

    render() {
        const { contact, products } = this.props.customer;
        const { name, street, city, state, email, phone, zip, co_enabled, co_complete, co_separate, co_email } = contact;
        if (name === '') {
            return (
                <>
                </>
            );
        }

        // let total_price = 0, total_unpaid = 0, total_monthly = 0;
        // for (var i = 0; i < products.length; i ++) {
        //     const {
        //         product_type,
        //         price,
        //         total_discount,
        //         coupon,
        //         add_discount,
        //         cash_credit,
        //         check,
        //         finance_period
        //     } = products[i];
            
        //     const net_price = parseFloat(price) * (100 - parseFloat(total_discount)) / 100 - parseFloat(add_discount) - parseInt(coupon)

        //     const tax = product_type === "FOOD" ? 0 : net_price * 0.055;
        //     const balance = net_price + tax;
        //     const down_payment = parseFloat(cash_credit) + parseFloat(check);
        //     const unpaid_balance = balance - down_payment;
        //     let monthly_minimum = 0;
            
        //     if (product_type === 'FOOD') {
        //         monthly_minimum = finance_period === 0 ? 0 : unpaid_balance / finance_period;    
        //     } else if (product_type === 'FSP' || product_type === 'APP') {
        //         monthly_minimum = unpaid_balance * (finance_period === 36 ? 0.035 : finance_period === 48 ? 0.03 : 0);
        //     }

        //     total_price += parseFloat(price);
        //     total_unpaid += unpaid_balance;
        //     total_monthly += monthly_minimum;
        // }

        return (
            <>
                <Modal show={this.state.sentModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>Forms have been sent successfully.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Header history={this.props.history}>
                    <img src={require('../assets/images/icon-back.svg')} alt="back" className="icon-back" onClick={this.onBack} />
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
                                    <span className="value">{phone}</span>
                                </div>
                            </div>
                            { co_enabled && (
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
                            ) }
                        </div>
                    </div>
                    <div className="documents">
                        <div className="title">INCLUDED DOCUMENTS</div>
                        <div className="app-item">
                            <span className="number">1.</span>
                            <div className="details">
                                Credit Application
                            </div>
                        </div>
                        <div className="split"></div>
                        { products.map((product, index) => {
                            const { product_type, price, finance_period } = product;
                            return (
                                <div key={index}>
                                    <div className="app-item">
                                        <span className="number">{index+2}.</span>
                                        <div className="details">
                                            <div className="item">
                                                <div>{product_options[product_type]} - ${price}</div>
                                                <div className="subtitle">{finance_period} months</div>
                                                <div className="delete-btn" onClick={() => this.onDeleteProduct(index)}>
                                                    <img src={require('../assets/images/icon-delete.svg')} alt="view"></img>
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
                    </div>
                </div>
                <Footer>
                    <Button className="button" onClick={this.onSendAll}>
                        <img src={require('../assets/images/icon-envelopes.svg')} alt="send" style={{ width: 43, height: 38 }} />
                        <span style={{ marginLeft: 10 }}>SEND ALL</span>
                    </Button>
                </Footer>
            </>
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
        removeProduct
    }
)(SummaryScreen);