import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { codeVerify, sendAgain, forgotCodeVerify } from '../../redux/actions/auth';

import AuthContainer from '../../components/AuthContainer';
import { AuthCheckbox } from '../../components/Checkbox';
import queryString from 'query-string';
class TwoFAScreen extends Component {
    state = {
        code: '',
        error: '',

        codeError: false,

        checkAskAgain: false,
        resend: false
    };

    componentDidMount() {
        if (!this.props.location.state || !this.props.location.state.authy_id) {
            this.props.history.replace('/login');
            return;
        }
    }

    sendAgain = async () => {
        this.setState({ resend: false });
        const result = await this.props.sendAgain({
            authy_id: this.props.location.state.authy_id
        });
        if (result.ok) {
            this.setState({ resend: true });
        }
    }

    onVerify = async () => {
        const { location } = this.props;
        const paramsQuery = queryString.parse(location.search);
        const { checkAskAgain } = this.state;
        if (this.state.code === '' || this.state.code.length !== 6) {
            this.setState({ error: 'Code needs to be 6 length' });
            return;
        }
        this.setState({ error: '' });
        if(paramsQuery.email && paramsQuery.mobile) {
            const resultForgotCode = await this.props.forgotCodeVerify({
                authy_id: this.props.location.state.authy_id,
                code: this.state.code
            });
            if (resultForgotCode.ok) {
                console.log(resultForgotCode);
                this.props.history.push(`/reset-password?token=${resultForgotCode.forgot_token}&email=${paramsQuery.email}&mobile=${paramsQuery.mobile}`);
            }else {
                this.setState({ error: resultForgotCode.error });
            }
        } else {
           
            const result = await this.props.codeVerify({
                authy_id: this.props.location.state.authy_id,
                code: this.state.code
            });
    
            if (result.ok) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('role', result.role);
                if(checkAskAgain) {
                    localStorage.setItem('isDonotAskAgain', true);
                } else {
                    localStorage.setItem('isDonotAskAgain', false);
                }
                
                if (this.props.location.state.screen === 'forgot') 
                {
                    this.props.history.replace('reset-password');
                } 
                else 
                {
                    this.props.history.replace('/');
                }
            } else {
                this.setState({ error: result.error });
            }
        }
       
    }

    render() {
        const endCode = this.props.location.state && this.props.location.state.ending ? this.props.location.state.ending : '';
        return (
            <AuthContainer title="2-Step Verification">
                <div className="twofa-page">
                    <div className="wrapper">
                        <div className="tip">
                            A text message with your code has been sent to a number ending with {endCode}
                        </div>
                        <form action="javascript:void(0)" method="post" onSubmit={this.onVerify} >
                            <div className="inputs">
                                <div className="title">Code</div>
                                <Form.Control
                                    className="input input-code"
                                    value={this.state.code}
                                    onChange={e => this.setState({ code: e.target.value }) }
                                />
                            </div>

                            { this.state.error && (
                                <div className="error">
                                    {this.state.error}
                                </div>
                            )}
                            
                            <Button type="submit" onClick={this.onVerify} className="button-action">VERIFY</Button>
                        </form>

                        <AuthCheckbox
                            label="Don't ask again on this device"
                            checked={this.state.checkAskAgain}
                            onClick={() => this.setState({ checkAskAgain: !this.state.checkAskAgain })}
                        />
                        <div className="sms-come">
                            <span>SMS didn't come?</span>
                            <span className="send-again noselect" onClick={this.sendAgain}>Send again</span>
                        </div>
                        { this.state.resend && <div className="resend-sms">SMS has been sent again</div> }
                    </div>
                    <div className="mfa-footer">
                        <span>Choose another </span>
                        <span className="way-of cursor-pointer" onClick={() => this.props.history.replace('login')}>way of verification</span>
                    </div>
                </div>
            </AuthContainer>
        )
    }
}

export default connect(
    null,
    {
        codeVerify,
        sendAgain,
        forgotCodeVerify
    }
)(TwoFAScreen);