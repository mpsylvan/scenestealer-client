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
            body: JSON.stringify(data)
        }).then((response)=>response.json())
          .then((data)=>{
            console.log(data)
            if(data.user){
                localStorage.setItem("user", JSON.stringify(data.user))
                localStorage.setItem("token", JSON.stringify(data.token))
                onLoggedIn(data.user, data.token);
            }else{
                alert('no such user');
            }
          })
            .catch((e)=>{
                console.log(e);
                alert('something went wrong');
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