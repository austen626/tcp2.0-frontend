import React, { useState, useEffect } from 'react';
import { pushNotification } from 'utils/notification';
import { connect } from 'react-redux';
import Header from '../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../components/commons/input';
import { IconHome, IconRight } from '../../assets/images';

import { getFromData } from '../../components/commons/utility';
import { updateApplicationFilledStatus, searchCustomer, updateCustomer, validateEmailAddress, selectCustomer, resetSearchCustomerSearchApiInitiate } from '../../redux/actions/sales';

function HomeScreen(props) {

    const {
        history,
        avatar,
        customer_search_result,
        customer,
        isCustomerFound,
        actionLoading,
        searchCustomer,
        selectCustomer,
        updateCustomer,
        validateEmailAddress,
        searchCustomerApiInitiate,
        updateApplicationFilledStatus,
        resetSearchCustomerSearchApiInitiate
    } = props;

    const [validationResult, setValidationResult] = useState(null);
    const [applicantEmail, setApplicantEmail] = useState(null);
    const [applicantPhone, setApplicantPhone] = useState(null);

    
    useEffect(() => {
        resetSearchCustomerSearchApiInitiate()
    }, []);


    useEffect(() => {
        let temp_phone = null;
        let temp_email = null;
        
        if(applicantPhone && applicantPhone != "" && applicantPhone.indexOf('_') == -1) {
            temp_phone = applicantPhone;
        }
        
        if(applicantEmail && applicantEmail != "") {
            temp_email = applicantEmail;
        }

        if(!searchCustomerApiInitiate && (applicantEmail || (applicantPhone && applicantPhone.indexOf('_') == -1))) {
            searchCustomer({ email: temp_email, phone: temp_phone }).then ( res => {
                if(!res && customer_search_result.length == 0) {
                    pushNotification("No match found", 'error', 'TOP_RIGHT', 3000); 
                }
            })
        }
    }, [applicantEmail, applicantPhone]);


    const handleHomeClick = () => {
        history.replace('/');
    }

    const triggerNextPage = (customer_search) => {
        let temp_customer = {
            ...customer_search,
            id: customer_search.main_app.id,
        }
        if(customer_search.invite_status == "COMPLETED" || customer_search.invite_status == "SENT") {

            temp_customer = {
                ...temp_customer,
                main_app : {
                    ...temp_customer.main_app,
                    additional_income_status: temp_customer.main_app.additional_income && temp_customer.main_app.additional_income != '0' ? "yes" : "no"
                },
                co_app : {
                    ...temp_customer.co_app,
                    additional_income_status: temp_customer.co_enabled && temp_customer.co_app.additional_income && temp_customer.co_app.additional_income != '0' ? "yes" : "no"
                }
            }

            if(customer_search.invite_status == "COMPLETED") 
            {
                updateApplicationFilledStatus('in_app', null, null);
            }
            else
            {
                updateApplicationFilledStatus('send_link', null, null);
            }

            updateCustomer(history, '/applyApplicationSummary', temp_customer);
        } else {
            updateCustomer(history, '/applyApplication', temp_customer);
        }
    }

    const handleSubmit = evt => {
        
        evt.preventDefault();

        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        if(!searchCustomerApiInitiate && !formData.validationResult) {

            if(applicantEmail || (applicantPhone && applicantPhone.indexOf('_') == -1)) {
                searchCustomer({email: applicantEmail, phone: (applicantPhone && applicantPhone.indexOf('_') !== -1) ? null : applicantPhone})
            }

        } else if((customer_search_result.length > 0) && customer.main_app.id == undefined && !formData.validationResult) {           
            
            pushNotification("Please select applicant", 'error', 'TOP_RIGHT', 3000);

        } else {

            if(!formData.validationResult) {

                let data = formData.formData

                let temp_customer = {
                    ...customer,
                    id: 0,
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

                validateEmailAddress(applicantEmail);

                updateCustomer(history, '/applyApplication', temp_customer);
            }
        }

    }

    const refreshPhoneApiCheck = () => {
        if(applicantPhone && applicantPhone.indexOf('_') == -1) {
            resetSearchCustomerSearchApiInitiate()
        }
    }

    const refreshEmailApiCheck = () => {
        if(applicantEmail) {
            resetSearchCustomerSearchApiInitiate()
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
                                    {...(isCustomerFound ? {
                                        value: customer.main_app.email
                                    } : {
                                        defaultValue: applicantEmail
                                    })}
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Applicant Email"
                                    }}
                                    optionalParams={{
                                        autoFocus: true
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e) => {refreshEmailApiCheck()}}
                                    onBlur={(e)=> {setApplicantEmail(e.target.value)}}
                                />
                            </Form.Group>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="cell_phone"
                                    type="hidden"
                                    label="Phone"
                                    defaultText="(123) 456-7890"
                                    {...(isCustomerFound ? {
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
                                    handleChange={() => {refreshPhoneApiCheck()}}
                                    onBlur={(e)=> {setApplicantPhone(e.target.value)}}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="home-input mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                {...(isCustomerFound ? {
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
                                {...(isCustomerFound ? {
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
                    { customer_search_result && customer_search_result.map((customer_search) => (
                        <div className="match-found-container">
                            <div className="title">Match Found <img src={IconRight} style={{marginLeft: 10}} /></div>
                            <div 
                                className="details" 
                                style={{cursor: "pointer"}} 
                                onClick={() => {
                                    selectCustomer(customer_search)
                                    triggerNextPage(customer_search)
                                }}
                            >
                                <p className="name-details">{customer_search.main_app.name} {customer_search.co_enabled ? ` & ${customer_search.co_app.name}` : null}</p>
                                <div className="row other-details">
                                    <div className="col">
                                        <span>{customer_search.main_app.street}</span>
                                        <br></br>
                                        <span>{customer_search.main_app.city} {customer_search.main_app.state} {customer_search.main_app.zip}.</span>
                                    </div>
                                    <div className="col">
                                        <span>{customer_search.main_app.email}</span>
                                        <br></br>
                                        <span>{customer_search.main_app.cell_phone}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} 
                </div>
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
    customer_search_result: state.sales.customer_search_result,
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading,
    searchCustomerApiInitiate: state.sales.searchCustomerApiInitiate,
});

const mapDispatchToProps = dispatch => ({
    searchCustomer: (data) => dispatch(searchCustomer(data)),
    selectCustomer: (data) => dispatch(selectCustomer(data)),
    validateEmailAddress: (data) => dispatch(validateEmailAddress(data)),
    resetSearchCustomerSearchApiInitiate: (data) => dispatch(resetSearchCustomerSearchApiInitiate(data)),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data)),
    updateApplicationFilledStatus: (data, history, path) => dispatch(updateApplicationFilledStatus(data, history, path))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);