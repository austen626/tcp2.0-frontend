import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';

import InputMask from 'react-input-mask';

import Header from 'components/Sales/Header';
import Footer from 'components/Sales/Footer';

import Header2 from 'components/Sales/Header2';
import Checkbox from 'components/Checkbox';

import { FormFieldsContainer, PrefilledFooter } from './style';
import { states_info } from 'assets/options';
import { IconHome } from 'assets/images';

import Loader from 'shared/Loader';

class PreFilledForm extends Component {

    state = {
        validated: false,
    }
    componentDidMount() {
        const { setReorderCustomerById } = this.props
        const id = this.props.match.params.id;
        setReorderCustomerById(id)
    }
    changeState = (data) => {
        this.props.changeCustomer(data);
    }

    changeFormState = (key, value, role = "main") => {
        this.props.changeCustomerContact(key, value, role);
    }

    onSend = (type) => {
        const { sendAll, customer } = this.props;
        let productType = [];
        const { contact } = customer;
        const { main_app, co_app, same_address,  co_enabled, co_complete, co_separate} = contact;
        const typeStructure = {
            'food': 'food',
            'food-app': 'food, appliance',
            'app': 'appliance'
        }
        productType.push(typeStructure[type])
        const body = {
            "contact": {
               "same_address": same_address,
                "co_enabled": co_enabled,
                "co_complete": co_complete,
                "co_separate": co_separate,
                "product_type": productType,
                "main_app": {
                    "cif_number": main_app.cif_number,
                    "nortridge_cif_number": main_app.nortridge_cif_number || null,
                    "name": main_app.name,
                    "email": main_app.email,
                    "cell_phone": main_app.cell_phone,
                    "street": main_app.street,
                    "city": main_app.city,
                    "state": main_app.state,
                    "zip": main_app.zip,
                    "home_phone": ""
                },
                "co_app": {
                    "name": co_app.name,
                    "email": co_app.email,
                    "cell_phone": co_app.cell_phone,
                    "home_phone": co_app.home_phone,
                    "street": co_app.street,
                    "city": co_app.city,
                    "state": co_app.state,
                    "zip": co_app.zip
                }
            },
            
        }
        sendAll(body, undefined, "pre-order", this.props.history);
    }

    handleSubmit = (event, type) => {
        event.preventDefault();
        const formData = document.getElementsByTagName('form')[0];       
      
        this.setState({ validated: true });
        if (formData.checkValidity() === false) {
            event.stopPropagation();
        } else {
           this.onSend(type);
        }
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
                        onChange={e => this.changeFormState("state", e.target.value, role) }
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
        this.props.history.replace('/');
    }

    render() {
        const validated = this.state.validated;
        const { co_enabled, main_app, co_app, co_complete, co_separate } = this.props.customer.contact;
        const { isSettingCustomerDetails, isCustomerFormLoading } = this.props.customer;
        return (
            <div className="sales">
                {
                    (isSettingCustomerDetails || isCustomerFormLoading) && <Loader />
                }
                <Header history={this.props.history}>
                    <img src={IconHome} alt="home" className="icon-home" onClick={() => {this.props.history.replace('/');}} />
                </Header>
                
                <Header2
                    id={-1}
                    history={this.props.history}
                />        
                   
                <FormFieldsContainer> 
                    <Form noValidate validated={validated}  autoComplete="prefilled">
                        <div className="main">                            
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
                                    {/* <Form.Label className="form-label-required">required</Form.Label> */}
                                    <Form.Control
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
                                    {/* <Form.Label className="form-label-required">required</Form.Label> */}
                                    <Form.Control
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
                            <PrefilledFooter>
                                <Button type="click" onClick={(e) => this.handleSubmit(e, 'food')} className="button">Request for Food</Button>
                                <Button type="click" onClick={(e) => this.handleSubmit(e, 'app')} className="button">Request for Appliance</Button>
                                <Button type="click" onClick={(e) => this.handleSubmit(e, 'food-app')} className="button responsive-width">Request for Food & Appliance </Button>
                            </PrefilledFooter>
                            
                        </Footer>
                    </Form>                      
                </FormFieldsContainer>
            </div>
        )
    }
}

export default PreFilledForm;