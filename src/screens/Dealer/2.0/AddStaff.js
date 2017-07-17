import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateStaff, addStaff } from '../../../redux/actions/dealer';

function AddStaff(props) {

    const {
        history,
        staff,
        addStaff,
        updateStaff,
        actionLoading
    } = props;

    const [validationResult, setValidationResult] = useState(null);
    const [showStaffTypeError, setShowStaffTypeError] = useState(false);

    const handleArrowBack = () => {
        history.push('/dealer/staff')
    }

    const hideError = () => {

        setShowStaffTypeError(false);
    }

    const handleSubmit = evt => {
        
        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        console.log(formData)

        if(!formData.validationResult && formData.formData.role && formData.formData.role !== "") {

            let data = formData.formData

            if(staff.id) {

                data = {...data, role: [data.role]}
                updateStaff(history, data)
            }
            else
            {
                addStaff(history, data)
            }
        }
        else if (formData.formData.role === undefined) {

            setShowStaffTypeError(true);
            pushNotification('Please fill mandatory fields', 'error', 'TOP_RIGHT', 3000);
        }
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader /> }

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

            <form action="javascript:void(0)" onSubmit={(e) => handleSubmit(e)} noValidate>
                {staff.id && 
                    <Input 
                        name="id" 
                        type="hidden"
                        value={staff.id} 
                    />
                }
                <div className="container">
                    <div className="styled-form">
                        <Form.Group className="mb-18">
                            <Input 
                                name="first_name"
                                type="text" 
                                defaultValue={staff.first_name} 
                                label="First Name"
                                defaultText = "First Name"
                                required = {true}
                                error = {{
                                    'empty': " "
                                }}
                                validationResult = {validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input 
                                name="last_name" 
                                type="text" 
                                defaultValue={staff.last_name} 
                                label="Last Name"
                                defaultText = "Last Name"
                                required = {true}
                                error = {{
                                    'empty': " "
                                }}
                                validationResult = {validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input 
                                name="email"
                                type="email"
                                regex = "^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$"
                                defaultValue={staff.email} 
                                label="Email"
                                defaultText = "Email"
                                required = {true}
                                error = {{
                                    'invalid': "Please enter valid Email address",
                                    'empty': " "
                                }}
                                validationResult = {validationResult}
                            />
                        </Form.Group>
                        <div className="box radio-box">
                            <label class="form-label" style={{marginRight: 45}}>Staff Type: </label>
                            <Form.Group className="mb-18 radio-filed">
                                <Input 
                                    id ="sales"
                                    name="role"
                                    type="radio"
                                    className="radio-width"
                                    inputClass="regular-radio"
                                    defaultValue="sales"
                                    required={true}
                                    handleChange={() => hideError()}
                                    checked={staff.role && staff.role[0] == 'sales' ? true : null}
                                />
                                <label for="sales" class="form-label " id="sales-label">Salesperson</label>  
                            </Form.Group>
                            <Form.Group className="mb-18 radio-filed">
                                <Input 
                                    id ="dealer"
                                    name="role"
                                    type="radio"
                                    className="radio-width"
                                    inputClass="regular-radio"
                                    defaultValue="dealer"
                                    required={true}
                                    handleChange={() => hideError()}
                                    checked={staff.role && staff.role[0] == 'dealer' ? true : null}
                                />
                                <label for="dealer" class="form-label " id="staff-label">Dealer</label>
                            </Form.Group>
                        </div>
                        <div class={`error-label ${showStaffTypeError ? "show" : "hide"}`}>Please select staff type</div>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" onClick={() => handleArrowBack()}>Cancel</button>
                    <button className="secondary" type="submit">{staff.id ? 'Save' : 'Invite'}</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    staff: state.dealer.selectedStaff,
    actionLoading: state.dealer.actionLoading
});

const mapDispatchToProps = dispatch => ({
    addStaff: (history, data) => dispatch(addStaff(history, data)),
    updateStaff: (history, data) => dispatch(updateStaff(history, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddStaff);