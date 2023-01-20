import React from 'react';
import { useState } from "react";
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


export const SignupView = ({})=>{
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[birthdate, setBirthdate] = useState("");

    const handleSubmit = (event)=>{

        event.preventDefault();

        const data  = {
            Username: username, 
            Email: email,
            Password: password, 
            Birthdate: birthdate
        }

        fetch("https://scenestealer.herokuapp.com/users", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        }).then((response)=>{
            if(response.ok){
                console.log("success");
                alert("signup successful");
                window.location.reload();
                // onLoggedIn(username);
            }else{
                alert("singnup failed")
                console.log("signup fail")
                // onLoggedIn(username);
            }
        })
        ;
    };

    return(
        <Form onSubmit = {handleSubmit}>
            <h3>Sign up here </h3>
            <Form.Group className='form-group'>
                <Form.Label>
                    Username: 
                </Form.Label>
                <Form.Control
                    type = "text"
                    value = {username}
                    onChange = {(e)=>{setUsername(e.target.value)}} 
                />
            </Form.Group>
            <Form.Group className='form-group'>
                <Form.Label>
                    Password: 
                </Form.Label>
                <Form.Control
                    type = "password"
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}} 
                />
            </Form.Group >
            <Form.Group className='form-group' >
                <Form.Label>
                    Email: 
                </Form.Label>
                <Form.Control
                    type = "text"
                    value = {email}
                    onChange = {(e)=>{setEmail(e.target.value)}} 
                />
            </Form.Group>
            <Form.Group className='form-group'>
                <Form.Label>
                    Birthday: 
                </Form.Label>
                <Form.Control
                    type = "date"
                    value = {birthdate}
                    onChange = {(e)=>{setBirthdate(e.target.value)}} 
                />
            </Form.Group>
            <Button variant ="info" type="submit"> Submit </Button>
        </Form>
    )
}