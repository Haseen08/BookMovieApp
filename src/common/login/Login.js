import React from "react";
import './Login.css'
import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core";
import MaterialUIForm from 'react-material-ui-form'
import Button from '@material-ui/core/Button';


const Login = (props) => {
   
    const { children } = props;


    const baseUrl = "/api/v1/auth";
    const handleSubmit = (formData) => {
        console.log('===formData==', formData)
        let data = btoa(formData.username+':'+formData.password);
        
      
          fetch(baseUrl + "/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Authorization: "Basic " + data,
            },
            body: data,
          })
            .then((response) => response.json())
            .then((data) => {
                console.log('=========props====', props)
                props.setIsOpen(false)
              console.log('=========sucesss====', data)
            });
        
    }

    const handleValuesChange = (data) =>{
        console.log('===data==', data)
    }

    const handleFieldValidations = (data) =>{
        console.log('===data==', data)
    }
    return (
        <div className="marginLeft">
             <MaterialUIForm onSubmit={handleSubmit} onValuesChange={handleValuesChange} onFieldValidation={handleFieldValidations}>
               <br />

                <TextField  value="" name="username" placeholder="Username*" required />
                <br /><br />
                <TextField  value="" name="password" placeholder="password*" required />
                <br /> 
                
                <div className="loginButton">
                    <Button variant="contained" color='primary' type="submit">LOGIN</Button>
                </div>

                </MaterialUIForm>
        </div>
    )
}

export default Login;