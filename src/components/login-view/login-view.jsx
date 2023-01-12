import React from "react";
import {useState} from "react";
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';



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
        <Form onSubmit = {handleSubmit}>
            <h3>Login here </h3>
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
            </Form.Group>
            <Button variant ="primary" type="submit"> Submit </Button>
        </Form>
    )
};
        
        
        
        
        
        
        
        
    
    
