import React from 'react';
import styled, { css } from 'styled-components';

export const Input = styled.input`
    border-radius: 18px;
    border: 2px solid #4b6f8b;
    background-color: #1e2c35;
    height: 35px;
    padding: 8.4px 21px;
    font-size: 14px;
    line-height: 1.2;
    color: white;

    &::placeholder {
        color: #3a5b77;
    }
    &:-ms-input-placeholder {
        color: #3a5b77;
    }
    &::-ms-input-placeholder {
        color: #3a5b77;
    }

    width: 100%;
    max-width: 526px;
`;
