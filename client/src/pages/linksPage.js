import React, { useState, useContext, useCallback, useEffect } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";
import { Loader } from "../components/loader";
import { LinksList } from "../components/linkList";


export const LinksPage = () => {
    const [links,setLinks] = useState([])
    const {loading,request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async()=> {
        try {
            const fetched = await request('/api/links',"GET",null,{
                Authorization: token
            })
            setLinks(fetched)
        } catch (error) {
            
        }
    },[token,request])

    useEffect(()=>{
        fetchLinks()
    },[fetchLinks])

    if (loading) {
        return(
            <Loader/>
        )
    }
    return(
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
}