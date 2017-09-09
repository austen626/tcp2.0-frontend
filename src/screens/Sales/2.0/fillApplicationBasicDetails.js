import React, { useState } from 'react';
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
                value: "AL"
            },
            {
                label: "Alaska",
                value: "AK"
            },
            {
                label: "Arizona",
                value: "AZ"
            },
            {
                label: "Arkansas",
                value: "AR"
            },
            {
                label: "California",
                value: "CA"
            },
            {
                label: "Colorado",
                value: "CO"
            },
            {
                label: "Connecticut",
                value: "CT"
            },
            {
                label: "Delaware",
                value: "DE"
            },
            {
                label: "Florida",
                value: "FL"
            },
            {
                label: "Georgia",
                value: "GA"
            },
            {
                label: "Idaho",
                value: "ID"
            },
            {
                label: "Hawaii",
                value: "HI"
            },
            {
                label: "Illinois",
                value: "IL"
            },
            {
                label: "Indiana",
                value: "IN"
            },
            {
                label: "Iowa",
                value: "IA"
            },
            {
                label: "Kansas",
                value: "KS"
            },
            {
                label: "Kentucky",
                value: "KY"
            },
            {
                label: "Louisiana",
                value: "LA"
            },
            {
                label: "Maine",
                value: "ME"
            },
            {
                label: "Maryland",
                value: "MD"
            },
            {
                label: "Massachusetts",
                value: "MA"
            },
            {
                label: "Michigan",
                value: "MI"
            },
            {
                label: "Minnesota",
                value: "MN"
            },
            {
                label: "Mississippi",
                value: "MS"
            },
            {
                label: "Missouri",
                value: "MO"
            },
            {
                label: "Montana",
                value: "MT"
            },
            {
                label: "Nebraska",
                value: "NE"
            },
            {
                label: "Nevada",
                value: "NV"
            },
            {
                label: "New Hampshire",
                value: "NH"
            },
            {
                label: "New Jersey",
                value: "NJ"
            },
            {
                label: "New Mexico",
                value: "NM"
            },
            {
                label: "New York",
                value: "NY"
            },
            {
                label: "North Carolina",
                value: "NC"
            },
            {
                label: "North Dakota",
                value: "ND"
            },
            {
                label: "Ohio",
                value: "OH"
            },
            {
                label: "Oklahoma",
                value: "OK"
            },
            {
                label: "Oregon",
                value: "OR"
            },
            {
                label: "Pennsylvania",
                value: "PA"
            },
            {
                label: "Rhode Island",
                value: "RI"
            },
            {
                label: "South Carolina",
                value: "SC"
            },
            {
                label: "South Dakota",
                value: "SD"
            },
            {
                label: "Tennessee",
                value: "TN"
            },
            {
                label: "Texas",
                value: "TX"
            },
            {
                label: "Utah",
                value: "UT"
            },
            {
                label: "Vermont",
                value: "VT"
            },
            {
                label: "Virginia",
                value: "VA"
            },
            {
                label: "Washington",
                value: "WA"
            },
            {
                label: "West Virginia",
                value: "WV"
            },
            {
                label: "Wisconsin",
                value: "WI"
            },
            {
                label: "Wyoming",
                value: "WY"
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
                                optionalParams={{
                                    autoFocus: true
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
                                    regex="^\d{5}(?:-\d{4})?$"
                                    label="Zip Code"
                                    defaultText="Zip Code"
                                    required={true}
                                    error={{
                                        'invalid': " ",
                                        'empty': " "
                                    }}
                                    isZipcode={true}
                                    validationResult={validationResult}
                                    handleChange={(e)=>setTempZip(e.target.value)}
                                />
                            </Form.Group>
                        </div>
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
                            {/* <Input
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
                            /> */}
                            <Input
                                name="date_of_birth"
                                type="hidden"
                                defaultValue={customer.main_app.dobY && customer.main_app.dobM && customer.main_app.dobD ? `${customer.main_app.dobM}/${customer.main_app.dobD}/${customer.main_app.dobY}` : null}
                                    label="Date of Birth"
                                className="medium-input"
                                defaultText="MM / DD / YYYY"
                                required={true}
                                regex="^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
                                mask="99/99/9999"
                                error={{
                                    'empty': " ",
                                    'invalid': "Please enter valid date",
                                    'ageError': "The applicant should be 18 years old or above"
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
                                defaultValue={customer.main_app.ssn ? customer.main_app.ssn : null}
                                regex={customer.main_app.id ? customer.ssn : '^(?!0{3}|6{3}|9[0-9]{2})[0-9]{3}-(?!0{2})[0-9]{2}-(?!0{4})[0-9]{4}$'}
                                mask="999-99-9999"
                                optionalParams = {{style:{color: 'transparent', caretColor: "#ccdbe7"}}}
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
                                defaultText="#"
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
                            <Form.Group className="mb-18" style={{marginTop:35}}>
                                <Checkbox
                                    name="co_have_co_applicant_same_address"
                                    type="checkbox"
                                    label="Same as Applicant Address"
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
                                        regex="^\d{5}(?:-\d{4})?$"
                                        label="Zip Code"
                                        defaultText="Zip Code"
                                        required={haveCoApplicant ? true : false}
                                        error={{
                                            'invalid': " ",
                                            'empty': " "
                                        }}
                                        isZipcode={true}
                                        validationResult={validationResult}
                                    />
                                </Form.Group>
                            </div>
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
                                {/* <Input
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
                                /> */}
                                <Input
                                    name="co_date_of_birth"
                                    type="hidden"
                                    defaultValue={customer.co_app.dobY && customer.co_app.dobM && customer.co_app.dobD ? `${customer.co_app.dobM}/${customer.co_app.dobD}/${customer.co_app.dobY}` : null}
                                    label="Date of Birth"
                                    className="medium-inpu/${customer.co_app.dobY}t"
                                    defaultText="MM / DD / YYYY"
                                    required={true}
                                    regex="^(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$"
                                    mask="99/99/9999"
                                    error={{
                                        'empty': " ",
                                        'invalid': "Please enter valid date",
                                        'ageError': "The applicant should be 18 years old or above"
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
                                    defaultValue={customer.main_app.ssn && haveCoApplicant ? customer.co_app.ssn : null}
                                    regex={customer.main_app.id && haveCoApplicant ? customer.ssn : '^(?!0{3}|6{3}|9[0-9]{2})[0-9]{3}-(?!0{2})[0-9]{2}-(?!0{4})[0-9]{4}$'}
                                    mask="999-99-9999"
                                    optionalParams = {{style:{color: 'transparent', caretColor: "#ccdbe7"}}}
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
                                    defaultText="#"
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
                            </>
                        }




                    </div>
                </div>
                <div className="footer-container">
                    <input className="btn secondary" type="submit" value="Next"/>
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