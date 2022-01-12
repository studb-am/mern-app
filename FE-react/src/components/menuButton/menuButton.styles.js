import React from 'react';
import { theme } from '../../assets/util';
import { styled } from '@mui/material/styles';

const StyledButton = styled('button')`
    padding: 10px;
    background-color: ${theme.palette.primary.main};
    border: 0;
    color: white;
    &:hover {
        background-color: ${theme.palette.primary.dark};
        color: ${theme.palette.secondary.main};
    }
    &:focus, &:active {
        background-color: ${theme.palette.primary.dark};
        color: ${theme.palette.secondary.main};
    }
`;

export default StyledButton;