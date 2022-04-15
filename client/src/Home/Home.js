import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import './home.css';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppRoutes from '../config/appRoutes';
import { AppConfig } from '../config/appConfig';
import ApiRoutes from '../config/apiRoutes';

const Home = () => {
  const navigate = useNavigate();

  // function to get google response
  const responseGoogle = (response) => {
    if (response) {
      var data = {
        first_name: response.profileObj.givenName,
        last_name: response.profileObj.familyName,
        email: response.profileObj.email,
        token: response.accessToken,
        imageUrl: response.profileObj.imageUrl,
      };
      signup(data);
    }
  };

  useEffect(() => {
    // if token exists it will redirect to search page
    let token = localStorage.getItem('token');
    if (token) {
      navigate(AppRoutes.SEARCH);
    }
    // eslint-disable-next-line
  }, []);

  // api to signup user
  const signup = async (data) => {
    await axios
      .post(`${AppConfig.API_ENDPOINT}${ApiRoutes.soacialSignup}`, data)
      .then((response) => {
        if (response.data.data) {
          let token = response.data?.data?.token;
          let id = response.data?.data?.users?._id;
          if (token) {
            // set token and id in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);
            navigate(AppRoutes.SEARCH);
          } else {
            navigate(AppRoutes.MAIN);
          }
        }
      })
      .catch((error) => {});
  };

  return (
    <div className='Login'>
      <h3>Welcome to Book Search App</h3>
      <br />

      <Form>
        <GoogleLogin
          clientId='352935683453-fgre305nbbvtg3eqdlv85cfqq6lirh29.apps.googleusercontent.com'
          buttonText='Sign In with Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Form>
    </div>
  );
};
export default Home;
