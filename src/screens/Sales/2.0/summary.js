import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../../components/Dealer/Header';
import { TCPLogo, IconArrowLeft, IconContactAcitve, IconListWhite } from '../../../assets/images';
import Input from '../../../components/commons/input';
import Dropdown from '../../../components/commons/dropdown';
import Checkbox from '../../../components/commons/checkbox';
import Loader from 'shared/Loader';

import { getFromData } from '../../../components/commons/utility';
import { updateDealer, addDealer } from '../../../redux/actions/admin';

function AddDealer(props) {

    const {
        history,
        dealer,
        addDealer,
        updateDealer,
        actionLoading,
    } = props;

    const [validationResult, setValidationResult] = useState(null);

    const handleArrowBack = () => {

    }

    const handleSubmit = evt => {

        evt.preventDefault();
        const formData = getFromData(evt);

        setValidationResult(formData.validationResult);

        console.log(formData);

        // if (!formData.validationResult) {

        //     let data = formData.formData

        //     if (dealer.id) {

        //         data = { ...data, updated_email: data.email, updated_phone: data.phone }
        //         updateDealer(history, data)
        //     }
        //     else {
        //         addDealer(history, data)
        //     }
        // }
    }

    return (
        <div className="dealer">

            { actionLoading && <Loader />}

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

            <div className="sub-header">
                <button>
                    <img src={IconContactAcitve} alt=""/> 
                </button>
                <button className="active">
                    <img src={IconListWhite} alt=""/> 
                    <span className='arrow-down'></span>
                </button>
            </div>

            <form onSubmit={(e) => handleSubmit(e)} noValidate>
                {dealer.id &&
                    <Input
                        name="id"
                        type="hidden"
                        value={dealer.id}
                    />
                }
                <div className="container black-box">
                    <div className="styled-form">



                        <div className="styled-row">
                            <Form.Group className="styled-column mb-18">
                                <div className="row">
                                    <div><b>Name: </b> John Doe</div>
                                    <div><b>Address: </b> Gold Valley 4 Houston, TX</div>
                                    <div><b>Email: </b> john@myemail.com</div>
                                    <div><b>Phone: </b> (123) 456-7890</div>
                                </div>
                            </Form.Group>
                            <Form.Group className="styled-column mb-18">
                                <div><b>Name: </b> John Doe</div>
                                <div><b>Address: </b> Gold Valley 4 Houston, TX</div>
                                <div><b>Email: </b> john@myemail.com</div>
                                <div><b>Phone: </b> (123) 456-7890</div>
                            </Form.Group>
                        </div>



















                        
                    </div>
                </div>
                <div className="footer-container">
                    <button className="secondary" type="submit">I am done</button>
                </div>
            </form>

        </div>
    )
}

const mapStateToProps = state => ({
    dealer: state.admin.selectedDealer,
    actionLoading: state.admin.actionLoading
});

const mapDispatchToProps = dispatch => ({
    addDealer: (history, data) => dispatch(addDealer(history, data)),
    updateDealer: (history, data) => dispatch(updateDealer(history, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDealer);