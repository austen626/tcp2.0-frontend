import styled from 'styled-components';

export const FormFieldsContainer = styled.div``;

export const SearchFieldContainer = styled.div`
    margin-top: 165px!important;
    @media screen and (max-width:570px){
        margin-top: 120px!important;
    }
    @media screen and (max-width: 320px) {
        margin-top: 80px!important;
    }
`;

export const CancelFormContainer = styled.div`
    text-align: right;
    font-size: 18px;
    color: white;
    cursor: pointer;
`;