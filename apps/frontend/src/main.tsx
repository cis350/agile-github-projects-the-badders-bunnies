import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginPage from './LoginPage.tsx';
import SignupPage from './SignupPage.tsx';
import AddQuestionsPage from './AddQuestionsPage.tsx';
import { createHashRouter } from 'react-router-dom';
import { RouterProvider } from "react-router-dom";
import QuestionDetailPage from './QuestionDetailPage.tsx';

import './index.css';
import Root from "./routes/root.tsx";
import { AuthProvider } from './AuthContext.tsx';

const router = createHashRouter([
  {

    path: "/",
    element: <Root />,
    children: [
      {
        path: "addQuestions/1",
        element: <AddQuestionsPage/>
      },
      {
        path: "questionsList/:questionId",
        element: <QuestionDetailPage/>
      },
    ],
  },
  {
    path: "signup/1",
    element: <SignupPage/>
  },
  {
    path: "login/1",
    element: <LoginPage/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

