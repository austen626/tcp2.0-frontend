import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Modal, Tooltip, OverlayTrigger } from 'react-bootstrap';

import InputMask from 'react-input-mask';
import CustomerModalList from 'shared/CustomerModalList';
import SearchBox from 'shared/SearchBox';
import { message } from 'shared/constant';
import Header from '../../components/Sales/Header';
import Footer from '../../components/Sales/Footer';

import Header2 from '../../components/Sales/Header2';
import Checkbox from '../../components/Checkbox';

import { FormFieldsContainer, SearchFieldContainer } from './style';
import { states_info } from '../../assets/options';
import { IconHome } from '../../assets/images';

import { addProduct } from '../../redux/actions/customer';

import { 
    changeCustomerContact, 
    changeCustomer, 
    clearCustomer, 
    sendPrequalify,
    setReorderCustomerById,
    sendAll
} from '../../redux/actions/customer';
import { searchCustomers } from '../../redux/actions/customers';
import Loader from 'shared/Loader';

class ReorderScreen extends Component {

    state = {
        validated: false,
        sentModal: false,
        nameSearch: '',
        citySearch: '',
        searchShow: false,
        displayFields: false,
        errorMessage: ''
    }

    changeState = (data) => {
        this.props.changeCustomer(data);
    }

    changeFormState = (key, value, role = "main") => {
        this.props.changeCustomerContact(key, value, role);
    }

    onSend = () => {
        // this.props.sendPrequalify(this.props.customer);
        const { sendAll, customer } = this.props;
        sendAll(customer, this.handleModalClose, 'reorder', this.props.history);
        this.setState({ sentModal: true });
    }

    onNext = () => {
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
        this.setState({ sentModal: false });

        const role = localStorage.getItem('role');

        if(role && role.indexOf('dealer') !== -1) {
            this.props.history.replace('/sales');
        } else if(role && role.indexOf('sales') !== -1) {
            this.props.history.replace('/');
        } else {
            this.props.history.replace('/');
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
                        autoComplete="none"
                        required
                        className="form-control"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        mask="9999999999"
                        maskChar=""
                        value={app.cell_phone || ''}
                        onChange={e => this.changeFormState("cell_phone", e.target.value, role)}
                    />
                </Form.Group>               
            </>
        )
    }

    handleSearchClick = (e) => {
        e.preventDefault();
        const { nameSearch, citySearch } = this.state;
        const { searchCustomers } = this.props;
        if(nameSearch === '') {
            this.setState({
                errorMessage: message.PROVIDE_NAME
            })
            return;
        }
        const body = {
            name: nameSearch,
            city: citySearch
        }
        searchCustomers(body);
        this.setState({ searchShow: true });
    }

    hideSearchBox = () => {
        this.setState({
            searchShow: false
        })
    }

    hideFormFields = () => {
        this.setState({
            displayFields: false,
            searchShow: true
        })
    }

    handleSearchRowClick = async (item) => {
        const { setReorderCustomerById } = this.props
        this.setState({
            displayFields: true
        })
        setReorderCustomerById(item.Cifno, this.hideSearchBox, this.hideFormFields, "reorder");
        if (this.props.customer.products.length === 0) {
            this.props.addProduct();
        }
        this.props.history.replace('/product/0');
    }

    renderTooltip(props){
        return  <Tooltip id="button-tooltip" {...props}>
        Cancel
      </Tooltip>
    }

    handleArrowBack = () => {
        this.props.history.replace('/sales');
    }
   
    render() {
        const validated = this.state.validated;
        const { nameSearch, searchShow, citySearch, displayFields, errorMessage } = this.state;
        const { customers } = this.props;
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
                    displayBack
                    handleArrowBack={ this.handleArrowBack }
                    disableRowClick
                />
                {/* <Modal show={this.state.sentModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>Forms have been sent successfully.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleModalClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal> */}
                {
                    !displayFields &&   
                    <div className="main">    
                                     
                        <SearchFieldContainer className="container pb-0">                                         
                            <SearchBox 
                                nameSearch={ nameSearch }
                                citySearch={ citySearch }
                                nameChangeEvent={ (e) => {
                                    this.setState({ 
                                        nameSearch: e.target.value,
                                        errorMessage: ''
                                    })
                                } }
                                cityChangeEvent={ (e) => {
                                    this.setState({ 
                                        citySearch: e.target.value,
                                        errorMessage: ''
                                    })
                                }}
                                handleSearchClick={ this.handleSearchClick}
                                errorMessage={ errorMessage } />
                        </SearchFieldContainer>
                       
                    </div>
                }   
              
                {
                displayFields &&   
                    <FormFieldsContainer> 
                        <Form noValidate validated={validated} onSubmit={this.handleSubmit}>
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
                                        <Form.Label className="form-label-required">required</Form.Label>
                                        <Form.Control
                                            required
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
                                                label="Co-applicant does not have seprate email address."
                                        />
                                        </Form.Group>
                                    }
                                </div>
                            </div>
                            <Footer>
                                <Button type="submit" className="button">NEXT</Button>
                            </Footer>
                        </Form>                      
                    </FormFieldsContainer>
                }
                {
                    searchShow && 
                        <CustomerModalList
                        customers={ customers }
                        setCancel={ this.hideSearchBox }
                        handleSearchRowClick={ this.handleSearchRowClick}
                        reorderPage={ false } />
                }                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.customer,
    customers: state.customers,
});

export default connect(
    mapStateToProps,
    {
        changeCustomerContact,
        changeCustomer,
        clearCustomer,
        sendPrequalify,
        searchCustomers,
        setReorderCustomerById,
        sendAll,
        addProduct
    }
)(ReorderScreen);