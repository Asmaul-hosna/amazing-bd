// import firebase from 'firebase/compat/app';
// import  'firebase/compat/auth';
// import firebaseConfig from './firebase.config';

// export const initializeLoginFramework = () => {
//     firebase.initializeApp(firebaseConfig);
// }

// export const handleGoogleSignIn=()=>{
//     const googleProvider = new firebase.auth.GoogleAuthProvider();
//     return firebase.auth().signInWithPopup(googleProvider)
//     .then(res => {
//         const {displayName,photoURL,email} = res.user;
//         const signInWithUser ={
//             isSignedIn: true,
//             name:displayName, 
//             email:email,
//             photo:photoURL
//         }
//         return signInWithUser;
//         console.log(displayName,photoURL,email);
//     })
    
//     .catch(err =>{
//         console.log(err);
//         console.log(err.message);
//     })
// }

// export const handleSignOut =()=>{
//    return firebase.auth().signOut()
//     .then(res => {
//         const signedOutUser ={
//             isSignedIn:false,
//             name:"",
//             email:"",
//             photo:"",
//             error:"",
//             success:false
//         }
//         return signedOutUser;
//     })
//     .catch(err =>{
        
//     })

   
// }
// export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
// .then((res) => {
//     console.log(res);
//   const newUserInfo = {...user};
//   newUserInfo.error = '';
//   newUserInfo.success = true;
//   setUser(newUserInfo);
//  console.log('sign in user info',res.user);
// })
// .catch((error) => {
//  const newUserInfo = {...user};
//   newUserInfo.error = error.message;
//   newUserInfo.success = false;
//   setUser(newUserInfo);
//   updateUserName(user.name);
//   // ..
// });

// // }
// export const signInWithEmailAndPassword = () =>{
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//         const newUserInfo = {...user};
//         newUserInfo.error = '';
//         newUserInfo.success = true;
//         setUser(newUserInfo);
//         setLoggedInUser(newUserInfo);
//         history.replace(from);
//        console.log('sign in user info',res.user);
//       })
//     .catch((error) => {
//         const newUserInfo = {...user};
//         newUserInfo.error = error.message;
//         newUserInfo.success = false;
//         setUser(newUserInfo);
      
       
//     }); 
// }
// const updateUserName = name =>{
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name,
//      }).then(function()  {
//          console.log('user named updated successfully')
//      }).catch(function(error) {
//      console.log(error)
//     });  
    
// }