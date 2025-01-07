'use client'
import {getSession} from "@/lib/authentication";
import { useEffect, useState } from "react";
// Funcion de abstraer las peticiones
export function useFetch(URL) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dataResponse, setDataResponse] = useState(null);
    useEffect(()=>{
        async function fetchData() {
            try {
                const session = await getSession();
                const response = session ? await fetch(URL, {
                    headers : {
                        'Content-Type' : 'application/json',
                        'Authorization' : `Bearer ${session?.user?.access_token}`
                    },
                    mode : 'cors'
                }) : await fetch(URL);
                if (!response.ok) {
                    const jsonResponse = await response.json();
                    setError(jsonResponse);
                    return;
                };
                const jsonResponse = await response.json();
                setDataResponse(jsonResponse)
                
            } catch (err) {
                setError(err);
            }finally{
                setLoading(false)
            }
        }
        fetchData();
    },[]);
    return {dataResponse, loading, error}
}