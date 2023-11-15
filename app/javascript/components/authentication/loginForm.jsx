import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { checkAuthenticationStatus } from '../../utility/authenticationStatus'
import axios from 'axios';
import { currentDomainUrl } from '../../config/variables';
import { csrfToken } from '../../config/variables';

const loginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

	useEffect(() => {
        console.log("SSDADS", csrfToken)
        const fetchData = async () => {
        try {
            const response = await checkAuthenticationStatus('token');
            console.log('Authentication status:', response.authentication_status);
        } catch (error) {
            console.error('Error fetching authentication status:', error);
        }
        };
        fetchData();
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${currentDomainUrl}/api/v1/users/sign_in`, {
                user: {
                    email: email,
                    password: password,
                }
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  'X-CSRF-Token': csrfToken,
                },
            }
            );

            console.log('Login successful:', response.data);
        } catch (error) {
          console.error('Login failed:', error.response?.data || error.message);
          // Handle login failure, e.g., display an error message
        }
      };

  return(
	  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
	    <div className="jumbotron jumbotron-fluid bg-transparent" style={{marginTop: -250}}>
	      <div className="container secondary-color">
            <form>
    	        <h1 className="display-4 fw-bold">Sign In</h1>
    	        <p className="lead small-font" style={{fontWeight: 400}}>
    	          Enter your account details
    	        </p>
                <p className="lead small-font fw-bold" style={{fontWeight: 400}}>
    	          Email Address
    	        </p>
                <input className="input-text fw-bold small-font" placeholder="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
                <p className="lead small-font fw-bold mt-3" style={{fontWeight: 400}}>
    	          Password
    	        </p>
                <input className="input-text fw-bold small-font" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="d-flex justify-content-between">
                    <div className="mt-4 d-flex">
                        <input className="form-checkbox" type="checkbox" />
                        <label className="small-font fw-bold">
                            Remember me
                        </label>
                    </div>
                    <Link
                        to="/password/new"
                        className="small-font fw-bold recover-password mt-4"
                    >
                        Recover Password
                    </Link>
                </div>
    	        <button type="button" onClick={handleLogin}
    	          className="btn btn-lg d-block mt-4 fw-bold small-font input-text d-flex align-items-center justify-content-center button-style"
    	        >
    	          Sign In
    	        </button>
            </form>
	      </div>
	    </div>
	  </div>
  )
};

export default loginForm;
