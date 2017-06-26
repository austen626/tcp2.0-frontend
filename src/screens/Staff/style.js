import styled from 'styled-components';
export const ExpandedWhiteDiv = styled.div`
    position: relative;
    background: #fff;
    color: #3a5b77;
    .expand-row {
        border-bottom: 1px solid #bce0fd;
    }
    .expand-single-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 60px;
        padding: 20px 25%;
        @media screen and (max-width:570px){
            padding: 20px 6%;
        }
    }
    .info {
        font-size: 16px;
        font-weight: 600;
        line-height: 1.21;
        color: #3a5b77;
    }
    .arrow-icon {
        height: 12px;
        padding: 6px;
        width: 25px;
        height: 25px;
        border-radius: 20px;
        cursor: pointer;
        fill: #3a5b77;
    }
    .arrow-icon:active,
    .arrow-icon:hover,
    .arrow-icon-active {
        background: #309e87;
        padding: 6px;
        width: 25px;
        height: 25px;
        border-radius: 20px;
        transform: rotate(90deg);
        transition-duration: .2s;
        fill: #fff;
    }
`;

export const ExpandFullView = styled.div`
    background-color: #f1f9ff;
    display: flex;
    justify-content: space-evenly;
    // align-items: center;
    padding-left: 15%;
    padding-right: 15%;
    height: 120px;    
    .avatar-section {
        width: 65px;
        height: 65px;
        border-radius: 50%;
        border: 8px solid #fff;
        overflow: hidden;
        img {
            width: 100%;
        }
    }
    .green-primary-btn {
        width: 130px;
        font-size: 11px;
    }
    .exapand-mail-section {
        padding: 20px 0px;
        color: #3a5b77;
        .expand-mail-text {
            color: #3a5b77;
            font-family: 'Lato';
            font-weight: normal;
        }
       
    }
    .expand-btn-section {
        margin-top: 30px;
    }
    @media screen and (max-width:570px){
        padding-left: 0%;
        padding-right: 0%;
    }
    @media only screen and (max-width: 400px) and (min-width: 320px)  {
        padding-left: 3%;
        padding-right: 3%;
        height: 140px;
        .expand-mail-text {
            font-size: 15px;
        }
    }
`;

export const ModayBodyContainer = styled.div`
    padding: 0px 40px;
    @media only screen and (max-width: 400px) and (min-width: 320px)  {
        padding: 0px 5px;
    }
`;

export const StaffContainer = styled.div`
    .preapproval-main {
        background: #fff;
    }
`;

export const InviteTypeWrap = styled.div`
    display: flex;
    justify-content: space-between;
    .radio-style  {
        position: relative;
        margin-bottom: 10px;
    }
    
    .radio-style input[type="radio"] {
        cursor: pointer;
        height: 100%;
        left: 0;
        margin: 0;
        opacity: 0;
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 1;
    }
    
    .radio-style label {margin-left: 5px;}
    
    .radio-style label:before,
    .radio-style label:after {
        content: "";
        display: block;
        position: absolute;
    }
    
    .radio-style label:before {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 50%;
        height: 20px;
        left: 0;
        top: 4px;
        width: 20px;
    }
    
    .radio-style label:after {
        background: #009e87;
        border-radius: 50%;
        height: 12px;
        left: 4px;
        opacity: 0;
        pointer-events: none;
        top: 8px;
        width: 12px;
    }
    
    .radio-style input:checked ~ label:after {opacity: 1;}
    
    
    input[type="radio"]:checked + label:before {
        border: 1px solid #009e87;
        box-shadow: inset 0 0 0 1px #fff, inset 0 0 0 0 #fff, inset 0 0 0 16px #fff;
        color: #fff;
    }
`;