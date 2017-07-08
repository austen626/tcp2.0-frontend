import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
import Checkbox from '../../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateDealer, addDealer } from '../../../redux/actions/admin';

function AddDealer(props) {

    const {
        history,
        dealer,
        addDealer,
        updateDealer,
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

    const handleArrowBack = () => {
        
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        console.log(formData);

        // if (!formData.validationResult) {

        //     let data = formData.formData

        //     if (dealer.id) {

        //         data = { ...data, updated_email: data.email, updated_phone: data.phone }
        //         updateDealer(history, data)
        //     }
        //     else {
        //         addDealer(history, data)
        //     }
        // }

        history.replace('/applyApplicationHomeDetails');
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
                <button>
                    <img src={IconContactAcitve} alt=""/> 
                    <span>Applicant(s) Details</span>
                    <span className='arrow-down'></span>
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} noValidate>
                {dealer.id &&
                    <Input
                        name="id"
                        type="hidden"
                        value={dealer.id}
                    />
                }
                <div className="container">
                    <div className="styled-form">
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                required={true}
                                error={{
                                    'empty': "Please enter Applicant First Name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="last_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Applicant Last Name"
                                defaultText="Applicant Last Name"
                                required={true}
                                error={{
                                    'empty': "Please enter Applicant Last Name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="email"
                                type="email"
                                regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                // defaultValue={dealer.email}
                                label="Email"
                                defaultText="Email"
                                required={true}
                                error={{
                                    'invalid': "Please enter valid Email address",
                                    'empty': "Please enter Email Address"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="phone"
                                type="text"
                                // defaultValue={dealer.phone}
                                label="Phone"
                                className="medium-input"
                                defaultText="999-999-9999"
                                regex="[0-9]{10}"
                                required={true}
                                error={{
                                    'invalid': "Please enter 10 digit number",
                                    'empty': "Please enter Phone number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="date_of_work"
                                type="date"
                                // defaultValue={dealer.phone}
                                label="Date of Birth"
                                className="medium-input"
                                defaultText="MM / DD / YYYY"
                                required={true}
                                error={{
                                    'empty': "Please enter date of birth"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="ssn"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="SSN"
                                defaultText="SSN"
                                required={true}
                                error={{
                                    'empty': "Please enter ssn number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="driver_license"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Driver License Number"
                                defaultText="Driver License Number"
                                required={true}
                                error={{
                                    'empty': "Please enter Driver License Number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="number_of_dependants"
                                type="number"
                                // defaultValue={dealer.company_name}
                                label="Number of Dependants"
                                defaultText="0"
                                className="small-input"
                                required={true}
                                error={{
                                    'empty': "Please enter Number of Dependants"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group><Form.Group className="mb-18">
                            <Input
                                name="street"
                                type="text"
                                defaultValue={dealer.street}
                                label="Street"
                                defaultText="Street"
                                required={true}
                                error={{
                                    'empty': "Please enter Street"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="city"
                                type="text"
                                // defaultValue={dealer.city}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': "Please enter city"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Dropdown
                                    name="state"
                                    type="dropdown"
                                    // defaultValue={dealer.state ? dealer.state : ''}
                                    label="State"
                                    defaultText="State"
                                    required={true}
                                    options={dropdownList}
                                    error={{
                                        'empty': "Please enter state"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    regex="[0-9]{6}"
                                    label="Zip Code"
                                    defaultText="Zip Code"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'invalid': "Please enter 6 digit number",
                                        'empty': "Please enter zip code"
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
                            />
                        </Form.Group>                 

                        <span className="divider">
                            <span className="title">Co-applicant</span>
                        </span>

                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Co-applicant First Name"
                                defaultText="Co-applicant First Name"
                                required={true}
                                error={{
                                    'empty': "Please enter Applicant First Name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="last_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Co-applicant Last Name"
                                defaultText="Co-applicant Last Name"
                                required={true}
                                error={{
                                    'empty': "Please enter Applicant Last Name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="email"
                                type="email"
                                regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                // defaultValue={dealer.email}
                                label="Email"
                                defaultText="Email"
                                required={true}
                                error={{
                                    'invalid': "Please enter valid Email address",
                                    'empty': "Please enter Email Address"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="phone"
                                type="text"
                                // defaultValue={dealer.phone}
                                label="Phone"
                                className="medium-input"
                                defaultText="999-999-9999"
                                regex="[0-9]{10}"
                                required={true}
                                error={{
                                    'invalid': "Please enter 10 digit number",
                                    'empty': "Please enter Phone number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="date_of_work"
                                type="date"
                                // defaultValue={dealer.phone}
                                label="Date of Birth"
                                className="medium-input"
                                defaultText="MM / DD / YYYY"
                                required={true}
                                error={{
                                    'empty': "Please enter date of birth"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="ssn"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="SSN"
                                defaultText="SSN"
                                required={true}
                                error={{
                                    'empty': "Please enter ssn number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="driver_license"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Driver License Number"
                                defaultText="Driver License Number"
                                required={true}
                                error={{
                                    'empty': "Please enter Driver License Number"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="number_of_dependants"
                                type="number"
                                // defaultValue={dealer.company_name}
                                label="Number of Dependants"
                                defaultText="0"
                                className="small-input"
                                required={true}
                                error={{
                                    'empty': "Please enter Number of Dependants"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>                       
                        <Form.Group className="mb-18">
                            <Checkbox
                                name="have_co_applicant_same_address"
                                type="checkbox"
                                label="Same as Applicant"
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="street"
                                type="text"
                                defaultValue={dealer.street}
                                label="Street"
                                defaultText="Street"
                                required={true}
                                error={{
                                    'empty': "Please enter Street"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="city"
                                type="text"
                                // defaultValue={dealer.city}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': "Please enter city"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Dropdown
                                    name="state"
                                    type="dropdown"
                                    // defaultValue={dealer.state ? dealer.state : ''}
                                    label="State"
                                    defaultText="State"
                                    required={true}
                                    options={dropdownList}
                                    error={{
                                        'empty': "Please enter state"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    regex="[0-9]{6}"
                                    label="Zip Code"
                                    defaultText="Zip Code"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'invalid': "Please enter 6 digit number",
                                        'empty': "Please enter zip code"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </div>




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
    dealer: state.admin.selectedDealer,
    actionLoading: state.admin.actionLoading
});

const mapDispatchToProps = dispatch => ({
    addDealer: (history, data) => dispatch(addDealer(history, data)),
    updateDealer: (history, data) => dispatch(updateDealer(history, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);