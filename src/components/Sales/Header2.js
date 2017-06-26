import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,  Row, Col } from 'react-bootstrap';

import { product_options } from '../../assets/options';

import { IconContactAcitve, IconContactInAcitve, IconSummaryActive, IconSummaryInActive, IconArrowLeft } from '../../assets/images';

class Header2 extends Component {

    clickProduct = (id) => {
        if (id === -1) {
            this.props.history.replace('/contact');
            return;
        }
        this.props.history.replace(`/product/${id}`);
    }

    clickSummary = () => {
        this.props.history.replace('/summary');
    }

    render() {
        const { id, customer, onSummary, handleArrowBack, displayBack, disableRowClick } = this.props;
        const { products } = customer;
        const count = products.length;
        const xs = 12 / count;
        
        return (
            <div className="header2">
                <div style={{ height: 9, backgroundColor: '#b2d8f7' }}></div>
                { id === -1 && count === 0 && (
                    <div>
                        {
                            displayBack && <div className="position-absolute top-left back-cursor pt-3 mt-0">
                            <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                        </div>
                        }
                        
                        <Button className="active" onClick={() => !disableRowClick && this.clickProduct(-1)}>
                        <img src={IconContactAcitve} alt="contact" />
                            { count === 0 && (
                                <span style={{ marginLeft: 7 }}>Customer Details</span>
                            ) }
                        </Button>
                    </div>
                   
                ) }
                { (id !== -1 || count !== 0)  && (
                    <div className="header2-main">
                        {
                            displayBack && <div className="position-absolute top-left back-cursor pt-3 mt-0">
                            <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                        </div>
                        }
                        <div className="header2-contact">
                            <Button className={id === -1 ? "active" : ""} onClick={() => this.clickProduct(-1)}>
                                <img src={id === -1 ? IconContactAcitve: IconContactInAcitve} alt="contact" />
                            </Button>
                        </div>
                        <div className="header2-products">
                            <Row>
                                { [...Array(count)].map((value, key) => {
                                    const product = products[key];
                                    const { 
                                        product_type, price, tax,
                                        coupon, total_discount, add_discount
                                    } = product;
                                    const net_price = parseFloat(price) * (100 - parseFloat(total_discount)) / 100 - parseFloat(add_discount) - parseInt(coupon)
                                    const balance = net_price + parseFloat(tax);
                                    // const title = product_type === '' ? `SALES SLIP ${key+1}` :` ${product_options[product_type]} ${price === 0 ? '' : `$${price}`}`;
                                    const title = product_type === '' ? `SALES SLIP ${key+1}` :` ${product_options[product_type]} ${balance === 0 ? '' : `$${balance.toFixed(2)}`}`;
                                    return (
                                        <Col key={key} xs={xs} className="pr-6">
                                            <Button className={key === id ? "active" : ""}  onClick={() => this.clickProduct(key)}>
                                                {title}
                                            </Button>
                                        </Col>
                                    );
                                }) }
                            </Row>
                        </div>
                        <div className="header2-summary">
                            <Button className={id === -2 ? "active": ""} onClick={onSummary ? onSummary : this.clickSummary }>
                                <img src={id === -2 ? IconSummaryActive: IconSummaryInActive} alt="contact" />
                            </Button>
                        </div>
                    </div>
                ) }
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

    }
)(Header2);