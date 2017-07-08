import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { getDonotCheckDetail } from 'utils/helper';
import { login } from '../../redux/actions/auth';

import AuthContainer from '../../components/AuthContainer';
import { AuthCheckbox } from '../../components/Checkbox';
import Loader from 'shared/Loader';

class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        invalidEmail: false,
        invalidPassword: false,
        error: '',

        remember: false,
        passwordEye: true,
        isLoading: false
    };

    onRemeber = () => {
        this.setState({ remember: !this.state.remember });
    }

    onEye = () => {
        this.setState({ passwordEye: !this.state.passwordEye });
    }

    onLogin = async () => {
        this.setState({ error: '', invalidEmail: false, invalidPassword: false });
        const { email, password } = this.state;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) === false) {
            this.setState({ invalidEmail: true });
            return;
        }

        if (password === '') {
            this.setState({ invalidPassword: true });
            return;
        }
        this.setState({ isLoading: true });
        const byPassTwoFa = getDonotCheckDetail();
        const result = await this.props.login({
            email: email,
            password: password,
            check: byPassTwoFa
        });
        if (result.ok) {
            this.setState({ isLoading: false });
            if(byPassTwoFa === "true") {
                localStorage.setItem('token', result.token);
                localStorage.setItem('role', result.role);
                this.props.history.replace('/');
            } else {
                this.props.history.push({
                    pathname: '/2fa',
                    state: result.data
                })
            }           
        } else {            
            this.setState({ 
                error: result.error,
                isLoading: false
            });
        }
    }

    render() {
        const { isLoading } = this.state;
        return (
            <AuthContainer title="LOGIN">
                {
                    isLoading && <Loader />
                }
                <div className="wrapper login-page">
                    <form action="javascript:void(0)" method="post" onSubmit={this.onLogin} >
                        <div className="inputs">
                            <div className="title title-email">Email</div>
                            <Form.Control
                                className="input input-email"
                                value={this.state.email}
                                onChange={e => this.setState({ email: e.target.value }) }
                                isInvalid={this.state.invalidEmail}
                            />
                            <div className="title title-password">
                                Password
                            </div>
                            <div className="password">
                                <Form.Control
                                    className="input input-password"
                                    type={this.state.passwordEye ? "password" : "text"}
                                    value={this.state.password}
                                    onChange={e => this.setState({ password: e.target.value }) }
                                    isInvalid={this.state.invalidPassword}
                                />
                                <img
                                    src={this.state.passwordEye ? require('../../assets/images/eye_show.svg') : require('../../assets/images/eye_hide.svg')}
                                    alt="logo"
                                    onClick={this.onEye}
                                />
                            </div>
                            { this.state.error && (
                                <div className="error">
                                    {this.state.error}
                                </div>
                            )}
                        </div>
                        <div>
                            <Button type="submit" onClick={this.onLogin} className="button-action">LOGIN</Button>
                        </div>
                    </form>

                    <Row className="actions">
                        <Col xs={6} className="remember-me">
                            <AuthCheckbox
                                label="Remember me"
                                checked={this.state.remember}
                                onClick={() => this.setState({ remember: !this.state.remember })}
                            />
                        </Col>
                        {/* <Col className="forgot-password">
                            Forgot pasword?
                        </Col> */}
                        <Col xs={6} className="forgot-password" onClick={() => this.props.history.replace('forgot')}>
                            Forgot password?
                        </Col>
                        {/* <Col xs={12} className="register" onClick={() => this.props.history.replace('register')}>
                            Register
                        </Col> */}
                    </Row>
                </div>
            </AuthContainer>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(
    mapStateToProps,
    {
        login
    }
)(LoginScreen);