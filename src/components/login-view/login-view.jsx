import React from "react";
import {useState} from "react";



export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        // prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const data = {
            Username: username,
            Password: password
        }

        
        
        fetch("https://scenestealer.herokuapp.com/login", {
            method: "POST",
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response)=> response.json())
        .then((data)=>{
            console.log('Login Response :', data);
            if(data.user){
                onLoggedIn(data.user, data.token);
            }else{
                alert('could not find such a user')
            }
        }).catch((e)=>{
            console.log(e);
            alert('an error occured')
        })

        
  };




  return (
    <>
        <h3>Login here: </h3>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
            </label>
            <input 
                type="text"
                value = {username}
                onChange = {(e)=>{setUsername(e.target.value)}}
                required
                />
            <label>
                Password:
            </label>
            <input 
                type="password"
                value = {password}
                onChange = {(e)=>{setPassword(e.target.value)}}
                required
                />
            <button type="submit">
                Submit
            </button>
        </form>
        
    
    </>
  );
};