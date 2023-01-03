import React from "react";
import {useState} from "react";



export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        // prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        // sample data to test another login flow via open library
        // const libData = {
        //     access: username, //167OLdP5BUfLZGxP
        //     secret: password //K39eKYhPMV9DDWhJ
        // };

        const data = {
            Username: username,
            Password: password
        }

        // testing request for troubleshooting
        // fetch("https://openlibrary.org/account/login.json", {
        // method: "POST",
        // body: JSON.stringify(libData)
        // }).then((response)=>{
        //     if(response.ok){
        //         onLoggedIn(username)
        //     }else{
        //         alert('library login failed')
        //     }
        // });

        fetch("https://scenestealer.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data)
        }).then((response)=>{
            if(response.ok){
                onLoggedIn(username);
            }else{
                alert('movie login failed')
                // onLoggedIn(username);
            }
        });
  };

  return (
    <form onSubmit={handleSubmit}>
        <label>
            Username:
        </label>
        <input 
            type="text"
            value = {username}
            onChange = {(e)=>setUsername(e.target.value)}
            required
            />
        <label>
            Password:
        </label>
        <input 
            type="password"
            value = {password}
            onChange = {(e)=>setPassword(e.target.value)}
            required
            />
        <button type="submit">
            Submit
        </button>
    </form>
  );
};