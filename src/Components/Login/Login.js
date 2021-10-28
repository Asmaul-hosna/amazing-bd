import React from 'react';
import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import './Login.css';

firebase.initializeApp(firebaseConfig);


// Google signIn
const Login = () => {
    const[newUser,setNewUser] = useState(false);
    const [user,setUser]= useState({
        isSignedIn:false,
        newUser:false,
        name:"",
        email:"",
        password:"",
        photo:""
    });

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || {from:{ pathname:"/"} };


   
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        const handleSignIn=()=>{
         firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName,photoURL,email} = res.user;
            const signedInUser ={
                isSignedIn: true,
                name:displayName, 
                email:email,
                photo:photoURL
            }
            setUser (signedInUser);
            console.log(displayName,photoURL,email);
        })
        
        .catch(err =>{
            console.log(err);
            console.log(err.message);
        })
    }
    
     
//Google signOut 
 
 const handleSignOut =()=>{
   firebase.auth().signOut()
     .then(res => {
         const signedOutUser ={
             isSignedIn:false,
             name:"",
             email:"",
             photo:"",
             error:"",
             success:false
         }
        setUser (signedOutUser);
     })
     .catch(err =>{
         
     });
    }
    
    // email & pasword change
      
    const handleBlur =(e) =>{
        let isFieldValid = true;
        if(e.target.name === 'email'){
         isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
      
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }


    }
  
    // email & password form submit
    const handleSubmit = (e) => {
        // console.log(user.email, user.password) 
      if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((res) => {
                console.log(res);
              const newUserInfo = {...user};
              newUserInfo.error = '';
              newUserInfo.success = true;
              setUser(newUserInfo);
              updateUserName(user.name);
            
            })
            .catch((error) => {
             const newUserInfo = {...user};
              newUserInfo.error = error.message;
              newUserInfo.success = false;
              setUser(newUserInfo);
             
              // ..
            }); 
           
        }
        // toggle-up
       if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
           console.log('sign in user info',res.user);
          })
        .catch((error) => {
            const newUserInfo = {...user};
            newUserInfo.error = error.message;// console.log(user.email, user.password) 
            newUserInfo.success = false;
            setUser(newUserInfo);
          }); 
         
       }
     e.preventDefault();
    }
     const updateUserName = name =>{
     const user = firebase.auth().currentUser;
    
      user.updateProfile({
     displayName: name
     }).then(function()  {
    console.log('user named updated successfully')
    }).catch(function(error) {
    console.log(error)
    });  
}    


   

    return (
        <div>
            <div className="login">
            {
                user.isSignedIn?<button  onClick={handleSignOut}>sign out</button>:
                <button onClick={handleSignIn}>sign in</button>
            }
            <br/>
           
            {
                user.isSignedIn &&<div> 
                <p>Welcome,{user.name}</p>
                <p>Your email:{user.email}</p>
                <img src={user.photo} alt=""></img>
                </div>
            }
            <h1>Our Own Authentication</h1>
            <input type="checkbox"onChange={()=> setNewUser(!newUser)} name="newUser" id=""/>
            <label htmlFor="newUser">New user sign up</label>
             <form onSubmit={handleSubmit}>
            {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="your name"/>}
            <br/>
            <input type="text" name="email" placeholder="Your email address" onBlur={handleBlur} required></input>
            <br/>
            <input type="password" name="password" placeholder="Your password"onBlur={handleBlur} required ></input>
            <br/>
            <input type = "submit" value={newUser ? 'sign up' : 'sign in'}></input>
            </form>
            <p style={{color: 'red'}}>{user.error}</p> 
           {user.success && <p style={{color: 'green'}}>User {newUser ? 'created': 'Logged In'}</p>}
           
          </div>
          
        </div>
    );
};

export default Login;