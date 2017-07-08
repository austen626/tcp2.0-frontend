import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconBack } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateDealer, addDealer } from '../../../redux/actions/admin';

function AddDealer(props) {

    const {
        history,
        dealer,
        actionLoading,
    } = props;


    const handleArrowBack = () => {

    }

    const handleSubmit = evt => {

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
                                name={dealer.id ? "company_name" : "dealer_company_name"}
                                type="text"
                                defaultValue={dealer.company_name}
                                label="Dealer Name"
                                defaultText="Dealer Name"
                                required={true}
                                error={{
                                    'empty': "Please enter Dealer Name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <div className="box">
                            <Form.Group className="mb-18">
                                <Input
                                    name={dealer.id ? "email" : "dealer_email"}
                                    type="email"
                                    regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                    defaultValue={dealer.email}
                                    label="Main Dealer User Email"
                                    defaultText="Main Dealer User Email"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Main Dealer User Email"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name={dealer.id ? "contact_email" : "dealer_contact_email"}
                                    type="email"
                                    regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                    defaultValue={dealer.contact_email}
                                    label="Dealer Contact Email"
                                    defaultText="Dealer Contact Email"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Dealer Contact Email"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-18">
                            <Input
                                name={dealer.id ? "phone" : "dealer_phone"}
                                type="text"
                                defaultValue={dealer.phone}
                                label="Phone"
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
                        <span className="divider"></span>
                        <span className="title">ADDRESS</span>
                        <Form.Group className="mb-18">
                            <Input
                                name={dealer.id ? "street" : "dealer_address_street"}
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
                                name={dealer.id ? "city" : "dealer_address_city"}
                                type="text"
                                defaultValue={dealer.city}
                                label="City"
                                defaultText="City"
                                required={true}
                                error={{
                                    'empty': "Please enter city"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Dropdown
                                name={dealer.state ? "state" : "dealer_address_state"}
                                type="dropdown"
                                defaultValue={dealer.state ? dealer.state : ''}
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
                        <Form.Group className="mb-18">
                            <Input
                                name={dealer.id ? "zip" : "dealer_address_zipcode"}
                                type="number"
                                defaultValue={dealer.zip}
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
                <div className="footer-container">
                    <button className="secondary" onClick={() => handleArrowBack()}>Cancel</button>
                    <button className="secondary" type="submit">{dealer.id ? 'Update' : 'Add'}</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);