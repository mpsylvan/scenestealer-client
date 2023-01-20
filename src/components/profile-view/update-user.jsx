import React from "react";
import {useState} from 'react';
import {Form, Button} from 'react-bootstrap';

export const UpdateUser = ({handleSubmit}) => {
    
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[birthdate, setBirthdate] = useState("");
    

    return (
        <>
        
            <h4>Update your Profile</h4>
            <Form onSubmit={ (e) => handleSubmit(e)}>
                <Form.Group>
                    <Form.Label className="m-1">Username</Form.Label>
                    <Form.Control
                        type = "text"
                        value = {username}
                        onChange = {(e)=>{setUsername(e.target.value)}} 
                        />
                        
                </Form.Group>
                <Form.Group>
                    <Form.Label className="m-1">Email</Form.Label>
                    <Form.Control
                        type = "text"
                        value = {email}
                        onChange = {(e)=>{setEmail(e.target.value)}} 
                    />
                    
                </Form.Group>
                <Form.Group>
                    <Form.Label className="m-1">Password</Form.Label>
                    <Form.Control
                        type = "password"
                        value = {password}
                        onChange = {(e)=>{setPassword(e.target.value)}} 
                    />
                    
                </Form.Group>
                <Form.Group>
                    <Form.Label className="m-1">Birthday</Form.Label>
                    <Form.Control
                        type = "date"
                        value = {birthdate}
                        onChange = {(e)=>{setBirthdate(e.target.value)}} 
                    />
                    
                </Form.Group>
                <Button type="submit" variant="info" className ="mt-2">Update</Button>
            </Form>
        </>
    )
}