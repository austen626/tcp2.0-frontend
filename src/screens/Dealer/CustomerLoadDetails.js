import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment'
import { Form, Button } from "react-bootstrap";
import { changeCustomer } from "../../redux/actions/customer";
import {
    sendPreapproval,
} from "../../redux/actions/customers";
import DivLoader from "shared/Loader/divLoader";
class CustomerLoadDetails extends Component {
    state = {
        currentWidth: 500,
        openLoanHistoryCommentBox: false,
    };

    handleOpenLoanHistoryCommentBox = () => {
        this.setState({ openLoanHistoryCommentBox: !this.state.openLoanHistoryCommentBox });
    };

    render() {
        const { items, isPaymentHistoryLoading, paymentHistoryData } = this.props;
        return (
            !this.state.openLoanHistoryCommentBox ? (
                <>
                    <div className="load-details">
                        <div className="loan-table table-responsive">
                            <table className="m-auto text-center">
                                <tbody>
                                    <tr>
                                        <td className="title">Total Balance</td>
                                        <td className="data">
                                            <span>{items.Details.Total_Balance ? `$ ${items.Details.Total_Balance.toFixed(2) }` : '-' }</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Maturity Date</td>
                                        <td className="data">
                                            <span>{items.Details.Maturity_Date ? moment(new Date(items.Details.Maturity_Date)).format("MM/DD/YY") : '-'}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Total Curr Due</td>
                                        <td className="data">
                                            <span>{ items.Details.Total_Curr_Due ? `$ ${items.Details.Total_Curr_Due}` : '-' }</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Total Past Due</td>
                                        <td className="data">
                                            <span>{ items.Details.Total_Past_Due ? `$ ${items.Details.Total_Past_Due} ` : '-' } </span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">Days Past Due</td>
                                        <td className="data">
                                            <span>{items.Details.Days_Past_Due || "-"}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="title">
                                            Next Principal Billing and Due Date
                                        </td>
                                        <td className="data">
                                            
                                                {
                                                   managePrinciDue(items)
                                                }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="payment-header">Payment History</div>
                        <div className="loan-table">
                            <table className="m-auto">
                                <thead>
                                    <tr>
                                        <th>Due Date</th>                                        
                                        <th>Payment Effective Date</th>
                                        <th>Description</th>                                        
                                        <th>Payment Method</th>
                                        <th>Amount Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    isPaymentHistoryLoading ?
                                    <tr className="">
                                        <td colSpan="5">
                                            <DivLoader />
                                        </td>
                                    </tr>
                                    :
                                    paymentHistoryData?.map((item, index) => {
                                        return (
                                            <tr key={ index }>
                                                <td className="data">
                                                    <span> { item.Date_Due ? moment(new Date(item.Date_Due)).format("DD-MMM-YYYY")  : "-" } </span>
                                                </td>
                                                <td className="data">
                                                    <span>{ item.Payment_Effective_Date ? (moment(new Date(item.Payment_Effective_Date)).format("DD-MMM-YYYY")  || "-") : '-' }</span>
                                                </td>                                                
                                                <td className="data">
                                                    <span> { item.Description || '-'} </span>
                                                </td>
                                                <td className="data">
                                                    <span>{ item.Payment_Method || 'NA' }</span>
                                                </td>                                                
                                                <td className="data">
                                                    <span>{ item.Amount_Paid ? `$ ${ item.Amount_Paid }` : "0" } </span>
                                                </td>
                                            </tr>       
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="buttons">
                        <div
                            className="btn-custom button-preapproval"
                            onClick={this.handleOpenLoanHistoryCommentBox}
                        >
                            COMMENT
                        </div>
                    </div> */}
                </>
            ) : (
                <div className="comment-div">
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
                                        onClick={this.handleOpenLoanHistoryCommentBox}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="default"
                                        className="custom-btn"
                                        onClick={this.handleOpenLoanHistoryCommentBox}
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
            )
        );
    }
}

export const managePrinciDue = (items) => {
    if(items.Details &&
        items.Details.Last_Payment_Amount !== 'NA' &&
        items.Details.Last_Payment_Date) {
            return <span>$ { items.Details.Last_Payment_Amount },  { items.Details.Last_Payment_Date ? moment(new Date(items.Details.Last_Payment_Date)).format("MM/DD/YY") : '-' }</span>
    } else if(items.Details &&
        items.Details.Last_Payment_Amount !== 'NA' &&
        !items.Details.Last_Payment_Date) {
            return <span>$ { items.Details.Last_Payment_Amount }, NA</span>
    } else if(items.Details &&
        !(items.Details.Last_Payment_Amount !== 'NA') &&
        items.Details.Last_Payment_Date) {
            return <span>NA,  { items.Details.Last_Payment_Date ? moment(new Date(items.Details.Last_Payment_Date)).format("MM/DD/YY") : '-' }</span>
    } else {
        return <span>-</span>
    }
} 
const mapStateToProps = (state) => ({
    customer: state.customers.selected,
});

export default connect(mapStateToProps, {
    sendPreapproval,
    changeCustomer,
})(CustomerLoadDetails);
