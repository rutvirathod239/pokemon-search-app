import axios from "axios";
import { useState, useEffect } from "react";

const useFetchData = (url) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                const result = response.data;
                setData(result);
                
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        
        fetchData();
    }, [url]);

    return { data, loading, error };
}
export default useFetchData;