import React from 'react';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import {Button, Card, Figure, Form} from 'react-bootstrap';
import {Container, Row, Col} from 'react-bootstrap';
import {UserInfo} from "./user-info";
import { FavoritesView } from './favorite-movies'; // I"LL DEAL WITH YOU LATER !
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../../redux/reducers/users/user";




export const ProfileView = ()=>{
    
    const[username, setUsername] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[birthdate, setBirthdate] = useState("");

    const movies = useSelector((state) => state.movies.list);
    const user = useSelector((state)=>state.user.user);
    
    const dispatch = useDispatch();
    

    const favMovies = movies.filter((movie) => user.FavoriteMovies.includes(movie.key));


    
    const removeFav = (id) => {
            fetch(`https://scenestealer.herokuapp.com/users/${user.Username}/favorites/${id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, 
                        "Content-Type": "application/json",
                    },
                }  
            ).then((response)=> response.json())
            .then((data)=>{
                if(data.newUser){
                    localStorage.setItem('user', JSON.stringify(data.newUser));
                    dispatch(setUser(data.newUser));
                }else{
                    alert('there was an issue removing film.')
                }
            }).catch((e)=>console.log(e));
        }
    
    const handleUserUpdate = (e)=>{
        
        e.preventDefault();
        
        const data  = {
            Username: username, 
            Email: email,
            Password: password, 
            Birthdate: birthdate
        }

        fetch(`https://scenestealer.herokuapp.com/users/${user.Username}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                Authorization : `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        }).then((response)=>response.json())
        .then((data)=>{
            if(data.newUser){
                localStorage.setItem("user", JSON.stringify(data.newUser));
                alert('Update successful')
                dispatch(setUser(data.newUser));
            }else{
                alert(`Unable to process user update, please double check your info`)
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
    
    
    const handleDeregister = (username) =>{
        let choice  = prompt('Are you sure you want to deregister? You will be logged out of SceneStealer and need to re-register. Enter your USERNAME below to deregister.')
        console.log(choice);
        if(!choice){
            return;
        }
        if(choice !== username){
            alert('no deregistration occured.');
            return; 
        }else{
            fetch(`https://scenestealer.herokuapp.com/users/${username}`, {
                method: "DELETE", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            }).then((response)=>{
                if(response.ok){
                    localStorage.clear();
                    alert('account was deregistered.')
                    window.location.reload();
                }
                else{
                    alert('we were unable to process the deregister.')
                }
            }).catch((e)=>{
                console.log(e);
            })
        }
    };
    
    return (
        <Container>
            <Row style={{justifyContent:"center"}}>
                <Col  className="mb-100" md ={12}>
                    <h3>Your Scene Stealer Profile</h3>
                </Col>
            </Row>
            <Row style={{alignItems:"center"}}>
                <Col xs={12} sm={4}>
                    <Card style={{ border: "none", borderRadius: "5px", boxShadow: "1px 1px 10px 2px"}}>
                        <Card.Body>
                             <Col  className="mb-100" md ={12}>
                                <h4>User Info: </h4>
                            </Col>
                            <UserInfo 
                                username={user.Username}
                                email = {user.Email}
                                handleDeregister = {handleDeregister}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={12} sm={8}>
            <Card style={{ border: "none", borderRadius: "5px", boxShadow: "1px 1px 10px 2px"}}>
                
                <Card.Body>
                    <h4>Update your Profile:</h4>
                    <Form onSubmit={ (e) => handleUserUpdate(e)}>
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
            </Card.Body>
        </Card>
                </Col>
            </Row>
            <>
                <Row>
                    <Col xs={12}>
                        <h3> Your Favorites </h3>
                    </Col>
                    <FavoritesView 
                        favMovies={favMovies}
                        removeFav = {removeFav}
                    />
                </Row>
                
            </>
        </Container>
    )
};
