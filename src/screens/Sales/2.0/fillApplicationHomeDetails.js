import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Checkbox from '../../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateCustomer } from '../../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        updateCustomer,
        actionLoading,
    } = props;

    const [tempOwnOrRent, setTempOwnOrRent] = useState(customer ? customer.main_app.own_or_rent : null);
    const [tempYearsThereFirst, setTempYearsThereFirst] = useState(customer ? customer.main_app.years_there_first : null);
    const [tempMonthlyRentMortgagePayment, setTempMonthlyRentMortgagePayment] = useState(customer ? customer.main_app.monthly_rent_mortgage_payment : null);

    const [tempCoOwnOrRent, setCoTempOwnOrRent] = useState(customer && customer.co_enabled ? customer.co_app.own_or_rent : null);

    const [validationResult, setValidationResult] = useState(null);
    const [ownRentError, setOwnRentError] = useState(false);
    const [coOwnRentError, setCoOwnRentError] = useState(false);

    const [haveCoApplicantSameAnswers, setHaveCoApplicantSameAnswers] = useState(customer.co_enabled && customer.co_app.have_co_applicant_with_same_answers ? customer.co_app.have_co_applicant_with_same_answers : false);

    const hideMainAppError = (e) => {
        setTempOwnOrRent(e.target.value)
        setOwnRentError(false);
    }

    const hideCoAppError = (e) => {
        setCoTempOwnOrRent(e.target.value)
        setCoOwnRentError(false);
    }

    const handleArrowBack = () => {
        history.replace('/applyApplicationBasicDetails');    
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        if (!formData.validationResult) {

            if( formData.formData.own_or_rent === undefined)
            {
                setOwnRentError(true);
            }
            else if( customer.co_enabled && formData.formData.co_own_or_rent === undefined)
            {
                setCoOwnRentError(true);
            }
            else 
            {
                let data = formData.formData

                let temp_customer = {
                    ...customer,
                    "main_app": {
                        ...customer.main_app,
                        "own_or_rent": data.own_or_rent,
                        "years_there_first": data.years_there_first,
                        "monthly_rent_mortgage_payment": data.monthly_rent_mortgage_payment,
                    },
                    "co_app": {
                        ...customer.co_app,
                        "own_or_rent": customer.co_enabled ? data.co_own_or_rent : null,
                        "years_there_first": customer.co_enabled ? data.co_years_there_first : null,
                        "monthly_rent_mortgage_payment": customer.co_enabled ? data.co_monthly_rent_mortgage_payment : null,
                        "have_co_applicant_with_same_answers": customer.co_enabled ? data.have_co_applicant_with_same_answers : null
                    }
                }

                updateCustomer(history, '/applyApplicationEmployement', temp_customer)
            }
        }
        else
        {
            if( formData.formData.own_or_rent === undefined )
            {
                setOwnRentError(true);
            }
            if( customer.co_enabled && formData.formData.co_own_or_rent === undefined )
            {
                setCoOwnRentError(true);
            } 
            pushNotification('The fields marked in Red need to be filled with appropriate data.', 'error', 'TOP_RIGHT', 3000);
        }
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

            <Header>
                <HeaderLeft>
                    <img src={IconArrowLeft} onClick={() => handleArrowBack()} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
                </HeaderCenter>
                <HeaderRight></HeaderRight>
            </Header>

            <div className="sub-header">
                <button className="active">
                    <img src={IconContactAcitve} alt=""/> 
                    <span>Applicant(s) Details</span>
                    <span className='arrow-down'></span>
                </button>
            </div>

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="container">
                    <div className="styled-form">

                        <div className="box center-box">
                            <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you own or rent your home?</label>
                            <div className="radio-box center">
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="own"
                                        name="own_or_rent"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio"
                                        defaultValue="own"
                                        required={true}
                                        error={{
                                            'empty': "sdsadasd"
                                        }}
                                        checked={tempOwnOrRent == 'own' ? true : null}
                                        handleChange={(e) => hideMainAppError(e)}
                                    />
                                    <label for="own" class="form-label " id="own-label">Own</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="rent"
                                        name="own_or_rent"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio"
                                        defaultValue="rent"
                                        required={true}
                                        error={{
                                            'empty': "sdsadasd"
                                        }}
                                        checked={tempOwnOrRent == 'rent' ? true : null}
                                        handleChange={(e) => hideMainAppError(e)}
                                    />
                                    <label for="rent" class="form-label " id="rent-label">Rent</label>
                                </Form.Group>
                            </div>
                            <div class={`error-label ${ownRentError ? "show" : "hide"}`}>Please select details</div>
                        </div>
                        
                        <Form.Group className="mb-18">
                            <Input
                                name="years_there_first"
                                type="text"
                                defaultValue={tempYearsThereFirst}
                                label="How many years did you live there?"
                                defaultText="0"
                                regex="^[0-9]{1,2}$"
                                required={true}
                                className="single-line-input"
                                error={{
                                    'empty': " ",
                                    'invalid': " "
                                }}
                                validationResult={validationResult}
                                handleChange={(e)=>setTempYearsThereFirst(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="monthly_rent_mortgage_payment"
                                type="text"
                                defaultValue={tempMonthlyRentMortgagePayment}
                                label={`${tempOwnOrRent === 'own' ? "Monthly Mortgage Payment:" : "Monthly Rent Payment:"}`}
                                isAmount={true}
                                defaultText="0"
                                regex="^[0-9]{1,20}$"
                                required={true}
                                className="single-line-input width-112"
                                error={{
                                    'empty': " ",
                                    'invalid': " "
                                }}
                                validationResult={validationResult}
                                handleChange={(e)=>setTempMonthlyRentMortgagePayment(e.target.value)}
                            />
                        </Form.Group>                
                        
                        {customer.co_enabled && 

                            <>

                            <span className="divider">
                                <span className="title">Co-applicant</span>
                            </span> 

                            <Form.Group className="mb-18">
                                <Checkbox
                                    name="have_co_applicant_with_same_answers"
                                    type="checkbox"
                                    theme="light-label"
                                    label="The answes are the same as the answers<br>given by the applicant"
                                    checked={haveCoApplicantSameAnswers ? true : null}
                                    handleChange={(e)=>{
                                        setHaveCoApplicantSameAnswers(e.target.checked)
                                        setCoTempOwnOrRent(e.target.checked ? tempOwnOrRent : tempCoOwnOrRent)
                                    }}
                                />
                            </Form.Group> 

                            <div className="box center-box">
                                <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you own or rent your home?</label>
                                <div className="radio-box center">
                                    <Form.Group className="mb-18 radio-filed">
                                        <Input 
                                            id ="co_own"
                                            name="co_own_or_rent"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio"
                                            defaultValue="own"
                                            {...(haveCoApplicantSameAnswers ? {
                                                checked: tempOwnOrRent == 'own' ? true : null,
                                                disabled: true
                                            } : {
                                                checked: tempCoOwnOrRent == 'own' ? true : null
                                            })}
                                            handleChange={(e) => hideCoAppError(e)}
                                        />
                                        <label for="co_own" class="form-label " id="co_own-label">Own</label>  
                                    </Form.Group>
                                    <Form.Group className="mb-18 radio-filed">
                                        <Input 
                                            id ="co_rent"
                                            name="co_own_or_rent"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio"
                                            defaultValue="rent"
                                            {...(haveCoApplicantSameAnswers ? {
                                                checked: tempOwnOrRent == 'rent' ? true : null,
                                                disabled: true
                                            } : {
                                                checked: tempCoOwnOrRent == 'rent' ? true : null
                                            })}
                                            handleChange={(e) => hideCoAppError(e)}
                                        />
                                        <label for="co_rent" class="form-label " id="co_rent-label">Rent</label>
                                    </Form.Group>
                                </div>
                                <div class={`error-label ${coOwnRentError ? "show" : "hide"}`}>Please select details</div>
                            </div> 

                            <Form.Group className="mb-18">
                                <Input
                                    name="co_years_there_first"
                                    type="text"
                                    {...(haveCoApplicantSameAnswers ? {
                                        value: tempYearsThereFirst
                                    } : {
                                        defaultValue: customer.co_app.years_there_first ? customer.co_app.years_there_first : null
                                    })}
                                    label="How many years did you live there?"
                                    defaultText="0"
                                    regex="^[0-9]{1,2}$"
                                    required={true}
                                    className="single-line-input"
                                    error={{
                                        'empty': " ",
                                        'invalid': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_monthly_rent_mortgage_payment"
                                    type="text"
                                    {...(haveCoApplicantSameAnswers ? {
                                        value: tempMonthlyRentMortgagePayment,
                                        label: `${tempOwnOrRent === 'own' ? "Monthly Mortgage Payment:" : "Monthly Rent Payment:"}`
                                    } : {
                                        defaultValue: customer.co_app.monthly_rent_mortgage_payment ? customer.co_app.monthly_rent_mortgage_payment : null,
                                        label: `${tempCoOwnOrRent === 'own' ? "Monthly Mortgage Payment:" : "Monthly Rent Payment:"}`
                                    })}
                                    defaultText="0"
                                    regex="^[0-9]{1,20}$"
                                    isAmount={true}
                                    required={true}
                                    className="single-line-input width-112"
                                    error={{
                                        'empty': " ",
                                        'invalid': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group> 

                            </>
                        }

                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">Next</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);