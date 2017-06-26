import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';

import Header from '../components/Header';
import Footer from '../components/Footer';

import Header2 from '../components/Header2';
import Checkbox from '../components/Checkbox';

import { changeCustomer, clearCustomer, addProduct } from '../redux/actions/customer';

class ContactScreen extends Component {

    state = {
        validated: false
    }

    changeState = (data) => {
        this.props.changeCustomer(data);
    }

    onBack = () => {
        this.props.clearCustomer();
        this.props.history.goBack();
    }

    onNext = () => {
        const { name } = this.props.customer.contact;
        if (name === '') {
            return;
        }
        if (this.props.customer.products.length === 0) {
            this.props.addProduct();
        }
        this.props.history.push('/product/0');
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ validated: true });

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.onNext();
        }
    }

    render() {
        const validated = this.state.validated;
        const {
            name, street, city, state, phone, zip, email,
            co_name, same_address, co_street, co_city, co_state, co_phone, co_zip, co_email,
            co_enabled, co_complete, co_separate
        } = this.props.customer.contact;
        return (
            <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                <Header history={this.props.history}>
                    <img src={require('../assets/images/icon-back.svg')} alt="back" className="icon-back" onClick={this.onBack} />
                </Header>
                <div className="main">
                    <Header2
                        id={-1}
                        history={this.props.history}
                    />
                    <div className="container" >

                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                value={name}
                                onChange={e => this.changeState({name: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group className="group-address">
                            <Form.Label>Address</Form.Label>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Street</Form.Label>
                            <Form.Control
                                required
                                value={street}
                                onChange={e => this.changeState({street: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                required
                                value={city}
                                onChange={e => this.changeState({city: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                required
                                value={state}
                                onChange={e => this.changeState({state: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>ZIP Number</Form.Label>
                            <Form.Control
                                required
                                value={zip}
                                onChange={e => this.changeState({zip: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                required
                                value={phone}
                                onChange={e => this.changeState({phone: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Checkbox
                                checked={co_enabled}
                                onChange={() => this.changeState({co_enabled: !co_enabled})}
                                label="Add co-applicant"
                            />
                        </Form.Group>
                        { co_enabled && (
                            <div style={{ marginTop: 30, marginBottom: 20 }}>
                                <Form.Group>
                                    <Form.Label>Co-applicant Name</Form.Label>
                                    <Form.Control
                                        required
                                        value={co_name}
                                        onChange={e => this.changeState({co_name: e.target.value}) }
                                    />
                                </Form.Group>
                                <Form.Group className="group-address">
                                    <Form.Label>Address</Form.Label>
                                </Form.Group>
                                <Form.Group style={{ marginTop: 10 }}>
                                    <Checkbox
                                        checked={same_address}
                                        onChange={() => this.changeState({same_address: !same_address})}
                                        label="same address"
                                    />
                                </Form.Group>
                                { !same_address && (
                                    <>
                                        <Form.Group>
                                            <Form.Label>Street</Form.Label>
                                            <Form.Control
                                                required
                                                value={co_street}
                                                onChange={e => this.changeState({co_street: e.target.value}) }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                required
                                                value={co_city}
                                                onChange={e => this.changeState({co_city: e.target.value}) }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>State</Form.Label>
                                            <Form.Control
                                                required
                                                value={co_state}
                                                onChange={e => this.changeState({co_state: e.target.value}) }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>ZIP Number</Form.Label>
                                            <Form.Control
                                                required
                                                value={co_zip}
                                                onChange={e => this.changeState({co_zip: e.target.value}) }
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Phone</Form.Label>
                                            <Form.Control
                                                required
                                                value={co_phone}
                                                onChange={e => this.changeState({co_phone: e.target.value}) }
                                            />
                                        </Form.Group>
                                    </>
                                ) }
                                
                            </div>
                        )}
                        <Form.Group style={{ marginTop: 30 }}>
                            <Form.Label>Applicant Email</Form.Label>
                            <Form.Control
                                required
                                value={email}
                                onChange={e => this.changeState({email: e.target.value}) }
                            />
                        </Form.Group>

                        { co_enabled && (
                            <>
                                <Form.Group>
                                    <Checkbox
                                        checked={co_complete}
                                        onChange={() => this.changeState({co_complete: !co_complete, co_separate: false})}
                                        label="Completing form for co-applicant"
                                    />
                                </Form.Group>
                                <Form.Group style={{ marginTop: 30 }}>
                                    <Form.Label>Co-applicant Email*</Form.Label>
                                    <Form.Control
                                        style={{ opacity: co_complete && co_separate ? 0.5 : 1 }}
                                        required={!co_complete || !co_separate}
                                        disabled={co_complete && co_separate}
                                        value={co_email}
                                        onChange={e => this.changeState({co_email: e.target.value}) }
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Checkbox
                                        checked={co_separate}
                                        disabled={!co_complete}
                                        onChange={() => this.changeState({co_separate: !co_separate})}
                                        label="Co-applicant does not have separate email address"
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="co-used-label">*will be used only for collecting e-signatures</Form.Label>
                                </Form.Group>
                            </>
                        ) }
                    </div>
                </div>
                <Footer>
                    <Button type="submit" className="button">NEXT</Button>
                </Footer>
            </Form>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer
});

export default connect(
    mapStateToProps,
    {
        changeCustomer,
        clearCustomer,
        addProduct
    }
)(ContactScreen);