import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import InputMask from 'react-input-mask';
import { forgotPassword } from '../../redux/actions/auth';

import AuthContainer from '../../components/AuthContainer';

class ForgotPassword extends Component {
    state = {
        email: '',
        mobile: '',
        validated: false,
        error: ''
    };


    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ validated: true });

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.onConfirm();
        }
    }

    onConfirm = async () => {
        const { email, mobile } = this.state;
        const result = await this.props.forgotPassword({
            email,
            phone: mobile
        });

        if (result.ok) {
            this.props.history.push({
                pathname: `/2fa`,
                search: `?email=${email}&mobile=${mobile}`,
                state: {
                    ...result.data,
                    screen: 'forgot'
                }
            })
        } else {
            this.setState({ error: result.error });
        }
    }

    render() {
        const { email, mobile, validated,  error } = this.state;
        return (
            <AuthContainer title="RESET YOUR PASSWORD">
                <Form noValidate validated={validated} onSubmit={this.handleSubmit} className="wrapper forgot-page">
                    <div className="inputs">
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                className="input input-email"
                                value={email}
                                onChange={e => this.setState({ email: e.target.value }) }
                                isInvalid={this.state.invalidEmail}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Registered Mobile Number</Form.Label>
                            <InputMask
                                required
                                pattern="^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$"
                                className="input input-mobile form-control"
                                mask="(999) 999-9999"
                                maskChar=""
                                value={mobile}
                                onChange={e => this.setState({ mobile: e.target.value })}
                            />
                        </Form.Group>
                        <div className="error">
                            { error }
                        </div>
                    </div>
                    <div>
                        <Button className="button-action" type="submit">CONFIRM</Button>
                    </div>
                    <div className="auth-actions text-center">
                        <p>Back to &nbsp;
                        <span className="cursor-pointer goBack" onClick={() => this.props.history.replace('login')}>
                            Sign In
                        </span></p>
                    </div>                    
                </Form>
            </AuthContainer>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {
        forgotPassword
    }
)(ForgotPassword);