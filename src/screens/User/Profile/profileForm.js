import React, { useEffect } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button } from 'react-bootstrap';
import { renderField } from 'utils/formUtils';
import { userForm as validate } from 'utils/validate';
import Header from 'components/Sales/Header';
import Footer from 'components/Sales/Footer';
import Loader from 'shared/Loader';

import { IconHome, IconProfileActive, IconArrowLeft } from 'assets/images';

const ProfileForm = (props) => {
    const { handleSubmit, user, initialize, getUserDetails } = props;
    useEffect(() => {      
        getUserDetails(initialize);
    }, []);
    
    const handleFormSubmit = (data) => {
        const { updateUserRequest } = props;
        updateUserRequest({ 
            'email': data.email,
            'first_name': data.firstName,
            'last_name': data.lastName
        })
    }
    const handleArrowBack = () => {
        props.history.push('/');
    }
    return (
        <div className="sales">
            {
                user && (user.isUserDataLoading || user.isFormSubmitLoading) && <Loader />
            }
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
                        Profile
                    </div>
                    <div className="container">
                    <Field
                        name="firstName"
                        label="First Name"
                        type="text"
                        component={ renderField }
                        maxLength="150"
                    />
                    <Field
                        name="lastName"
                        label="Last Name"
                        type="text"
                        component={ renderField }
                        maxLength="150"
                    />
                    <Field
                        name="email"
                        label="Email"
                        type="text"
                        component={ renderField }
                        maxLength="150"
                    />
                    <Field
                        name="phone"
                        label="Mobile Number"
                        type="text"
                        disabled
                        component={ renderField }
                        maxLength="150"
                    />
                    <Button type="submit" className="button change-password">UPDATE</Button>
                    <Button className="change-password" onClick={ () => props.history.replace('change-password') }>CHANGE PASSWORD</Button>
                    
                        {/* <Form.Group className="avatar-group">                            
                            <img alt="avatar" src={IconProfileEmptyUser} />
                        </Form.Group> */}
                        {/* <Form.Group>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                required
                                value={fullname}
                                onChange={e => this.setState({fullname: e.target.value}) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                value={mobile}
                                onChange={e => this.setState({mobile: e.target.value}) }
                            />
                        </Form.Group> */}
                        {/* <Form.Group>
                            <Button className="change-password" onClick={ () => props.history.replace('change-password') }>CHANGE PASSWORD</Button>
                        </Form.Group> */}
                    </div>
                </div>
                <Footer />
            </form>
        </div>
    )
}

export default reduxForm({
    form: 'userForm',
    validate
})(ProfileForm);