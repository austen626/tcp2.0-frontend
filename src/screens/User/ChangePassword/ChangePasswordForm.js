import React, { useState } from 'react';
import { renderField } from 'utils/formUtils';
import { Button } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import Header from '../../../components/Sales/Header';
import Footer from '../../../components/Sales/Footer';
import { changePasswordValidation as validate } from 'utils/validate';
import { IconHome, IconProfileActive, IconArrowLeft } from 'assets/images';
import { PasswordContainer } from '../style';
const ChangePasswordForm = (props) => {
    const [passwordEye, setPasswordEye] = useState(false);
    const { handleSubmit, changePasswordRequest, reset } = props;
        // const { currentPassword,
        //     password, passwordConfirm,
        //     passwordEye, passwordConfirmEye,
        //     validated,  passwordMismatch, error } = this.state;
    const handleFormSubmit = async (formData) => {
        changePasswordRequest({
            currentPassword: formData.currentPassword,
            password: formData.password,
            reset: reset
        })
    }

    const handleArrowBack = () => {
        props.history.push('/profile');
    }
    return (
        <div className="sales">
            <Header isHome={true} history={props.history} avatar={props.avatar}>
                <img src={IconHome} alt="home" className="icon-home" onClick={() => props.history.replace('/') } />
            </Header>
            <form onSubmit={ handleSubmit((formData) => {
                handleFormSubmit(formData)
                }) } className="wrapper reset-page">  
                <div id="profile-page">
                   
                    <div className="header2">      
                        <div className="position-absolute top-left back-cursor">
                            <img src={IconArrowLeft} onClick={handleArrowBack} alt="" />
                        </div>                  
                        <img alt="profile" src={IconProfileActive} />
                        Change Password
                    </div>
                    <div className="container">               
                        <Field
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            component={ renderField }
                            maxLength="150"
                        />
                         <PasswordContainer>
                             <Field
                                name="password"
                                label="Password"
                                type={ passwordEye ? "text" : "password" }
                                component={ renderField }
                                maxLength="150"
                            />
                                <span className="password-eye">
                                    <img
                                        src={passwordEye ? require('assets/images/eye_show.svg') : require('assets/images/eye_hide.svg')}
                                        alt="logo"
                                        onClick={() => setPasswordEye(!passwordEye) }
                                    />
                                </span>
                                    
                                </PasswordContainer>
                        
                        <Field
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            component={ renderField }
                            maxLength="150"
                        />
                        
                        <Button type="submit" className="button change-password">SAVE</Button>
                        <Button className="change-password" onClick={ () => props.history.replace('profile') }>CHANGE PROFILE</Button>

                    </div>
                </div>
                <Footer />
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'changePasswordForm',
    validate
})(ChangePasswordForm);