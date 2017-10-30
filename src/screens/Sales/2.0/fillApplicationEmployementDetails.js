import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Form, Modal } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Checkbox from '../../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { submiCreditApplication, updateCustomer } from '../../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        updateCustomer,
        actionLoading,
        submiCreditApplication
    } = props;

    const modalAgreebtn = useRef();

    const [validationResult, setValidationResult] = useState(null);
    const [showWarning, setShowWarning] = useState(false);

    const [employementStatusCheck, setEmployementStatusCheck] = useState(customer.main_app.employement_status && customer.main_app.employement_status == "not employed" ? "not employed" : "employed");
    const [coEmployementStatusCheck, setCoEmployementStatusCheck] = useState(customer.co_enabled && customer.co_app.employement_status && customer.co_app.employement_status == "not employed" ? "not employed" : "employed");

    const [ownOtherSourceError, setOtherSourceError] = useState(false);
    const [ownOtherSourceStatus, setOtherSourceStatus] = useState(customer.main_app.additional_income && customer.main_app.additional_income != '0' ? "yes" : "no");
    
    const [coOtherSourceError, setCoOtherSourceError] = useState(false);
    const [coOtherSourceStatus, setCoOtherSourceStatus] = useState(customer.co_enabled && customer.co_app.additional_income && customer.co_app.additional_income != '0' ? "yes" : "no");
    
    const [customerAdditionalIncome, setCustomerAdditionalIncome] = useState(customer.main_app.additional_income);
    const [customerAdditionalIncomeSource, setCustomerAdditionalIncomeSource] = useState(customer.main_app.source);
    
    const [coCustomerAdditionalIncome, setCoCustomerAdditionalIncome] = useState(customer.co_enabled && customer.co_app.additional_income ? customer.co_app.additional_income : null);
    const [coCustomerAdditionalIncomeSource, setCoCustomerAdditionalIncomeSource] = useState(customer.co_enabled && customer.co_app.source ? customer.co_app.source : null);

    const hideMainAppError = (data) => {
        setOtherSourceStatus(data);
        setOtherSourceError(false);
        if(data === 'no') {
            setCustomerAdditionalIncome(null);
            setCustomerAdditionalIncomeSource(null);
        }
    }

    const hideCoAppError = (data) => {
        setCoOtherSourceStatus(data);
        setCoOtherSourceError(false);
        if(data === 'no') {
            setCoCustomerAdditionalIncome(null);
            setCoCustomerAdditionalIncomeSource(null);
        }
    }

    const handleArrowBack = () => {
        history.replace('/applyApplicationHomeDetails');   
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        console.log(formData.validationResult)

        if (!formData.validationResult) {

            if( employementStatusCheck == "employed" && formData.formData.additional_income_status === undefined)
            {
                setOtherSourceError(true);
            }
            else if( !coEmployementStatusCheck && customer.co_enabled && formData.formData.co_additional_income_status === undefined)
            {
                setCoOtherSourceError(true);
            }
            else 
            {
                let data = formData.formData

                let temp_customer = {
                    ...customer,
                    "main_app": {
                        ...customer.main_app,
                        "additional_income_status": data.additional_income_status,
                        "employement_status": employementStatusCheck == "employed" ? "employed" : "not employed",
                        "employer_phone": employementStatusCheck == "employed" ? data.employer_phone : null,
                        "job_title": employementStatusCheck == "employed" ? data.job_title : null,
                        "monthly_income": employementStatusCheck == "employed" ? data.monthly_income : null,
                        "present_employer": employementStatusCheck == "employed" ? data.present_employer : null,
                        "source": data.additional_income_status == "yes" ? data.source : null,
                        "additional_income": data.additional_income_status == "yes" ? data.additional_income : null,
                        "years_there_second": employementStatusCheck == "employed" ? data.years_there_second : null,
                    },
                    "co_app": {
                        ...customer.co_app,
                        "additional_income_status": customer.co_enabled ? data.co_additional_income_status : null,
                        "employement_status": customer.co_enabled && coEmployementStatusCheck == "employed" ? "employed" : "not employed",
                        "employer_phone": customer.co_enabled && coEmployementStatusCheck == "employed" ? data.co_employer_phone : null,
                        "job_title": customer.co_enabled && coEmployementStatusCheck == "employed" ? data.co_job_title : null,
                        "monthly_income": customer.co_enabled && coEmployementStatusCheck == "employed" ? data.co_monthly_income : null,
                        "present_employer": customer.co_enabled && coEmployementStatusCheck == "employed" ? data.co_present_employer : null,
                        "source": customer.co_enabled ? data.co_additional_income_status == "yes" ? data.co_source : null : null,
                        "additional_income": customer.co_enabled ? data.co_additional_income_status == "yes" ? data.co_additional_income : null : null,
                        "years_there_second": customer.co_enabled && coEmployementStatusCheck == "employed" ? data.co_years_there_second : null,
                    }
                }

                updateCustomer(history, null, temp_customer);
                setShowWarning(true);  
                setTimeout(function() {
                    modalAgreebtn.current.focus(); 
                }.bind(this), 0);          
            }
        } 
        else 
        {
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

            <Modal show={showWarning} onHide={() => setShowWarning(false)} autoFocus={false}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="fixed-height">
                    By selecting “I agree,” below, you attest that you have read the following to the customer and they have indicated that they agree:<br></br>
                    If you agree to the following, you will be giving <b>{localStorage.getItem('dealer_name').replace("%20", " ")}</b> and its assigns, including Travis Capital Partners, LLC, the right to investigate your credit capacity and credit history. Seller or its assigns, agents, and any other company seeking to grant me/us the requested credit (the “potential creditor”), including Travis Capital Partners, LLC, may request a credit report for any legitimate purpose associated with your application for credit, extending credit, modifying the terms of your credit agreement, or a collection on your account. You hereby authorize Seller or its assigns, agents, and any other company seeking to grant me/us the requested credit (the “potential creditor”) to make whatever credit inquiries they deem necessary in connection with my credit application or in the course of review or collection of any credit extended in reliance on this application. You authorize and instruct any person or consumer reporting agency to complete and furnish Seller, or its assigns and agents, any information they may have or obtain in response to such credit inquiries and agree that the same shall remain the property of the potential creditor whether or not credit is extended. You certify that you have read the above information and the information is true and correct. You certify that You have read the information above and You agree to the terms of this Credit Application. Do you agree?
                </Modal.Body>
                <Modal.Footer>
                <button ref={modalAgreebtn} class="btn secondary" onClick={() => {
                    setShowWarning(false)
                    submiCreditApplication(history, '/applyApplicationSummary', customer);  
                }}>
                    I Agree
                </button>
                <button class="btn secondary" onClick={() => setShowWarning(false)}>
                    Close
                </button>
                </Modal.Footer>
            </Modal>

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                <div className="container">
                    <div className="styled-form">

                        <div className="box center-box" style={{width: 290, marginTop: 22}}>
                            <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Are you currently employed?</label>
                            <div className="radio-box center">
                                <Form.Group className="mb-18 radio-filed employed-radio-filed">
                                    <Input 
                                        id ="employed_status"
                                        name="employement_status"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio"
                                        defaultValue="employed"
                                        optionalParams={{
                                            autoFocus: true
                                        }}
                                        checked={employementStatusCheck == "employed" ? true : null}
                                        handleChange={(e) => setEmployementStatusCheck(e.target.value)}
                                    />
                                    <label for="employed_status" class="form-label" id="employed_status-label">Employed</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="not_employed_status"
                                        name="employement_status"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio regular-radio2"
                                        defaultValue="not employed"
                                        checked={employementStatusCheck == "not employed" ? true : null}
                                        handleChange={(e) => setEmployementStatusCheck(e.target.value)}
                                    />
                                    <label for="not_employed_status" class="form-label" id="not_employed_status-label">Not Employed</label>
                                </Form.Group>
                            </div>
                        </div>

                        {employementStatusCheck == "employed" &&

                            <>

                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="present_employer"
                                        type="text"
                                        defaultValue={customer.main_app.present_employer}
                                        label="Present Employer"
                                        defaultText="Present Employer"
                                        required={true}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width:190}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="years_there_second"
                                        type="text"
                                        defaultValue={customer.main_app.years_there_second}
                                        label="Years There"
                                        defaultText="0"
                                        regex="^[0-9][\w\.\d]{0,5}$"
                                        required={true}
                                        error={{
                                            'empty': " ",
                                            'invalid': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 87}}}
                                    />
                                </Form.Group>
                            </div>

                            <Form.Group className="mb-18">
                                <Input
                                    name="job_title"
                                    type="text"
                                    defaultValue={customer.main_app.job_title}
                                    label="Job Title/Position"
                                    defaultText="Job Title/Position"
                                    required={true}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>

                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="employer_phone"
                                        type="hidden"
                                        defaultValue={customer.main_app.employer_phone ? customer.main_app.employer_phone : null}
                                        label="Employer's Phone No."
                                        defaultText="(123) 456-7890"
                                        regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                        mask="(999) 999-9999"
                                        required={true}
                                        error={{
                                            'invalid': "Please enter 10 digit number",
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 146}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="monthly_income"
                                        type="text"
                                        defaultValue={customer.main_app.monthly_income}
                                        label="Monthly Income"
                                        isAmount={true}
                                        defaultText="0"
                                        regex="^[0-9][\w\.\d]{0,20}$"
                                        required={true}
                                        error={{
                                            'empty': " ",
                                            'invalid': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 118}}}
                                    />
                                </Form.Group>
                            </div>

                            </>
                        }
                        

                        <div className="box center-box" style={{width: 290, marginTop: 22}}>
                            <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you have any other sources of income?</label>
                            <div className="radio-box center">
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="yes"
                                        name="additional_income_status"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio"
                                        defaultValue="yes"
                                        checked={ownOtherSourceStatus === "yes" ? true : null}
                                        handleChange={(e) => hideMainAppError(e.target.value)}
                                    />
                                    <label for="yes" class="form-label " id="yes-label">Yes</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="no"
                                        name="additional_income_status"
                                        type="radio"
                                        className="radio-width"
                                        inputClass="regular-radio regular-radio2"
                                        defaultValue="no"
                                        checked={ownOtherSourceStatus === "no" ? true : null}
                                        handleChange={(e) => hideMainAppError(e.target.value)}
                                    />
                                    <label for="no" class="form-label " id="no-label">No</label>
                                </Form.Group>
                            </div>
                            <div class={`error-label ${ownOtherSourceError ? "show" : "hide"}`}>Please select details</div>
                        </div>

                        {ownOtherSourceStatus === "yes" &&

                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="source"
                                        type="text"
                                        defaultValue={customerAdditionalIncomeSource}
                                        label="Source"
                                        defaultText="Source"
                                        required={ownOtherSourceStatus === "no" ? false : true}
                                        disabled={ownOtherSourceStatus === "no" ? true : false}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 166}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="additional_income"
                                        type="text"
                                        defaultValue={customerAdditionalIncome}
                                        label="Monthly Income"
                                        defaultText="0"
                                        regex="^[0-9][\w\.\d]{0,20}$"
                                        isAmount={true}
                                        required={ownOtherSourceStatus === "no" ? false : true}
                                        disabled={ownOtherSourceStatus === "no" ? true : false}
                                        error={{
                                            'empty': " ",
                                            'invalid': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 118}}}
                                    />
                                </Form.Group>
                            </div>
                        }







                        {customer.co_enabled &&

                        <>

                            <span className="divider">
                                <span className="title">Co-applicant</span>
                            </span>


                            <div className="box center-box" style={{width: 290, marginTop: 22}}>
                                <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Are you currently employed?</label>
                                <div className="radio-box center">
                                    <Form.Group className="mb-18 radio-filed employed-radio-filed">
                                        <Input 
                                            id ="co_employed_status"
                                            name="co_employement_status"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio"
                                            defaultValue="employed"
                                            checked={coEmployementStatusCheck == "employed" ? true : null}
                                            handleChange={(e) => setCoEmployementStatusCheck(e.target.value)}
                                        />
                                        <label for="co_employed_status" class="form-label" id="co_employed_status-label">Employed</label>  
                                    </Form.Group>
                                    <Form.Group className="mb-18 radio-filed">
                                        <Input 
                                            id ="co_not_employed_status"
                                            name="co_employement_status"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio regular-radio2"
                                            defaultValue="not employed"
                                            checked={coEmployementStatusCheck == "not employed" ? true : null}
                                            handleChange={(e) => setCoEmployementStatusCheck(e.target.value)}
                                        />
                                        <label for="co_not_employed_status" class="form-label" id="co_not_employed_status-label">Not Employed</label>
                                    </Form.Group>
                                </div>
                            </div>


                            {coEmployementStatusCheck == "employed" &&

                            <>

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_present_employer"
                                            type="text"
                                            defaultValue={customer.co_app.present_employer}
                                            label="Present Employer"
                                            defaultText="Present Employer"
                                            required={true}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 190}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_years_there_second"
                                            type="text"
                                            defaultValue={customer.co_app.years_there_second}
                                            label="Years There"
                                            defaultText="0"
                                            regex="^[0-9][\w\.\d]{0,5}$"
                                            required={true}
                                            error={{
                                                'empty': " ",
                                                'invalid': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 87}}}
                                        />
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_job_title"
                                        type="text"
                                        defaultValue={customer.co_app.job_title}
                                        label="Job Title/Position"
                                        defaultText="Job Title/Position"
                                        required={true}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                    />
                                </Form.Group>

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_employer_phone"
                                            type="hidden"
                                            defaultValue={customer.co_app.employer_phone ? customer.co_app.employer_phone : null}
                                            label="Employer's Phone No."
                                            defaultText="(123) 456-7890"
                                            regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                            mask="(999) 999-9999"
                                            required={true}
                                            error={{
                                                'invalid': "Please enter 10 digit number",
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 145}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_monthly_income"
                                            type="text"
                                            defaultValue={customer.co_app.monthly_income}
                                            label="Monthly Income"
                                            defaultText="0"
                                            regex="^[0-9][\w\.\d]{0,20}$"
                                            isAmount={true}
                                            required={true}
                                            error={{
                                                'empty': " ",
                                                'invalid': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 118}}}
                                        />
                                    </Form.Group>
                                </div>
                            
                            </>
                            
                            }



                            <div className="box center-box" style={{width: 290, marginTop: 22}}>
                                <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you have any other sources of income?</label>
                                <div className="radio-box center">
                                    <Form.Group className="mb-18 radio-filed">
                                        <Input 
                                            id ="co_yes"
                                            name="co_additional_income_status"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio"
                                            defaultValue="yes"
                                            checked={coOtherSourceStatus === "yes" ? true : null}
                                            handleChange={(e) => hideCoAppError(e.target.value)}
                                        />
                                        <label for="co_yes" class="form-label " id="co_yes-label">Yes</label>  
                                    </Form.Group>
                                    <Form.Group className="mb-18 radio-filed">
                                        <Input 
                                            id ="co_no"
                                            name="co_additional_income_status"
                                            type="radio"
                                            className="radio-width"
                                            inputClass="regular-radio regular-radio2"
                                            defaultValue="no"
                                            checked={coOtherSourceStatus === "no" ? true : null}
                                            handleChange={(e) => hideCoAppError(e.target.value)}
                                        />
                                        <label for="co_no" class="form-label " id="co_no-label">No</label>
                                    </Form.Group>
                                </div>
                                <div class={`error-label ${coOtherSourceError ? "show" : "hide"}`}>Please select details</div>
                            </div>

                            {coOtherSourceStatus === "yes" && 

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_source"
                                            type="text"
                                            defaultValue={coCustomerAdditionalIncomeSource}
                                            label="Source"
                                            defaultText="Source"
                                            required={coOtherSourceStatus === "no" ? false : true}
                                            disabled={coOtherSourceStatus === "no" ? true : false}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 166}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_additional_income"
                                            type="text"
                                            defaultValue={coCustomerAdditionalIncome}
                                            label="Monthly Income"
                                            defaultText="0"
                                            regex="^[0-9][\w\.\d]{0,20}$"
                                            isAmount={true}
                                            required={coOtherSourceStatus === "no" ? false : true}
                                            disabled={coOtherSourceStatus === "no" ? true : false}
                                            error={{
                                                'empty': " ",
                                                'invalid': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 118}}}
                                        />
                                    </Form.Group>
                                </div>
                            }

                        </>
                            
                        }





                    </div>
                </div>
                <div className="footer-container">
                    {/* {isAgree ?
                        <input className="btn secondary" type="submit" value="Save & Submit"/>
                        :
                        <input className="btn secondary" type="button" value="Finish" onClick={() => setShowWarning(true)}/>
                    } */}
                    <input className="btn secondary" type="submit" value="Finish"/>
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
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data)),
    submiCreditApplication: (history, path, data) => dispatch(submiCreditApplication(history, path, data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);