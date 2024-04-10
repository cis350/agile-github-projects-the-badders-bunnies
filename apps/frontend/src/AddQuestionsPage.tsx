// import { useState } from 'react';

import './app.css';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '@mui/material';


function AddQuestionsPage() {
  const [questionText, setQuestionText] = useState('');
  // const [author, setAuthor] = useState('');
  //
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const response = await fetch('/api/account/current-user');
  //     if (response.ok) {
  //       const data = await response.json();
  //       setAuthor(data.username);
  //     }
  //   };
  //
  //   fetchUser();
  // }, []);


  const postAttempt = async () => {
    if (questionText !== '') {
      try {
        // console.log(author);
        const res = await fetch('/api/questions/add', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ questionText : questionText}),
        });
        if (!res.ok) {
          throw new Error('post failed'); // Or handle errors based on status code
        }
        //const data = await res.json() as { token: string };
      } catch (error) {
        alert ('post failed');
      }
    } else {
      alert ('post failed');
    }
    setQuestionText('');
  }

  return (
    <>
      <div className="addCommentBlurb">
        <input
          className="Input"
          type="text"
          value={questionText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQuestionText(e.target.value)}
          placeholder="Question"
        />
        <Button variant="contained" onClick={postAttempt}>Post Question</Button>
      </div>
    </>
  );
}

export default AddQuestionsPage;