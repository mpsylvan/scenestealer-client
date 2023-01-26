import React from "react";
import {useState} from "react";
import {Form} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/users/user";
import { setToken} from "../../redux/reducers/users/token";



export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const user = useSelector((state)=>state.user);
    const token = useSelector((state)=>state.token);
    const dispatch = useDispatch();


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
            body: JSON.stringify(data)
        }).then((response)=>response.json())
          .then((data)=>{
            if(data.user){
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                dispatch(setUser(data.user));
                dispatch(setToken(data.token));
                
            }else{
                alert('could not find such a user')
            }
        }).catch((e)=>{
            console.log(e);
            alert('an error occured')
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
        
        
        
        
        
        
        
        
    
    
