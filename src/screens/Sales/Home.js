import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../../components/Sales/Header';
import { Form } from 'react-bootstrap';
import Input from '../../components/commons/input';
import Loader from 'shared/Loader';
import { IconHome, IconRight } from '../../assets/images';

function HomeScreen(props) {

    const {
        history,
        avatar,
        actionLoading,
    } = props;

    const [validationResult, setValidationResult] = useState(null);

    const handleHomeClick = () => {
        history.replace('/');
    }

    const handleNextClick = () => {
        history.replace('/applyApplication');
    }

    return (
        <div className="sales">

            { actionLoading && <Loader />}

            <Header isHome={true} history={history} avatar={avatar}>
                {localStorage.getItem('role') && localStorage.getItem('role').indexOf('dealer') !== -1 &&
                    <img src={IconHome} alt="home" className="icon-home" onClick={()=>handleHomeClick()} />
                }
            </Header>

            <div className='main-box'>
                <p className="title">ENTER CUSTOMER INFORMATION</p>
                <p className="sub-title">Short instruction donec in semper arcu. Sed quis ante cursus, porta lectus sit amet, mollis lacus.</p>
            </div>
            

            <form noValidate>
                <div className="container">
                    <div className="styled-form">
                        <div className="box color-box">
                            <Form.Group className="mb-18">
                                <Input
                                    name="email"
                                    type="email"
                                    regex="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
                                    label="Applicant Email"
                                    defaultText="Applicant Email"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter valid Email address",
                                        'empty': "Please enter Applicant Email"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                            <Form.Group className="mb-18">
                                <Input
                                    name="phone"
                                    type="text"
                                    label="Phone"
                                    defaultText="999-999-9999"
                                    regex="[0-9]{10}"
                                    required={true}
                                    error={{
                                        'invalid': "Please enter 10 digit number",
                                        'empty': "Please enter Phone number"
                                    }}
                                    validationResult={validationResult}
                                />
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-18">
                            <Input
                                name="first_name"
                                type="text"
                                label="Applicant First Name"
                                defaultText="Applicant First Name"
                                required={true}
                                error={{
                                    'empty': "Please enter first name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                        <Form.Group className="mb-18">
                            <Input
                                name="last_name"
                                type="text"
                                label="Applicant Last Name"
                                defaultText="Applicant Last Name"
                                required={true}
                                error={{
                                    'empty': "Please enter last name"
                                }}
                                validationResult={validationResult}
                            />
                        </Form.Group>
                    </div>
                </div>
                <div className="match-found-container">
                    <div className="title">Match Found <img src={IconRight} style={{marginLeft: 10}} /></div>
                    <div className="details">
                        <p className="name-details">John Smith & Carol Smith</p>
                        <div className="row other-details">
                            <div className="col">
                                <span>7198 Hilltop Ave.</span>
                                <br></br>
                                <span>user_name@user-email.com</span>
                            </div>
                            <div className="col">
                                <span>Nashua, NH 03060.</span>
                                <br></br>
                                <span>5690172845</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="button" onClick={() => handleNextClick()}>Next</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    avatar: state.auth.avatar
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);