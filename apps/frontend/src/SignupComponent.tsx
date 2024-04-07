import React, { ChangeEvent, useState } from 'react';
import { Button } from '@mui/material';
import { useAuth } from './useAuth.tsx';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

type signupPageComponentProps = {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignupPageComponent: React.FC<signupPageComponentProps> = ({setSignedIn}) => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate()

  const signupAttempt = async () => {
    if (userName !== '' && passWord !== '') {
      try {
        const res = await fetch('/api/account/signup', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userName, password: passWord }), // Send the username and password in the request body
        });
        if (!res.ok) {
          throw new Error('Signup failed'); // Or handle errors based on status code
        }
        setSignedIn(true); // Update the signedIn state
        navigate("/");

      } catch (error) {
        alert('signup failed')
      }
    } else {
      alert ('signup failed');
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
        <Button variant="contained" onClick={signupAttempt}>Sign Up</Button>
      </div>
    </>
  );
}

const SignupComponent: React.FC = () => {
  const { signedIn, setSignedIn } = useAuth();

  return (
    <>
      {signedIn && <div>
        <h1> Successfully Signed In! </h1>
      </div>}


      {!signedIn && <div>
        <div>
          <h3>
            Create an EdStemLite Account:
          </h3>
        </div>
        <Link to={`/login/1`}>
          Have an account? Sign In:
        </Link>
        <SignupPageComponent setSignedIn={setSignedIn} />
      </div>
        }
    </>
  )
}

export default SignupComponent;
