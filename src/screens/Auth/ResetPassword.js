import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { message } from 'shared/constant';
import { pushNotification } from 'utils/notification';
import { resetPassword } from '../../redux/actions/auth';
import Loader from 'shared/Loader';
import AuthContainer from '../../components/AuthContainer';
import queryString from 'query-string';
class ResetPassword extends Component {
    state = {
        password: '',
        passwordConfirm: '',
        
        passwordEye: true,
        passwordConfirmEye: true,
        
        validated: false,
        passwordMismatch: false,
        isLoading: false,
        error: ''
    };


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
        const { password } = this.state;
        const { location } = this.props;
        const paramsQuery = queryString.parse(location.search);
        this.setState({
            isLoading: true
        })
        const result = await this.props.resetPassword({
            password,
            email: paramsQuery.email,
            forgot_token: paramsQuery.token
        });

        if (result.ok) {
            this.setState({
                isLoading: false
            })
            pushNotification(message.PASSWORD_CHANGE_SUCCESS, 'success', 'TOP_RIGHT', 3000);
            this.props.history.replace('/')
        } else {
            this.setState({
                isLoading: false
            })
            pushNotification(result.error, 'error', 'TOP_RIGHT', 3000)
            this.setState({ error: result.error });
        }
    }

    render() {
        const {
            password, passwordConfirm,
            passwordEye, passwordConfirmEye,
            validated,  passwordMismatch, error, isLoading } = this.state;
        return (
            <AuthContainer title="RESET PASSWORD">
                {
                    isLoading && <Loader />
                }
                <Form noValidate validated={validated} onSubmit={this.handleSubmit} className="wrapper reset-page">
                    <div className="inputs">                        
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
                                        The password and repeat password mismatch
                                    </Form.Control.Feedback>
                                ) }
                            </div>
                        </Form.Group>

                        <div className="error">
                            { error }
                        </div>
                    </div>
                    <div>
                        <Button className="button-action" type="submit">CONFIRM</Button>
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
        resetPassword
    }
)(ResetPassword);