import { useState, useEffect, useCallback, useRef } from 'react';

let activeHttpRequests;

const getAllActiveHttpRequests = () => activeHttpRequests.current;
const useStartActiveRequestsArray = () => {
    activeHttpRequests = useRef([]);
}
const resetActiveRequestsArray = () => activeHttpRequests.current = [];
const addActiveHttpRequests = (currentRequest) => {
    activeHttpRequests.current.push(currentRequest);
}
const removeCurrentRequest = (currentRequest) => {
    activeHttpRequests.current = activeHttpRequests.current.filter(
        reqCtrl => reqCtrl !== currentRequest
    );
}

//definisco la funzione da richiamare all'interno delle funzioni di export
const fetchBase = async (state) => {

    const { setLoading, setError, url, method, headers, body } = state;

    try {
        setLoading(true);
        const httpAbortCtrl = new AbortController();
        addActiveHttpRequests(httpAbortCtrl);

        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: body
        });
        const data = await response.json();
       

        if (!response.ok) {
            const newErr = new Error(data.message || 'An unexpected error occured. Please try again later!');
            setError(newErr);
            throw newErr;
        }
        removeCurrentRequest(httpAbortCtrl);
        return data;
    } catch (err) {
        setError(err);
        throw err;
    } finally {
        setLoading(false);
    }
}

export const useFetchData = (url, body=null, method = 'GET', headers = {}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useStartActiveRequestsArray();

    const clearError = () => {
        setError(null);
    }

    const fetchRequest = useCallback(() => fetchBase({ setLoading, setError, url, method, headers, body }), []);

    useEffect(() => {
        fetchRequest()
            .then(currData => setData(currData));
    }, [fetchRequest]);

    useEffect(() => {
        return () => {
            getAllActiveHttpRequests().forEach(abortCtrl => abortCtrl.abort());
            resetActiveRequestsArray();
        }
    }, []);

    return { data, loading, error, clearError };
}

export const useMutateData = (method = 'POST', headers = { 'Content-Type': 'application/json' }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useStartActiveRequestsArray();

    const clearError = () => {
        setError(null);
    }

    const mutateData = useCallback((variables) => fetchBase({ setLoading, setError, method, headers, ...variables }), []);
    
    useEffect(() => {
        return () => {
            getAllActiveHttpRequests().forEach(abortCtrl => abortCtrl.abort());
            resetActiveRequestsArray();
        }
    }, []);

    return [mutateData, { loading, error, clearError }];

}