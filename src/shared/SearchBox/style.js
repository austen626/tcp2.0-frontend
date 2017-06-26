import styled from 'styled-components';

export const SearchBoxContainer = styled.div`
    position: relative;
    #header {
        height: 50px;
        background-color: #3a5b77;
        padding-top: 13px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;        
        text-align: center;
        span {
            padding-top: 20px;
            color: white;
        }
        #icon {
            position: absolute;
            top: 12px;
            right: 15px;
            width: 25px;
            height: 25px;
            cursor: pointer;
        }
    }
    #form {
        height: 178px;
        background-color: #c8e0ed;
        font-family: Lato;
        padding: 5px 15px;
        text-align: left;
        font-size: 12px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        .mb-18 {
            margin-bottom: 18px;
        }
        .form-label {
            font-size: 14px;
            font-weight: bold;
            color: #3a5b77;
            margin-bottom: 0px;
            padding-left: 5px;
        }
    }
`;

export const ErrorBox = styled.div`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 2px;
    padding-left: 5px;
    min-height: 20px;
`;