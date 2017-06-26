import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { message as ConstMessage } from 'shared/constant';
import { setApplianceFlag } from 'utils/helper';
import { IconArrowLeft, IconPreapprovalDeclined } from '../../assets/images';
import { changeCustomer, addProduct } from '../../redux/actions/customer';
import { 
    getCustomerById, 
    sendPreapproval, 
    getCustomerHistory,
    getCustomerPaymentHistory,
    reRequestPreApproval
} from '../../redux/actions/customers';
import CustomerLoanHistoryList from './CustomerLoanHistoryList';
import Loader from 'shared/Loader';

class CustomerDetail extends Component {

    customerDetailsRef = React.createRef();

    state = {
        modalShow: false,
        commentBoxShow: false,
        currentWidth: 500,
        openLoadDetails: false
    }

    async componentDidMount() {
        const { getCustomerById } = this.props
        const id = this.props.match.params.id;
        const type = this.props.match.params.type;
        getCustomerById(id, type);
        if (this.customerDetailsRef !== undefined && this.customerDetailsRef.current.offsetWidth !== undefined) {
            this.setState({ currentWidth: this.customerDetailsRef.current.offsetWidth })
        }
    }

    async componentDidUpdate(prevProps) {
        const { getCustomerHistory } = this.props
        if(this.props.customer && this.props.customer.data && this.props.customer.data.id !== prevProps.customer.data.id) {
            const cif_number = this.props.customer.data.cif_number;
            if(cif_number) {
                getCustomerHistory({id: cif_number});
            }
        }
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handlePreApprovalClick = async () => {
        // const result = await this.props.sendPreapproval(this.props.customer.data.id);
        // if (result) {
        //     this.setState({ modalShow: true });
        // }
        const { reRequestPreApproval } = this.props;
        reRequestPreApproval(this.props.customer.data.id, this.modalShow);

    }

    modalShow = () => {
        const { modalShow } = this.state;
        this.setState({
            modalShow: !modalShow
        })
    }

    handleCommentClick = () => {
        this.setState({ commentBoxShow: !this.state.commentBoxShow })
    }

    handleModalClose = () => {
        this.setState({ modalShow: false });
        window.location.reload(false);
    }

    handleOpenLoadDetails = () => {
        this.setState({ openLoadDetails: !this.state.openLoadDetails });
    }

    handleGenerateOrderClick = () => {
        const customer = this.props.customer.data;
        this.props.changeCustomer({
            order_type: 2,
            co_enabled: customer.co_customer.id ? true : false,
            main_app: {
                name: customer.name,
                email: customer.email,
                dobY: customer.dobY,
                dobM: customer.dobM,
                dobD: customer.dobD,
                ssn: customer.ssn,
                dl: customer.dl,
                nod: customer.nod,
                cell_phone: customer.cell_phone,
                home_phone: customer.home_phone,
                street: customer.street,
                city: customer.city,
                state: customer.state,
                zip: customer.zip,
                yt1: customer.yt1,
                own_or_rent: customer.own_or_rent,
                present_employer: customer.present_employer,
                yt2: customer.yt2,
                job_title: customer.job_title,
                employer_phone: customer.employer_phone,
                monthly_income: customer.monthly_income,
                additional_income: customer.additional_income,
                source: customer.source,
                landlord_holder: customer.landlord_holder,
                monthly_rent_payment: customer.monthly_rent_payment
            },
            co_app: {
                name: customer.co_customer.name,
                email: customer.co_customer.email,
                dobY: customer.co_customer.dobY,
                dobM: customer.co_customer.dobM,
                dobD: customer.co_customer.dobD,
                ssn: customer.co_customer.ssn,
                dl: customer.co_customer.dl,
                nod: customer.co_customer.nod,
                cell_phone: customer.co_customer.cell_phone,
                home_phone: customer.co_customer.home_phone,
                street: customer.co_customer.street,
                city: customer.co_customer.city,
                state: customer.co_customer.state,
                zip: customer.co_customer.zip,
                yt1: customer.co_customer.yt1,
                own_or_rent: customer.co_customer.own_or_rent,
                present_employer: customer.co_customer.present_employer,
                yt2: customer.co_customer.yt2,
                job_title: customer.co_customer.job_title,
                employer_phone: customer.co_customer.employer_phone,
                monthly_income: customer.co_customer.monthly_income,
                additional_income: customer.co_customer.additional_income,
                source: customer.co_customer.source,
                landlord_holder: customer.co_customer.landlord_holder,
                monthly_rent_payment: customer.co_customer.monthly_rent_payment
            },
        });
        this.props.addProduct();
        this.props.history.push('/product/0');
    }

    render() {
        const { loading, data } = this.props.customer;
        const { customerData, getCustomerPaymentHistory } = this.props;
        const { preRequestLoading } =customerData;

        const application_status = 
            data.preapproval && 
            data.preapproval[0] && 
            data.preapproval.length > 0 &&
            data.preapproval[0].status ? data.preapproval[0].status : null

        const preapprovalRequest = 
            (data.preapproval && 
            data.preapproval[0] && 
            data.preapproval.length > 0 &&
            data.preapproval[0].pre_approvals_request_id &&
            data.preapproval[0].pre_approvals_request_id);

            const preapprovalRequestMSG = 
            (data.preapproval && 
            data.preapproval[0] && 
            data.preapproval.length > 0 &&
            data.preapproval[0].message);
            const messageSplit = preapprovalRequestMSG && preapprovalRequestMSG.split('#');
        return (
            <div ref={this.customerDetailsRef} className="dealer">
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt="" />
                    </HeaderLeft>
                    <HeaderCenter>
                        { loading && <span>Loading...</span> }
                        { !loading && Object.keys(data).length > 0 && <span className="name">{data.name}</span> }
                    </HeaderCenter>
                    <HeaderRight>
                        {/* <img src={IconCustomerEdit} /> */}
                    </HeaderRight>
                </Header>
                {
                    preRequestLoading && <Loader />
                }
                { !loading && Object.keys(data).length > 0 && (
                    <>
                        {application_status == 2 && (
                            <>
                                <div className="declined-msg">
                                    <label>
                                        <img src={IconPreapprovalDeclined} alt="" />
                                        <span className="title">Preapproval declined</span>
                                        <span className="description">
                                            <span className="warning-header">
                                                Decision justification
                                            </span>
                                            <br />
                                            <span className="warning-sub-header">
                                                {data.preapproval && data.preapproval.length > 0 && data.preapproval[0].message} 
                                            </span>
                                        </span>
                                    </label>
                                </div>
                                <div className="declined-warning">
                                    <label>Please contact us with any questions  +1 (800) 832-2806</label>
                                </div>
                            </>
                        )}
                
                        {application_status == 1 && (
                            <>
                                <div className="declined-msg accepted">
                                    <label>
                                        <span className="title">Preapproval accepted</span>
                                        <span className="description">
                                            <span className="warning-header">
                                                Conditions
                                            </span>
                                            <br />
                                            <span className="warning-sub-header">
                                                Pre-approved for { setApplianceFlag(data.preapproval[0].product_type) }  { data.preapproval[0].earliest_delivery_date ? `after ${  moment(data.preapproval[0].earliest_delivery_date, 'YYYY/MM/DD').format('MM/DD/yyyy') }` : '' } - {
                                                data.preapproval[0].appliance ? data.preapproval[0].appliance : ConstMessage.NO_CREDIT_CHECK_TEXT}
                                            </span>
                                        </span>
                                    </label>
                                </div>
                            </>
                        )}
                
                        {/* Demo Purpose */}
                        <div className="main">
                            <div className="customer-details">

                                { this.state.currentWidth < 571 ? (
                                    <>
                                        <div className="address-and-buttons">
                                            <div className="address">
                                                <div>{data.street}</div>
                                                <div>{data.zip} {data.city}</div>
                                                <div>{data.state}</div>
                                            </div>                                      
                                                <div className="buttons">
                                                    {application_status == 2 && (
                                                        <>
                                                            <div className="btn-custom button-preapproval" onClick={ this.handlePreApprovalClick }>REQUEST PREAPPROVAL</div>
                                                            <div className="btn-custom button-order" style={{opacity: "0.5"}}>GENERATE ORDER</div>
                                                        </>
                                                    )}
                                                    {application_status == 1 && (
                                                        <>
                                                            <div className="btn-custom button-preapproval" onClick={this.handleGenerateOrderClick}>GENERATE ORDER</div>
                                                        </>
                                                    )}
                                                </div> 
                                        </div>

                                        { !this.state.commentBoxShow && (
                                            <>
                                                <div className="tab1">Contact</div>
                                                <div className="contact-info">
                                                    <div className="details">
                                                        <strong>TCP Customer Since: </strong>
                                                        <span>{data.created_at}</span>
                                                    </div>
                                                    <div className="details">
                                                        <strong>Phone: </strong>
                                                        <span>{data.cell_phone}</span>
                                                    </div>
                                                    <div className="details">
                                                        <strong>Email: </strong>
                                                        <span>{data.email}</span>
                                                    </div>
                                                    <div className="details">
                                                        <strong>Date Of Birth: </strong>
                                                        <span>{data.dob}</span>
                                                    </div>
                                                    <div className="details">
                                                        <strong>{`${data?.apps[0]?.salesperson_company_name || 'No Comapny Name'} : ` } </strong>
                                                        <span>{ data.cif_number }</span>
                                                    </div>
                                                    <div className="details">
                                                        <strong>TCP Customer Number: </strong>
                                                        <span>{`${data?.nortridge_cif_number || ''}`}</span>
                                                    </div>
                                                    {
                                                        messageSplit && messageSplit.length > 0 && <div>
                                                            Message:
                                                             {
                                                                    messageSplit && messageSplit.map((item, index) => {
                                                                        console.log('@@@@@@@@@@@@@@@@')
                                                                        return (<div className="text-info" key={ index }>
                                                                                    <strong>{ item }</strong>
                                                                                </div>)
                                                                    })
                                                                    
                                                                }
                                                            </div>
                                                    }
                                                    
                                                    {
                                                        preapprovalRequest === 1 && <div className="text-danger">
                                                            <strong>Pre-request has been sent to admin</strong>
                                                        </div>
                                                    }
                                                     {
                                                        preapprovalRequest === 2 && <div className="text-danger">
                                                            <strong>Admin has declined Pre-request</strong>
                                                        </div>
                                                    }
                                                    
                                                    {/* { application_status !== 0 && (
                                                        <div className="button-comment" onClick={this.handleCommentClick}>
                                                            <div id="button">COMMENT</div>
                                                        </div>
                                                    )} */}
                                                </div>
                                            </>
                                        ) }
                                    </>

                                ) : (

                                    <Row className="web-info-box">
                                        <Col xs="6" className="text-left right-border">
                                            <div className="web-address-and-buttons">
                                                <div className="address">
                                                    <div>{data.street}</div>
                                                    <div>{data.zip} {data.city}</div>
                                                    <div>{data.state}</div>
                                                    {/* {application_status == 0 && (
                                                        <div className="buttons">
                                                            <div className="btn-custom button-preapproval" onClick={this.handlePreApprovalClick}>REQUEST PREAPPROVAL</div>
                                                        </div>
                                                    )} */}
                                                    {application_status == 2 && (
                                                        <div className="buttons">
                                                            <div className="btn-custom button-preapproval" onClick={ this.handlePreApprovalClick }>REQUEST PREAPPROVAL</div>
                                                            <div className="btn-custom button-order" style={{opacity: "0.5"}}>GENERATE ORDER</div>
                                                        </div>
                                                    )}
                                                    {application_status == 1 && (
                                                        <div className="buttons">
                                                            <div className="btn-custom button-preapproval" onClick={this.handleGenerateOrderClick}>GENERATE ORDER</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                        <Col xs="6" className="text-left">
                                            <div className="web-address-and-buttons">
                                                <div className="address ml-50">
                                                    <div>TCP Customer Since: {data.created_at}</div>
                                                    <div>Phone: {data.cell_phone}</div>
                                                    <div>Email: {data.email}</div>
                                                    <div>{`${data?.apps[0]?.salesperson_company_name || 'No Comapny Name'} : ${data.cif_number} ` }</div>
                                                    <div>TCP Customer Number: {`${data?.nortridge_cif_number || ''}`}</div>
                                                    {
                                                        messageSplit && messageSplit.length > 0 && <div>
                                                            Message:
                                                             {
                                                                    messageSplit && messageSplit.map((item, index) => {
                                                                        return (<div className="text-info" key={ index }>
                                                                                    <strong>{ item }</strong>
                                                                                </div>)
                                                                    })
                                                                    
                                                                }
                                                            </div>
                                                    }
                                                   
                                                    {
                                                        preapprovalRequest === 1 && <div className="text-danger">
                                                            <strong>Pre-request has been sent to admin</strong>
                                                        </div>
                                                    }
                                                    {
                                                        preapprovalRequest === 2 && <div className="text-danger">
                                                            <strong>Admin has declined Pre-request</strong>
                                                        </div>
                                                    }
                                                    {/* {
                                                      
                                                        application_status !== 0 && (
                                                        <div className="buttons">
                                                            <div className="btn-custom button-preapproval" onClick={this.handleCommentClick}>COMMENT</div>
                                                        </div>
                                                    )} */}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                )}

                            </div>
                        </div>

                        <CustomerLoanHistoryList 
                            commentBoxShow = {this.state.commentBoxShow}
                            handleCommentClick = {this.handleCommentClick}
                            customerData = { customerData }
                            getCustomerPaymentHistory = { getCustomerPaymentHistory }
                            companyName={ data.name }
                        />              

                        <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Status</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>The pre-approval has been sent to admin.</Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleModalClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    preAprrovalCustomer: state.customers.preAprrovalCustomer,
    customer: state.customers.selected,
    customerData: state.customers
});

export default connect(
    mapStateToProps,
    {
        getCustomerById,
        sendPreapproval,
        changeCustomer,
        addProduct,
        getCustomerHistory,
        getCustomerPaymentHistory,
        reRequestPreApproval
    }
)(CustomerDetail);