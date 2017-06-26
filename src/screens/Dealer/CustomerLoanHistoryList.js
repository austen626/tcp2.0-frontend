import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import { Form, Row, Button, } from "react-bootstrap";
import { iconNotify, iconPaid } from "../../assets/images";
import { changeCustomer } from "../../redux/actions/customer";
import {
    sendPreapproval,
} from "../../redux/actions/customers";
import CustomerLoadDetails from './CustomerLoadDetails';
import DivLoader from "shared/Loader/divLoader";
import { setLoanProductName } from 'utils/helper';
import { HistoryDivLoader, CustomerHistoryNoFound } from './style';
class CustomerLoanHistoryList extends Component {
    
    state = {
        currentWidth: 500,
        openLoadDetails: false,
        optionPaymentIndexOpen: null
    };

    handleOpenLoadDetails = (mapId, acctrefno) => {
        const { getCustomerPaymentHistory } = this.props;
        const { optionPaymentIndexOpen } = this.state;

        if(mapId === optionPaymentIndexOpen) {
            this.setState({
                optionPaymentIndexOpen: null,
            });
        } else {
            getCustomerPaymentHistory({
                id: acctrefno
            })
            this.setState({
                optionPaymentIndexOpen: mapId,
            });
        }
    };

    render() {
        const { customerData, companyName } = this.props;
        const { historyData, isHistoryLoading, paymentHistoryData, isPaymentHistoryLoading } = customerData;
        const { optionPaymentIndexOpen } = this.state;
        const IconSmallArrowRight = (props) => {
            return (
                <svg className={`arrow-icon ${props.id === optionPaymentIndexOpen && "arrow-icon-active"}`} enableBackground="new 0 0 12 12" height="12px" id="Layer_1" version="1.1" viewBox="0 0 32 32" width="32px">
                    <path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z"/>
                </svg>
            )
        }

        return (
        this.props.commentBoxShow ? (            
            <div className="comment-div ">
                <div className="comment-header">Comments</div>
                <div className="comment-section">
                    <div className="comment-box">
                        <Form.Group>
                            <Form.Label>Add Comment</Form.Label>
                            <Form.Control as="textarea" rows="3" />
                            <div className="comment-box-action">
                                <Button
                                    variant="default"
                                    className="custom-btn"
                                    onClick={this.props.handleCommentClick}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="default"
                                    className="custom-btn"
                                    onClick={this.props.handleCommentClick}
                                >
                                    Comment
                                </Button>
                            </div>
                        </Form.Group>
                    </div>
                    <div className="comment-list">
                        <div className="comment">
                            <p>
                                The quick, brown fox jumps over a lazy dog. DJs
                                flock by when MTV ax quiz prog. Junk MTV quiz
                                graced by fox whelps. Bawds jog, flick quartz,
                                vex nymphs...
                            </p>
                        </div>
                        <div className="comment">
                            <p>
                                The quick, brown fox jumps over a lazy dog. DJs
                                flock by when MTV ax quiz prog. Junk MTV quiz
                                graced by fox whelps. Bawds jog, flick quartz,
                                vex nymphs...
                            </p>
                        </div>
                        <div className="comment">
                            <p>
                                The quick, brown fox jumps over a lazy dog. DJs
                                flock by when MTV ax quiz prog. Junk MTV quiz
                                graced by fox whelps. Bawds jog, flick quartz,
                                vex nymphs...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="history-div">
               
                <div className="history-header">Customer History</div>
                <div className="history-info">
                    {
                        isHistoryLoading &&  
                        <HistoryDivLoader>
                            <DivLoader />
                        </HistoryDivLoader>
                    }

                    {
                        historyData.length === 0 && 
                        !isHistoryLoading &&
                        <CustomerHistoryNoFound>
                            <Row className="no-found-history d-flex justify-content-center align-items-center">
                                <div>{ companyName } does not have any borrowing history available</div>
                            </Row>
                        </CustomerHistoryNoFound>
                        
                    }
                   
                    {
                        historyData && 
                        historyData.map((item, index) => {
                            if(item.Details) {
                                return (
                                    <div className="history-row" key={index}>
                                        <div className="history" onClick={() => this.handleOpenLoadDetails('map'+index, item.Acctrefno)}>
                                            {
                                                parseInt(item.Details.Total_Past_Due) > 5 ?
                                                <img
                                                    className="status-icon"
                                                    src={iconNotify}
                                                    alt=""
                                                />  
                                                :                                                                                   
                                                <img className="status-icon" src={iconPaid} alt="" />                                                
                                            }
                                            <span><IconSmallArrowRight id={ 'map'+index }/></span>
                                            <div className="loan">
                                                <div className="info">
                                                    { `${ setLoanProductName(item.Loan_Number) },` }&nbsp; ORDER { item.Open_Date ? (moment(new Date(item.Open_Date)).format("DD-MMM-YYYY")  || "-") : "-"}
                                                </div>
                                                <div className="load-id">Loan No: { item.Loan_Number }</div>
                                            </div>
                                            
                                        </div>
                                        { (optionPaymentIndexOpen ===  ('map'+index)) && (
                                            <CustomerLoadDetails 
                                                items = { item }
                                                paymentHistoryData = { paymentHistoryData }
                                                isPaymentHistoryLoading= { isPaymentHistoryLoading } />
                                        )}
                                    </div>
                                )
                            } else {
                                return null;
                            }                           
                        })
                    }
                        {/* <div key={14234234} className="history">
                            <img
                                className="status-icon"
                                src={iconNotify}
                                alt=""
                            />
                            {IconSmallArrowRight}
                            <div className="loan">
                                <div className="info">
                                    [PRODUCT] ORDER {"12-sep-2020"}
                                </div>
                                <div className="load-id">Load No: 852549</div>
                            </div>
                        </div> 
                        //  {this.state.openLoadDetails && (
                        //     <CustomerLoadDetails />
                        // )} */}
                    
                    {/* <div key={1234541} className="history">
                        <img className="status-icon" src={iconPaid} alt="" />                        
                        {IconSmallArrowRight}
                        <div className="loan">
                            <div className="info">
                                [PRODUCT] ORDER {"12-sep-2020"}
                            </div>
                            <div className="load-id">Load No: 852549</div>
                        </div>
                    </div> */}
                </div>
            </div>
         ) );
    }
}

const mapStateToProps = (state) => ({
    customer: state.customers.selected,
});

export default connect(mapStateToProps, {
    sendPreapproval,
    changeCustomer,
})(CustomerLoanHistoryList);
