import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import queryString from 'query-string';
import InputMask from 'react-input-mask';
import { message } from 'shared/constant';
import { register } from '../../redux/actions/auth';
import AuthContainer from '../../components/AuthContainer';
import Loader from 'shared/Loader';

class RegisterScreen extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
        passwordConfirm: '',
        
        passwordEye: true,
        passwordConfirmEye: true,
        
        validated: false,
        passwordMismatch: false,
        error: '',
        role: '',
        isLoading: false
    };

    componentDidMount() {
        const { location, history } = this.props;
        const paramsQuery = queryString.parse(location.search);
        if(!paramsQuery.invite_token || !paramsQuery.role || !paramsQuery.email) {
            history.push('/login')
        } else {
            this.setState({
                email: paramsQuery.email,
                role: paramsQuery.role,
                inviteToken: paramsQuery.invite_token
            })
        }

    }
    handleSubmit = (event) => {
        event.preventDefault();

        const { password, passwordConfirm } = this.state;

        if (password !== passwordConfirm) {
            this.setState({ passwordMismatch: true });
            event.stopPropagation();
            return;
        }

        this.setState({ validated: true, passwordMismatch: false });

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.onConfirm();
        }
    }

    onConfirm = async () => {
        const { email, mobile, password, role, firstName, lastName, inviteToken } = this.state;
        this.setState({
            isLoading: true
        })
        const result = await this.props.register({
            email,
            phone: mobile,
            password,
            role: role,
            first_name: firstName,
            last_name: lastName,
            invite_token: inviteToken
        });

        if (result.ok) {
            this.setState({
                isLoading: false
            })  
            this.props.history.push({
                pathname: '/2fa',
                state: result.data
            })
        } else {
            this.setState({ 
                error: result.error,
                isLoading: false
            });
        }
    }

    render() {
        const {
            email, mobile, password, passwordConfirm,
            passwordEye, passwordConfirmEye,
            validated,  passwordMismatch, error, firstName, lastName, isLoading } = this.state;
        return (
            <AuthContainer title="USER REGISTRATION">
                {
                    isLoading && <Loader />
                }
                <Form noValidate validated={validated} onSubmit={this.handleSubmit} className="wrapper register-page">
                    <div className="inputs">
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                className="input"
                                value={firstName}
                                onChange={e => this.setState({ firstName: e.target.value }) }
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                required
                                className="input input-email"
                                value={lastName}
                                onChange={e => this.setState({ lastName: e.target.value }) }
                            />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                className="input input-email"
                                value={email}
                                onChange={e => this.setState({ email: e.target.value }) }
                                isInvalid={this.state.invalidEmail}
                            />
                        </Form.Group> */}

                        <Form.Group>
                            <Form.Label>Mobile Number</Form.Label>
                            <InputMask
                                required
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                className="input input-mobile form-control"
                                mask="999-999-9999"
                                maskChar=""
                                value={mobile}
                                onChange={e => this.setState({ mobile: e.target.value })}
                            />
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label >Password</Form.Label>
                            <div className="password">
                                <Form.Control
                                    required
                                    className="input input-password"
                                    type={passwordEye ? "password" : "text"}
                                    value={password}
                                    onChange={e => this.setState({ password: e.target.value }) }
                                    isInvalid={this.state.invalidPassword}
                                />
                                <img
                                    src={passwordEye ? require('../../assets/images/eye_show.svg') : require('../../assets/images/eye_hide.svg')}
                                    alt="logo"
                                    onClick={() => this.setState({ passwordEye: !this.state.passwordEye })}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label >Repeat Password</Form.Label>
                            <div className="password">
                                <Form.Control
                                    required
                                    className="input input-password"
                                    type={passwordConfirmEye ? "password" : "text"}
                                    value={passwordConfirm}
                                    onChange={e => this.setState({ passwordConfirm: e.target.value }) }
                                    isInvalid={passwordMismatch}
                                />

                                <img
                                    src={passwordConfirmEye ? require('../../assets/images/eye_show.svg') : require('../../assets/images/eye_hide.svg')}
                                    alt="logo"
                                    onClick={() => this.setState({ passwordConfirmEye: !this.state.passwordConfirmEye })}
                                />

                                { passwordMismatch && (
                                    <Form.Control.Feedback type="invalid" style={{ marginTop: -15, marginBottom: 15 }}>
                                        {message.PASSWORD_NOT_MATCH}
                                    </Form.Control.Feedback>
                                ) }
                            </div>
                        </Form.Group>

                        <div className="error">
                            { error }
                        </div>
                    </div>
                    <div>
                        <Button className="button-action mb-0" type="submit">CONFIRM</Button>
                    </div>
                    <div className="auth-actions text-center">
                        <p>Already have an account? &nbsp;
                        <span className="cursor-pointer goBack" onClick={() => this.props.history.push('/login')}>
                            Login Here
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
        register
    }
)(RegisterScreen);