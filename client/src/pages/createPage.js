import React,{useState, useEffect, useContext} from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const{request} = useHttp()
    const [link,setlink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    },[])
    const pressHendler =async event => {
        if(event.key === 'Enter') {
            try {
                debugger
               const data = await request("/api/links/generate",'POST',{from: link},{Authorization: `Bearer ${auth.token}`})
               console.log(data)
            } catch (error) {
                
            }
        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
          <input 
          placeholder="Attach reference" 
          id="link" 
          name="email"
          onChange={e => setlink(e.target.value)}
          value={link}
          onKeyPress={pressHendler}
          />
          <label htmlFor="email">Enter Reference</label>
        </div>
            </div>
        </div>
    )
}