import './app.css';
import Post from './post.tsx';

function App() {

  return (
    <>
      <div className="app">
        <h1>PennKudos</h1>
        <hr/>
        <Post showReply={true} depth={0}/>
      </div>
    </>
  );
}

export default App;