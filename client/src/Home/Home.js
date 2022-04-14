import React from 'react';
import { Form } from 'react-bootstrap';
import './home.css';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
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
  const signup = async (data) => {
    await axios
      .post('http://localhost:5000/api/user/signup', data)
      .then((response) => {
        if (response.data.data) {
          let token = response.data?.data?.token;
          if (token) {
            localStorage.setItem('token', token);
            navigate('/search');
          } else {
            navigate('/');
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
          isSignedIn={true}
        />
      </Form>
    </div>
  );
};
export default Home;
