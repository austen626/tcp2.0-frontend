import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../components/commons/input';
import { IconHome, IconRight } from '../../assets/images';

import { getFromData } from '../../components/commons/utility';
import { searchCustomer, resetCustomerSearchApiInitiate, updateCustomer, validateEmailAddress } from '../../redux/actions/sales';
import { CHANGE_SELECTED_FUNDING_REQUEST_FAILED } from 'redux/actions/admin';

function HomeScreen(props) {

    const {
        history,
        avatar,
        customer,
        isCustomerFound,
        actionLoading,
        searchCustomer,
        updateCustomer,
        validateEmailAddress,
        searchCustomerApiInitiate,
        resetCustomerSearchApiInitiate
    } = props;

    const [validationResult, setValidationResult] = useState(null);
    const [applicantEmail, setApplicantEmail] = useState(null);
    const [applicantPhone, setApplicantPhone] = useState(null);

    const handleHomeClick = () => {
        history.replace('/');
    }

    const searchCustomerFun = (data) => {
        if(!searchCustomerApiInitiate) {
            searchCustomer(data).then(res => {
                if (res) {

                } else {
                    searchCustomer({email: null, phone: applicantPhone})
                }
            })
        }
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
                        "name": customer.main_app.first_name+" "+customer.main_app.last_name,
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
                            "first_name": data.first_name,
                            "last_name": data.last_name
                        },
                    }
                } else {
                    temp_customer = {
                        id: customer.main_app.id,
                        ...temp_customer
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
                                    defaultValue={customer.main_app.email ? customer.main_app.email : applicantEmail} 
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Applicant Email"
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e) => { 
                                        setApplicantEmail(e.target.value)
                                        resetCustomerSearchApiInitiate(false)
                                    }}
                                    onBlur={()=>searchCustomerFun({email: applicantEmail, phone: null})}
                                />
                            </Form.Group>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="cell_phone"
                                    type="hidden"
                                    label="Phone"
                                    defaultText="(123) 456-7890"
                                    defaultValue={customer.main_app.cell_phone ? customer.main_app.cell_phone : applicantPhone} 
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
                                        resetCustomerSearchApiInitiate(false)
                                    }}
                                    onBlur={()=>searchCustomerFun({email: applicantEmail, phone: null})}
                                />
                            </Form.Group>
                        </div>
                        {isCustomerFound ?
                        <>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="first_name"
                                    type="text"
                                    label="Applicant First Name"
                                    defaultText="Applicant First Name"
                                    value={customer.main_app.first_name} 
                                    required={false}
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
                                    value={customer.main_app.last_name} 
                                    required={false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </>
                        :
                        <>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="first_name"
                                    type="text"
                                    label="Applicant First Name"
                                    defaultText="Applicant First Name"
                                    defaultvalue={null} 
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
                                    defaultvalue={null} 
                                    required={true}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </>
                        }
                        
                    </div>
                </div>
                {isCustomerFound &&
                    <div className="match-found-container">
                        <div className="title">Match Found <img src={IconRight} style={{marginLeft: 10}} /></div>
                        <div className="details">
                            <p className="name-details">{customer.main_app.name} {customer.co_enabled ? ` & ${customer.co_app.name}` : null}</p>
                            <div className="row other-details">
                                <div className="col">
                                    <span>{customer.main_app.street}</span>
                                    <br></br>
                                    <span>{customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}.</span>
                                </div>
                                <div className="col">
                                    <span>{customer.main_app.email}</span>
                                    <br></br>
                                    <span>{customer.main_app.cell_phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="footer-container">
                    {actionLoading ?
                        <button className="btn secondary" type="submit" disabled >Searching...</button>
                    :
                        <button className="btn secondary" type="submit" >Next</button>
                    }
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar,
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading,
    searchCustomerApiInitiate: state.sales.searchCustomerApiInitiate
});

const mapDispatchToProps = dispatch => ({
    searchCustomer: (data) => dispatch(searchCustomer(data)),
    validateEmailAddress: (data) => dispatch(validateEmailAddress(data)),
    resetCustomerSearchApiInitiate: () => dispatch(resetCustomerSearchApiInitiate()),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);