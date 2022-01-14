import React from "react";
import StyledButton from "./menuButton.styles";

const MenuButton = props => {
    return <StyledButton {...props}>{props.children}</StyledButton>
}

export default MenuButton;