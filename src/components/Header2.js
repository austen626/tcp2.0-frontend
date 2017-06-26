import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button,  Row, Col } from 'react-bootstrap';

import { product_options } from '../assets/options';
import { IconArrowLeft } from  '../../assets/images';
const iconContactAcitve = require('../assets/images/icon-contact-active.svg');
const iconContactInAcitve = require('../assets/images/icon-contact-inactive.svg');
const iconSummaryActive = require('../assets/images/icon-summary-active.svg');
const iconSummaryInActive = require('../assets/images/icon-summary-inactive.svg');

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
        const { id, customer, onSummary, displayBack, handleArrowBack, disableRowClick } = this.props;
        const { products } = customer;
        const count = products.length;
        const xs = 12 / count;
        return (
            <div className="header2">
                <div style={{ height: 9, backgroundColor: '#b2d8f7' }}></div>
                { id === -1 && count === 0 && (
                    <>
                        {
                            displayBack && <div className="position-absolute top-left back-cursor pt-3 mt-0">
                                <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                            </div>
                        }
                        <Button className="active" onClick={() => !disableRowClick && this.clickProduct(-1)}>
                            <img src={iconContactAcitve} alt="contact" />
                            { count === 0 && (
                                <span style={{ marginLeft: 7 }}>Contact Details</span>
                            ) }
                        </Button>
                    </>
                ) }
                { (id !== -1 || count !== 0)  && (
                    <div className="header2-main">
                        <div className="header2-contact">
                            <Button className={id === -1 ? "active" : ""} onClick={() => this.clickProduct(-1)}>
                                <img src={id === -1 ? iconContactAcitve: iconContactInAcitve} alt="contact" />
                            </Button>
                        </div>
                        <div className="header2-products">
                            <Row>
                                { [...Array(count)].map((value, key) => {
                                    const product = products[key];
                                    const { product_type, price } = product;
                                    const title = product_type === '' ? `Product No. ${key+1}` :` ${product_options[product_type]} ${price === 0 ? '' : `$${price}`}`;
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
                                <img src={id === -2 ? iconSummaryActive: iconSummaryInActive} alt="contact" />
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