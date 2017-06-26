import styled from 'styled-components';

export const FormFieldsContainer = styled.div`
    .responsive-width {
        width: auto
    }
    @media screen and (max-width:767px){
        .container {
            padding-bottom: 25px!important;
        }
    }
    .footer {
        @media screen and (max-width:767px){
            height: max-content;
            position: unset;
        }
    }
`;

export const PrefilledFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    .button {
        font-size: 15px;
    }
    @media screen and (max-width:1099px) and (min-width:992px){
        .button {
            font-size: 15px;
            width: max-content;
        }
    }
    @media screen and (max-width:991px) {
        .button {
            font-size: 15px;
            width: max-content;
        }
    }
    @media screen and (max-width:767px){
        flex-direction: column;
        .button {
            margin-bottom: 10px !important;
            width: 220px !important;
        }
    }
`;
