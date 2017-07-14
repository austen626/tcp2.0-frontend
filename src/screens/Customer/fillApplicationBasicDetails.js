import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../assets/images';
import Input from '../../components/commons/input';
import Dropdown from '../../components/commons/dropdown';
import Checkbox from '../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../components/commons/utility';
import { updateCustomer } from '../../redux/actions/sales';

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

    const [validationResult, setValidationResult] = useState(null);
    const [haveCoApplicant, setHaveCoApplicant] = useState(customer.co_enabled ? customer.co_enabled : false);

    const showHideCoInputField = (check) => {
        setHaveCoApplicant(check)
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        console.log(formData.validationResult)

        if (!formData.validationResult) {

            let data = formData.formData

            let temp_customer = {
                ...customer,
                "main_app": {
                    ...customer.main_app,
                    "name": data.first_name+" "+data.last_name,
                    "first_name": data.first_name,
                    "last_name": data.last_name,
                    "email": data.email,
                    "dobY": "1920",
                    "dobM": "03",
                    "dobD": "07",
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
                    "name": haveCoApplicant ? data.co_first_name+" "+data.co_last_name : '',
                    "first_name": haveCoApplicant ? data.co_first_name : '',
                    "last_name": haveCoApplicant ? data.co_last_name : '',
                    "email": haveCoApplicant ? data.co_email : '',
                    "dobY": "1920",
                    "dobM": "03",
                    "dobD": "07",
                    "ssn": haveCoApplicant ? data.co_ssn : '',
                    "driver_license": haveCoApplicant ? data.co_driver_license : '',
                    "no_of_dependents": haveCoApplicant ? data.co_no_of_dependents : '',
                    "cell_phone": haveCoApplicant ? data.co_cell_phone : '',
                    "home_phone": haveCoApplicant ? customer.co_app.home_phone : '',
                    "street": haveCoApplicant ? data.co_street : '',
                    "city": haveCoApplicant ? data.co_city : '',
                    "state": haveCoApplicant ? data.co_state : '',
                    "zip": haveCoApplicant ? data.co_zip : ''
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
                        "id": haveCoApplicant ? customer.co_app.id : ''
                    }
                }
            }

            updateCustomer(history, '/home', temp_customer)
        }
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

            <Header>
                <HeaderLeft></HeaderLeft>
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
                                defaultValue={customer.main_app.cell_phone ? customer.main_app.cell_phone.replace(/\-/g,"") : ''}
                                label="Phone"
                                className="medium-input"
                                defaultText="9999999999"
                                regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                masked={true}
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
                                type="text"
                                defaultValue={customer.main_app.ssn}
                                label="SSN"
                                defaultText="SSN"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="driver_license"
                                type="text"
                                defaultValue={customer.main_app.driver_license}
                                label="Driver License Number"
                                defaultText="Driver License Number"
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
                                type="number"
                                defaultValue={customer.main_app.no_of_dependents}
                                label="Number of Dependants"
                                defaultText="0"
                                className="small-input"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group><Form.Group className="mb-18">
                            <Input
                                name="street"
                                type="text"
                                defaultValue={customer.main_app.street}
                                label="Street"
                                defaultText="Street"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="city"
                                type="text"
                                defaultValue={customer.main_app.city}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Dropdown
                                    name="state"
                                    type="dropdown"
                                    defaultValue={customer.main_app.state}
                                    label="State"
                                    defaultText="State"
                                    required={true}
                                    options={dropdownList}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    defaultValue={customer.main_app.zip}
                                    regex="\b\d{5}\b"
                                    label="Zip Code"
                                    defaultText="Zip Code"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'invalid': " ",
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
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
                                    defaultValue={customer.co_app.cell_phone ? customer.co_app.cell_phone.replace(/\-/g,"") : ''}
                                    label="Phone"
                                    className="medium-input"
                                    defaultText="9999999999"
                                    regex="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                    masked={true}
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
                                    type="text"
                                    defaultValue={customer.co_app.ssn}
                                    label="SSN"
                                    defaultText="SSN"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_driver_license"
                                    type="text"
                                    defaultValue={customer.co_app.driver_license}
                                    label="Driver License Number"
                                    defaultText="Driver License Number"
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
                                    type="number"
                                    defaultValue={customer.co_app.no_of_dependents}
                                    label="Number of Dependants"
                                    defaultText="0"
                                    className="small-input"
                                    required={haveCoApplicant ? true : false}
                                    error={{
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>                       
                            {/* <Form.Group className="mb-18">
                                <Checkbox
                                    name="co_have_co_applicant_same_address"
                                    type="checkbox"
                                    label="Same as Applicant"
                                />
                            </Form.Group> */}
                            <Form.Group className="mb-18">
                                <Input
                                    name="co_street"
                                    type="text"
                                    defaultValue={customer.co_app.street}
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
                                    defaultValue={customer.co_app.city}
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
                                        defaultValue={customer.co_app.state}
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
                                        type="number"
                                        defaultValue={customer.co_app.zip}
                                        regex="\b\d{5}\b"
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