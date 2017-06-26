import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import { Row, Form, Button, Modal } from 'react-bootstrap';
import { setApplianceFlag } from 'utils/helper';
import Header, { HeaderLeft, HeaderCenter, HeaderRight } from '../../components/Dealer/Header';
import { IconArrowLeft } from '../../assets/images';

import { changeSelectedPendingApplicationStatus } from '../../redux/actions/admin';
import Loader from 'shared/Loader';

class PreApprovalItem extends Component {
    state = {
        statusClick: 'none',
        message: null,
        rating: 0,
        declinedModalShow: false,
    }

    handleArrowBack = () => {
        this.props.history.goBack();
    }

    handleApproveClick = () => {
        this.setState({
            statusClick: 'approve'
        })
        // const { history } = this.props;
        // this.props.changeSelectedPendingApplicationStatus(this.props.item.id, "approved", history, '/admin/pendingApplications');
    }

    handleWaitingClick = () => {
        const { history } = this.props;
        this.props.changeSelectedPendingApplicationStatus(this.props.item.id, "waiting", history, '/admin/pendingApplications', 0, '');
    }

    // handleDeclineClick = () => {
    //     const { history } = this.props;
    //     this.props.changeSelectedPendingApplicationStatus(this.props.item.id, "declined", history, '/admin/pendingApplications', 0);
    //     // this.props.history.push(`/admin/pendingApplications`);
    // }

    handleDeclineClick = () => {
        if(this.state.message !== null) {
            const { history } = this.props;
            this.props.changeSelectedPendingApplicationStatus(this.props.item.id, "declined", history, '/admin/pendingApplications', 0, this.state.message);
            // this.props.history.push(`/admin/preapprovals`);
        }
    }
    submitApprove = () => {
        const { history } = this.props;
        this.props.changeSelectedPendingApplicationStatus(this.props.item.id, "approved", history, '/admin/pendingApplications', this.state.rating);
    }

    handleModalClose = () => {
        this.setState({ declinedModalShow: false });
    }
    render() {
        const { item, isLoading } = this.props;
        if (Object.keys(item).length === 0) {
            return (
                <div>

                </div>
            )
        }


        const { created_at, status } = item;
        const createdDate = moment(created_at, 'YYYY-MM-DD').format('MM/DD/yyyy');
        const ratingsMap = [0,1,2,3,4,5,6,7,8,9,10];
        return (
            <div className="dealer">
                { isLoading && <Loader /> }
                <Header>
                    <HeaderLeft>
                        <img src={IconArrowLeft} onClick={this.handleArrowBack} alt=""/>
                    </HeaderLeft>
                    <HeaderCenter>
                        <span>{item.name}</span>
                    </HeaderCenter>
                    <HeaderRight>
                        
                    </HeaderRight>
                </Header>
                <div className="main">
                    <div className="customer-details">
                        <div className="contact-info">
                                <div>
                                    <strong>Customer Name: </strong>
                                    <span>{item.name}</span>
                                </div>
                            <div>
                                <strong>PreApproval Created At: </strong>
                                <span>{createdDate}</span>
                            </div>
                            { item.email && (
                                <div>
                                    <strong>Customer Email: </strong>
                                    <span>{item.email}</span>
                                </div>
                            ) }
                            <div>                                
                                <strong>Item Request: </strong>
                                { item.products.map(product => (
                                    <div key={product.id}>{ setApplianceFlag((product.type).toLowerCase()) }: ${product.balance}</div>
                                )) }
                            </div>
                            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                { status === "approved" && (
                                    <div style={{ color: '#009e87', fontSize: 16, fontWeight: 'bold' }}>
                                        Preapproval accepted
                                    </div>
                                ) }

                                { status === "declined" && (
                                    <div style={{ color: '#d81740', fontSize: 16, fontWeight: 'bold' }}>
                                        Credit declined
                                    </div>
                                ) }
                            </div>
                            {
                                status !== "waiting" &&
                                <>
                                    <br />
                                    <p style={{  fontWeight: 'bold',  fontSize: '16px'}}>Change Status:</p>
                                </>
                            }
                            <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                { (status === "waiting" || status === "declined" ||  status === "approved") && this.state.statusClick !== 'approve' &&(
                                    <>
                                    <br/>
                                        {
                                            status !== "waiting" && 
                                            <Button
                                                style={{ marginRight: 20 }}
                                                variant="info"
                                                onClick={this.handleWaitingClick}
                                            >
                                                Waiting
                                            </Button>
                                        }
                                        {
                                            status !== "approved" && 
                                            <Button
                                                style={{ marginRight: 20 }}
                                                variant="success"
                                                onClick={this.handleApproveClick}
                                            >
                                                Approve
                                            </Button>
                                        }
                                        {
                                            status !== "declined" && 
                                            <Button
                                                variant="danger"
                                                onClick={ () => this.setState({ declinedModalShow: true }) }
                                            // onClick={this.handleDeclineClick}
                                            >
                                                Decline
                                            </Button>
                                        }                                        
                                    </>
                                ) }
                               
                                {
                                (status === "waiting" || status === "declined") && this.state.statusClick === 'approve' && 
                                <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div>
                                        <Form.Group>
                                            <Form.Label>Price Tier</Form.Label>
                                            <Form.Control
                                                required
                                                autoComplete="none"
                                                as="select"
                                                style={{ 'border': '1px solid #3a5b77'}}
                                                value={this.state.rating}
                                                onChange={e => this.setState({
                                                    rating: e.target.value
                                                }) }
                                            >
                                            {
                                                ratingsMap.map((item, index) => {
                                                    return (<option value={item} key={index}>{item}</option>)
                                                })
                                            }
                                        
                                            </Form.Control>
                                        </Form.Group>
                                    </div>
                                    <div className="text-center" style={{ 'marginTop': '22px', 'marginLeft': '20px'}}>
                                        <Button style={{ marginRight: 20 }}                    variant="success" onClick={this.submitApprove}>SUBMIT</Button>
                                    </div>                                    
                                   
                                </Row>
                            }
                            </div>
                        </div>
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
        )
    }
}

const mapStateToProps = state => ({
    item: state.admin.selectedPendingApplication,
    isLoading: state.admin.submitPreapprovalLoading
});

export default connect(
    mapStateToProps,
    {
        changeSelectedPendingApplicationStatus
    }
)(PreApprovalItem);