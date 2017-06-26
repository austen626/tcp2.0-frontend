import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import { Button, Modal, Form } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { setApplianceFlag } from 'utils/helper';
import { IconArrowLeft } from '../../assets/images';
import { message as ConstMessage } from 'shared/constant';
import { changeSelectedPreApprovalStatus } from '../../redux/actions/admin';
import { applianceMap, adminPreapprovalTypes } from './constant';
import { ApproveSubmitContainer, ApproveSubmitInnerContainer, CalendarContainer, AgainRequestBlock, AdminProductCheckBlock } from './style';
import Loader from 'shared/Loader';
class PreApprovalItem extends Component {

    state = {
        message: null,
        declinedModalShow: false,
        deliveryDate: null,
        approveClicked: false,
        applianceValue: ConstMessage.NO_CREDIT_CHECK_TEXT,
        product_type: this.props.item.product_type || 'food',
        firstType: null,
        secondType: null,
        typeSelectionError: '',
        firstMessage: '',
        secondMessage: '',
        finalMessage: this.props.item.message || '',

    }

    componentDidMount () {
        const checkBoxMeasure = {
            firstTempCheck : '',
            secondTempCheck : '',
        }
        const productTypeTemp = this.props.item.product_type;
        if(productTypeTemp === "food") {
            checkBoxMeasure.firstTempCheck = 'yes';
            checkBoxMeasure.secondTempCheck = 'no';
        } else if(productTypeTemp === "food, appliance") {
            checkBoxMeasure.firstTempCheck = 'yes';
            checkBoxMeasure.secondTempCheck = 'yes';

        } else if(productTypeTemp === "appliance") {
            checkBoxMeasure.firstTempCheck = 'no';
            checkBoxMeasure.secondTempCheck = 'yes';
        }
        // this.setState({
        //     firstType: checkBoxMeasure.firstTempCheck,
        //     secondType: checkBoxMeasure.secondTempCheck,
        // })
        const productMessage = this.props.item.message;
        const splitMountMessage = productMessage && productMessage.split("#");
        if(splitMountMessage && splitMountMessage[0]) {
            this.setState({
                firstMessage: splitMountMessage[0]
            })
        }
        if(splitMountMessage && splitMountMessage[1]) {
            this.setState({
                secondMessage: splitMountMessage[1]
            })
        }
      
    }
    // componentDidUpdate(prevProps) {
    //     console.log(this.props)
    //     console.log(prevProps)
    //    console.log(this.props.match.params.id, prevProps.match.params.id)
    // }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleApproveClick = () => {
        const typeCheckAvailable = this.finalProductType();
        if(typeCheckAvailable) {
            this.setState({
                approveClicked: true
            })
        } else {
            this.setState({
                typeSelectionError: 'Please select atleast one Type'
            })
        }
        
        // this.props.history.push(`/admin/preapprovals`);
    }

    finalProductType = () => {
        const { firstType, secondType } = this.state;
        let product_type = null;
        if(firstType === 'yes' && secondType === 'yes') {
            product_type = 'food, appliance';
        } else if(firstType === 'yes' && (secondType === 'no' || !secondType)) {
            product_type = 'food';
        } else if((!firstType || firstType === 'no') && secondType === 'yes') {
            product_type = 'appliance';
        }
        else if((!firstType || firstType === 'no') && (!secondType || secondType === 'no')) {
            product_type = 'food';
        }

        return product_type;
    }

    finalMessageCheck = () => {
        let messageType = '';
        const { firstMessage, secondMessage }  = this.state;
        if(firstMessage !== '' &&  secondMessage !== '') {
            messageType = firstMessage + " #" + secondMessage;
        } else if(firstMessage !== '' &&  secondMessage === '') {
            messageType = firstMessage + " #";
        } else if(firstMessage === '' &&  secondMessage !== '') {
            messageType = "# " + secondMessage;
        }
        return messageType;
    }
    handleDeclineClick = () => {
        if(this.state.message !== null) {
            const { history } = this.props;
            this.props.changeSelectedPreApprovalStatus(this.props.item.id, 2, this.state.message, history, '/admin/preapprovals', { appliance: "", earliest_delivery_date: null});
            // this.props.history.push(`/admin/preapprovals`);
        }
    }

    handleModalClose = () => {
        this.setState({ declinedModalShow: false });
    }

    submitPreApproval = () => {
        const { history } = this.props;
        const { applianceValue,  deliveryDate, firstType, secondType  } = this.state;
        const typeCheckAvailable = this.finalProductType();
        const messageAvailable = this.finalMessageCheck();
        console.log(secondType)
        let statusApproved = 0;
        if(firstType === 'yes' || secondType === 'yes') {
            statusApproved = 1;

        } else {
            statusApproved = 2;
        }
        const finalDate = deliveryDate ? moment(deliveryDate).format('YYYY-MM-DD'): null;
        this.props.changeSelectedPreApprovalStatus(this.props.item.id, statusApproved, messageAvailable, history, '/admin/preapprovals', { appliance: applianceValue, earliest_delivery_date: finalDate, product_type: typeCheckAvailable});
    }

    render() {
        const { item, isLoading } = this.props;
        // if (Object.keys(item).length === 0) {
        //     return (
        //         <div>

        //         </div>
        //     )
        // }
        const { customer, created_at, status, earliest_delivery_date, pre_approvals_request_id } = item;
        const createdDate = moment(created_at, 'YYYY-MM-DD').format('MM/DD/yyyy');
        const earliestDate = earliest_delivery_date ? moment(earliest_delivery_date, 'YYYY-MM-DD').format('MM/DD/yyyy'): null;
        const { product_type, firstType, secondType, firstMessage, secondMessage, typeSelectionError, finalMessage } = this.state;
        const splitMessage = finalMessage && finalMessage.split("#");
        return (
            <div className="dealer">
                { isLoading && <Loader />}
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>{customer?.name}</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="customer-details">
                        <div className="contact-info">
                            <div>
                                <strong>PreApproval Created At: </strong>
                                <span>{createdDate}</span>
                            </div>
                            { customer?.email && (
                                <div>
                                    <strong>Customer Email: </strong>
                                    <span>{customer.email}</span>
                                </div>
                            ) }
                            <>
                               
                                <div>
                                    <strong>{ status === 0 ? 'Requested For:' : 'Product Type:' } </strong>
                                    <span>{ setApplianceFlag(product_type) }</span>
                                </div>
                               
                                <div>
                                    <strong>Delivery Date: </strong>
                                    <span>{earliestDate || "Not Mentioned"}</span>
                                </div>
                                {
                                    splitMessage && splitMessage[0] &&
                                    <div>
                                        <strong>Food Message: </strong>
                                        <span>{ splitMessage[0] }</span>
                                    </div>

                                }
                                  {
                                    splitMessage && splitMessage[1] &&
                                    <div>
                                        <strong>Appliance Message: </strong>
                                        <span>{ splitMessage[1] }</span>
                                    </div>

                                }
                            </>
                            {
                                status === 0 &&
                                <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <AdminProductCheckBlock className="">
                                        <div className="row">
                                            <div className="col-md-12 no-padding">
                                                <div className="product-check-top">
                                                    <p className="product-check-left">Food</p>
                                                    <p className="d-flex">
                                                        <label>
                                                            <input onChange={ (e) => {
                                                                this.setState({
                                                                    firstType: e.target.value,
                                                                    typeSelectionError: ''
                                                                })
                                                            }}
                                                            checked={ firstType === 'yes'}
                                                             type="radio" name="foodCheck" value="yes"/>
                                                            <span className="ml-2">Yes</span>
                                                        </label>
                                                        <label>
                                                            <input onChange={ (e) => {
                                                                this.setState({
                                                                    firstType: e.target.value,
                                                                    typeSelectionError: ''
                                                                })
                                                            }}
                                                            checked={ firstType === 'no'}
                                                             type="radio" name="foodCheck" value="no"/>
                                                            <span className="ml-2">No</span>
                                                        </label>
                                                    </p>
                                                </div>
                                                {
                                                    this.state.firstType === "yes" ? 
                                                    <Form.Group className="mt-2 mb-3">
                                                        <Form.Label>Earliest Delivery Date: </Form.Label>
                                                        <CalendarContainer>
                                                            <DatePicker 
                                                                selected={this.state.deliveryDate} 
                                                                onChange={date => this.setState({
                                                                    deliveryDate: date })}
                                                                minDate={new Date()}
                                                                className="calendar-approve"
                                                                dateFormat="MM/dd/yyyy"
                                                                placeholderText="MM/DD/YYYY" />
                                                        </CalendarContainer>
                                                        
                                                    </Form.Group>
                                                    :
                                                    <div className="mt-3 mb-3">
                                                        <textarea onChange={ e => this.setState({
                                                            'firstMessage': e.target.value
                                                        })} value={ firstMessage } name="food-message" style={ { 'width' : '65%' }} placeHolder="Food message"></textarea> 
                                                    </div>
                                                }
                                            </div>
                                            <div className="col-md-12 no-padding">
                                                <div className="product-check-top">
                                                    <p className="product-check-left">Appliance</p>
                                                    <p className="d-flex">
                                                        <label>
                                                            <input onChange={ (e) => {
                                                                this.setState({
                                                                    secondType: e.target.value,
                                                                    typeSelectionError: ''
                                                                })
                                                            }}
                                                            checked={ secondType === 'yes'}
                                                            type="radio" name="appCheck" value="yes"/>
                                                            <span className="ml-2">Yes</span>
                                                        </label>
                                                        <label>
                                                            <input onChange={ (e) => {
                                                                this.setState({
                                                                    secondType: e.target.value,
                                                                    typeSelectionError: ''
                                                                })
                                                            }}
                                                            checked={ secondType === 'no'}
                                                            type="radio" name="appCheck" value="no"/>
                                                            <span className="ml-2">No</span>
                                                        </label>
                                                    </p>
                                                </div>
                                                {
                                                    this.state.secondType === 'yes' ?
                                                    <Form.Group className="applience cal-inner">
                                                        <Form.Label>Appliance: </Form.Label>
                                                        <Form.Control
                                                            required
                                                            autoComplete="none"
                                                            as="select"
                                                            style={{ 'border': '1px solid #3a5b77'}}
                                                            value={this.state.applianceValue}
                                                            onChange={e => 
                                                                {
                                                                
                                                                    this.setState({
                                                                        applianceValue: e.target.value
                                                                    }) 
                                                                }}
                                                        >
                                                        {
                                                            applianceMap.map((item, index) => {
                                                                return (<option selected={ this.state.applianceValue === item.value} value={item.value} key={index}>{item.label}</option>)
                                                            })
                                                        }
                                                    
                                                        </Form.Control>
                                                    </Form.Group>
                                                : 
                                                    <div className="mt-3 mb-3">
                                                        <textarea onChange={ e => this.setState({
                                                            'secondMessage': e.target.value
                                                        })} value={ secondMessage } name="food-message" style={ { 'width' : '65%' }} placeHolder="Appliance message"></textarea>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        {
                                            typeSelectionError !== '' &&
                                            <p className="text-error">{ typeSelectionError }</p>
                                        }
                                    </AdminProductCheckBlock>
                                </div>
                            }
                            {
                                status === 0 &&                                
                                <div className="text-center" style={{ 'marginTop': '20px', 'marginLeft': '20px'}}>
                                    <Button disabled={ (!firstType || /^\s*$/.test(firstType)) || (!secondType || /^\s*$/.test(secondType)) } style={{ marginRight: 20 }} variant="success" onClick={this.submitPreApproval}>SUBMIT</Button>
                                </div>  

                            }
                            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* { status === 0 && !this.state.approveClicked && (
                                    <>
                                        <Button
                                            style={{ marginRight: 20 }}
                                            variant="success"
                                            onClick={this.handleApproveClick}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            variant="danger"
                                            onClick={() => this.setState({ declinedModalShow: true })}
                                        >
                                            Decline
                                        </Button>
                                    </>
                                ) } */}

                                { status === 1 && (
                                    <div style={{ color: '#009e87', fontSize: 16, fontWeight: 'bold' }}>
                                        Preapproval accepted
                                    </div>
                                ) }

                                { status === 2 && (
                                    <div style={{ color: '#d81740', fontSize: 16, fontWeight: 'bold' }}>
                                        Preapproval declined
                                    </div>
                                ) }
                            
                            </div>
                            {/* {
                                status === 0 && this.state.approveClicked &&
                                <ApproveSubmitContainer>
                                    <ApproveSubmitInnerContainer>                                        
                                        {
                                            this.state.firstType === 'yes' && 
                                            <Form.Group >
                                                <Form.Label>Earliest Delivery Date: </Form.Label>
                                                <CalendarContainer>
                                                    <DatePicker 
                                                        selected={this.state.deliveryDate} 
                                                        onChange={date => this.setState({
                                                            deliveryDate: date })}
                                                        minDate={new Date()}
                                                        className="calendar-approve"
                                                        dateFormat="MM/dd/yyyy"
                                                        placeholderText="MM/DD/YYYY" />
                                                </CalendarContainer>
                                                
                                            </Form.Group>
                                        }
                                        {
                                            this.state.secondType === 'yes' && 
                                            <Form.Group className="applience cal-inner">
                                                <Form.Label>Appliance: </Form.Label>
                                                <Form.Control
                                                    required
                                                    autoComplete="none"
                                                    as="select"
                                                    style={{ 'border': '1px solid #3a5b77'}}
                                                    value={this.state.applianceValue}
                                                    onChange={e => 
                                                        {
                                                        
                                                            this.setState({
                                                                applianceValue: e.target.value
                                                            }) 
                                                        }}
                                                >
                                                {
                                                    applianceMap.map((item, index) => {
                                                        return (<option selected={ this.state.applianceValue === item.value} value={item.value} key={index}>{item.label}</option>)
                                                    })
                                                }
                                            
                                                </Form.Control>
                                            </Form.Group>
                                        }
                                    </ApproveSubmitInnerContainer>
                                    <div className="text-center" style={{ 'marginTop': '22px', 'marginLeft': '20px'}}>
                                        <Button style={{ marginRight: 20 }} variant="success" onClick={this.submitPreApproval}>SUBMIT</Button>
                                    </div>  
                                </ApproveSubmitContainer>
                            } */}
                            {
                                pre_approvals_request_id === 1 &&  <AgainRequestBlock> Request Again By Client</AgainRequestBlock>
                            }
                           
                            <Modal show={this.state.declinedModalShow} onHide={this.handleModalClose}>
                                <Modal.Header closeButton></Modal.Header>
                                <Modal.Body>
                                    <label>Reason*</label>
                                    <br />
                                    <textarea className="text-area" onChange={(e) => this.setState({ message: e.target.value })}></textarea>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleModalClose}>
                                        No
                                    </Button>
                                    <Button variant="primary" onClick={() => {this.handleDeclineClick()}}>
                                        Yes
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.admin.selectedPreapproval,
    isLoading: state.admin.submitPreapprovalLoading
});

export default connect(
    mapStateToProps,
    {
        changeSelectedPreApprovalStatus
    }
)(PreApprovalItem);