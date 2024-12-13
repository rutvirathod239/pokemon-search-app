import axios from "axios";
import { useState, useEffect } from "react";
import { fetchPokemonList } from "../utils/utils";

const useFetchDetailData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filteredDetails = await fetchPokemonList(url);
                setData(filteredDetails);                
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
export default useFetchDetailData;