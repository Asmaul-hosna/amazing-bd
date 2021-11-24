import firebase from 'firebase/compat/app';
import  'firebase/compat/auth';
import firebaseConfig from './firebase.config';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, signInWithPopup } from "firebase/auth";
import './Login.css';
import { useState } from 'react';


firebase.initializeApp(firebaseConfig);



const Login = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state ||
     { from: { pathname: "/" } };
    
    const [error, setError] = useState("");
    const [user,setUser] = useState({
      isSignedIn: false,
      name: '',
      email:'',
      photo: ''
    })
    const provider = new GoogleAuthProvider;
    const handleSignIn = () =>{
    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        const {displayName,photoURL,email} = result.user;
        const signedInUser ={
            isSignedIn :true,
            name: displayName,
            email: email,
            photo: photoURL
  
       }
       setUser(signedInUser);
       setLoggedInUser(signedInUser);
       history.replace(from);
      console.log(displayName,email,photoURL);
    })
    .catch(err =>{
     const errorMessage = error.message
      setError(errorMessage);
    }) ;
  }
    return (
          <div>
        <div className="login">
          <div className="login-box mt-5 p-5">
            <h3 className="text-white">Login With</h3>
            <br />
            <button onClick={handleSignIn} className="login-btn text-left" >
             
              <b className="pr-5">Sign in with Google</b>
            </button>
  
           
          </div>
        </div>
      </div>
  
        
    );
};

export default Login;