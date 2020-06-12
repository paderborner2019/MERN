import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/authContext";



export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,error,request, clearError} = useHttp()
    const [form,setForm] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error,message,clearError])
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const registeHandler = async() => {
        try {
            const data = await request('api/auth/register',"POST", {...form})
           console.log(data)
        } catch (error) {
            
        }
    }

    const loginHandler = async() => {
        try {
            debugger
            const data = await request('api/auth/logIn',"POST", {...form})
            auth.login(data.token,data.userId)
            if (data.message) {
                message(data.message)
            }
        } catch (error) {
            
        }
    }
    

    return(
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shortcut Reference</h1>
                <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
        </div>
        <div>
        <div className="input-field">
          <input 
          placeholder="Enter email" 
          id="email" 
          type="text"
          name="email"
          className="yellow-input"
          value={form.email}
          onChange={changeHandler}
          />
          <label htmlFor="email">Enter Email</label>
        </div>

        <div className="input-field">
          <input 
          placeholder="Enter password" 
          id="password" 
          type="text" 
          name="password"
          className="yellow-input"
          value={form.password}
          onChange={changeHandler}
          />
          <label htmlFor="email">Password</label>
        </div>
        </div>
        <div className="card-action">
            <button className="btn yellow darken-4" style={{marginRight:10}} onClick={loginHandler}>Enter</button>
            <button className="btn grey lighten-1 black-text" onClick={registeHandler}>Registration</button>
        </div>
      </div>
            </div>
        </div>
    )
}