import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../assets/images';
import Input from '../../components/commons/input';
import Checkbox from '../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../components/commons/utility';
import { updateCustomer } from '../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        updateCustomer,
        actionLoading,
    } = props;

    const [validationResult, setValidationResult] = useState(null);

    const [employementStatusCheck, setEmployementStatusCheck] = useState(customer.main_app.employement_status);
    const [coEmployementStatusCheck, setCoEmployementStatusCheck] = useState(customer.co_enabled ? customer.co_app.employement_status : true);

    const [ownOtherSourceError, setOtherSourceError] = useState(false);
    const [ownOtherSourceStatus, setOtherSourceStatus] = useState(customer.main_app.additional_income && customer.main_app.additional_income != '0' ? "yes" : "no");
    
    const [coOtherSourceError, setCoOtherSourceError] = useState(false);
    const [coOtherSourceStatus, setCoOtherSourceStatus] = useState(customer.co_enabled && customer.co_app.additional_income && customer.co_app.additional_income != '0' ? "yes" : "no");
    
    const hideMainAppError = (data) => {
        setOtherSourceStatus(data);
        setOtherSourceError(false);
    }

    const hideCoAppError = (data) => {
        setCoOtherSourceStatus(data);
        setCoOtherSourceError(false);
    }

    const handleArrowBack = () => {
        history.replace('/home');   
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        if (!formData.validationResult) {

            if( !employementStatusCheck && formData.formData.additional_income_status === undefined)
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
                        "employement_status": data.employement_status,
                        "employer_phone": data.employer_phone,
                        "job_title": data.job_title,
                        "monthly_income": data.monthly_income,
                        "present_employer": data.present_employer,
                        "source": data.additional_income_status == "yes" ? data.source : '',
                        "additional_income": data.additional_income_status == "yes" ? data.additional_income : '',
                        "years_there_second": data.years_there_second,
                    },
                    "co_app": {
                        ...customer.co_app,
                        "additional_income_status": customer.co_enabled ? data.co_additional_income_status : '',
                        "employement_status": customer.co_enabled ? data.co_employement_status : false,
                        "employer_phone": customer.co_enabled ? data.co_employer_phone : '',
                        "job_title": customer.co_enabled ? data.co_job_title : '',
                        "monthly_income": customer.co_enabled ? data.co_monthly_income : '',
                        "present_employer": customer.co_enabled ? data.co_present_employer : '',
                        "source": customer.co_enabled ? data.co_additional_income_status == "yes" ? data.co_source : '' : '',
                        "additional_income": customer.co_enabled ? data.co_additional_income_status == "yes" ? data.co_additional_income : '' : '',
                        "years_there_second": customer.co_enabled ? data.co_years_there_second : '',
                    }
                }

                updateCustomer(history, '/thankyou', temp_customer)
            }
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

                        <Form.Group className="mb-18">
                            <Checkbox
                                name="employement_status"
                                type="checkbox"
                                theme="light-label"
                                label="Not currently employed"
                                checked={employementStatusCheck ? true : null}
                                handleChange={(e)=>setEmployementStatusCheck(e.target.checked)}
                            />
                        </Form.Group>

                        {!employementStatusCheck &&

                            <>

                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="present_employer"
                                        type="text"
                                        defaultValue={customer.main_app.present_employer}
                                        label="Present Employer"
                                        defaultText="Present Employer"
                                        maxLength={6}
                                        required={true}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 241}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="years_there_second"
                                        type="number"
                                        defaultValue={customer.main_app.years_there_second}
                                        label="Years There"
                                        defaultText="0"
                                        required={true}
                                        error={{
                                            'empty': " "
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
                                        defaultValue={customer.main_app.employer_phone ? customer.main_app.employer_phone.replace(/\-/g,"") : ''}
                                        label="Employer's Phone Number"
                                        defaultText="9999999999"
                                        regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                        masked={true}
                                        required={true}
                                        error={{
                                            'invalid': "Please enter 10 digit number",
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 204}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="monthly_income"
                                        type="number"
                                        defaultValue={customer.main_app.monthly_income}
                                        label="Monthly Income"
                                        defaultText="0"
                                        required={true}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 118}}}
                                    />
                                </Form.Group>
                            </div>

                            <div className="box center-box" style={{width: 290, marginTop: 22}}>
                                <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you have any other sources of income</label>
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

                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="source"
                                        type="text"
                                        defaultValue={customer.main_app.source}
                                        label="Source"
                                        defaultText="Source"
                                        required={ownOtherSourceStatus === "no" ? false : true}
                                        disabled={ownOtherSourceStatus === "no" ? true : false}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 204}}}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="additional_income"
                                        type="number"
                                        defaultValue={customer.main_app.additional_income}
                                        label="Monthly Income"
                                        defaultText="0"
                                        required={ownOtherSourceStatus === "no" ? false : true}
                                        disabled={ownOtherSourceStatus === "no" ? true : false}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                        optionalParams = {{style:{width: 118}}}
                                    />
                                </Form.Group>
                            </div>

                            </>
                        }
                        









                        {customer.co_enabled &&

                        <>

                            <span className="divider">
                                <span className="title">Co-applicant</span>
                            </span>

                            <Form.Group className="mb-18">
                                <Checkbox
                                    name="co_employement_status"
                                    type="checkbox"
                                    theme="light-label"
                                    label="Not currently employed"
                                    checked={coEmployementStatusCheck ? true : null}
                                    handleChange={(e)=>setCoEmployementStatusCheck(e.target.checked)}
                                />
                            </Form.Group>


                            {!coEmployementStatusCheck &&

                            <>

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_present_employer"
                                            type="text"
                                            defaultValue={customer.co_app.present_employer}
                                            label="Present Employer"
                                            defaultText="Present Employer"
                                            maxLength={6}
                                            required={true}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 241}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_years_there_second"
                                            type="number"
                                            defaultValue={customer.co_app.years_there_second}
                                            label="Years There"
                                            defaultText="0"
                                            required={true}
                                            error={{
                                                'empty': " "
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
                                            defaultValue={customer.co_app.employer_phone ? customer.co_app.employer_phone.replace(/\-/g,"") : ''}
                                            label="Employer's Phone Number"
                                            defaultText="9999999999"
                                            regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                            masked={true}
                                            required={true}
                                            error={{
                                                'invalid': "Please enter 10 digit number",
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 204}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_monthly_income"
                                            type="number"
                                            defaultValue={customer.co_app.monthly_income}
                                            label="Monthly Income"
                                            defaultText="0"
                                            maxLength={6}
                                            required={true}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 118}}}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="box center-box" style={{width: 290, marginTop: 22}}>
                                    <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you have any other sources of income</label>
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

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_source"
                                            type="text"
                                            defaultValue={customer.co_app.source}
                                            label="Source"
                                            defaultText="Source"
                                            required={coOtherSourceStatus === "no" ? false : true}
                                            disabled={coOtherSourceStatus === "no" ? true : false}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 204}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_additional_income"
                                            type="number"
                                            defaultValue={customer.co_app.additional_income}
                                            label="Monthly Income"
                                            defaultText="0"
                                            required={coOtherSourceStatus === "no" ? false : true}
                                            disabled={coOtherSourceStatus === "no" ? true : false}
                                            error={{
                                                'empty': " "
                                            }}
                                            validationResult={validationResult}
                                            optionalParams = {{style:{width: 118}}}
                                        />
                                    </Form.Group>
                                </div>
                            
                            </>
                            
                            }

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