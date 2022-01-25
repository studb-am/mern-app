import { useState, useEffect, useCallback, useRef } from 'react';

export const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const activeHttpRequests = useRef([]);

    const fetchRequest = useCallback(async (url, method = 'GET', headers = {}, body = null) => {
        try {
            setLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
    
            const response = await fetch(url, {
                method: method,
                headers: headers,
                body: body
            });
            const data = await response.json();
            activeHttpRequests.current = activeHttpRequests.current.filter(
                reqCtrl => reqCtrl !== httpAbortCtrl
            );
    
            if (!response.ok) {
                const newErr = new Error(data.message || 'An unexpected error occured. Please try again later!');
                setError(newErr);
                throw newErr;
            }
            return data;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    },[])

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
            activeHttpRequests.current = [];
        }
    }, [])

    return { fetchRequest, loading, error, clearError };
}