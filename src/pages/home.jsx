import Post from '../post.tsx';

function Home() {

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

export default Home;