import React, { ChangeEvent, useState } from 'react';
import { useAuth } from './useAuth.tsx';
import {Button} from '@mui/material'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type loginPageComponentProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const LoginPageComponent: React.FC<loginPageComponentProps> = ( { setSignedIn } ) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();
  const loginAttempt = async () => {
    if (userName !== '' && passWord !== '') {
      try {
        const res = await fetch('/api/account/login', {
            method: 'POST' ,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName, password: passWord }), // Send the username and password in the request body
          });
        if (!res.ok) {
          throw new Error('Login failed'); // Or handle errors based on status code
        }
        //const data = await res.json() as { token: string };
        setSignedIn(true); // Update the signedIn state
        navigate("/");
      } catch (error) {
        alert ('login failed');
      }
    } else {
      alert ('login failed');
    }
    setUserName('');
    setPassWord('');
  }
  return (
    <>
      <div className="addCommentBlurb">
        <input
          className="Input"
          type="text"
          value={userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
          placeholder="username"
        />
        <input
          className="Input"
          type="password"
          value={passWord}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setPassWord(e.target.value)}
          placeholder="password"
        />
        <Button variant="contained" onClick={loginAttempt}>Sign In</Button>
      </div>
    </>
  );
}



const LoginComponent: React.FC = () => {
  const { signedIn, setSignedIn } = useAuth();

  return (
    <>
      {signedIn && <div>
        <h1> Successfully Signed In! </h1>
      </div>}

      {!signedIn &&
      <div>
        <div>
          <h3>
            Login to EdStemLite:
          </h3>
        </div>

        <Link to={`/signup/1`}>
          Create a new account:
        </Link>
        <LoginPageComponent setSignedIn={setSignedIn}/>
      </div>}
    </>
  )
}

export default LoginComponent;
