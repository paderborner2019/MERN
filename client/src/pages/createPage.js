import React,{useState, useEffect, useContext} from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const{request} = useHttp()
    const [link,setlink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    },[])
    const pressHendler =async event => {
        if(event.key === 'Enter') {
            try {
               const data = await request("/api/links/generate",'POST',{from: link},{Authorization: `${auth.token}`})
               history.push(`/detail/${data.link._id}`)
            } catch (error) {
                
            }

        }
    }

    return(
        <div className="row">
            <div className="col s8 offset-s2" style={{paddingTop: '2rem'}}>
            <div className="input-field">
          <input 
          placeholder="Enter Reference" 
          id="link" 
          name="email"
          onChange={e => setlink(e.target.value)}
          value={link}
          onKeyPress={pressHendler}
          />
          {/* <label htmlFor="email">Enter Reference</label> */}
        </div>
            </div>
        </div>
    )
}