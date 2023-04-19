import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../FireBase_config.js/FireBase_config';

const auth =getAuth(app)
const Login = () => {
    const [error, setError]=useState('')
    const [success, setSuccess]=useState('')
    const emailRef = useRef()

    const handleLogin=(event)=>{
       event.preventDefault()
       setError('')
       setSuccess('')
        const email=event.target.email.value;
        const password =event.target.password.value;
        console.log(email, password);

        // Optonal prictice recup

        // if(!/(?=.*[A-Z])/.test(password)){
        //     setError('Plz Ensure string has One uppercase letters..!')
        // }
        // else if(!/(?=.*[!@#$&*])/.test(password)){
        //     setError('Plz Ensure string has one special case letter..!')
        // }
        // else if(password.length < 6){
        //     setError('Plz Ensure string is of length 6..!')
        // }
        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
            const users= result.user;
            console.log(users);
           
            setSuccess('user Login successfully')
            setError('')
        })
        .catch(error=>{
            setError(error.message)
        })
    }

    // password reset
    
    const HandlePasswordReset=(user)=>{
        const email=(emailRef.current.value);
        if(!email){
            alert('plz write a email')
            return
        }
        sendPasswordResetEmail(auth, email)
        .then(result=>{
            alert('Please chick your email')
        })
        .catch(error=>{
            console.log(error);
            setError(error.message)
        })

    }

    return (
        <div className='w-50 mx-auto'>
            <h2 className='text-center my-5'>This is Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" ref={emailRef} name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Reset Your password<button onClick={HandlePasswordReset} className='btn btn-link'>Click</button></small> </p>
            <p><small>New to this website? please <Link to='/register'>Register</Link></small></p>
            
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
    </div>
    );
};

export default Login;