import styled from 'styled-components';
import { IconMetroCalendar } from '../../assets/images';
export const ApplicationDeliveryBox = styled.div`
    .calendar-application {
        background: url(${IconMetroCalendar});
        background-repeat: no-repeat;
        background-position: right 10px center;
        background-size: 20px;
        text-align: left !important;
        width: 150px !important;
        // margin-left: 15px !important;
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        border: 1px solid #bce0fd !important;
        background-color: #fff !important;
        color: #3a5b77 !important;
        padding-left: 10px!important;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.71;
        cursor: pointers;
    }
    .calendar-application:focus {
        outline: 0 !important;;
        box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25) !important;
    }
    .calendar-application::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #3a5b77;
        line-height: normal !important; 
        opacity: 1; /* Firefox */
    }
      
    .calendar-application:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #3a5b77;
    }
      
    .calendar-application::-ms-input-placeholder { /* Microsoft Edge */
        color: #3a5b77;
    }

    .react-datepicker .react-datepicker__navigation {
        background: none;
        line-height: 1.7rem;
        text-align: center;
        cursor: pointer;
        position: absolute;
        top: 10px;
        padding: 0;
        border: 0.45rem solid transparent;
        z-index: 1;
        height: 10px;
        width: 10px;
        text-indent: -999em;
        overflow: hidden;
    }    
    .react-datepicker__navigation--next {
        right: 10px;
        border-left-color: #ccc!important;
    }
    .react-datepicker__navigation--next:focus {
        outline: unset;
    }
    .react-datepicker__navigation--previous {
        left: 10px;
        border-left-color: #ccc!important;
    }
    .react-datepicker__navigation--next:focus {
        outline: unset;
    }
    .react-datepicker__time-name {
        font-weight: normal!important;
    }
`;

export const TrashContainer = styled.div`
    border-radius: 50%;
    width: ${props => props.width ? props.width : '39px'};
    height: ${props => props.width ? props.width : '39px'};
    background: #c1c1c1;;
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    img {
        height: ${props => props.imageHeight ? props.imageHeight : '21px'};
    }
`
export const HistoryDivLoader = styled.div`
    position: absolute;
    left: 50%;
    top: 50% 
`;

export const CustomerHistoryNoFound = styled.div`
    .no-found-history {
        min-height: calc(100vh - 420px);
    }  
`;

export const ReminderButton = styled.button`
    width: 27px;
    height: 27px;
    border: 0px;
    background: transparent;
    &:focus {
        outline: 0;
    }
    img {
        width: 100%
    }
`;