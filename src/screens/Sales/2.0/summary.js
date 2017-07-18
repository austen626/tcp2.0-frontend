import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconHome, IconListWhite, IconStatusComplete, IconStatusSent,IconContactAcitve } from '../../../assets/images';
import Loader from 'shared/Loader';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
import Checkbox from '../../../components/commons/checkbox';

import { submiCreditApplication, submiCreditApplicationByMain, updateCustomer, resetCustomerSearchApiInitiate } from '../../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        appFillStatus,
        submiCreditApplication,
        submiCreditApplicationByMain,
        actionLoading,
        updateCustomer,
        resetCustomerSearchApiInitiate
    } = props;

    const [activeTab, setActiveTab] = useState('summary_list');

    const handleAddCoApp = () => {
        let temp_customer = {
            ...customer,
            "co_enabled": true,
        }

        updateCustomer(history, '/applyApplicationBasicDetails', temp_customer) 
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        if(appFillStatus == "in_app") {
            submiCreditApplication(history, customer);
        } else {
            submiCreditApplicationByMain(history, customer);
        }
    }

    const handleHomeScreen = () => {
        resetCustomerSearchApiInitiate(false)
        history.replace('/applyHome');        
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab)       
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

            <Header>
                <HeaderLeft>
                    <img src={IconHome} onClick={() => handleHomeScreen()} alt="" />
                </HeaderLeft>
                <HeaderCenter>
                    <div className="header-main">
                        <img className="main-logo" src={TCPLogo} alt="" />
                    </div>
                </HeaderCenter>
                <HeaderRight></HeaderRight>
            </Header>

            <div className="sub-header">

                <button className={`${activeTab === 'profile' ? 'active' : ''}`} onClick={()=>handleTabChange('profile')}>
                    <img src={IconContactAcitve} alt=""/> 
                    {activeTab === 'profile' && <span className='arrow-down'></span>}
                </button>

                <button style={{minWidth: 238}} className={`${activeTab === 'credit_details' ? 'active' : ''}`} onClick={()=>handleTabChange('credit_details')}>
                    <span>Summary</span>
                    {activeTab === 'credit_details' && <span className='arrow-down'></span>}
                </button>

                <button className={`${activeTab === 'summary_list' ? 'active' : ''}`} onClick={()=>handleTabChange('summary_list')}>
                    <img src={IconListWhite} alt=""/> 
                    {activeTab === 'summary_list' && <span className='arrow-down'></span>}
                </button>

            </div>









            {activeTab === 'profile' &&
                <>
                    <div className="container pointer-none" style={{marginBottom: 0}}>
                        <div className="styled-form">
                            <Form.Group className="mb-18">
                                <Input
                                    name="first_name"
                                    type="text"
                                    value={customer.main_app.first_name}
                                    label="Applicant First Name"
                                    defaultText="Applicant First Name"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="last_name"
                                    type="text"
                                    value={customer.main_app.last_name}
                                    label="Applicant Last Name"
                                    defaultText="Applicant Last Name"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    value={customer.main_app.email}
                                    label="Email"
                                    defaultText="Email"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="cell_phone"
                                    type="hidden"
                                    value={customer.main_app.cell_phone}
                                    label="Phone"
                                    className="medium-input"
                                    defaultText="(123) 456-7890"
                                    regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    mask="(999) 999-9999"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="date_of_birth"
                                    type="hidden"
                                    value={customer.main_app.dobY && customer.main_app.dobM && customer.main_app.dobD ? `${customer.main_app.dobY}-${customer.main_app.dobM}-${customer.main_app.dobD}` : null}
                                        label="Date of Birth"
                                    className="medium-input"
                                    defaultText="MM / DD / YYYY"
                                    disabled={true}
                                    isDate={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="driver_license"
                                    type="hidden"
                                    value={customer.main_app.driver_license}
                                    label="Driver License Number"
                                    defaultText="#"
                                    mask="**************"
                                    maskChar=" "
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="no_of_dependents"
                                    type="number"
                                    value={customer.main_app.no_of_dependents}
                                    label="Number of Dependants"
                                    defaultText="0"
                                    regex="\b\d{1,2}\b"
                                    className="small-input"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="street"
                                    type="text"
                                    value={customer.main_app.street}
                                    label="Street"
                                    defaultText="Street"
                                    disabled={true}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="city"
                                    type="text"
                                    value={customer.main_app.city}
                                    label="City"
                                    defaultText="City"
                                    disabled={true}
                                />
                            </Form.Group>
                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Dropdown
                                        name="state"
                                        type="dropdown"
                                        label="State"
                                        defaultText="State"
                                        defaultValue={customer.main_app.state}
                                        disabled={true}
                                        options={[{
                                            label: customer.main_app.state,
                                            value: customer.main_app.state
                                        }]}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="zip"
                                        type="number"
                                        regex="\b\d{5}\b"
                                        value={customer.main_app.zip}
                                        label="Zip Code"
                                        defaultText="Zip Code"
                                        disabled={true}
                                    />
                                </Form.Group>
                            </div>
                            <Form.Group className="mb-18">
                                <Checkbox
                                    name="have_co_applicant"
                                    type="checkbox"
                                    label="Add co-applicant"
                                    checked={customer.co_enabled ? true : null}
                                />
                            </Form.Group>  

                            {customer.co_enabled &&                                     

                                <>

                                <span className="divider">
                                    <span className="title">Co-applicant</span>
                                </span>

                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_first_name"
                                        type="text"
                                        value={customer.co_app.first_name}
                                        label="Co-applicant First Name"
                                        defaultText="Co-applicant First Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_last_name"
                                        type="text"
                                        value={customer.co_app.last_name}
                                        label="Co-applicant Last Name"
                                        defaultText="Co-applicant Last Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_email"
                                        type="email"
                                        regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                        value={customer.co_app.email}
                                        label="Email"
                                        defaultText="Email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_cell_phone"
                                        type="hidden"
                                        value={customer.co_app.cell_phone}
                                        label="Phone"
                                        className="medium-input"
                                        defaultText="(123) 456-7890"
                                        regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                        mask="(999) 999-9999"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_date_of_birth"
                                        type="hidden"
                                        value={customer.co_app.dobY && customer.co_app.dobM && customer.co_app.dobD ? `${customer.co_app.dobY}-${customer.co_app.dobM}-${customer.co_app.dobD}` : null}
                                        label="Date of Birth"
                                        className="medium-input"
                                        defaultText="MM / DD / YYYY"
                                        isDate={true}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_driver_license"
                                        type="text"
                                        value={customer.co_app.driver_license}
                                        label="Driver License Number"
                                        defaultText="Driver License Number"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_no_of_dependents"
                                        type="number"
                                        value={customer.co_app.no_of_dependents}
                                        label="Number of Dependants"
                                        defaultText="0"
                                        regex="\b\d{1,2}\b"
                                        className="small-input"
                                    />
                                </Form.Group>                       
                                <Form.Group className="mb-18">
                                    <Checkbox
                                        name="co_have_co_applicant_same_address"
                                        type="checkbox"
                                        label="Same as Applicant"
                                        checked={customer.co_app.co_have_co_applicant_same_address ? true : null}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_street"
                                        type="text"
                                        label="Street"
                                        defaultText="Street"
                                        defaultValue={customer.co_app.street}
                                        disabled={customer.co_enabled ? true : false}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_city"
                                        type="text"
                                        label="City"
                                        defaultValue={customer.co_app.city}
                                        defaultText="City"
                                    />
                                </Form.Group>
                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Dropdown
                                            name="co_state"
                                            type="dropdown"
                                            label="State"
                                            defaultText="State"
                                            defaultValue={customer.co_app.state}
                                            options={[{
                                                label: customer.co_app.state,
                                                value: customer.co_app.state
                                            }]}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="co_zip"
                                            type="number"
                                            defaultValue={customer.co_app.zip}
                                            regex="\b\d{5}\b"
                                            label="Zip Code"
                                            defaultText="Zip Code"
                                        />
                                    </Form.Group>
                                </div>

                                </>
                            }

                        </div>
                    </div>
                </>
            }






            {activeTab === 'credit_details' &&
                <>
                    <div className="container pointer-none" style={{marginBottom: 0}}>
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
                                            checked={customer.main_app.own_or_rent == 'own' ? true : null}
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
                                            checked={customer.main_app.own_or_rent == 'rent' ? true : null}
                                        />
                                        <label for="rent" class="form-label " id="rent-label">Rent</label>
                                    </Form.Group>
                                </div>
                            </div>
                            
                            <Form.Group className="mb-18">
                                <Input
                                    name="years_there_first"
                                    type="number"
                                    defaultValue={customer.main_app.years_there_first}
                                    label="How many years did you live there?"
                                    defaultText="0"
                                    required={true}
                                    className="single-line-input"
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="monthly_rent_mortgage_payment"
                                    type="number"
                                    defaultValue={customer.main_app.monthly_rent_mortgage_payment}
                                    label={`${customer.main_app.own_or_rent === 'own' ? "Monthly Mortgage Payment:" : "Monthly Rent Payment:"}`}
                                    isAmount={true}
                                    defaultText="0"
                                    className="single-line-input width-112"
                                />
                            </Form.Group>                
                            
                            {customer.co_enabled && 

                                <>

                                <span className="divider">
                                    <span className="title">Co-applicant</span>
                                </span> 

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
                                                checked={customer.co_app.own_or_rent == 'own' ? true : null}
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
                                                checked={customer.co_app.own_or_rent == 'rent' ? true : null}
                                            />
                                            <label for="co_rent" class="form-label " id="co_rent-label">Rent</label>
                                        </Form.Group>
                                    </div>
                                </div>

                                <Form.Group className="mb-18">
                                    <Checkbox
                                        name="have_co_applicant_with_same_answers"
                                        type="checkbox"
                                        theme="light-label"
                                        label="The answes are the same as the answers<br>given by the applicant"
                                        checked={customer.co_app.have_co_applicant_with_same_answers ? true : null}
                                    />
                                </Form.Group>  

                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_years_there_first"
                                        type="number"
                                        defaultValue={customer.co_app.years_there_first}
                                        label="How many years did you live there?"
                                        defaultText="0"
                                        required={true}
                                        className="single-line-input"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-18">
                                    <Input
                                        name="co_monthly_rent_mortgage_payment"
                                        type="number"
                                        defaultValue={customer.co_app.monthly_rent_mortgage_payment}
                                        label={`${customer.co_app.own_or_rent === 'own' ? "Monthly Mortgage Payment:" : "Monthly Rent Payment:"}`}
                                        defaultText="0"
                                        isAmount={true}
                                        required={true}
                                        className="single-line-input width-112"
                                    />
                                </Form.Group> 

                                </>
                            }

                        </div>
                    </div>



                    <div className="container">
                        <div className="styled-form">

                            <Form.Group className="mb-18">
                                <Checkbox
                                    name="employement_status"
                                    type="checkbox"
                                    theme="light-label"
                                    label="Not currently employed"
                                    checked={customer.main_app.employement_status ? true : null}
                                />
                            </Form.Group>

                            {!customer.main_app.employement_status &&

                                <>

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="present_employer"
                                            type="text"
                                            defaultValue={customer.main_app.present_employer}
                                            label="Present Employer"
                                            defaultText="Present Employer"
                                            optionalParams = {{style:{width: 190}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="years_there_second"
                                            type="number"
                                            defaultValue={customer.main_app.years_there_second}
                                            label="Years There"
                                            defaultText="0"
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
                                    />
                                </Form.Group>

                                <div className="styled-row">
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="employer_phone"
                                            type="hidden"
                                            defaultValue={customer.main_app.employer_phone}
                                            label="Employer's Phone No."
                                            defaultText="(123) 456-7890"
                                            regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                            mask="(999) 999-9999"
                                            optionalParams = {{style:{width: 146}}}
                                        />
                                    </Form.Group>
                                    <Form.Group className="styled-column mb-18">
                                        <Input
                                            name="monthly_income"
                                            type="number"
                                            defaultValue={customer.main_app.monthly_income}
                                            label="Monthly Income"
                                            isAmount={true}
                                            defaultText="0"
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
                                                checked={customer.main_app.additional_income_status === "yes" ? true : null}
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
                                                checked={customer.main_app.additional_income_status === "no" ? true : null}
                                            />
                                            <label for="no" class="form-label " id="no-label">No</label>
                                        </Form.Group>
                                    </div>
                                </div>

                                {customer.main_app.additional_income_status === "yes" &&

                                    <div className="styled-row">
                                        <Form.Group className="styled-column mb-18">
                                            <Input
                                                name="source"
                                                type="text"
                                                defaultValue={customer.main_app.source}
                                                label="Source"
                                                defaultText="Source"
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
                                                isAmount={true}
                                                optionalParams = {{style:{width: 118}}}
                                            />
                                        </Form.Group>
                                    </div>
                                }

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
                                        checked={customer.co_app.co_employement_status ? true : null}
                                    />
                                </Form.Group>


                                {!customer.co_app.co_employement_status &&

                                <>

                                    <div className="styled-row">
                                        <Form.Group className="styled-column mb-18">
                                            <Input
                                                name="co_present_employer"
                                                type="text"
                                                defaultValue={customer.co_app.present_employer}
                                                label="Present Employer"
                                                defaultText="Present Employer"
                                                optionalParams = {{style:{width: 190}}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="styled-column mb-18">
                                            <Input
                                                name="co_years_there_second"
                                                type="number"
                                                defaultValue={customer.co_app.years_there_second}
                                                label="Years There"
                                                defaultText="0"
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
                                        />
                                    </Form.Group>

                                    <div className="styled-row">
                                        <Form.Group className="styled-column mb-18">
                                            <Input
                                                name="co_employer_phone"
                                                type="hidden"
                                                defaultValue={customer.co_app.employer_phone}
                                                label="Employer's Phone No."
                                                defaultText="(123) 456-7890"
                                                regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                                mask="(999) 999-9999"
                                                optionalParams = {{style:{width: 145}}}
                                            />
                                        </Form.Group>
                                        <Form.Group className="styled-column mb-18">
                                            <Input
                                                name="co_monthly_income"
                                                type="number"
                                                defaultValue={customer.co_app.monthly_income}
                                                label="Monthly Income"
                                                defaultText="0"
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
                                                    checked={customer.co_app.co_additional_income_status === "yes" ? true : null}
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
                                                    checked={customer.co_app.co_additional_income_status === "no" ? true : null}
                                                />
                                                <label for="co_no" class="form-label " id="co_no-label">No</label>
                                            </Form.Group>
                                        </div>
                                    </div>

                                    {customer.co_app.co_additional_income_status === "yes" && 

                                        <div className="styled-row">
                                            <Form.Group className="styled-column mb-18">
                                                <Input
                                                    name="co_source"
                                                    type="text"
                                                    defaultValue={customer.co_app.co_source}
                                                    label="Source"
                                                    defaultText="Source"
                                                    optionalParams = {{style:{width: 204}}}
                                                />
                                            </Form.Group>
                                            <Form.Group className="styled-column mb-18">
                                                <Input
                                                    name="co_additional_income"
                                                    type="number"
                                                    defaultValue={customer.co_app.co_additional_income}
                                                    label="Monthly Income"
                                                    defaultText="0"
                                                    optionalParams = {{style:{width: 118}}}
                                                />
                                            </Form.Group>
                                        </div>
                                    }
                                </>
                                }
                            </>
                            }
                        </div>
                    </div>
                </>
            }





            {activeTab === 'summary_list' &&
                <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                    <div className="container black-box">
                        <div className="table-div">

                            <table className="summary-row">
                                <tr>
                                    <td><span><b>Name: </b> {customer.main_app.name}</span></td>
                                    <td><span>{customer.co_enabled ? customer.co_app.name : ''}</span></td>
                                </tr>
                                <tr>
                                    <td><span><b>Address: </b> {customer.main_app.street} {customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}</span></td>
                                    <td>
                                        {customer.co_enabled ? 
                                            <span>{customer.co_app.street} {customer.main_app.city} {customer.main_app.state} {customer.main_app.zip}</span> 
                                            : 
                                            appFillStatus == "in_app" ?                                      
                                                <button className="secondary" type="submit" onClick={() => handleAddCoApp()}>Add Co-App</button>
                                            : null
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td><span><b>Email: </b> {customer.main_app.email}</span></td>
                                    <td><span>{customer.co_enabled ? customer.co_app.email : ''}</span></td>
                                </tr>
                                <tr>
                                    <td><span><b>Phone: </b> {customer.main_app.cell_phone}</span></td>
                                    <td><span>{customer.co_enabled ? customer.co_app.cell_phone : ''}</span></td>
                                </tr>
                            </table>

                            <div className="row other-details summary-row">
                                <div className="col">
                                    <span className="status">Credit application</span>
                                    {appFillStatus == "in_app" ?                                             
                                        <span className="status-icon status-icon-2">
                                            <img src={IconStatusComplete}/>
                                            completed 
                                        </span>
                                        :                                                
                                        <span className="status-icon">
                                            <img src={IconStatusSent}/>
                                            sent 
                                        </span>
                                    }
                                </div>
                                <div className={`col ${!customer.co_enabled ? 'button-col' : null}`}>

                                    {customer.co_enabled &&
                                        <>
                                            <span className="status">Credit application</span>
                                            {appFillStatus == "in_app" ?                                             
                                                <span className="status-icon status-icon-2">
                                                    <img src={IconStatusComplete}/>
                                                    completed 
                                                </span>
                                                :                                                
                                                <span className="status-icon">
                                                    <img src={IconStatusSent}/>
                                                    sent 
                                                </span>
                                            }
                                        </>                                        
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="footer-container">
                        <button className="secondary" type="submit">{appFillStatus == "in_app" ? 'Submit' : 'Submit'}</button>
                    </div>
                </form>
            }

        </div>
    )
}

const mapStateToProps = state => ({
    appFillStatus: state.sales.appFillStatus,
    customer: state.sales.customer,
    isCustomerFound: state.sales.isCustomerFound,
    actionLoading: state.sales.actionLoading
});

const mapDispatchToProps = dispatch => ({
    submiCreditApplication: (history, data) => dispatch(submiCreditApplication(history, data)),
    submiCreditApplicationByMain: (history, data) => dispatch(submiCreditApplicationByMain(history, data)),
    updateCustomer: (history, path, data) => dispatch(updateCustomer(history, path, data)),
    resetCustomerSearchApiInitiate: () => dispatch(resetCustomerSearchApiInitiate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);