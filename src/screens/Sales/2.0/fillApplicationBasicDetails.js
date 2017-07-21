import React, { useState, createRef } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
import Checkbox from '../../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateCustomer } from '../../../redux/actions/sales';

function AddDealer(props) {

    const {
        history,
        customer,
        isCustomerFound,
        updateCustomer,
        actionLoading,
        dropdownList = [

            {
                label: "Alabama",
                value: "Alabama"
            },
            {
                label: "Alaska",
                value: "Alaska"
            },
            {
                label: "Arizona",
                value: "Arizona"
            },
            {
                label: "Arkansas",
                value: "Arkansas"
            },
            {
                label: "California",
                value: "California"
            },
            {
                label: "Colorado",
                value: "Colorado"
            },
            {
                label: "Connecticut",
                value: "Connecticut"
            },
            {
                label: "Delaware",
                value: "Delaware"
            },
            {
                label: "Florida",
                value: "Florida"
            },
            {
                label: "Georgia",
                value: "Georgia"
            },
            {
                label: "Idaho",
                value: "Idaho"
            },
            {
                label: "Hawaii",
                value: "Hawaii"
            },
            {
                label: "Illinois",
                value: "Illinois"
            },
            {
                label: "Indiana",
                value: "Indiana"
            },
            {
                label: "Iowa",
                value: "Iowa"
            },
            {
                label: "Kansas",
                value: "Kansas"
            },
            {
                label: "Kentucky",
                value: "Kentucky"
            },
            {
                label: "Louisiana",
                value: "Louisiana"
            },
            {
                label: "Maine",
                value: "Maine"
            },
            {
                label: "Maryland",
                value: "Maryland"
            },
            {
                label: "Massachusetts",
                value: "Massachusetts"
            },
            {
                label: "Michigan",
                value: "Michigan"
            },
            {
                label: "Minnesota",
                value: "Minnesota"
            },
            {
                label: "Mississippi",
                value: "Mississippi"
            },
            {
                label: "Missouri",
                value: "Missouri"
            },
            {
                label: "Montana",
                value: "Montana"
            },
            {
                label: "Nebraska",
                value: "Nebraska"
            },
            {
                label: "Nevada",
                value: "Nevada"
            },
            {
                label: "New Hampshire",
                value: "New Hampshire"
            },
            {
                label: "New Jersey",
                value: "New Jersey"
            },
            {
                label: "New Mexico",
                value: "New Mexico"
            },
            {
                label: "New York",
                value: "New York"
            },
            {
                label: "North Carolina",
                value: "North Carolina"
            },
            {
                label: "North Dakota",
                value: "North Dakota"
            },
            {
                label: "Ohio",
                value: "Ohio"
            },
            {
                label: "Oklahoma",
                value: "Oklahoma"
            },
            {
                label: "Oregon",
                value: "Oregon"
            },
            {
                label: "Pennsylvania",
                value: "Pennsylvania"
            },
            {
                label: "Rhode Island",
                value: "Rhode Island"
            },
            {
                label: "South Carolina",
                value: "South Carolina"
            },
            {
                label: "South Dakota",
                value: "South Dakota"
            },
            {
                label: "Tennessee",
                value: "Tennessee"
            },
            {
                label: "Texas",
                value: "Texas"
            },
            {
                label: "Utah",
                value: "Utah"
            },
            {
                label: "Vermont",
                value: "Vermont"
            },
            {
                label: "Virginia",
                value: "Virginia"
            },
            {
                label: "Washington",
                value: "Washington"
            },
            {
                label: "West Virginia",
                value: "West Virginia"
            },
            {
                label: "Wisconsin",
                value: "Wisconsin"
            },
            {
                label: "Wyoming",
                value: "Wyoming"
            }
        ]
    } = props;


    const [tempStreet, setTempStreet] = useState(customer ? customer.main_app.street : null);
    const [tempCity, setTempCity] = useState(customer ? customer.main_app.city : null);
    const [tempState, setTempState] = useState(customer ? customer.main_app.state : null);
    const [tempZip, setTempZip] = useState(customer ? customer.main_app.zip : null);

    const [coTempStreet, setCoTempStreet] = useState(customer && customer.co_enabled ? customer.co_app.street : null);
    const [coTempCity, setCoTempCity] = useState(customer && customer.co_enabled ? customer.co_app.city : null);
    const [coTempState, setCoTempState] = useState(customer && customer.co_enabled ? customer.co_app.state : null);
    const [coTempZip, setCoTempZip] = useState(customer && customer.co_enabled ? customer.co_app.zip : null);

    const [validationResult, setValidationResult] = useState(null);
    const [haveCoApplicant, setHaveCoApplicant] = useState(customer.co_enabled ? customer.co_enabled : false);
    const [haveCoApplicantSameAddress, setHaveCoApplicantSameAddress] = useState(customer.co_enabled && customer.co_app.co_have_co_applicant_same_address ? customer.co_app.co_have_co_applicant_same_address : false);

    const updateCoApplicantAddress = (check) => {     
        setCoTempStreet(tempStreet);
        setCoTempCity(tempCity);
        setCoTempState(tempState);
        setCoTempZip(tempZip);
        setHaveCoApplicantSameAddress(check);
    }

    const handleArrowBack = () => {
        history.replace('/applyApplication');
    }

    const showHideCoInputField = (check) => {
        setHaveCoApplicant(check)
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        console.log(formData.validationResult)

        setValidationResult(formData.validationResult);

        if (!formData.validationResult) {

            let data = formData.formData

            let date = new Date(data.date_of_birth).getDate();
            let month = new Date(data.date_of_birth).getMonth()+1;

            let co_date = null;
            let co_month = null;

            if(haveCoApplicant) {
                co_date = new Date(data.co_date_of_birth).getDate();
                co_month = new Date(data.co_date_of_birth).getMonth()+1;
            }

            let temp_customer = {
                ...customer,
                "main_app": {
                    ...customer.main_app,
                    "name": data.first_name+" "+data.last_name,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "email": data.email,
                    "dobY": new Date(data.date_of_birth).getFullYear(),
                    "dobM": month > 10 ? month : "0"+month,
                    "dobD": date > 10 ? date : "0"+date,
                    "ssn": data.ssn,
                    "driver_license": data.driver_license,
                    "no_of_dependents": data.no_of_dependents,
                    "cell_phone": data.cell_phone,
                    "home_phone": customer.main_app.home_phone,
                    "street": data.street,
                    "city": data.city,
                    "state": data.state,
                    "zip": data.zip
                },
                "co_enabled": haveCoApplicant,
                "co_app": {
                    ...customer.co_app,
                    "name": haveCoApplicant ? data.co_first_name+" "+data.co_last_name : null,
                    "first_name": haveCoApplicant ? data.co_first_name : null,
                    "last_name": haveCoApplicant ? data.co_last_name : null,
                    "email": haveCoApplicant ? data.co_email : null,
                    "dobY": haveCoApplicant ? new Date(data.co_date_of_birth).getFullYear() : null,
                    "dobM": haveCoApplicant ? co_month > 10 ? co_month : "0"+co_month : null,
                    "dobD": haveCoApplicant ? co_date > 10 ? co_date : "0"+co_date : null,
                    "co_have_co_applicant_same_address": haveCoApplicantSameAddress ? data.co_have_co_applicant_same_address : null,
                    "ssn": haveCoApplicant ? data.co_ssn : null,
                    "driver_license": haveCoApplicant ? data.co_driver_license : null,
                    "no_of_dependents": haveCoApplicant ? data.co_no_of_dependents : null,
                    "cell_phone": haveCoApplicant ? data.co_cell_phone : null,
                    "home_phone": haveCoApplicant ? customer.co_app.home_phone : null,
                    "street": haveCoApplicant ? data.co_street : null,
                    "city": haveCoApplicant ? data.co_city : null,
                    "state": haveCoApplicant ? data.co_state : null,
                    "zip": haveCoApplicant ? data.co_zip : null
                }
            }

            if(isCustomerFound) {
                temp_customer = {
                    ...temp_customer,
                    "main_app": {
                        ...temp_customer.main_app,
                        "id": customer.main_app.id
                    },
                    "co_app": {
                        ...temp_customer.co_app,
                        "id": haveCoApplicant ? customer.co_app.id : null
                    }
                }
            }

            updateCustomer(history, '/applyApplicationHomeDetails', temp_customer)
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

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                {customer.main_app.id &&
                    <Input
                        name="id"
                        type="hidden"
                        value={customer.main_app.id}
                    />
                }
                <div className="container">
                    <div className="styled-form">
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                defaultValue={customer.main_app.first_name}
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="last_name"
                                type="text"
                                defaultValue={customer.main_app.last_name}
                                label="Applicant Last Name"
                                defaultText="Applicant Last Name"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="email"
                                type="email"
                                regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                defaultValue={customer.main_app.email}
                                label="Email"
                                defaultText="Email"
                                required={true}
                                error={{
                                    'invalid': "Please enter valid Email address",
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="cell_phone"
                                type="hidden"
                                defaultValue={customer.main_app.cell_phone}
                                label="Phone"
                                className="medium-input"
                                defaultText="(123) 456-7890"
                                regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                mask="(999) 999-9999"
                                required={true}
                                error={{
                                    'invalid': "Please enter 10 digit number",
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="date_of_birth"
                                type="hidden"
                                defaultValue={customer.main_app.dobY && customer.main_app.dobM && customer.main_app.dobD ? `${customer.main_app.dobY}-${customer.main_app.dobM}-${customer.main_app.dobD}` : null}
                                    label="Date of Birth"
                                className="medium-input"
                                defaultText="MM / DD / YYYY"
                                required={true}
                                isDate={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="ssn"
                                type="hidden"
                                label="SSN"
                                defaultText="#"
                                defaultValue={null}
                                regex={customer.main_app.id ? customer.main_app.ssn : '^(?!0{3}|6{3}|9[0-9]{2})[0-9]{3}-(?!0{3})[0-9]{3}-(?!0{4})[0-9]{4}$'}
                                mask="999-999-9999"
                                optionalParams = {{style:{color: '#1e2c35', caretColor: "#ccdbe7"}}}
                                isHidden={true}
                                required={true}
                                isMatched={customer.main_app.id ? true : false}
                                error={{
                                    'empty': " ",
                                    'invalid': "Please enter correct SSN number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="driver_license"
                                type="hidden"
                                defaultValue={customer.main_app.driver_license ? customer.main_app.driver_license : null}
                                label="Driver License Number"
                                defaultText="#"
                                mask="**************"
                                maskChar=" "
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="no_of_dependents"
                                type="text"
                                defaultValue={customer.main_app.no_of_dependents}
                                label="Number of Dependants"
                                defaultText="0"
                                regex="^[0-9]{1,2}$"
                                className="small-input"
                                required={true}
                                error={{
                                    'empty': " ",
                                    'invalid': "Please enter valid number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="street"
                                type="text"
                                defaultValue={tempStreet}
                                label="Street"
                                defaultText="Street"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                                handleChange={(e)=>setTempStreet(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="city"
                                type="text"
                                defaultValue={tempCity}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                                handleChange={(e)=>setTempCity(e.target.value)}
                            />
                        </Form.Group>
                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Dropdown
                                    name="state"
                                    type="dropdown"
                                    defaultValue={tempState}
                                    label="State"
                                    defaultText="State"
                                    required={true}
                                    options={dropdownList}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e)=>setTempState(e)}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    defaultValue={tempZip}
                                    regex="^[0-9]{5}$"
                                    label="Zip Code"
                                    defaultText="Zip Code"
                                    required={true}
                                    error={{
                                        'invalid': " ",
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                    handleChange={(e)=>setTempZip(e.target.value)}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-18">
                            <Checkbox
                                name="have_co_applicant"
                                type="checkbox"
                                label="Add co-applicant"
                                checked={haveCoApplicant ? true : null}
                                handleChange={(e)=>showHideCoInputField(e.target.checked)}
                            />
                        </Form.Group>  

                        {haveCoApplicant &&                                     

                            <>

                            <span className="divider">
                                <span className="title">Co-applicant</span>
                            </span>

                            <Form.Group className="mb-18">
                                <Input
                                    name="co_first_name"
                                    type="text"
                                    defaultValue={customer.co_app.first_name}
                                    label="Co-applicant First Name"
                                    defaultText="Co-applicant First Name"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_last_name"
                                    type="text"
                                    defaultValue={customer.co_app.last_name}
                                    label="Co-applicant Last Name"
                                    defaultText="Co-applicant Last Name"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    defaultValue={customer.co_app.email}
                                    label="Email"
                                    defaultText="Email"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_cell_phone"
                                    type="hidden"
                                    defaultValue={customer.co_app.cell_phone}
                                    label="Phone"
                                    className="medium-input"
                                    defaultText="(123) 456-7890"
                                    regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    mask="(999) 999-9999"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'invalid': "Please enter 10 digit number",
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_date_of_birth"
                                    type="hidden"
                                    defaultValue={customer.co_app.dobY && customer.co_app.dobM && customer.co_app.dobD ? `${customer.co_app.dobY}-${customer.co_app.dobM}-${customer.co_app.dobD}` : null}
                                    label="Date of Birth"
                                    className="medium-input"
                                    defaultText="MM / DD / YYYY"
                                    isDate={true}
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_ssn"
                                    type="hidden"
                                    label="SSN"
                                    defaultText="#"
                                    regex={customer.main_app.id && haveCoApplicant ? customer.co_app.ssn : '^(?!0{3}|6{3}|9[0-9]{2})[0-9]{3}-(?!0{3})[0-9]{3}-(?!0{4})[0-9]{4}$'}
                                    mask="999-999-9999"
                                    optionalParams = {{style:{color: '#1e2c35', caretColor: "#ccdbe7"}}}
                                    isHidden={true}
                                    required={haveCoApplicant ? true : false}
                                    isMatched={customer.main_app.id && haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " ",
                                        'invalid': "Please enter correct SSN number"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_driver_license"
                                    type="hidden"
                                    defaultValue={customer.co_app.driver_license}
                                    label="Driver License Number"
                                    defaultText="#"
                                    mask="**************"
                                    maskChar=" "
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_no_of_dependents"
                                    type="text"
                                    defaultValue={customer.co_app.no_of_dependents}
                                    label="Number of Dependants"
                                    defaultText="0"
                                    regex="^[0-9]{1,2}$"
                                    className="small-input"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " ",
                                        'invalid': "Please enter valid number"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>                       
                            <Form.Group className="mb-18">
                                <Checkbox
                                    name="co_have_co_applicant_same_address"
                                    type="checkbox"
                                    label="Same as Applicant"
                                    checked={haveCoApplicantSameAddress ? true : null}
                                    handleChange={(e)=>updateCoApplicantAddress(e.target.checked)}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_street"
                                    type="text"
                                    {...(haveCoApplicantSameAddress ? {
                                        value: tempStreet
                                    } : {
                                        defaultValue: coTempStreet
                                    })}
                                    label="Street"
                                    defaultText="Street"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_city"
                                    type="text"
                                    {...(haveCoApplicantSameAddress ? {
                                        value: tempCity
                                    } : {
                                        defaultValue: coTempCity
                                    })}
                                    label="City"
                                    defaultText="City"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <div className="styled-row">
                                <Form.Group className="styled-column mb-18">
                                    <Dropdown
                                        name="co_state"
                                        type="dropdown"
                                        defaultValue={coTempState}
                                        {...(haveCoApplicantSameAddress ? {
                                            value: tempState
                                        } : {
                                            value: coTempState
                                        })}
                                        label="State"
                                        defaultText="State"
                                        required={haveCoApplicant ? true : false}
                                        options={dropdownList}
                                        error={{
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                    />
                                </Form.Group>
                                <Form.Group className="styled-column mb-18">
                                    <Input
                                        name="co_zip"
                                        type="text"
                                        {...(haveCoApplicantSameAddress ? {
                                            value: tempZip
                                        } : {
                                            defaultValue: coTempZip
                                        })}
                                        regex="^[0-9]{5}$"
                                        label="Zip Code"
                                        defaultText="Zip Code"
                                        required={haveCoApplicant ? true : false}
                                        error={{
                                            'invalid': " ",
                                            'empty': " "
                                        }}
                                        validationResult={validationResult}
                                    />
                                </Form.Group>
                            </div>

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