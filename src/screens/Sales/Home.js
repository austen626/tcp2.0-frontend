import React, { useState, useEffect, useRef } from 'react';
import { pushNotification } from 'utils/notification';
import { connect } from 'react-redux';
import Header from '../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../components/commons/input';
import { IconHome, IconRight } from '../../assets/images';

import { getFromData } from '../../components/commons/utility';
import { searchCustomer, updateCustomer, validateEmailAddress, selectCustomer, resetSearchCustomerSearchApiInitiate } from '../../redux/actions/sales';
import { CHANGE_SELECTED_FUNDING_REQUEST_FAILED } from 'redux/actions/admin';
import { Redirect } from 'react-router-dom';

function HomeScreen(props) {

    const {
        history,
        avatar,
        email_customer_search,
        phone_customer_search,
        customer,
        isCustomerFound,
        actionLoading,
        searchCustomer,
        selectCustomer,
        updateCustomer,
        validateEmailAddress,
        searchCustomerApiInitiate,
        isCustomerEnterManually,
        resetSearchCustomerSearchApiInitiate
    } = props;

    const [validationResult, setValidationResult] = useState(null);
    const [applicantEmail, setApplicantEmail] = useState(null);
    const [applicantPhone, setApplicantPhone] = useState(null);
    const [isCustomerFoundCheckAccess, setCustomerFoundCheckAccess] = useState(isCustomerEnterManually);

    const handleHomeClick = () => {
        history.replace('/');
    }

    const handleSubmit = evt => {
        
        evt.preventDefault();
        const formData = getFromData(evt);

        if(!searchCustomerApiInitiate) {

            setValidationResult(formData.validationResult);
            if(!formData.validationResult) {
                
                let data = formData.formData
                searchCustomer({...data, phone: data.cell_phone})
            }           

        } else {

            setValidationResult(formData.validationResult);
            if(!formData.validationResult) {

                let data = formData.formData

                let temp_customer = {
                    ...customer,
                    "main_app": {
                        ...customer.main_app,
                        "name": data.first_name+" "+customer.main_app.last_name,
                        "email": data.email,
                        "cell_phone": data.cell_phone,
                        "first_name": data.first_name,
                        "last_name": data.last_name
                    },
                    "co_app": {
                        ...customer.co_app,
                    }
                }

                if(!isCustomerFound) {
                    temp_customer = {
                        id: 0,
                        ...temp_customer,
                        "main_app": {
                            ...temp_customer.main_app,
                            "name": data.first_name+" "+data.last_name,
                            "email": data.email,
                            "cell_phone": data.cell_phone,
                            "first_name": data.first_name,
                            "last_name": data.last_name
                        },
                    }
                } else {
                    temp_customer = {
                        id: customer.main_app.id,
                        ...temp_customer,
                    }
                }


                if(!isCustomerFound) {
                    validateEmailAddress(applicantEmail);
                }

                updateCustomer(history, '/applyApplication', temp_customer);
            }
        }

    }

    return (
        <div className="sales">

            <Header isHome={true} history={history} avatar={avatar}>
                {localStorage.getItem('role') && localStorage.getItem('role').indexOf('dealer') !== -1 &&
                    <img src={IconHome} alt="home" className="icon-home" onClick={()=>handleHomeClick()} />
                }
            </Header>
            

            <form onSubmit={(e) => handleSubmit(e)} noValidate>

                <div className='main-box'>
                    <p className="title">ENTER CUSTOMER INFORMATION</p>
                    <p className="sub-title">Please begin by entering your customer's email address and/or phone number. If they are already in TCP's database, the customer will appear at the bottom of the screen for you to select. Otherwise, please enter an email address and/or phone number, first name and last name to proceed.</p>
                </div>
                
                <div className="container">
                    <div className="styled-form home-form">
                        <div className="box color-box">
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    label="Applicant Email"
                                    defaultText="Applicant Email"
                                    {...(isCustomerFoundCheckAccess ? {
                                        value: customer.main_app.email
                                    } : {
                                        defaultValue: applicantEmail
                                    })}
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Applicant Email"
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e) => { 
                                        setApplicantEmail(e.target.value)
                                        resetSearchCustomerSearchApiInitiate("email")
                                        setCustomerFoundCheckAccess(false)
                                    }}
                                    onBlur={()=> applicantEmail != null ? searchCustomer({email: applicantEmail, phone: null}) : null}
                                />
                            </Form.Group>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="cell_phone"
                                    type="hidden"
                                    label="Phone"
                                    defaultText="(123) 456-7890"
                                    {...(isCustomerFoundCheckAccess ? {
                                        value: customer.main_app.cell_phone
                                    } : {
                                        defaultValue: applicantPhone
                                    })}
                                    regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    mask="(999) 999-9999"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter 10 digit number",
                                        'empty': "Please enter Phone number"
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e) => { 
                                        setApplicantPhone(e.target.value)
                                        resetSearchCustomerSearchApiInitiate("phone")
                                        setCustomerFoundCheckAccess(false)
                                    }}
                                    onBlur={()=> applicantPhone != null && applicantPhone.indexOf('_') == -1 ? searchCustomer({email: null, phone: applicantPhone}) : null}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="home-input mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                {...(isCustomerFoundCheckAccess ? {
                                    value: customer.main_app.first_name
                                } : {
                                    defaultValue: null
                                })}
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="home-input mb-18">
                            <Input
                                name="last_name"
                                type="text"
                                label="Applicant Last Name"
                                defaultText="Applicant Last Name"
                                {...(isCustomerFoundCheckAccess ? {
                                    value: customer.main_app.last_name
                                } : {
                                    defaultValue: null
                                })}
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        
                    </div>
                </div>
                <div className="match-found-result">
                    {email_customer_search &&
                        <div className="match-found-container">
                            <div className="title">Match Found By Applicant Email<img src={IconRight} style={{marginLeft: 10}} /></div>
                            <div 
                                className="details" 
                                style={{cursor: "pointer"}} 
                                onClick={() => {
                                    setCustomerFoundCheckAccess(true)
                                    selectCustomer(email_customer_search)
                                }}
                            >
                                <p className="name-details">{email_customer_search.main_app.name} {email_customer_search.co_enabled ? ` & ${email_customer_search.co_app.name}` : null}</p>
                                <div className="row other-details">
                                    <div className="col">
                                        <span>{email_customer_search.main_app.street}</span>
                                        <br></br>
                                        <span>{email_customer_search.main_app.city} {email_customer_search.main_app.state} {email_customer_search.main_app.zip}.</span>
                                    </div>
                                    <div className="col">
                                        <span>{email_customer_search.main_app.email}</span>
                                        <br></br>
                                        <span>{email_customer_search.main_app.cell_phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    {phone_customer_search &&
                        <div className="match-found-container">
                            <div className="title">Match Found By Applicant Phone<img src={IconRight} style={{marginLeft: 10}} /></div>
                            <div 
                                className="details" 
                                style={{cursor: "pointer"}} 
                                onClick={() => {
                                    setCustomerFoundCheckAccess(true)
                                    selectCustomer(phone_customer_search)
                                }}
                            >
                                <p className="name-details">{phone_customer_search.main_app.name} {phone_customer_search.co_enabled ? ` & ${phone_customer_search.co_app.name}` : null}</p>
                                <div className="row other-details">
                                    <div className="col">
                                        <span>{phone_customer_search.main_app.street}</span>
                                        <br></br>
                                        <span>{phone_customer_search.main_app.city} {phone_customer_search.main_app.state} {phone_customer_search.main_app.zip}.</span>
                                    </div>
                                    <div className="col">
                                        <span>{phone_customer_search.main_app.email}</span>
                                        <br></br>
                                        <span>{phone_customer_search.main_app.cell_phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="footer-container">
                    {actionLoading ?
                        <button className="btn secondary" type="submit" disabled >Searching...</button>
                    :
                        <button className="btn secondary" type="submit" >Next</button>
                    }
                </div>


                {/* <button className="btn secondary" type="button" onClick={() => {window.location = "https://google.com"}}>dsfds</button> */}
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar,
    email_customer_search: state.sales.email_customer_search,
    phone_customer_search: state.sales.phone_customer_search,
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading,
    searchCustomerApiInitiate: state.sales.searchCustomerApiInitiate,
    isCustomerEnterManually: state.sales.isCustomerEnterManually
});

const mapDispatchToProps = dispatch => ({
    searchCustomer: (data) => dispatch(searchCustomer(data)),
    selectCustomer: (data) => dispatch(selectCustomer(data)),
    validateEmailAddress: (data) => dispatch(validateEmailAddress(data)),
    resetSearchCustomerSearchApiInitiate: (data) => dispatch(resetSearchCustomerSearchApiInitiate(data)),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);