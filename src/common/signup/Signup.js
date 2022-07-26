import { FormControl, FormHelperText, Input, InputLabel, TextField } from "@material-ui/core";
import React from "react";
import MaterialUIForm from 'react-material-ui-form'
import Button from '@material-ui/core/Button';

const Signup = (props) => {
   
    const baseUrl = "/api/v1/";
    const handleSubmit = (formData) => {
        let data = JSON.stringify({
            email_address: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            mobile_number: formData.contact,
            password: formData.password,
          });
      
          fetch(baseUrl + "signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-cache",
              Authorization: "Bearer " + sessionStorage.getItem("access-token"),
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

                <TextField  value="" name="firstName" placeholder="First Name*" required />
                <br /><br />

                <TextField  value="" name="lastName" placeholder="Last Name*" required />
                <br /><br />

                <TextField  value="" type="email"  name="email" placeholder="Email*" required />
                <br /><br />

                <TextField  value="" name="password" placeholder="password*" required />
                <br /> <br />

                <TextField  value="" name="contact" placeholder="Contact No*" required />
                <br />
                
                <div className="loginButton">
                    <Button variant="contained" color='primary' type="submit">REGISTER</Button>
                </div>

                </MaterialUIForm>
        </div>
    )
}

export default Signup;