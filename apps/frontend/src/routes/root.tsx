import useSWR from 'swr';
import { Outlet, Link } from "react-router-dom";
import { useAuth } from '../useAuth.tsx';
import LogoutButton from '../LogoutButton.tsx'; // Adjust the import path based on where you defined the interface

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Root() {
  const { signedIn } = useAuth();
  // useSWR hook for data fetching with automatic revalidation every 2000 milliseconds
  const { data: questions, error } = useSWR('/api/questions/', fetcher, { refreshInterval: 2000 });

  if (error) return <div>Failed to load questions</div>;
  if (!questions) return <div>Loading...</div>;

  return (
    <>
      <div id="sidebar">
        <h1>EdStemLite David Yang</h1>
        <LogoutButton/>

        {signedIn && <button>
          <Link to={`/addQuestions/1`}>
            Add new question (+)
          </Link>
        </button>}

        {!signedIn && <button>
          <Link to={`/signup/1`}>
            Create an Account to Post a Question:
          </Link>
        </button>}

        <nav>
          <ul>
            {questions.map(question => (
              <li key={question._id}>
                <Link to={`/questionsList/${question._id}`}>{question.questionText}</Link>
                {/* You can also display `question.answer` and `question.author` as needed */}
              </li>
            ))}
          </ul>

        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>

  );

}
