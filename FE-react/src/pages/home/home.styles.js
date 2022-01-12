import React from "react";
import { styled } from "@mui/material/styles";
import {Box} from '@mui/material';

const CustomBox = styled(Box)`
    background-color: blue;
    margin-top: 14px;
    color: red;
    &:hover {
        background-color: green;
        color: yellow;
    }
`;

export const StyledBox = props => {
    return <CustomBox sx={{width: 200}}>
        {props.children}
    </CustomBox>
};