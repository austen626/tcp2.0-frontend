import styled from 'styled-components';

export const ApproveSubmitContainer = styled.div`
`;

export const ApproveSubmitInnerContainer = styled.div`
    display: flex;
    .cal-inner {
        flex: 1;
        margin-left: 10px;
    }
    .applience {
        flex: 1;
        .form-label {
            padding-left: 0px !important;
        }
    }
    //width: 50%;
    .react-datepicker-wrapper {
        width: 100%
    }
`;

export const CalendarContainer = styled.div`
    .calendar-approve {
        width: 100%;
        height: 41px !important;
        border: 1px solid rgb(58, 91, 119);
        border-radius: 3px;
        height: calc(1.5em + .75rem + 2px);

        ::-webkit-input-placeholder { /* WebKit browsers */
            padding-left: 10px
        }
        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            padding-left: 10px
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
            padding-left: 10px
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
            padding-left: 10px
        }
    }
`;

export const AgainRequestBlock = styled.div`
    text-align: center;
    padding-top: 0px;
    color: red;
    font-weight: bold;
`;

export const AdminProductCheckBlock = styled.div`
    width: 100%;
    .product-check-top {
        display: flex;
        align-items: center;
        p {
            margin-bottom: 0px;
            padding-right: 5px;
            label {
                margin-bottom: 0px;
            }
        }
        .product-check-left {
            width: 80px;
        }
        label {
            width: 50px;
        }
    }
    .no-padding {
        padding-left: 0px;
        padding-right: 0px;
    }
    .text-error {
        color: #d63232;
        margin-top: 10px;
        margin-bottom: 0px;
    }
    .applience {
        flex: 1;
        width: 65%;
    }
    .react-datepicker-wrapper {
        width: 65%;
    }
    label.form-label {
        padding-left: 0px !important;
    }
`;