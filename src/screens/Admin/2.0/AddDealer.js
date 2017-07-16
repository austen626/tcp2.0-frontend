import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
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
    const [dealerName, setDealerName] = useState(dealer.id ? dealer.company_name : null);

    const handleArrowBack = () => {
        history.push('/admin/dealers')
    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        console.log(formData)

        setValidationResult(formData.validationResult);

        if (!formData.validationResult) {

            let data = formData.formData

            if (dealer.id) {

                data = { ...data, updated_email: data.email, updated_phone: data.phone }
                updateDealer(history, data)
            }
            else {
                addDealer(history, data)
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
                        {dealerName}
                    </div>
                </HeaderCenter>
                <HeaderRight></HeaderRight>
            </Header>

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
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
                                name="company_name"
                                type="text"
                                defaultValue={dealer.company_name}
                                label="Dealer Name"
                                defaultText="Dealer Name"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                                handleChange={(e)=>setDealerName(e.target.value)}
                            />
                        </Form.Group>
                        <div className="box">
                            <Form.Group className="mb-18">
                                <Input
                                    name="email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    defaultValue={dealer.email}
                                    label="Main Dealer User Email"
                                    defaultText="Dealer User Email"
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
                                    name="contact_email"
                                    type="email"
                                    regex="^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                    defaultValue={dealer.contact_email}
                                    label="Dealer Contact Email"
                                    defaultText="Dealer Contact Email"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': " "
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-18">
                            <Input
                                name="phone"
                                type="hidden"
                                defaultValue={dealer.phone}
                                label="Phone"
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
                        <span className="divider"></span>
                        <span className="title">ADDRESS</span>
                        <Form.Group className="mb-18">
                            <Input
                                name="street"
                                type="text"
                                defaultValue={dealer.street}
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
                                defaultValue={dealer.city}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Dropdown
                                name="state"
                                className="full-dropdown-width"
                                type="dropdown"
                                defaultValue={dealer.state ? dealer.state : ''}
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
                        <Form.Group className="mb-18">
                            <Input
                                name="zip"
                                type="number"
                                defaultValue={dealer.zip}
                                regex="\b\d{5}\b"
                                label="Zip Code"
                                defaultText="Zip Code"
                                required={true}
                                error={{
                                    'invalid': "Please enter 5 digit number",
                                    'empty': " "
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" onClick={() => handleArrowBack()}>Cancel</button>
                    <button className="secondary" type="submit">{dealer.id ? 'Save' : 'Add'}</button>
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