import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const Loading = props => {
    const { loading } = props;

    return <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
    >     <CircularProgress color="inherit" />
    </Backdrop>
}

export default Loading;