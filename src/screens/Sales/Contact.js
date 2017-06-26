import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';

import InputMask from 'react-input-mask';

import Header from '../../components/Sales/Header';
import Footer from '../../components/Sales/Footer';

import Header2 from '../../components/Sales/Header2';
import Checkbox from '../../components/Checkbox';

import { states_info } from '../../assets/options';
import { IconHome, IconArrowLeft } from '../../assets/images';

import { 
    changeCustomerContact, 
    changeCustomer, 
    clearCustomer, 
    addProduct,
    emailValidateRequest
} from '../../redux/actions/customer';

class ContactScreen extends Component {

    state = {
        validated: false,
        backModal: false
    }

    changeState = (data) => {
        this.props.changeCustomer(data);
    }

    changeFormState = (key, value, role = "main") => {
        this.props.changeCustomerContact(key, value, role);
    }

    onNext = () => {
        // const { name } = this.props.customer.contact;
        // if (name === '') {
        //     return;
        // }
        if (this.props.customer.products.length === 0) {
            this.props.addProduct();
        }
        this.props.history.replace('/product/0');
        
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

    handleModalClose = () => {
        this.setState({ backModal: false });
    }

    handleModalYes = () => {
        this.props.clearCustomer();
        this.props.history.replace('/');
    }

    onSameAddressChecked = (app) => {
        this.changeFormState('street', app.street, 'co')
        this.changeFormState('city', app.city, 'co')
        this.changeFormState('state', app.state, 'co')
        this.changeFormState('zip', app.zip, 'co')
        this.changeFormState('cell_phone', app.cell_phone, 'co')
    }

    
    setSameEmailAddress = (app) => {
        this.changeFormState('email', app.email, 'co')
    }
    renderApplicantForm = (app, role, mainData) => {
        const { same_address }= this.props.customer.contact;
        return (
            <>
                <Form.Label className="group-label">PERSONAL INFORMATION</Form.Label>
                <Form.Group>
                    <Form.Label>{ role === "main" ?  "" : "Co-applicant "}Name</Form.Label>
                    <Form.Label className="form-label-required">required</Form.Label>
                    <Form.Control
                        required
                        autoComplete="none"
                        value={app.name || ''}
                        onChange={e => this.changeFormState("name", e.target.value, role) }
                    />
                </Form.Group>                
                <Form.Label className="group-label">Address</Form.Label>
                {
                    role === "co" && 
                    <Form.Group>
                        <Checkbox
                            checked={same_address}
                            onChange={() => {
                                this.changeState({same_address: !same_address });
                                if (!same_address) {                                   
                                    this.setState({same_address: !same_address});
                                    this.onSameAddressChecked(mainData);
                                }
                            } }
                            label="Same Address"
                        />
                    </Form.Group>
                }
                <Form.Group>
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                        required
                        autoComplete="none"
                        value={app.street || ''}
                        onChange={e => this.changeFormState("street", e.target.value, role) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        required
                        autoComplete="none"
                        value={app.city || ''}
                        onChange={e => this.changeFormState("city", e.target.value, role) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                        required
                        autoComplete="none"
                        as="select"
                        value={app.state || ''}
                        onChange={e => {
                            this.changeFormState("state", e.target.value, role);
                                              
                        } }
                    >
                        { (app.state === undefined || app.state === "") && (
                            <option value="">Choose...</option>
                        )}
                        { states_info.map(info => (
                            <option key={info.abbreviation} value={info.abbreviation}>{info.name}</option>
                        )) }
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>ZIP Number</Form.Label>
                    <Form.Control
                        required
                        autoComplete="none"
                        type="text"
                        value={app.zip || ''}
                        pattern="^\d{5}(?:[-\s]\d{4})?$"
                        onChange={e => this.changeFormState("zip", e.target.value, role) }
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <InputMask
                        required
                        autoComplete="none"
                        className="form-control"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        mask="999-999-9999"
                        maskChar=""
                        value={app.cell_phone || ''}
                        onChange={e => this.changeFormState("cell_phone", e.target.value, role)}
                    />
                </Form.Group>               
            </>
        )
    }

    handleArrowBack = () => {
        this.props.history.replace('/sales');
    }
    render() {
        const { emailValidateRequest } = this.props;
        const validated = this.state.validated;
        const {
            co_enabled, co_complete, co_separate, main_app, co_app
        } = this.props.customer.contact;
        return (
            <div className="sales">
                <Modal show={this.state.backModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p>Returning to the Start Screen will cause you to lose all progress on this customer.</p>
                        <p>Do you wish to continue?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleModalClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={this.handleModalYes}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Form noValidate validated={validated} onSubmit={this.handleSubmit}  autoComplete="nope">
                    <Header history={this.props.history}>
                        <img src={IconArrowLeft} className="customhome-arrow" onClick={this.handleArrowBack} alt="" />
                        <img src={IconHome} alt="home" className="icon-home" onClick={() => this.setState({ backModal: true })} />
                    </Header>
                    <div className="main">
                        <Header2
                            id={-1}
                            history={this.props.history}
                        />                         
                        <div className="container">                           
                            
                            { this.renderApplicantForm(this.props.customer.contact.main_app, "main") }
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
                            { co_enabled && this.renderApplicantForm(this.props.customer.contact.co_app, "co", this.props.customer.contact.main_app) }
                            <Form.Group>
                                <Form.Label>Applicant Email</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    required
                                    onBlur= { () => emailValidateRequest({ email: main_app.email }) }
                                    autoComplete="none"
                                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                    type="email"
                                    value={main_app.email || ''}
                                    onChange={e => this.changeFormState("email", e.target.value, 'main') }
                                />
                            </Form.Group>
                            {
                              co_enabled && 
                                <Form.Group>
                                    <Checkbox
                                        checked={co_complete}
                                        onChange={() => {
                                            if (co_complete) {
                                                this.changeState({
                                                    co_complete: !co_complete,
                                                });
                                            } else {
                                                this.changeState({co_complete: !co_complete});
                                            }
                                        }}
                                        label="Completing form for co-applicant."
                                />
                                </Form.Group>
                            }
                            {
                              co_enabled && 
                              <Form.Group>
                                <Form.Label>Co-applicant Email</Form.Label>
                                <Form.Label className="form-label-required">required</Form.Label>
                                <Form.Control
                                    required
                                    onBlur= { () => emailValidateRequest({ email: co_app.email }) }
                                    autoComplete="none"
                                    pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                    type="email"
                                    value={co_app.email || ''}
                                    onChange={e => this.changeFormState("email", e.target.value, 'co') }
                                />
                            </Form.Group>
                          }
                          {
                              co_enabled && 
                                <Form.Group>
                                    <Checkbox
                                        checked={co_separate}
                                        onChange={() => {
                                            if (co_separate) {
                                                this.changeState({
                                                    co_separate: !co_separate,
                                                });
                                            } else {
                                                this.setSameEmailAddress(this.props.customer.contact.main_app)
                                                this.changeState({co_separate: !co_separate});
                                            }
                                        }}
                                        label="Co-applicant does not have separate email address."
                                />
                                </Form.Group>
                            }
                        </div>
                    </div>
                    <Footer>
                        <Button type="submit" className="button">NEXT</Button>
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
        changeCustomerContact,
        changeCustomer,
        clearCustomer,
        addProduct,
        emailValidateRequest
    }
)(ContactScreen);