import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Header2 from '../components/Header2';
import Checkbox, { RadioGroup } from '../components/Checkbox';

import { addProduct, removeProduct, changeProduct } from '../redux/actions/customer';

import { fsp_price, fsp_options, app_options, productOptions } from '../assets/options';
import { INITIAL_PRODUCT } from '../redux/reducers/customer';

class ProductScreen extends Component {

    state = {
        addErrorModal: false
    }

    componentDidMount = () => {
        const id = parseInt(this.props.match.params.id);
        const { contact, products } = this.props.customer;
        const { name } = contact;
        if (name === '' || isNaN(id)) {
            this.props.history.replace('/');
        }
        if (id >= products.length) {
            this.props.history.replace('/');
        }
    }

    changeState = (data) => {
        const id = parseInt(this.props.match.params.id);
        this.props.changeProduct(id, data);
    }

    onBack = () => {
        this.props.removeProduct();
        this.props.history.goBack();
    }

    handleModalClose = () => {
        this.setState({ addErrorModal: false });
    }

    onAddProduct = () => {
        const { products } = this.props.customer;
        if (products.length >= 2) {
            this.setState({ addErrorModal: true });
            return;
        }
        const id = parseInt(this.props.match.params.id);
        const { product_type } = products[id];
        if (product_type === "") {
            return;
        }

        this.props.addProduct();
        this.props.history.replace(`/product/${parseInt(this.props.match.params.id)+1}`);
    }

    onReviewOrder = () => {
        const { products } = this.props.customer;
        const length = products.length;
        const { product_type } = products[length - 1];
        if (length === 1 && product_type === "") {
            return;
        }
        if (product_type === '') {
            this.props.removeProduct();
        }
        this.props.history.push('/summary');
    }

    changeProductType = (type) => {
        let price = 0;
        if (type === 'FOOD') {
            price = 1298;
        } else if (type === 'APP') {
            price = 2899;
        } else if (type === 'FSP') {
            price = 3799;
        }
        this.changeState({
            ...INITIAL_PRODUCT,
            product_type: type,
            price: price
        });
    }
    renderCouponGroup = () => {
        const id = parseInt(this.props.match.params.id);
        const coupon = this.props.customer.products[id].coupon;
        return (
            <Form.Group>
                <Form.Label>Coupon</Form.Label>
                <Form.Control
                    as="select"
                    value={coupon}
                    onChange={e => this.changeState({coupon: e.target.value})}
                >
                    <option value={0}>$0</option>
                    <option value={25}>$25</option>
                    <option value={50}>$50</option>
                    <option value={75}>$75</option>
                    <option value={100}>$100</option>
                    <option value={125}>$125</option>
                    <option value={150}>$150</option>
                    <option value={175}>$175</option>
                    <option value={200}>$200</option>
                </Form.Control>
            </Form.Group>
        )
    }

    render() {
        const id = parseInt(this.props.match.params.id);
        const { products } = this.props.customer;
        if (isNaN(id) || id >= products.length) {
            return (
                <div>

                </div>
            )
        }
        const {
            product_type,
            price,
            total_discount,
            coupon,
            add_discount,
            cash_credit,
            check,
            finance_period                        
        } = this.props.customer.products[id];

        const net_price = parseFloat(price) * (100 - parseFloat(total_discount)) / 100 - parseFloat(add_discount) - parseInt(coupon)

        const tax = product_type === "FOOD" ? 0 : net_price * 0.055;
        const balance = net_price + tax;
        const down_payment = parseFloat(cash_credit) + parseFloat(check);
        const unpaid_balance = balance - down_payment;
        let monthly_minimum = 0;
        
        if (product_type === 'FOOD') {
            monthly_minimum = finance_period === 0 ? 0 : unpaid_balance / finance_period;    
        } else if (product_type === 'FSP' || product_type === 'APP') {
            monthly_minimum = unpaid_balance * (finance_period === 36 ? 0.035 : finance_period === 48 ? 0.03 : 0);
        }


        return (
            <>
                <Modal show={this.state.addErrorModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>Can't add more than 2 products</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Header history={this.props.history}>
                    <img src={require('../assets/images/icon-back.svg')} alt="back" className="icon-back" onClick={this.onBack} />
                </Header>
                <div className="main product-page">
                    <Header2
                        id={id}
                        history={this.props.history}
                        onSummary={this.onReviewOrder}
                    />
                    <div className="container">

                        <Form.Group>
                            <RadioGroup options={productOptions} value={product_type} onChangeValue={val => this.changeProductType(val)} />
                        </Form.Group>

                        { product_type !== '' && (
                            <div>
                                { product_type === 'FOOD' ? (
                                    <>
                                        <Row>
                                            <Col xs={4} className="pr-26">
                                                <Form.Group>
                                                    <Form.Label>List Price</Form.Label>
                                                    <div style={{ position: 'relative' }}>
                                                        <span className="input_symbol">$</span>
                                                        <Form.Control
                                                            value={price}
                                                            onChange={e => this.changeState({price: e.target.value})}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col xs={4} className="pr-26">
                                                <Form.Group>
                                                    <Form.Label>Total Discount</Form.Label>
                                                    <Form.Control
                                                        as="select"
                                                        value={total_discount}
                                                        onChange={e => this.changeState({total_discount: e.target.value})}
                                                    >
                                                        <option value={0}>0%</option>
                                                        <option value={5}>5%</option>
                                                        <option value={10}>10%</option>
                                                        <option value={15}>15%</option>
                                                        <option value={20}>20%</option>
                                                        <option value={25}>25%</option>
                                                        <option value={30}>30%</option>
                                                        <option value={35}>35%</option>
                                                        <option value={40}>40%</option>
                                                        <option value={45}>45%</option>
                                                    </Form.Control>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={4} className="pr-26">
                                                { this.renderCouponGroup() }
                                            </Col>
                                            <Col xs={4}>
                                                <Form.Group>
                                                    <Form.Label>Add. discount</Form.Label>
                                                    <div style={{ position: 'relative' }}>
                                                        <span className="input_symbol">$</span>
                                                        <Form.Control
                                                            value={add_discount}
                                                            onChange={e => this.changeState({add_discount: e.target.value})}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <Row>
                                        <Col xs={4} className="pr-26">
                                            <Form.Group>
                                                <Form.Label>List Price</Form.Label>
                                                <div style={{ position: 'relative' }}>
                                                    <span className="input_symbol">$</span>
                                                    <Form.Control
                                                        value={price}
                                                        onChange={e => this.changeState({price: e.target.value})}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4} className="pr-26">
                                            <Form.Group>
                                                <Form.Label>Add. discount</Form.Label>
                                                <div style={{ position: 'relative' }}>
                                                    <span className="input_symbol">$</span>
                                                    <Form.Control
                                                        value={add_discount}
                                                        onChange={e => this.changeState({add_discount: e.target.value})}
                                                    />
                                                </div>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={4}>
                                            { this.renderCouponGroup() }
                                        </Col>
                                    </Row>
                                )}

                                <Row>
                                    <Col xs={4} className="pr-26">
                                        { product_type === "FOOD" && (
                                            <Form.Group>
                                                <Form.Label>Net Price</Form.Label>
                                                <div style={{ position: 'relative' }}>
                                                    <span className="input_symbol">$</span>
                                                    <Form.Control
                                                        value={net_price}
                                                        disabled
                                                    />
                                                </div>
                                            </Form.Group>    
                                        ) }
                                        { product_type !== "FOOD" && (
                                            <Form.Group>
                                                <Form.Label>Net Price</Form.Label>
                                                <div style={{ position: 'relative' }}>
                                                    <span className="input_symbol">$</span>
                                                    <Form.Control
                                                        disabled
                                                        value={net_price}
                                                    />
                                                </div>
                                            </Form.Group>
                                        ) }
                                    </Col>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Tax</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={tax.toFixed(2)}
                                                    disabled
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Label>Balance</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    disabled
                                                    value={balance.toFixed(2)}
                                                    className="fixed_input"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Cash / Credit</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={cash_credit}
                                                    onChange={e => this.changeState({cash_credit: e.target.value})}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Check</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={check}
                                                    onChange={e => this.changeState({check: e.target.value})}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4}>
                                        <Form.Group>
                                            <Form.Label>Down Payment</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    disabled
                                                    value={down_payment}
                                                    className="fixed_input"
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: 15, marginBottom: 20 }}>
                                    <Col xs={4}></Col>
                                    <Col xs={4} style={{ textAlign: 'right', paddingRight: 15, marginTop: 8 }}>
                                        <Form.Label>Unpaid Balance</Form.Label>             
                                    </Col>
                                    <Col xs={4}>
                                        <span className="input_symbol">$</span>
                                        <Form.Control
                                            disabled
                                            value={unpaid_balance.toFixed(2)}
                                            className="fixed_input"
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={6} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Fianace Period</Form.Label>
                                            <Form.Control
                                                as="select"
                                                value={finance_period}
                                                onChange={e => this.changeState({finance_period: parseInt(e.target.value)})}
                                            >
                                                { (product_type === 'FSP' || product_type === 'APP') && (
                                                    <>
                                                        <option value={0}>0 months</option>
                                                        <option value={36}>36 months</option>
                                                        <option value={48}>48 months</option>
                                                    </>
                                                )}
                                                { product_type === 'FOOD' && (
                                                    [...Array(13)].map((val, index) => (
                                                        <option key={`month_${index}`} value={index}>{index} months</option>
                                                    ))
                                                )}
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6}>
                                        <Form.Group>
                                            <Form.Label>Monthly Minimum</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    disabled
                                                    value={monthly_minimum.toFixed(2)}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                        )}
                    </div>

                    { product_type !== '' && (
                        <div className="total">
                            <span>Price: {price}</span>
                            <span style={{ marginLeft: 25 }}>Unpaid : {unpaid_balance.toFixed(2)}</span>
                            <span style={{ marginLeft: 25 }}>Monthly: {monthly_minimum.toFixed(2)}</span>
                        </div>
                    ) }
                </div>
                <Footer>
                    <Row>
                        <Col xs={6} style={{ textAlign: 'right', paddingRight: 15 }}>
                            <Button className="product-button button" onClick={this.onAddProduct}>ADD PRODUCT</Button>
                        </Col>
                        <Col xs={6} style={{ textAlign: 'left', paddingLeft: 15 }}>
                            <Button className="product-button button" onClick={this.onReviewOrder}>REVIEW ORDER</Button>
                        </Col>
                    </Row>
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
        addProduct,
        removeProduct,
        changeProduct
    }
)(ProductScreen);