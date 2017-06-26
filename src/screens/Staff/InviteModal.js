import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ModalView from 'shared/Modal';
import { invitationValidation as validate } from 'utils/validate';
import { renderField, RadioField } from 'utils/formUtils';
import { ModayBodyContainer, InviteTypeWrap } from './style';
const InviteModal = (props) => {
    const { 
        openInviteModal,
        toggleModal,
        initialize,
        handleSubmit,
        inviteStaffRequest,
     } = props;
     useEffect(() => {
        initialize({
            features: 'sales'
        })
     }, [ initialize ]);
     const handleFormAction = (data) => {
        inviteStaffRequest({
            email: data.email,
            role: data.features,
            toggleModal: toggleModal
        })
     }
    return (
        <ModalView 
            openModal={ openInviteModal }
            hideHeader
            firstBtnName="CANCEL"
            secondBtnName="INVITE"
            footerClass="btn-center-display"
            className="blue-background-modal"
            toggleModal={ toggleModal }
            submitHandler={ formData => handleFormAction(formData) }
            handleSubmit={ handleSubmit }
        >  
            <ModayBodyContainer>
                <form onSubmit={ handleSubmit } className="">  
                    <Field
                        name="email"
                        label="Email"
                        type="text"
                        component={ renderField }
                        maxLength="150"
                        placeholder="email@email.com"
                    />
                    <InviteTypeWrap>
                        <Form.Label className="force_mb-5" htmlFor= "Type" >Staff Type</Form.Label>
                        <Field
                            name="features"
                            component={RadioField}
                            props={{ value: "sales" }}
                            label="Salesperson"
                            formClass="radio-style"
                        />
                        <Field
                            name="features"
                            component={RadioField}
                            props={{ value: "dealer" }}
                            label="Dealer"
                            formClass="radio-style"
                        />
                    
                    </InviteTypeWrap>
               </form>  
            </ModayBodyContainer>

        </ModalView>   
    )
}

InviteModal.propTypes = {
    openModal: PropTypes.bool,
    toggleModal: PropTypes.func,
    initialize: PropTypes.func,
    handleSubmit: PropTypes.func,
    inviteStaffRequest: PropTypes.func
}
export default reduxForm({
    form: 'staffInviteForm',
    validate
})(InviteModal);