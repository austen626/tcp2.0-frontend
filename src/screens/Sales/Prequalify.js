import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col, Modal } from 'react-bootstrap';

import InputMask from 'react-input-mask';

import Header from '../../components/Sales/Header';
import Footer from '../../components/Sales/Footer';

import Checkbox from '../../components/Checkbox';

import { states_info } from '../../assets/options';
import { IconHome } from '../../assets/images';

import { changeCustomer, clearCustomer, sendPrequalify } from '../../redux/actions/customer';

class PrequalifyScreen extends Component {

    state = {
        validated: false,
        sentModal: false
    }

    changeState = (data) => {
        this.props.changeCustomer(data);
    }

    onBack = () => {
        this.props.clearCustomer();
        this.props.history.replace('/sales');
    }

    onSend = () => {
        const {
            name, street, city, state, phone, zip,            
            co_name, co_street, co_city, co_state, co_phone, co_zip, co_enabled
        } = this.props.customer.contact;
        let body = {
            name,
            street,
            city,
            state,
            zip,
            phone,
            co_name,
            co_street,
            co_city,
            co_state,
            co_phone,
            co_zip,
            co_enabled
        }
        this.props.sendPrequalify(body);
        this.setState({ sentModal: true });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ validated: true });

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.onSend();
        }
    }

    handleModalClose = () => {
        this.setState({ sentModal: false });
    }

    render() {
        const validated = this.state.validated;
        const {
            name, street, city, state, phone, zip,
            co_name, same_address, co_street, co_city, co_state, co_phone, co_zip,
            co_enabled
        } = this.props.customer.contact;
        return (
            <div className="sales">
                <Modal show={this.state.sentModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>Forms have been sent successfully.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
                    <Header history={this.props.history}>
                        <img src={IconHome} alt="home" className="icon-home" onClick={this.onBack} />
                    </Header>
                    <div className="main">
                        <div className="header2">
                            <div style={{ height: 9, backgroundColor: '#b2d8f7' }}></div>
                            <Button className="active">
                                <span>Prequalify</span>
                            </Button>
                        </div>
                        <div className="container" >

                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
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
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    required
                                    value={street}
                                    onChange={e => this.changeState({street: e.target.value}) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    required
                                    value={city}
                                    onChange={e => this.changeState({city: e.target.value}) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>State</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={state}
                                    onChange={e => this.changeState({state: e.target.value}) }
                                >
                                    { state === "" && (
                                        <option value="">Choose...</option>
                                    )}
                                    { states_info.map(info => (
                                        <option key={info.abbreviation} value={info.name}>{info.name}</option>
                                    )) }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>ZIP Number</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    type="number"
                                    required
                                    value={zip}
                                    onChange={e => this.changeState({zip: e.target.value}) }
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Phone</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <InputMask
                                    required
                                    className="form-control"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    mask="9999999999"
                                    maskChar=""
                                    value={phone}
                                    onChange={e => this.changeState({ phone: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Checkbox
                                    checked={co_enabled}
                                    onChange={() => {
                                        if (co_enabled) {
                                            this.changeState({
                                                co_enabled: !co_enabled,
                                                same_address: false,
                                                co_street: '',
                                                co_city: '',
                                                co_state: '',
                                                co_zip: ''
                                            });
                                        } else {
                                            this.changeState({co_enabled: !co_enabled});
                                        }
                                    }}
                                    label="Add co-applicant"
                                />
                            </Form.Group>
                            { co_enabled && (
                                <div style={{ marginTop: 30, marginBottom: 20 }}>
                                    <Form.Group>
                                        <Form.Label>Co-applicant Name</Form.Label>
                                        <Form.Label className="form-label-required">required</Form.Label>
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
                                            onChange={() => {
                                                if (!same_address) {
                                                    this.changeState({
                                                        same_address: !same_address,
                                                        co_street: street,
                                                        co_city: city,
                                                        co_state: state,
                                                        co_zip: zip
                                                    });
                                                } else {
                                                    this.changeState({same_address: !same_address});
                                                }
                                            }}
                                            label="same address"
                                        />
                                    </Form.Group> 
                                    
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
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer>
                        <Button type="submit" className="button">SEND</Button>
                    </Footer>
                </Form>
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
        changeCustomer,
        clearCustomer,
        sendPrequalify
    }
)(PrequalifyScreen);
