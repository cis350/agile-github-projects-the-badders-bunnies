import React, { ChangeEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from './useAuth.tsx';
import { Button } from '@mui/material';
import useSWR from 'swr';

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the data.');
  }
  return response.json();
};

const QuestionDetailPage = () => {
  const { signedIn } = useAuth()
  const { questionId } = useParams();
  const { data: question, error } = useSWR(`/api/questions/${questionId}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!question) return <div>Loading...</div>;

  const AnswerQuestionComponent : React.FC<{questionId: string}> = ({questionId}) => {
    const [answer, setAnswer] = useState<string>('')

    const answerQuestion = async () => {
      if (answer !== '') {
        try {
          const res = await fetch(`/api/questions/${questionId}/answer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer }),
          });
          if (!res.ok) {
            throw new Error('Failed to post answer');
          }
          alert('Answer posted successfully');
          setAnswer('');
        } catch (error) {
          alert('Failed to post answer');
        }
      } else {
        alert('Please provide an answer before posting.');
      }
    };

    return (
      <>
        <div>
          Answer Question:
        </div>
        <div className="addCommentBlurb">
        <input
          className="Input"
          type="text"
          value={answer}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAnswer(e.target.value)}
          placeholder="Answer"
        />
        <Button variant="contained" onClick={answerQuestion}>Post Answer</Button>
      </div>
      </>
    )
  }

  return (
    <div>
      <h2>Question: {question.questionText}</h2>
      <h3>author: {question.author}</h3>
      <h3>answer: {question.answer || 'No answer yet'}</h3>
      {signedIn && <AnswerQuestionComponent questionId={questionId} />}
    </div>
  );
};

export default QuestionDetailPage;
