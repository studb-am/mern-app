import { styled } from "@mui/material/styles";
import { Card, CardHeader } from "@mui/material";

import { theme } from '../../assets/util';

export const StyledCard = styled(Card)`
    width: ${props => props.isMobileView ? '90%' : '60%'};
    height: 60%;
    margin-left: ${props => props.isMobileView ? '5%' : '20%'};
    margin-top: 15%;
    box-shadow: 24;
`;

export const StyledCardHeader = styled(CardHeader)`
    background-color: ${theme.palette.primary.main};
    color: ${theme.palette.neutral.main};
`;