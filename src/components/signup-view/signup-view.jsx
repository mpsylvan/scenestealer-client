import React from 'react';
import { useState } from "react";


export const SignupView = ({onLoggedIn})=>{
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
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            if(response.ok){
                console.log("200");
                onLoggedIn(username);
            }else{
                console.log("login fail")
                onLoggedIn(username);
            }
        })
        ;
    };

    return(
        <>
            <h3>Sign up here: </h3>
            <form onSubmit = {handleSubmit}>
                <label>Email:  </label>
                <input 
                    type="email" 
                    value = {email}
                    onChange = {(e)=>{setEmail(e.target.value)}}
                />
                
                <label>Username: </label>
                <input 
                    type="text"
                    value = {username}
                    onChange = {(e)=>{setUsername(e.target.value)}}
                    
                />
                
                <label> Password: </label>
                <input 
                    type="password"
                    value = {password}
                    onChange = {(e)=>{setPassword(e.target.value)}} 
                />
                
                <label> Birthday: </label>
                <input 
                    type="date"
                    value = {birthdate}
                    onChange = {(e)=>{setBirthdate(e.target.value)}} 
                />
                <button type="submit"> Submit </button>
                </form>
            
        </>
    )
}