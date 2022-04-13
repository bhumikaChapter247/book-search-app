import React from 'react';
import { Form } from 'react-bootstrap';
import './home.css';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    console.log('response-------------------', response);
    // if (response) {
    //   navigate('/search');
    // }
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
