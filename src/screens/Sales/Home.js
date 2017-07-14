import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../components/commons/input';
import Loader from 'shared/Loader';
import { IconHome, IconRight } from '../../assets/images';
import InputMask from 'react-input-mask';

import { getFromData } from '../../components/commons/utility';
import { searchCustomer, resetCustomerSearchApiInitiate, updateCustomer } from '../../redux/actions/sales';

function HomeScreen(props) {

    const {
        history,
        avatar,
        customer,
        isCustomerFound,
        actionLoading,
        searchCustomer,
        updateCustomer,
        searchCustomerApiInitiate,
        resetCustomerSearchApiInitiate
    } = props;

    const [validationResult, setValidationResult] = useState(null);
    const [applicantEmail, setApplicantEmail] = useState(isCustomerFound ? customer.main_app.email : null);
    const [applicantPhone, setApplicantPhone] = useState(isCustomerFound ? customer.main_app.cell_phone.replace(/\-/g,"") : null);

    const submitButton = createRef();

    useEffect(() => {  
        resetCustomerSearchApiInitiate(false)
    }, [])

    useEffect(() => {
        if(applicantEmail && applicantPhone && !searchCustomerApiInitiate) {
            submitButton.current.click();
        }
    }, [applicantEmail, applicantPhone])

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
                        "name": data.first_name+" "+data.last_name,
                        "email": data.email,
                        "cell_phone": data.cell_phone,
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
                            "first_name": data.first_name,
                            "last_name": data.last_name,
                        },
                    }
                } else {
                    temp_customer = {
                        id: customer.main_app.id,
                        ...temp_customer
                    }
                }

                updateCustomer(history, '/applyApplication', temp_customer);
            }
        }

    }

    return (
        <div className="sales">

            { actionLoading && <Loader />}

            <Header isHome={true} history={history} avatar={avatar}>
                {localStorage.getItem('role') && localStorage.getItem('role').indexOf('dealer') !== -1 &&
                    <img src={IconHome} alt="home" className="icon-home" onClick={()=>handleHomeClick()} />
                }
            </Header>

            <div className='main-box'>
                <p className="title">ENTER CUSTOMER INFORMATION</p>
                <p className="sub-title">Short instruction donec in semper arcu. Sed quis ante cursus, porta lectus sit amet, mollis lacus.</p>
            </div>
            

            <form onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="container">
                    <div className="styled-form">
                        <div className="box color-box">
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    label="Applicant Email"
                                    defaultText="Applicant Email"
                                    defaultValue={applicantEmail} 
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
                                />
                            </Form.Group>
                            <Form.Group className="home-input mb-18">
                                <Input
                                    name="cell_phone"
                                    type="hidden"
                                    label="Phone"
                                    defaultText="9999999999"
                                    defaultValue={applicantPhone} 
                                    regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    // regex="\b\d{10}\b"
                                    masked={true}
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
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="home-input mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                defaultValue={isCustomerFound ? customer.main_app.first_name : ''} 
                                required={searchCustomerApiInitiate && !isCustomerFound ? true : false}
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
                                defaultValue={isCustomerFound ? customer.main_app.last_name : ''} 
                                required={searchCustomerApiInitiate && !isCustomerFound ? true : false}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                    </div>
                </div>
                {isCustomerFound &&
                    <div className="match-found-container">
                        <div className="title">Match Found <img src={IconRight} style={{marginLeft: 10}} /></div>
                        <div className="details">
                            <p className="name-details">{customer.main_app.name} {customer.co_enabled ? ` & ${customer.co_app.name}` : ''}</p>
                            <div className="row other-details">
                                <div className="col">
                                    <span>{customer.main_app.street}</span>
                                    <br></br>
                                    <span>{customer.main_app.email}</span>
                                </div>
                                <div className="col">
                                    <span>{customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}.</span>
                                    <br></br>
                                    <span>{customer.main_app.cell_phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="footer-container">
                    <button ref={submitButton} className="secondary" type="submit">Next</button>
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
    resetCustomerSearchApiInitiate: () => dispatch(resetCustomerSearchApiInitiate()),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);