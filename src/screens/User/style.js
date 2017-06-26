import styled from 'styled-components';

export const PasswordContainer = styled.div`
    text-align: right;
    position: relative;
    .password-eye {
        width: 44px;
        height: 22px;
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 10px;
        img {
            max-width:100%;
            max-height:100%;
            object-fit: contain
        }
    }
`;