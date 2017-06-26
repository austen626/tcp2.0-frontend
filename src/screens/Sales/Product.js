import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';

import Header from '../../components/Sales/Header';
import Header2 from '../../components/Sales/Header2';
import Footer from '../../components/Sales/Footer';

import { RadioGroup } from '../../components/Checkbox';

import { addProduct, removeProduct, changeProduct, clearCustomer, changeCustomer } from '../../redux/actions/customer';
import { INITIAL_PRODUCT } from '../../redux/reducers/customer';

import { productOptions } from '../../assets/options';
import { IconHome } from '../../assets/images';
import { taxCalculationFlag, taxCalculationPrice } from './setTaxCaluculation';
class ProductScreen extends Component {

    state = {
        backModal: false,
        clearModal: false,
        clearFor: 'clear'   // clear, cancel
    }

    componentDidMount = () => {
        const id = parseInt(this.props.match.params.id);
        const { products, contact } = this.props.customer;
        const { main_app } = contact;
        const { product_type, price, tax } = products[id] || products;
     

        let taxIfPriceChange = 0;
        taxIfPriceChange = taxCalculationPrice(product_type, main_app.state, price, tax);
        this.changeState({
            tax: taxIfPriceChange, 
        })


        if (id >= products.length) {
            this.props.history.replace('/sales');
        }
    }

    changeState = (data) => {
        const id = parseInt(this.props.match.params.id);
        this.props.changeProduct(id, data);
    }

    changeCustomerState = (data) => {
        this.props.changeCustomer(data);
    }
    
    handleBackModalClose = () => {
        this.setState({ backModal: false });
    }

    handleBackModalYes = () => {
        this.props.clearCustomer();
        this.props.history.replace('/sales');
    }

    handleClearModalClose = () => {
        this.setState({ 
            clearModal: false,
            clearFor: 'clear'
        });
    }

    handleClearModalYes = () => {
        const { clearFor } = this.state;
        if(clearFor === 'cancel') {
            const { customer, history } = this.props;
            const id = parseInt(this.props.match.params.id);
            const { contact } = customer;
            this.props.removeProduct(id);
            if(contact && contact.type && contact.type === 'preorder') {
                history.push('/preapprovals');
            } else {
                this.setState({ 
                    clearModal: false
                })
                if (id === 0) {
                    history.replace('/contact');
                } else {
                    history.replace('/summary');
                }
            }
        } else {
            this.changeState({
                ...INITIAL_PRODUCT
            });
        }
       
        this.setState({ 
            clearModal: false,
            clearFor: 'clear'
        });
    }

    onCancel = () => {
        this.setState({
            clearFor: 'cancel',
            clearModal: true
        });
    }

    onSave = () => {
        this.changeState({ saved: true });
        this.props.history.replace('/summary');
    }

    changeProductType = (type, price) => {
        const id = parseInt(this.props.match.params.id);
        const { contact, products } = this.props.customer;    
        const { main_app } = contact;

        const { tax } = products[id] || products;

        let taxIfPriceChange = 0;
        taxIfPriceChange = taxCalculationPrice(type, main_app.state, price, tax);
        this.changeState({
            product_type: type,
            tax: taxIfPriceChange
        });
    }

    validateInput = (origin, target) => {
        if (target === "") {
            return "0";
        }
        if (origin === 0) {
            return target.replace("0", "")
        }
        if (target.length >= 2 && target[0] === "0" && target[1] !== ".") {
            return target.substring(1);
        }
        return target;
    }

    renderListPrice = () => {
        const id = parseInt(this.props.match.params.id);
        const { price, tax, product_type } = this.props.customer.products[id];
        return (
            <Form.Group>
                <Form.Label>List Price</Form.Label>
                <div style={{ position: 'relative' }}>
                    <span className="input_symbol">$</span>
                    <Form.Control
                        value={price}
                        onChange={e => {
                            this.taxPrice(this.validateInput(price, e.target.value), tax, product_type);
                            this.changeState({price: this.validateInput(price, e.target.value)})
                        }}
                        type="number"
                    />
                </div>
            </Form.Group>
        )
    }

    taxPrice = (price, taxValue, product_type) => {
        let taxIfPriceChange = 0;
        const { contact } = this.props.customer;
        const { main_app } = contact;
        taxIfPriceChange = taxCalculationPrice(product_type, main_app.state, price, taxValue);
        this.changeState({
            tax: taxIfPriceChange
        });
    }
    renderAddDiscount = () => {
        const id = parseInt(this.props.match.params.id);
        const { add_discount } = this.props.customer.products[id];
        return (
            <Form.Group>
                <Form.Label>Add. discount</Form.Label>
                <div style={{ position: 'relative' }}>
                    <span className="input_symbol">$</span>
                    <Form.Control
                        value={add_discount}
                        onChange={e => this.changeState({add_discount: this.validateInput(add_discount, e.target.value)})}
                        type="number"
                    />
                </div>
            </Form.Group>
        )
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
        const { clearFor } = this.state;
        const id = parseInt(this.props.match.params.id);
        const { products, contact } = this.props.customer;        
        const { main_app } = contact;
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
            tax,
            cash_credit,
            check,
            finance_period,
            makemodel,
            saved
        } = products[id];

        const net_price = parseFloat(price) * (100 - parseFloat(total_discount)) / 100 - parseFloat(add_discount) - parseInt(coupon)

        const balance = net_price + parseFloat(tax);
        const down_payment = parseFloat(cash_credit) + parseFloat(check);
        const unpaid_balance = balance - down_payment;
        let monthly_minimum = 0;
        
        if (product_type === 'FOOD') {
            monthly_minimum = finance_period === 0 ? 0 : unpaid_balance / finance_period;    
        } else if (product_type === 'FSP' || product_type === 'APP') {
            monthly_minimum = unpaid_balance * (finance_period === 36 ? 0.035 : finance_period === 48 ? 0.03 : 0);
        }

        const activeState =
            product_type !== ''&&
            !isNaN(parseFloat(price)) &&
            parseFloat(price) !== 0 &&
            !isNaN(parseFloat(tax)) &&
            !isNaN(parseFloat(total_discount)) &&
            !isNaN(parseFloat(add_discount)) &&
            !isNaN(parseInt(coupon)) &&
            !isNaN(parseFloat(cash_credit)) &&
            !isNaN(parseFloat(check)) &&
            !(unpaid_balance > 0 && finance_period === 0)

        let options = productOptions;
        if (products.length >= 1) {
            if (id !== 0) {
                options = options.filter(option => option.value !== products[0].product_type);
            }
            if (products.length === 2 && id !== 1) {
                options = options.filter(option => option.value !== products[1].product_type);
            }
        }
        return (
            <div className="sales">
                <Modal show={this.state.backModal} onHide={this.handleBackModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p>Returning to the Start Screen will cause you to lose all progress on this customer.</p>
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
                <Modal show={this.state.clearModal} onHide={this.handleClearModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                    <p>{ clearFor === 'cancel' ? 'Cancelling' : 'Clearing'} this form will cause you to lose all progress on this Sales Slip.</p>
                        <p>Are you sure you want to continue?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClearModalClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleClearModalYes}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Header history={this.props.history}>
                    <img src={IconHome} alt="home" className="icon-home" onClick={() => this.setState({ backModal: true })} />
                </Header>
                <div className="main product-page">
                    <Header2
                        id={id}
                        history={this.props.history}
                    />
                    <div className="container">

                        <Form.Group>
                            <RadioGroup options={options} value={product_type} onChangeValue={val => this.changeProductType(val, price)} />
                        </Form.Group>

                        { product_type !== '' && (
                            <div>
                                <div className="good-or-services">
                                    <textarea
                                        value={makemodel}
                                        onChange={e => {
                                            const value = e.target.value;
                                            if ((value.match(/\n/g) || []).length < 6) {
                                                this.changeState({ makemodel: value });
                                            }
                                        }}
                                    />
                                </div>
                                { product_type === 'FOOD' ? (
                                    <>
                                        <Row>
                                            <Col xs={4} className="pr-26">
                                                { this.renderListPrice() }
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
                                                { this.renderAddDiscount() }
                                            </Col>
                                        </Row>
                                    </>
                                ) : (
                                    <Row>
                                        <Col xs={4} className="pr-26">
                                            { this.renderListPrice() }
                                        </Col>
                                        <Col xs={4} className="pr-26">
                                            { this.renderAddDiscount() }
                                        </Col>
                                        <Col xs={4}>
                                            { this.renderCouponGroup() }
                                        </Col>
                                    </Row>
                                )}

                                <Row>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Net Price</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={net_price.toFixed(2)}
                                                    disabled
                                                />
                                            </div>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Tax</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={tax}
                                                    onChange={e => {
                                                        this.changeState({ tax: parseFloat(this.validateInput(tax, e.target.value)).toFixed(2) })}
                                                    }
                                                    type="number"
                                                    className={  taxCalculationFlag(product_type, main_app.state) ? 'not-allowed' : ''}
                                                    disabled={ taxCalculationFlag(product_type, main_app.state) }
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
                                <div className="deposit-amounts">DEPOSIT AMOUNTS</div>
                                <Row>
                                    <Col xs={4} className="pr-26">
                                        <Form.Group>
                                            <Form.Label>Cash / Credit</Form.Label>
                                            <div style={{ position: 'relative' }}>
                                                <span className="input_symbol">$</span>
                                                <Form.Control
                                                    value={cash_credit}
                                                    onChange={e => this.changeState({cash_credit: this.validateInput(cash_credit, e.target.value) })}
                                                    type="number"
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
                                                    onChange={e => this.changeState({check: this.validateInput(check, e.target.value) })}
                                                    type="number"
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
                                            <Form.Label>Finance Period</Form.Label>
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
                    { activeState && (
                        <Row>                        
                            <Col xs={6} style={{ textAlign: 'right' }}>
                                {
                                    (unpaid_balance.toFixed(2) < 0 || balance.toFixed(2) <= 0) ?
                                    <Button>Please check your entry</Button> :
                                    <Button className="button product-button active" onClick={this.onSave}>
                                        { saved ? "SAVE CHANGES" : "ADD TO ORDER" }
                                    </Button>
                                }
                            </Col>
                            <Col xs={6} style={{ textAlign: 'center' }}>
                                <Button className="button product-button active" onClick={() => this.setState({ clearModal: true })}>
                                    CLEAR
                                </Button>
                            </Col>
                        </Row>
                    )}
                    { !activeState && (
                        <Button className="button product-button active" onClick={this.onCancel}>
                            CANCEL
                        </Button>
                    )}
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
        addProduct,
        removeProduct,
        changeProduct,
        clearCustomer,
        changeCustomer
    }
)(ProductScreen);