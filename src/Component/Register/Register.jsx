import React, {useState} from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification,  updateProfile } from "firebase/auth";
import app from '../../FireBase_config.js/FireBase_config';
import { Link } from 'react-router-dom';

const auth = getAuth(app);
const Register = () => {
    // const [emails, setEmail]=useState('')
    // const [passwords, setPassword]=useState('')
    const [errors, setError]=useState('')
    const [success, setSuccess]=useState('')

    const handleRegister=(event)=>{
        event.preventDefault()
        setSuccess('')
        setError('')
        const email=event.target.email.value
        const password=event.target.password.value
        const name =event.target.name.value
        // setEmail(email)
        // setPassword(password)
        console.log(email,password);
        if(!/(?=.*[A-Z])/.test(password)){
            setError('Plz Ensure string has One uppercase letters')
            return;
        }
        else if(!/(?=.*[0-9].*[0-9])/.test(password)){
            setError('Plz Ensure string has two digits.')
            return;
        }
        else if(!password.length>=6){
            setError('Plz indicates that you want 6 or more')
        }
       
         createUserWithEmailAndPassword(auth, email, password)
         .then(userCredential=>{
            const users= userCredential.user
            sendVerificationEmail(users)
            handleUpdateName(users, name)

            console.log(users);
            event.target.reset()
            setSuccess('user has been created successfully')
            setError('')
         })
         .catch(error=>{
            // const errorCode = error.code;
            // const errorMessage = error.message;
            setError(error.message);
         })

    }
    // email verification 
    const sendVerificationEmail=(user)=>{
        sendEmailVerification(user)
        .then(result =>{
            console.log(result);
            alert('Please verify your email address')
        })

    }

    //name update

    const handleUpdateName=(user, name)=>{
        updateProfile(user,{
            displayName:name
        })
        .then(()=>{
            alert('User Name update')
        })
        .catch(error=>{
            // console.log(error);
            setError(error.message)
        })
    }

    // const handleOnChange=(event)=>{
    //     event.preventDefault()
    //     console.log(event.target.value);
    // }
    // const handleOnBlur=(event)=>{
    //     event.preventDefault()
    //     console.log(event.target.value);
    // }
    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-center my-5'>This is register</h2>
            <form onSubmit={handleRegister}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Your Name</label>
                    <input  type="text" name='name' className="form-control" aria-describedby="emailHelp" required/>
                    
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input  type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input  type="password" name='password' className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
               
                </form>
                <p><small>Already have an account? Please <Link to='/login'>Login</Link></small></p>
                <p className='text-success'>{errors}</p>
                <p className='text-success'>{success}</p>
        </div>
    );
};

export default Register;