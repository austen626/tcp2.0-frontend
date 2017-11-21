import styled from 'styled-components';

export const ApproveSubmitContainer = styled.div``;

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
        width: 100%;
    }
`;

export const CalendarContainer = styled.div`
    .calendar-approve {
        width: 100%;
        height: 41px !important;
        border: 1px solid rgb(58, 91, 119);
        border-radius: 3px;
        height: calc(1.5em + 0.75rem + 2px);

        ::-webkit-input-placeholder {
            /* WebKit browsers */
            padding-left: 10px;
        }
        :-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            padding-left: 10px;
        }
        ::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            padding-left: 10px;
        }
        :-ms-input-placeholder {
            /* Internet Explorer 10+ */
            padding-left: 10px;
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

export const SliderContainer = styled.div`
    display: flex;
    background-color: #273947;
    width: 100%;
    border-radius: 25px;
    max-width: 350px;
`;

export const SliderItem = styled.div`
    position: relative;
    border-radius: 25px;
    cursor: pointer;
    text-align: center;
    padding: 5px;
    user-select: none;
    .slider-item--left {
        position: absolute;
        top: 3px;
        left: 3px;
    }

    .slider-item--right {
        position: absolute;
        top: 3px;
        right: 3px;
    }

    .badge-icon {
        border-radius: 25px;
        text-align: center;
        background-color: #6793b7;
        color: white;
        display: inline-block;
        line-height: 28px;
        width: 28px;
        height: 28px;
    }

    ${({ active }) =>
        active &&
        `
    background: #009e87;
    
    .badge-icon {
        background: #008770;
    }
  `}
`;

export const StyledMenu = styled.nav`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: ${({ theme }) => theme.primaryLight};
    height: 100vh;
    text-align: left;
    padding: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    transition: transform 0.3s ease-in-out;

    @media (max-width: ${({ theme }) => theme.mobile}) {
        width: 100%;
    }

    a {
        font-size: 2rem;
        text-transform: uppercase;
        padding: 2rem 0;
        font-weight: bold;
        letter-spacing: 0.5rem;
        color: ${({ theme }) => theme.primaryDark};
        text-decoration: none;
        transition: color 0.3s linear;

        @media (max-width: ${({ theme }) => theme.mobile}) {
            font-size: 1.5rem;
            text-align: center;
        }

        &:hover {
            color: ${({ theme }) => theme.primaryHover};
        }
    }
`;

export const CircledImageButton = styled.span`
    display: inline-block;
    padding: 3px 6px;
    border-radius: 20px;
    ${({ active }) =>
        active &&
        `
    background: #009d86;
    `}
`;

export const TierSelect = styled.span`
    label {
        line-height: 12px;
    }
    .input-holder {
        margin-left: 8px;
        display: inline-block;
    }
    .dropdown select {
        background-size: 28px !important;
        height: 30px !important;
        font-size: 14px;
        padding: 2px 15px;
        width: 70px;
    }
`;

export const StatusText = styled.span`
    color: #b2d8f7;
`;
export const StatusChoice = styled.span`
    line-height: 22px;
    ${StatusText} {
        margin-left: 8px;
    }
`;
