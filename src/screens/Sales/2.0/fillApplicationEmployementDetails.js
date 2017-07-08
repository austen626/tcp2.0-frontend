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

        history.replace('/applyApplicationSummary');
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
                            <Checkbox
                                name="have_co_applicant"
                                type="checkbox"
                                theme="light-label"
                                label="Not currently employed"
                            />
                        </Form.Group>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Present Employer"
                                    defaultText="Present Employer"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Present Employer"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 241}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Years There"
                                    defaultText="Years There"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Years There"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 87}}}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Job Title/Position"
                                defaultText="Job Title/Position"
                                required={true}
                                error={{
                                    'empty': "Please enter Job Title/Position"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Employer's Phone Number"
                                    defaultText="Employer's Phone Number"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Employer's Phone Number"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 204}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    label="Monthly Income"
                                    defaultText="Monthly Income"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Monthly Income"
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
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="yes"
                                        // checked={staff.role && staff.role[0] == 'sales' ? true : null}
                                    />
                                    <label for="yes" class="form-label " id="yes-label">Yes</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="no"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="no"
                                        // checked={staff.role && staff.role[0] == 'dealer' ? true : null}
                                    />
                                    <label for="no" class="form-label " id="no-label">No</label>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Source"
                                    defaultText="Source"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Source"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 204}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    label="Monthly Income"
                                    defaultText="Monthly Income"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Monthly Income"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 118}}}
                                />
                            </Form.Group>
                        </div>
                        
                        <span className="divider">
                            <span className="title">Co-applicant</span>
                        </span>

                        <Form.Group className="mb-18">
                            <Checkbox
                                name="have_co_applicant"
                                type="checkbox"
                                theme="light-label"
                                label="Not currently employed"
                            />
                        </Form.Group>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Present Employer"
                                    defaultText="Present Employer"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Present Employer"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 241}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Years There"
                                    defaultText="Years There"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Years There"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 87}}}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Job Title/Position"
                                defaultText="Job Title/Position"
                                required={true}
                                error={{
                                    'empty': "Please enter Job Title/Position"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Employer's Phone Number"
                                    defaultText="Employer's Phone Number"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Employer's Phone Number"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 204}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    label="Monthly Income"
                                    defaultText="Monthly Income"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Monthly Income"
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
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="yes"
                                        // checked={staff.role && staff.role[0] == 'sales' ? true : null}
                                    />
                                    <label for="yes" class="form-label " id="yes-label">Yes</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="no"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="no"
                                        // checked={staff.role && staff.role[0] == 'dealer' ? true : null}
                                    />
                                    <label for="no" class="form-label " id="no-label">No</label>
                                </Form.Group>
                            </div>
                        </div>

                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="text"
                                    // defaultValue={dealer.zip}
                                    label="Source"
                                    defaultText="Source"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Source"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 204}}}
                                />
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <Input
                                    name="zip"
                                    type="number"
                                    // defaultValue={dealer.zip}
                                    label="Monthly Income"
                                    defaultText="Monthly Income"
                                    maxLength={6}
                                    required={true}
                                    error={{
                                        'empty': "Please enter Monthly Income"
                                    }}
                                    validationResult={validationResult}
                                    optionalParams = {{style:{width: 118}}}
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