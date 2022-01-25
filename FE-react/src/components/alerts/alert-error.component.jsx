import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

const AlertError = props => {
    const { error, onClose } = props;

    return <Alert severity="error" onClose={onClose}>
        <AlertTitle>Error</AlertTitle>
        {error.message}
    </Alert>
}

export default AlertError;