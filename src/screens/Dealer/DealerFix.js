/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { pushNotification } from 'utils/notification';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft, IconFixIssueAwesomeSendRed } from '../../assets/images';
import { changeCustomer, changeProduct, addProduct, addExistingProduct } from '../../redux/actions/customer';
import { resendApplicationMail, getAppDetailById } from 'redux/actions/sales';
import { emailCommonValidation } from 'redux/actions/customer';
import Loader from 'shared/Loader';
import { message } from 'shared/constant';
import { emailApplicantCheck } from './emailApplicantCheck';
class DealerFix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerEmail: '',
            coCustomerEmail: '',
            confireModal: false,
            isLoading: false,
            cif_number: 0,
            emailError: {
                customerEmailError: false,
                coCustomerEmailError: false,
            }
        }
        this.setEmailIdEvent= this.setEmailIdEvent.bind(this);
    }

    setEmailIdEvent = async (emailData) => {
        this.setState({
            isLoading: true,
            cif_number: emailData.cif_number ? emailData.cif_number: 0
        })
        const { emailCommonValidation } = this.props;
        const { emailError } = this.state;
        const data = {
            firstEmail: emailData.applicant.email || '',
            secondEmail: (emailData.co_applicant && emailData.co_applicant.email) || '',
        }
        const checkData = await emailApplicantCheck(data, emailCommonValidation);
        if(checkData) {
            const emailTempError = { ...emailError }
            this.setState({
                isLoading: false
            })
            if(checkData.applicantEmailIssue) {
                emailTempError.customerEmailError = true;
            } 
            if(checkData.coApplicantEmailIssue) {
                emailTempError.coCustomerEmailError = true;
            }
            this.setState({
                emailError: emailTempError,
                customerEmail: emailData.applicant.email || '',
                coCustomerEmail: (emailData.co_applicant && emailData.co_applicant.email) || '',
            })
            
        }
    }

    async componentDidMount() {
        const _this = this.setEmailIdEvent;

        this.props.getAppDetailById(
            this.props.match.params.appId, 
            null,
            _this
        );
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleResendMailAction = async () => {
        const { history, emailCommonValidation } = this.props;
        const customer = this.props.app.data;
        const { emailError, cif_number } = this.state;
        this.setState({
            isLoading: true,
        })
        const customerEmail = this.state.customerEmail || null;
        const coCustomerEmail = this.state.coCustomerEmail || null;
        const checkData = await emailApplicantCheck({
            firstEmail: customerEmail,
            secondEmail: coCustomerEmail, 
        }, emailCommonValidation);
        if(checkData.applicantEmailIssue || (checkData.coApplicantEmailIssue && customer.co_applicant && 
            customer.co_applicant.id &&
            customer.hello_sign[1])) {
                const emailTempError = { ...emailError }
                if(checkData.applicantEmailIssue) {
                    emailTempError.customerEmailError = true;
                } 
                if(checkData.coApplicantEmailIssue) {
                    emailTempError.coCustomerEmailError = true;
                }
                this.setState({
                    emailError: emailTempError,
                    isLoading: false,
                });
                
        } else {
            const emailTempError = { ...emailError };
            emailTempError.customerEmailError = false;
            emailTempError.coCustomerEmailError = false;  
            this.setState({
                emailError: emailTempError
            });
            this.props.resendApplicationMail(this.props.app.data.id, customerEmail, coCustomerEmail, 2, this.props.app.data.products, cif_number).then(() => {
                this.setState({
                    isLoading: false,
                })
                pushNotification(message.RESEND_EMAIL_SUCCESS, 'success', 'TOP_RIGHT', 3000);
                history.push('/incomplete-page')
                // this.setState({confireModal: true});
            }).catch((error) => {
                this.setState({
                    isLoading: false,
                })
                pushNotification('Something Went Wrong', 'error', 'TOP_RIGHT', 3000);
            });
        }
        
    }

    handleModalClose = () => {
        this.setState({ confireModal: false });
        const { history } = this.props;
        history.push('/incomplete-page')
        // this.props.getAppDetailById(this.props.match.params.appId);
    }

    handleEditDocumentAction = (customer) => {
        const co_enabled =  customer.co_applicant && customer.co_applicant.id ? true : false;
        
        this.props.changeCustomer({
            order_type: 1,
            co_enabled: co_enabled,
            existing_customer_id: customer.cif_number,
            main_app: {
                name: customer.applicant.name,
                email: customer.applicant.email,
                dobY: customer.applicant.dobY,
                dobM: customer.applicant.dobM,
                dobD: customer.applicant.dobD,
                ssn: customer.applicant.ssn,
                dl: customer.applicant.dl,
                nod: customer.applicant.nod,
                cell_phone: customer.applicant.employer_phone,
                home_phone: customer.applicant.phone,
                street: customer.applicant.address,
                city: customer.applicant.city,
                state: customer.applicant.state,
                zip: customer.applicant.zip,
                yt1: customer.applicant.yt1,
                own_or_rent: customer.applicant.own_or_rent,
                present_employer: customer.applicant.present_employer,
                yt2: customer.applicant.yt2,
                job_title: customer.applicant.job_title,
                employer_phone: customer.applicant.employer_phone,
                monthly_income: customer.applicant.monthly_income,
                additional_income: customer.applicant.additional_income,
                source: customer.applicant.source,
                landlord_holder: customer.applicant.landlord_holder,
                monthly_rent_payment: customer.applicant.monthly_rent_payment
            },
            co_app: {
                name: co_enabled ? customer.co_applicant.name : "",
                email: co_enabled ? customer.co_applicant.email : "",
                dobY: co_enabled ? customer.co_applicant.dobY : "",
                dobM: co_enabled ? customer.co_applicant.dobM : "",
                dobD: co_enabled ? customer.co_applicant.dobD : "",
                ssn: co_enabled ? customer.co_applicant.ssn : "",
                dl: co_enabled ? customer.co_applicant.dl : "",
                nod: co_enabled ? customer.co_applicant.nod : "",
                cell_phone: co_enabled ? customer.co_applicant.employer_phone : "",
                home_phone: co_enabled ? customer.co_applicant.phone : "",
                street: co_enabled ? customer.co_applicant.address : "",
                city: co_enabled ? customer.co_applicant.city : "",
                state: co_enabled ? customer.co_applicant.state : "",
                zip: co_enabled ? customer.co_applicant.zip : "",
                yt1: co_enabled ? customer.co_applicant.yt1 : "",
                own_or_rent: co_enabled ? customer.co_applicant.own_or_rent : "",
                present_employer: co_enabled ? customer.co_applicant.present_employer : "",
                yt2: co_enabled ? customer.co_applicant.yt2 : "",
                job_title: co_enabled ? customer.co_applicant.job_title : "",
                employer_phone: co_enabled ? customer.co_applicant.employer_phone : "",
                monthly_income: co_enabled ? customer.co_applicant.monthly_income : "",
                additional_income: co_enabled ? customer.co_applicant.additional_income : "",
                source: co_enabled ? customer.co_applicant.source : "",
                landlord_holder: co_enabled ? customer.co_applicant.landlord_holder : "",
                monthly_rent_payment: co_enabled ? customer.co_applicant.monthly_rent_payment : ""
            },
        });

        this.props.addExistingProduct(customer.products);
        this.props.history.push('/summary');
    }

   

    render() {
        const { isLoading, emailError } = this.state;
        const customer = this.props.app.data;

        const IconAwesomePaperPlane = <svg xmlns="http://www.w3.org/2000/svg" width="17.982" height="18.273" viewBox="0 0 17.982 18.273">
                                        <path d="M8.956 6.775v2.43c.931.211 1.759.557 2.626.8V7.567c-.928-.207-1.763-.553-2.626-.792zm7.969-4.389a10.42 10.42 0 0 1-4.175 1.138c-1.909 0-3.49-1.242-5.9-1.242a6.938 6.938 0 0 0-2.427.428 2 2 0 1 0-3.008.924v13.779a.854.854 0 0 0 .856.856h.571a.854.854 0 0 0 .856-.856v-3.369a9.95 9.95 0 0 1 4.082-.789c1.913 0 3.49 1.242 5.9 1.242a7.457 7.457 0 0 0 4.371-1.46 1.138 1.138 0 0 0 .492-.942V3.421a1.14 1.14 0 0 0-1.619-1.035zm-10.6 9.228a11.242 11.242 0 0 0-2.626.592V9.691a10.209 10.209 0 0 1 2.63-.621zm10.506-4.8a11.383 11.383 0 0 1-2.626.853V10.2a6.633 6.633 0 0 0 2.626-.928v2.516a5.766 5.766 0 0 1-2.626.967V10.2a6.036 6.036 0 0 1-2.626-.2v2.41a20.821 20.821 0 0 0-2.626-.76V9.205a7.932 7.932 0 0 0-2.624-.135v-2.5a12.593 12.593 0 0 0-2.629.748V4.8a10.219 10.219 0 0 1 2.626-.785v2.557a6.07 6.07 0 0 1 2.626.2V4.37a20.315 20.315 0 0 0 2.626.76v2.441a6.8 6.8 0 0 0 2.626.1V5.1a12.626 12.626 0 0 0 2.626-.8z" transform="translate(-.563 .003)"/>
                                    </svg>


        const IconEnvelopeOpen = <svg xmlns="http://www.w3.org/2000/svg" width="17.266" height="17.266" viewBox="0 0 17.266 17.266">
                                    <path d="M8.633 0L0 4.316v12.95h17.266V4.316zm0 2.439l6.475 3.237v4.058l-6.475 3.237-6.475-3.237V5.676zM4.316 6.5v2.155l4.316 2.158 4.316-2.158V6.5z"/>
                                </svg>


        const IconAwesomePenFancy = <svg xmlns="http://www.w3.org/2000/svg" width="17.266" height="17.266" viewBox="0 0 17.266 17.266">
                                        <g>
                                            <path d="M2.67 9.541a1.079 1.079 0 0 0-.683.683L0 16.187l.158.158 3.132-3.132a1.038 1.038 0 0 1-.053-.263 1.079 1.079 0 1 1 1.079 1.079 1.038 1.038 0 0 1-.263-.053L.921 17.108l.158.158 5.963-1.988a1.079 1.079 0 0 0 .683-.683l1.115-2.834-3.335-3.335zM12.452.955L6.277 7.682l3.3 3.3L16.3 4.807c2.868-2.531-1.336-6.693-3.848-3.852z"/>
                                        </g>
                                    </svg>

        const IconSend = <svg xmlns="http://www.w3.org/2000/svg" width="18.494" height="18.499" viewBox="0 0 18.494 18.499">
                            <path d="M17.2.115L.452 9.774a.868.868 0 0 0 .079 1.561l3.84 1.611L14.75 3.8a.217.217 0 0 1 .311.3l-8.7 10.6v2.908a.867.867 0 0 0 1.535.571l2.294-2.792 4.5 1.886a.869.869 0 0 0 1.192-.657l2.6-15.606A.867.867 0 0 0 17.2.115z" transform="translate(-.001 .002)"/>
                        </svg>

        const IconEnvelopeClosed = <svg xmlns="http://www.w3.org/2000/svg" width="17.331" height="12.998" viewBox="0 0 17.331 12.998">
                                        <path d="M0 0v2.166L8.665 6.5l8.665-4.333V0zm0 4.333V13h17.331V4.333L8.665 8.665z"/>
                                    </svg>

        const IconAwesomePenFancyRight = <svg xmlns="http://www.w3.org/2000/svg" width="17.875" height="19.445" viewBox="0 0 17.875 19.445">
                                            <g>
                                                <path d="M2.527 9.029a1.021 1.021 0 0 0-.646.646L0 15.318l.15.15L3.114 12.5a.982.982 0 0 1-.05-.249 1.021 1.021 0 1 1 1.021 1.021.982.982 0 0 1-.249-.05L.872 16.19l.149.149 5.643-1.881a1.021 1.021 0 0 0 .646-.646l1.055-2.682L5.21 7.974zM11.784.9L5.94 7.27l3.123 3.123 6.366-5.844c2.71-2.395-1.268-6.334-3.645-3.649z" transform="translate(1.5) rotate(-90 8.188 8.151)"/>
                                                <path stroke="#c8e0ed" stroke-linecap="round" stroke-width="3px" d="M0 0h14.769" transform="translate(1.5) translate(0 17.945)"/>
                                            </g>
                                        </svg>

        return (
            <>
                <div className="fix-issue-section">
                    <Header>
                        <HeaderLeft>
                            <img src={IconArrowLeft} onClick={this.handleArrowBack} height="28" alt=""/>
                        </HeaderLeft>
                        <HeaderCenter>
                            <span>FIX ISSUE</span>
                        </HeaderCenter>
                        <HeaderRight>
                        </HeaderRight>
                    </Header>
                    {
                        isLoading && <Loader />
                    }
                    {customer.applicant && (
                        <div className="fix-issue-main">
                            <Row >
                                <Col xs={customer.co_applicant && customer.co_applicant.id ? 6 : 12} className="action-icons incomplete-customer-action">
                                  
                                    {
                                        Array.isArray(customer.hello_sign) && customer.hello_sign.length === 0 ? 
                                          <Button variant="default" className="active" >
                                              <img src={ IconFixIssueAwesomeSendRed } alt="" />
                                          </Button> :
                                        customer.hello_sign && customer.hello_sign.length > 0 && customer.hello_sign[0].last_viewed_at !== null && customer.hello_sign[0].status_code !== "delivery_in_queue" && (customer.hello_sign[0].status_code === "declined" ||  customer.hello_sign[0].status_code === "error" || customer.hello_sign[0].status_code === "not_delivered" ) ? (
                                            <Button variant="default" className="active-mark">
                                                {IconSend}
                                            </Button>
                                        ) : (
                                            <Button variant="default" className="active">
                                                {IconAwesomePaperPlane}
                                            </Button>
                                        )}

                                    {
                                        customer.hello_sign && 
                                        customer.hello_sign.length > 0 && 
                                        customer.hello_sign[0].last_viewed_at !== null &&
                                        customer.hello_sign[0].status_code !== "delivery_in_queue" ? (
                                            <Button variant="default" className="active">
                                                {IconEnvelopeOpen}
                                            </Button>
                                    ) : (
                                        <Button variant="default">
                                            {IconEnvelopeClosed}
                                        </Button>
                                    )}

                                    {
                                        customer.hello_sign && 
                                        customer.hello_sign.length > 0 && 
                                        customer.hello_sign[0].last_viewed_at !== null && 
                                        customer.hello_sign[0].status_code !== "delivery_in_queue" &&
                                        customer.hello_sign[0].status_code == "singed" ? (
                                            <Button variant="default" className="active">
                                                {IconAwesomePenFancyRight}
                                            </Button>
                                    ) : (
                                        <Button variant="default">
                                            {IconAwesomePenFancy}
                                        </Button>
                                    )}

                                </Col>

                                {                                    
                                    customer.co_applicant && 
                                    customer.co_applicant.id && 
                                    <Col xs={6} className="action-icons border-left incomplete-customer-action">
                                        {
                                            Array.isArray(customer.hello_sign) && customer.hello_sign.length === 0 ? 
                                            <Button variant="default" className="active"  >
                                                <img src={ IconFixIssueAwesomeSendRed } alt="" />
                                            </Button> :
                                            customer.hello_sign && customer.hello_sign.length > 1 && customer.hello_sign[1].last_viewed_at !== null && customer.hello_sign[1].status_code !== "delivery_in_queue" && (customer.hello_sign[1].status_code === "declined" || customer.hello_sign[1].status_code === "error" || customer.hello_sign[1].status_code === "not_delivered" ) ? (
                                                <Button variant="default" className="active-mark">
                                                    {IconSend}
                                                </Button>
                                            ) : (
                                                <Button variant="default" className="active">
                                                    {IconAwesomePaperPlane}
                                                </Button>
                                            )}

                                        {
                                            customer.hello_sign && 
                                            customer.hello_sign.length > 1 && 
                                            customer.hello_sign[1].last_viewed_at !== null &&
                                            customer.hello_sign[1].status_code !== "delivery_in_queue" ? (
                                            <Button variant="default" className="active">
                                                {IconEnvelopeOpen}
                                            </Button>
                                        ) : (
                                            <Button variant="default">
                                                {IconEnvelopeClosed}
                                            </Button>
                                        )}

                                        {
                                            customer.hello_sign && 
                                            customer.hello_sign.length > 1 && 
                                            customer.hello_sign[1].last_viewed_at !== null &&
                                            customer.hello_sign[1].status_code !== "delivery_in_queue" &&
                                            customer.hello_sign[1].status_code == "singed" ? (
                                            <Button variant="default" className="active">
                                                {IconAwesomePenFancyRight}
                                            </Button>
                                        ) : (
                                            <Button variant="default">
                                                {IconAwesomePenFancy}
                                            </Button>
                                        )}
                                    </Col>
                                }

                            </Row>
                            <Row>
                                <Col xs={12} className="customer-item-details">
                                    <div className="name">
                                        {customer.applicant.name}
                                    </div>
                                    <div className="address">
                                        {customer.applicant.address} &nbsp;
                                        {customer.applicant.city} 
                                        <br/>
                                        {customer.applicant.zip} &nbsp; 
                                        {customer.applicant.state} 
                                    </div>
                                    <br/>
                                    <div className="item">
                                        { customer.products.map(product => (
                                            <div key={product.id} className="date">{ product.product_type }, ${product.balance}</div>
                                        )) }
                                    </div>
                                </Col>
                            </Row>
                            <Row className="input-section">
                                <Col xs={12} className="customer-input">
                                    <Form.Group className="mb-18">
                                        <Form.Label>Applicant Email</Form.Label>
                                        <Form.Control
                                            pattern="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
                                            type="email"
                                            placeholder="customer@email.com"
                                            // defaultValue={customer.applicant.email}
                                            value={this.state.customerEmail}
                                            onChange={(e) => this.setState({ customerEmail: e.target.value })}
                                        />
                                        {
                                            emailError.customerEmailError &&
                                            <div className="text-danger">Please check applicant email</div>
                                        }
                                    </Form.Group>
                                </Col>
                                {
                                    customer.co_applicant && 
                                    customer.co_applicant.id &&
                                    <Col xs={12} className="customer-input">
                                        <Form.Group className="mb-18">
                                            <Form.Label>Co-applicant Email</Form.Label>
                                            <Form.Control
                                                placeholder="customer@email.com"
                                                // defaultValue={customer.co_applicant.email}
                                                value={this.state.coCustomerEmail}
                                                onChange={(e) => this.setState({ coCustomerEmail: e.target.value })}
                                            />
                                            {
                                                emailError.coCustomerEmailError &&
                                                <div className="text-danger">Please check co-applicant email</div>
                                            }
                                        </Form.Group>
                                    </Col>
                                }
                                <Col xs={12} className="customer-action">                            
                                    <Button variant="primary" onClick={()=> {this.handleResendMailAction()}}>RESEND EMAIL</Button>
                                    <Button variant="primary" onClick={()=> {this.handleEditDocumentAction(customer)}}>Edit Documents</Button>
                                </Col>
                            </Row>
                        </div>  
                    )}          
                </div>
                <Row className="footer-section">                        
                    <Col xs={12} className="footer-action">                            
                        {/* <Button variant="primary">SAVE</Button> */}
                    </Col>
                </Row>
                <Modal show={this.state.confireModal} onHide={this.handleModalClose}>
                    <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                        <p>Mail Resend Successful.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleModalClose}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>  
            </>
        )
    }
}

const mapStateToProps = state => ({
    app: state.sales.selectedApp
});

export default connect(
    mapStateToProps,
    {
        getAppDetailById,
        resendApplicationMail,
        changeCustomer,
        changeProduct,
        addProduct,
        addExistingProduct,
        emailCommonValidation
    }
)(DealerFix);