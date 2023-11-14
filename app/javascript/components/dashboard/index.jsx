import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { checkAuthenticationStatus } from '../../utility/authenticationStatus'

const index = () => {
	useEffect(() => {
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

  return(
	  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
	    <div className="jumbotron jumbotron-fluid bg-transparent">
	      <div className="container secondary-color">
	        <h1 className="display-4">Food Recipes</h1>
	        <p className="lead">
	          A curated list of recipes for the best homemade meal and delicacies.
	        </p>
	        <hr className="my-4" />
	        <Link
	          to="/recipes"
	          className="btn btn-lg custom-button"
	          role="button"
	        >
	          View Recipes
	        </Link>
	      </div>
	    </div>
	  </div>
  )
};

export default index;
