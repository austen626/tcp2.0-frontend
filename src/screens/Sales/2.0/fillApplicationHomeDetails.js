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

        history.replace('/applyApplicationEmployement');
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

                        <div className="box center-box">
                            <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you own or rent your home?</label>
                            <div className="radio-box center">
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="own"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="own"
                                        // checked={staff.role && staff.role[0] == 'sales' ? true : null}
                                    />
                                    <label for="own" class="form-label " id="own-label">Own</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="rent"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="dealer"
                                        // checked={staff.role && staff.role[0] == 'dealer' ? true : null}
                                    />
                                    <label for="rent" class="form-label " id="rent-label">Rent</label>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="How many years did you live there?"
                                defaultText="0"
                                required={true}
                                className="single-line-input"
                                error={{
                                    'empty': "Please enter details"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Monthly Mortgage Payment:"
                                defaultText="0"
                                required={true}
                                className="single-line-input width-112"
                                error={{
                                    'empty': "Please enter details"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>                

                        <span className="divider">
                            <span className="title">Co-applicant</span>
                        </span>

                        <Form.Group className="mb-18">
                            <Checkbox
                                name="have_co_applicant"
                                type="checkbox"
                                theme="light-label"
                                label="The answes are the same as the answers<br>given by the applicant"
                            />
                        </Form.Group>   

                        <div className="box center-box">
                            <label class="form-label" style={{textAlign: "center", width: "100%", padding: 0}}>Do you own or rent your home?</label>
                            <div className="radio-box center">
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="own"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="own"
                                        // checked={staff.role && staff.role[0] == 'sales' ? true : null}
                                    />
                                    <label for="own" class="form-label " id="own-label">Own</label>  
                                </Form.Group>
                                <Form.Group className="mb-18 radio-filed">
                                    <Input 
                                        id ="rent"
                                        name="role"
                                        type="radio"
                                        className="radio-width"
                                        defaultValue="dealer"
                                        // checked={staff.role && staff.role[0] == 'dealer' ? true : null}
                                    />
                                    <label for="rent" class="form-label " id="rent-label">Rent</label>
                                </Form.Group>
                            </div>
                        </div>
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="How many years did you live there?"
                                defaultText="0"
                                required={true}
                                className="single-line-input"
                                error={{
                                    'empty': "Please enter details"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                // defaultValue={dealer.company_name}
                                label="Monthly Mortgage Payment:"
                                defaultText="0"
                                required={true}
                                className="single-line-input width-112"
                                error={{
                                    'empty': "Please enter details"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group> 




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